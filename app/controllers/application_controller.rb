class ApplicationController < ActionController::Base
  include ApplicationHelper

  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  before_action :check_authenticated_user, except: [:error_handler, :notfound_handler]
  before_action :set_timezone, :set_locale

  rescue_from StandardError, with: :error_handler
  rescue_from ActionController::InvalidAuthenticityToken, with: :error_handler
  rescue_from AppError, with: :error_handler
  rescue_from ActionController::RoutingError, with: :notfound_handler
  rescue_from ActiveRecord::RecordNotFound, with: :notfound_handler


  protected

  #
  # ログインしていなければルートパス（ログイン画面）にリダイレクト
  # redirectパラメータにアクセスしようとしたパスをセット
  #
  def check_authenticated_user
    unless logged_in?
      reset_session
      path = root_path(redirect: request.env["REQUEST_URI"])
      redirect_to path
      return
    end
  end

  #
  # トークンが存在しない、あるいは自分が所属していない場合404エラー
  # トークン内コンテンツのbefore_filterに指定する
  #
  def check_authenticated_project
    raise ActionController::RoutingError.new "Not found" unless current_project.present?
  end

  # 500系エラーなら500エラー画面を表示
  def error_handler(e = nil)
    if e
      logger.error "[Error] #{e.class.name}, #{e.message}"
      logger.error "        #{e.backtrace[0]}"
      logger.error "        #{e.backtrace[1]}"
    end

    render file:         "#{Rails.root}/public/500",
           formats:      :html,
           status:       500,
           layout:        false,
           content_type: "text/html"
  end

  # 404エラーなら404エラー画面を表示
  def notfound_handler(e = nil)
    render file:         "#{Rails.root}/public/404",
           formats:      :html,
           status:       404,
           layout:       false,
           content_type: "text/html"
  end


  private

  def start_session(user_id)
    reset_session
    session[:login_id] = user_id
  end

  # DBに設定されていなければ、デフォルトとして"UTC"を使う
  def set_timezone
    Time.zone = logged_in? ? (current_user.timezone rescue "UTC") : "UTC"
  end

  # DBに設定されているものを表示言語として使う
  # 設定されていなければ、デフォルトとして"en"を使う
  # ログイン前のアクセスならブラウザのACCEPT_LANGUAGEを使う
  def set_locale
    # ?lang=enとして切り替え
    if params[:lang]
      I18n.locale = params[:lang]
    elsif logged_in?
      I18n.locale = (current_user.locale rescue "ja")
    else
      accept_language = request.env["HTTP_ACCEPT_LANGUAGE"] || ""
      locale = accept_language.scan(/^[a-z]{2}/).first
      I18n.locale = (locale == "ja") ? "ja" : "en"
    end
  end
end

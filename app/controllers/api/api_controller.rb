class Api::ApiController < ApplicationController
  rescue_from AuthError, with: :auth_error_handler


  # override
  # ログインしていなければ、認証エラーオブジェクトを返す
  def check_authenticated_user
    raise AuthError.new(I18n.t "errors.signup") unless logged_in?
  end

  # override
  def error_handler
    e = $!
    logger.error "[Error] #{e.class.name}, #{e.message}"
    logger.error "        #{e.backtrace[0]}"
    logger.error "        #{e.backtrace[1]}"

    render status: 500, json: wrap_response(e)
  end

  # override
  def notfound_handler
    e = $!
    render status: 404, json: wrap_response(e)
  end

  def auth_error_handler
    e = $!
    render status: 403, json: wrap_response(e)
  end

  def output(data=nil)
    render json: wrap_response(data)
  end


  private

  # APIの結果はsuccessプロパティで判定
  # errors配列にエラーメッセージを詰める
  def wrap_response(data)
    obj = {success: nil, errors: [], result: nil}

    case data
    when AuthError
      obj[:success] = false
      obj[:errors] = data.message
    when ActionController::RoutingError, ActiveRecord::RecordNotFound
      obj[:success] = false
      obj[:errors] = data.message
    when AppError, StandardError
      obj[:success] = false
      obj[:errors].push data.message
    else
      obj[:success] = true
      obj[:result] = data
    end

    return obj
  end
end

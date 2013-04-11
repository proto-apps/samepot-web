module ApplicationHelper
  #
  # ログイン済みかチェック
  #
  def logged_in?
    return false unless session[:login_id]
    current_user.present?
  end

  #
  # セッションのlogin_idを持つユーザーを返す
  # ユーザーが存在しないならnilを返す
  #
  def current_user
    unless @current_user
      @current_user = User.find_by(:id => session[:login_id])
    end
    @current_user
  end

  #
  # URIのトークンを持つプロジェクトを返す
  # 存在しないかユーザーが所属していないならnilを返す
  #
  def current_project
    unless @current_project
      match = current_user.projects.select do |project|
        project.access_token == params[:token]
      end
      if match.size > 0
        @current_project = match[0]
      end
    end
    @current_project
  end

  #
  # プロジェクトを作成可能かどうか
  # = 自分が管理者のプロジェクトが1つもなければ作成可能
  #
  def create_project?
    return false if demo_user?

    super_user? or current_user.projects.where(administrator_id: current_user.id).size == 0
  end

  #
  # プロジェクトメンバーを招待可能かどうか
  # = 自分が管理者かつ招待済み含めたメンバー数が5人未満
  #
  def invite_member?
    return false if demo_user?

    admin = current_project.administrator_id == current_user.id
    invited = Invite.where(project_id: current_project.id)
    admin and 5 >= (current_project.users.size + invited.size)
  end

  #
  # ユーザーの表示言語ごとにリソースファイルを読み込む
  #
  def create_script_tag_message
    path = "locales/#{I18n.locale}"
    return "#{javascript_include_tag(path)}"
  end

  #
  # サイズごとのデフォルトユーザーアイコンを返す
  #
  def user_image_tag(size = "small", opt={})
    case size
    when "small"
      return image_tag("icon/user_14x18.png", opt)
    when "medium"
      return image_tag("icon/user_18x24.png", opt)
    when "large"
      return image_tag("icon/user_36x48.png", opt)
    end
  end

  #
  # Socket.IOのクライアントライブラリパスを返す
  #
  def socketio_host
    Samepot::Application.config.socketio_host
  end


  private

  #
  # スーパーユーザーかどうか
  #
  def super_user?
    current_user.email == "y.wakahara@gmail.com"
  end

  #
  # デモ用ユーザーかどうか
  # （制限をかける必要があるため）
  #
  def demo_user?
    demos = ["demo1@samepot.com", "demo2@samepot.com"]
    demos.include? current_user.email
  end
end

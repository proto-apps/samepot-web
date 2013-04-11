class Api::AuthController < Api::ApiController
  skip_before_action :check_authenticated_user


  # POST /api/auth/login
  def login
    obj = login_params
    user = authenticate_user(obj[:email], obj[:password])
    if user
      start_session(user.id)
      output
    else
      raise AppError.new I18n.t "errors.login"
    end
  end

  # POST /api/auth/signup
  def signup
    obj = signup_params
    if existed_user?(obj[:email])
      raise AppError.new I18n.t "errors.signup"
    end

    verifier = Verifier.create! obj

    ActionMailer::Base.default_url_options = {host: request.host_with_port}
    VerifierMailer.send_mail(verifier).deliver

    output
  end

  # POST /api/auth/signup_with_invite
  def signup_with_invite
    obj = signup_params
    if existed_user?(obj[:email])
      raise AppError.new I18n.t "errors.signup"
    end

    accept_language = request.env["HTTP_ACCEPT_LANGUAGE"].presence || ""
    locale = accept_language.scan(/^[a-z]{2}/).first
    locale = "en" unless locale == "ja"

    user = User.create!(
      name: obj[:name],
      email: obj[:email],
      password: obj[:password],
      locale: locale
    )
    ActionMailer::Base.default_url_options = {host: request.host_with_port}
    VerifierMailer.send_thanks_mail(user).deliver

    output
  end

  # GET /api/auth/:token/:user_id
  def project_member?
    user = User.find(params[:user_id])
    match = user.projects.select do |project|
      project.access_token == params[:token]
    end
    res = {check: match.size > 0}
    output res
  end


  private

  def existed_user?(email)
    User.find_by(email: email).present?
  end

  def authenticate_user(email, password)
    user = User.find_by(:email => email)
    user and user.valid_password?(password) ? user : nil
  end

  def login_params
    params.require('auth').permit(:email, :password)
  end

  def signup_params
    params.require('auth').permit(:name, :email, :password)
  end
end

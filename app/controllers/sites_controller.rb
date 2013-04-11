class SitesController < ApplicationController
  skip_before_action :check_authenticated_user, except: [:logout]

  layout "sites"


  # GET /
  def index
    redirect_to home_url if logged_in?
  end

  # GET /signup
  def signup
  end

  # GET /verify/:token
  def verify
    verifier = Verifier.find_by!(access_token: params[:token])
    raise AppError.new "Verification has expired, please re-signup" if verifier.expired?

    accept_language = request.env["HTTP_ACCEPT_LANGUAGE"].presence || ""
    locale = accept_language.scan(/^[a-z]{2}/).first
    locale = "en" unless locale == "ja"

    @user = User.create!(
      name: verifier.name,
      email: verifier.email,
      password: verifier.password,
      locale: locale
    )

    verifier.destroy
    ActionMailer::Base.default_url_options = {host: request.host_with_port}
    VerifierMailer.send_thanks_mail(@user).deliver

    # session start
    start_session(@user.id)
  end

  # GET /invite/:token
  def invite
    invite = Invite.find_by!(access_token: params[:token])
    raise AppError.new "Invitation has expired, please re-invite" if invite.expired?

    @project = Project.find_by!(invite.project_id)

    user = User.find_by(email: invite.email)
    @is_new = !user.present?

    if @is_new
      @invite = invite
    else
      user.projects << @project
      invite.destroy!

      # 
      ActivitiesWorker.perform_async(
        project_id: @project.id,
        resource: "system",
        action: "join",
        user_id: user.id,
        name: nil,
        content: nil,
        url: nil
      )

      # session start
      start_session(user.id)
    end
  end

  # GET /logout
  def logout
    reset_session
    redirect_to root_path
  end
end

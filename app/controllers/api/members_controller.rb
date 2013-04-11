class Api::MembersController < Api::ApiController
  include Concerns::Projected

  # POST /api/:token/members
  def create
    raise AppError.new I18n.t "errors.member.over" unless invite_member?

    obj = invite_params
    raise AppError.new I18n.t "errors.member.required" unless obj[:email]

    # 空白、改行文字を除去
    email = obj[:email].strip

    user = User.find_by(email: email)
    if user and ProjectUserRelation.find_by(project_id: current_project.id, user_id: user.id).present?
      raise AppError.new I18n.t "errors.member.found"
    end
    raise AppError.new I18n.t "errors.member.used" if Invite.find_by(email: email).present?

    # 招待メール送信
    invite = Invite.create! obj.merge(project_id: current_project.id)

    ActionMailer::Base.default_url_options = {host: request.host_with_port}
    InviteMailer.send_mail(invite, current_user.name, current_project.name).deliver

    output
  end

  # DELETE /api/:token/members/:id
  def destroy
    relation = ProjectUserRelation.find_by(
      project_id: current_project.id,
      user_id: params[:id]
    )
    raise AppError.new I18n.t "errors.member.not_found" unless relation

    relation.destroy
    output
  end


  private

  def invite_params
    params.require(:member).permit(:email)
  end
end

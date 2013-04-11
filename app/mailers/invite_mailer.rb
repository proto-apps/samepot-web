class InviteMailer < ActionMailer::Base
  default from: 'y.wakahara@gmail.com'

  def send_mail(invite, user_name, project_name)
    @user_name = user_name
    @project_name = project_name
    @url = invite_url(token: invite.access_token, only_path: false)

    mail(to: invite.email, subject: I18n.t("mails.invite.subject", name: project_name))
  end
end

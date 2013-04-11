class VerifierMailer < ActionMailer::Base
  default from: 'y.wakahara@gmail.com'

  def send_mail(verifier)
    @verifier = verifier
    @url = verify_url(token: verifier.access_token, only_path: false)

    mail(to: verifier.email, subject: I18n.t("mails.verify.subject"))
  end

  def send_thanks_mail(user)
    @user = user

    mail(to: user.email, subject: I18n.t("mails.verify.welcome"))
  end
end

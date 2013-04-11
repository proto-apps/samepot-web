class Invite < ActiveRecord::Base
  include Concerns::Tokenable

  belongs_to :project

  validates :email,      presence: true, length: {within: 1..128}, email: true
  validates :project_id, presence: true


  # ユニークなランダム8文字のトークンと有効期限を
  # create時にセットする
  before_create {
    begin
      self[:access_token] = generate_token(8)
    end while Invite.exists?(:access_token => self[:access_token])

    self[:expired] = Time.now + 7.days
  }

  # 期限切れチェック
  def expired?(time=nil)
    time = Time.now unless time
    time > self[:expired]
  end
end

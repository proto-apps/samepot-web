class Verifier < ActiveRecord::Base
  include Concerns::Tokenable

  validates :name,     presence: true, length: {within: 3..32}
  validates :email,    presence: true, length: {within: 1..128}, email: true
  validates :password, presence: true, length: {within: 6..32}


  # ユニークなランダム8文字のトークンと有効期限を
  # create時にセットする
  before_create {
    begin
      self[:access_token] = generate_token(8)
    end while Verifier.exists?(:access_token => self[:access_token])

    self[:expired] = Time.now + 7.days
  }

  # 期限切れチェック
  def expired?(time=nil)
    time = Time.now unless time
    time > self[:expired]
  end
end

class User < ActiveRecord::Base
  include Concerns::Securable, Concerns::Removable
  extend Enumerize

  attr_reader :password
  attr_reader :new_password

  has_many :project_user_relations
  has_many :projects, through: :project_user_relations

  validates :name,     presence: true, length: {within: 3..32}
  validates :email,    presence: true, uniqueness: {case_sensitive: false},
                       length: {within: 1..128}, email: true
  validates :password, presence: true, length: {within: 6..20}, on: :create
  validates :new_password, length: {within: 6..20}, on: :update, allow_blank: true

  enumerize :locale, in: [:en, :ja], default: :en


  # 入力値からMD5値、パスワード用ソルトをセット
  def password=(unencrypted_password)
    @password = unencrypted_password
    unless unencrypted_password.blank?
      self.password_salt = User.generate_salt
      self.password_digest = User.encrypt_value(unencrypted_password, self.password_salt)
    end
  end
  def new_password=(unencrypted_password)
    @new_password = unencrypted_password
    self.password_salt = User.generate_salt
    self.password_digest = User.encrypt_value(unencrypted_password, self.password_salt)
  end

  # MD5値が一致するパスワードかチェック
  def valid_password?(unencrypted_password)
    digest = User.encrypt_value(unencrypted_password, self.password_salt)
    return digest == self.password_digest
  end

  def as_json(options = {})
    super except: ["password_digest", "password_salt"]
  end
end

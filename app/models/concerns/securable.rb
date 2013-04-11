module Concerns::Securable
  extend ActiveSupport::Concern

  module ClassMethods
    # 文字列値とランダムなソルトでMD5ハッシュを生成
    def encrypt_value(unencrypted_value, salt=nil)
      salt = generate_salt unless salt
      Digest::MD5.hexdigest(unencrypted_value + salt)
    end

    # ランダム20文字のソルトを生成
    def generate_salt
      str = rand.to_s.tr('+', '.')
      str[0, if str.size > 20 then 20 else str.size end]
    end
  end
end

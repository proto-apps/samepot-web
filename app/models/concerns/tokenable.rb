module Concerns::Tokenable
  extend ActiveSupport::Concern

  def generate_token(limit=8)
    limit = limit - 2
    SecureRandom.urlsafe_base64(limit)
  end
end

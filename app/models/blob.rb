class Blob < ActiveRecord::Base
  include Concerns::Tokenable
 
  # ユニークなランダム8文字のトークンを
  # create時にセットする
  before_create {
    begin
      self[:token] = generate_token(8)
    end while Blob.exists?(:token => self[:token])
  }
end

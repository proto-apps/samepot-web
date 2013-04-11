# Be sure to restart your server when you modify this file.

Sidekiq.configure_server do |config|
  db = Rails.env.test? ? 10 : 9
  config.redis = {url: "redis://localhost:6379/#{db}", namespace: '_samepot_queue'}
end

# When in Unicorn, this block needs to go in unicorn's `after_fork` callback:
Sidekiq.configure_client do |config|
  db = Rails.env.test? ? 10 : 9
  config.redis = {url: "redis://localhost:6379/#{db}", namespace: '_samepot_queue'}
end

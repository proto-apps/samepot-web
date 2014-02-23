# Be sure to restart your server when you modify this file.

#Samepot::Application.config.session_store :encrypted_cookie_store, key: '_samepot_session'

# Use redis-store as session store
require 'action_dispatch/middleware/session/redis_store'

# セッションの生存期間は、1週間 
Samepot::Application.config.session_store :redis_store, servers: {
  host: "localhost",
  port: 6379,
  namespace: "_samepot_sessions",
  db: 1,
  expire_in: 60 * 60 * 24 * 7
}

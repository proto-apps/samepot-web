# Be sure to restart your server when you modify this file.

#Samepot::Application.config.session_store :encrypted_cookie_store, key: '_samepot_session'


# Use redis-store as session store
require 'action_dispatch/middleware/session/redis_store'

#
# デフォルトだとRubyのMarshalでセッションオブジェクトを保存するため、Node.js側で扱えない
# JSONで保存するためにモンキーパッチをあてる
#
module ActionDispatch
  module Session
    class RedisStore
      # override
      def get_session(env, sid)
        with_lock(env, [nil, {}]) do
          unless sid and session = @pool.get(sid)
            sid, session = generate_sid, {}
            unless /^OK/ =~ @pool.set(sid, JSON.generate(session))
              raise "Session collision on '#{sid.inspect}'"
            end
          end
          session = JSON.parse(session) unless session == {}
          if session.has_key?('flash')
            session['flash'] = ActionDispatch::Flash::FlashHash.new.update(Hash[*session['flash']])
          end
          [sid, session]
        end
      end

      # override
      def set_session(env, session_id, new_session, options)
        with_lock(env, false) do
          jsonize_session = JSON.generate(new_session)
          @pool.set session_id, jsonize_session, options
          session_id
        end
      end
    end
  end
end

# セッションの生存期間は、2週間 
Samepot::Application.config.session_store :redis_store, servers: {
  host: "localhost",
  port: 6379,
  namespace: "_samepot_sessions",
  db: 6,
  expire_in: 60 * 60 * 24 * 7 * 2
}

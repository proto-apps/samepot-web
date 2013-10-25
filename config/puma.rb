threads 4, 16
workers 2
preload_app!

on_worker_boot do
  ActiveRecord::Base.connection_pool.disconnect!

  ActiveSupport.on_load(:active_record) do
    ActiveRecord::Base.establish_connection
  end
end

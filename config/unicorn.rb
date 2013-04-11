worker_processes 2

root_dir = File.expand_path("../../", __FILE__)

working_directory root_dir

listen "#{root_dir}/tmp/sockets/unicorn.sock"
pid    "#{root_dir}/tmp/pids/unicorn.pid"


if ENV['RAILS_ENV'] == "production"
  stderr_path "#{root_dir}/log/unicorn.log"
  stdout_path "#{root_dir}/log/unicorn.log"
end


# no downtime
preload_app true


before_fork do |server, worker|
  old_pid = "#{server.config[:pid]}.oldbin"
  # oldプロセスがいたら終了する
  unless old_pid == server.pid
    begin
      Process.kill :QUIT, File.read(old_pid).to_i
    rescue Errno::ENOENT, Errno::ESRCH
    end
  end
end

after_fork do |server, worker|
  defined?(ActiveRecord::Base) and ActiveRecord::Base.establish_connection
end

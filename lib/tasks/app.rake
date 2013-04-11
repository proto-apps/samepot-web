# encoding: utf-8

namespace :app do

  task :start => [:web_start, :db_start]
  task :stop  => [:web_stop, :db_stop]

  desc "Nginxを起動"
  task :web_start do
    sh "sudo /etc/init.d/nginx start"
  end

  desc "Nginxを停止"
  task :web_stop do
    sh "sudo /etc/init.d/nginx stop"
  end

  desc "MySQL, Redisを起動"
  task :db_start do
    sh "sudo /etc/init.d/mysql start"
    sh "sudo /etc/init.d/redis-server start"
  end

  desc "MySQL, Redisを停止"
  task :db_stop do
    sh "sudo /etc/init.d/mysql stop"
    sh "sudo /etc/init.d/redis-server stop"
  end
end

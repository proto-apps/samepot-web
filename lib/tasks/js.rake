# encoding: utf-8

namespace :js do

  JS_PATH = "public/javascripts"

  task :all => [:resource]

  desc "config下のYAMLファイルからリソースファイルを生成"
  task :resource do
    require 'yaml'
    require 'json'

    Dir.glob("config/locales/*.yml") do |file|
      filename = File.basename(file, ".yml")
      if filename !~ /^default/
        data = YAML.load(File.read(file))
        filepath = "#{JS_PATH}/locales/#{filename}.js"
        File.open(filepath, 'w') do |f|
          data = data[filename]
          if data.nil?
            data = {}
          end
          json = JSON.dump(data)
          f.write "var MESSAGES = #{json};"
          puts "Generated #{filepath}"
        end
      end
    end
  end
end

task :js => "js:all"

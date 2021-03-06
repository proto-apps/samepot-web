Samepot::Application.configure do
  # Settings specified here will take precedence over those in config/application.rb.

  # In the development environment your application's code is reloaded on
  # every request. This slows down response time but is perfect for development
  # since you don't have to restart the web server when you make code changes.
  config.cache_classes = false

  # Do not eager load code on boot.
  config.eager_load = false

  # Show full error reports and disable caching.
  config.consider_all_requests_local       = true
  config.action_controller.perform_caching = false

  # Print deprecation notices to the Rails logger.
  config.active_support.deprecation = :log

  # Raise an error on page load if there are pending migrations
  config.active_record.migration_error = :page_load

  # Debug mode disables concatenation and preprocessing of assets.
  config.assets.debug = false


  # Do not output assets log
  config.assets.logger = false
  Rails::Rack::Logger.class_eval do 
    def call_with_quiet_assets(env)
      previous_level = Rails.logger.level
      Rails.logger.level = Logger::ERROR if env['PATH_INFO'].index("/assets/") == 0 
      call_without_quiet_assets(env).tap do
        Rails.logger.level = previous_level
      end 
    end 
    alias_method_chain :call, :quiet_assets 
  end 

  # Email sender
  config.action_mailer.delivery_method = :smtp
  config.action_mailer.raise_delivery_errors = false
  config.action_mailer.perform_deliveries = false
  #config.action_mailer.smtp_settings = {
  #  address:              '<ADDRESS>',
  #  port:                 <PORT>,
  #  domain:               '<DOMAIN>',
  #  user_name:            '<USERNAME>',
  #  password:             '<PASSWORD>',
  #  authentication:       'plain',
  #  enable_starttls_auto: true
  #}
end

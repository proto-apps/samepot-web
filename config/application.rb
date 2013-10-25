require File.expand_path('../boot', __FILE__)

require 'rails/all'

# Assets should be precompiled for production (so we don't need the gems loaded then)
Bundler.require(*Rails.groups(assets: %w(development test)))

module Samepot
  class Application < Rails::Application
    # Settings in config/environments/* take precedence over those specified here.
    # Application configuration should go into files in config/initializers
    # -- all .rb files in that directory are automatically loaded.

    # Set Time.zone default to the specified zone and make Active Record auto-convert to this zone.
    # Run "rake -D time" for a list of tasks for finding time zone names. Default is UTC.
    # config.time_zone = 'Central Time (US & Canada)'

    # The default locale is :en and all translations from config/locales/*.rb,yml are auto loaded.
    # config.i18n.load_path += Dir[Rails.root.join('my', 'locales', '*.{rb,yml}').to_s]
    # config.i18n.default_locale = :de

    # No include root name in JSON
    ActiveRecord::Base.include_root_in_json = false

    # Save path to uploaded file
    config.upload_path = Rails.root.join("uploads")

    # jQuery plugins
    config.assets.paths << "vendor/assets/jquery_notification/images"
    config.assets.paths << "vendor/assets/jquery.fs.selecter/images"

    # Compass configurations
    config.assets.paths << Compass::Frameworks['compass'].stylesheets_directory
    Compass.configuration do |config|
      config.images_dir = Rails.root.join("app", "assets", "images")
    end
  end
end

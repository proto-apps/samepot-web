source 'https://rubygems.org'

# Bundle edge Rails
gem 'rails', '4.0.0.beta1'

# Build JSON APIs with ease. Read more: https://github.com/rails/jbuilder
gem 'jbuilder', '>= 1.0.1'

# Use MySQL as RDBMS
gem 'mysql2'

# Use redis as session and job store
gem 'redis'
gem 'redis-store', github: 'bricker/redis-store'
gem 'redis-rails', github: 'bricker/redis-store'

# Gems used only for assets and not required
# in production environments by default.
group :assets do
  gem 'sass-rails', '~> 4.0.0.beta1'
  gem 'uglifier', '>= 1.0.3'
end

# Gems used as client side libraries
group :default do
  gem 'compass'
  gem 'jquery-rails'
  gem 'jquery-ui-rails'
  gem 'jquery-fileupload-rails'
end

# Only develoment environment
group :development do
  gem 'pry-rails'
  gem 'foreman'
  gem 'capistrano'
end

# Only test environment
group :test do
  gem 'minitest-spec-rails'
  gem 'factory_girl_rails'
  gem 'database_cleaner', '>= 1.0.0.RC1'

  gem 'konacha'
  gem 'poltergeist'
end

# Rack server
gem 'unicorn'

# Async jobs
gem 'sidekiq'

# Like enum
gem 'enumerize'

# Pagination
gem 'kaminari'

# Resize uploaded image
gem 'mini_magick'

# Autolink
gem 'rinku'

ENV["RAILS_ENV"] = "test"
require File.expand_path('../../config/environment', __FILE__)
require 'rails/test_help'

#
DatabaseCleaner.strategy = :transaction
DatabaseCleaner.clean_with :truncation

class ActiveSupport::TestCase
  ActiveRecord::Migration.check_pending!

  # Setup all fixtures in test/fixtures/*.yml for all tests in alphabetical order.
  #
  # Note: You'll currently still have to declare fixtures explicitly in integration tests
  # -- they do not yet inherit this setting
  fixtures :all

  # Add more helper methods to be used by all tests here...


  # Do database_cleaner each tests
  before :each do
    DatabaseCleaner.start
  end
  after :each do
    DatabaseCleaner.clean
  end
end

class ActionController::TestCase
  include ApplicationHelper

  def start_session_test(user_id)
    @controller.reset_session
    @controller.session[:login_id] = user_id
  end
end

require 'test_helper'

class TestableApplicationController < ApplicationController
  before_action :check_authenticated_user, except: [:test_raise_error, :test_notfound]

  def test_raise_error
    raise StandardError.new "error"
  end
  def test_notfound
    raise ActionController::RoutingError.new "notfound"
  end
end

describe TestableApplicationController do
  before {
    @routes.draw do
      get 'test_raise_error' => 'testable_application'
      get 'test_notfound' => 'testable_application'
    end
  }

  context "#error actions" do
    it "should return 500 if raise error" do
      get :test_raise_error
      response.code.must_equal "500"
    end
    it "should return 404 if page not found" do
      get :test_notfound
      response.code.must_equal "404"
    end
  end

  context "#helper methods" do
    it "#return false if not logged in" do
      logged_in?.must_equal false
    end
    it "#session_start" do
      tester1 = FactoryGirl.create :tester1
      start_session_test tester1.id

      current_user.present?.must_equal true
    end
  end
end

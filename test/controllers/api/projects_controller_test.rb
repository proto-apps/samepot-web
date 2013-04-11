require 'test_helper'

describe Api::ProjectsController do
  before {
    @project1 = FactoryGirl.create :project1
    @tester1 = FactoryGirl.create :tester1
    @project1.users << @tester1

    # tester1 is administrator of project1
    @project1.administrator_id = @tester1.id
    @project1.save
  }

  after {
  }

  it "#create" do
    tester2 = FactoryGirl.create :tester2
    start_session_test tester2.id

    post :create, project: {name: "holahola"}
    res = JSON.parse(response.body)
    res["success"].must_equal true
  end

  it "#create - can't create if user has a admin project" do
    start_session_test @tester1.id

    post :create, project: {name: "holahola"}
    res = JSON.parse(response.body)
    res["success"].must_equal false
  end

  it "#destroy" do
    start_session_test @tester1.id

    post :destroy, token: @project1.access_token

    res = JSON.parse(response.body)
    res["success"].must_equal true
  end
end

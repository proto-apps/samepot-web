require 'test_helper'

describe Api::MilestonesController do
  before {
    @project1 = FactoryGirl.create :project1
    @tester1 = FactoryGirl.create :tester1
    @project1.users << @tester1

    @milestone1 = FactoryGirl.create :milestone1
    @milestone1.project = @project1
    @milestone1.save
  }

  it "#create" do
    start_session_test @tester1.id

    post :create, token: @project1.access_token, milestone: {name: "milestone1"}
    res = JSON.parse(response.body)
    res["success"].must_equal true
    res["result"]["name"].must_equal "milestone1"
  end

  it "#update" do
    start_session_test @tester1.id

    post :update, token: @project1.access_token, id: @milestone1.id, milestone: {
      name: "milestone1-changed"
    }
    res = JSON.parse(response.body)
    res["success"].must_equal true
    res["result"]["name"].must_equal "milestone1-changed"
  end

  it "#destroy" do
    start_session_test @tester1.id

    delete :destroy, token: @project1.access_token, id: @milestone1.id
    res = JSON.parse(response.body)
    res["success"].must_equal true

    milestone = Milestone.find_by(id: @milestone1.id)
    milestone.must_be_nil
  end
end

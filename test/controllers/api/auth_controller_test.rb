require 'test_helper'

describe Api::AuthController do
  before {
    @tester1 = FactoryGirl.create :tester1
    @tester2 = FactoryGirl.create :tester2

    @project1 = FactoryGirl.create :project1
    @project1.users << @tester1
    @project2 = FactoryGirl.create :project2
    @project2.users << @tester2
  }

  after {
    @controller.reset_session
  }

  it "#login" do
    post :login, auth: {email: @tester1.email, password: "tester1tester1"}
    response.code.must_equal "200"
    current_user.id.must_equal @tester1.id
  end

  it "#login - invalid email or password" do
    post :login, auth: {email: "not_user@samepot.net", password: "tester1tester1"}
    response.code.must_equal "500"
    current_user.must_be_nil

    post :login, auth: {email: @tester1.email, password: "not_user"}
    response.code.must_equal "500"
    current_user.must_be_nil
  end

  it "#signup" do
    post :signup, auth: {name: "ok_user", email: "ok_user@samepot.net", password: "ok_user"}
    response.code.must_equal "200"

    count = Verifier.count
    count.must_equal 1
  end

  it "#signup - existed user" do
    post :signup, auth: {name: @tester1.name, email: @tester1.email, password: "tester1tester1"}
    response.code.must_equal "500"

    count = Verifier.count
    count.must_equal 0
  end

  it "#signup_with_invite" do
    post :signup_with_invite, auth: {name: "ok_user", email: "ok_user@samepot.net", password: "ok_user"}
    response.code.must_equal "200"

    new_user = User.find_by(email: "ok_user@samepot.net")
    new_user.wont_be_nil
  end

  it "#signup_with_invite - existed user" do
    post :signup_with_invite, auth: {name: @tester1.name, email: @tester1.email, password: "tester1tester1"}
    response.code.must_equal "500"
  end

  it "#project_member?" do
    get :project_member?, token: @project1.access_token, user_id: @tester1.id
    response.code.must_equal "200"
    res = JSON.parse(response.body)
    res["result"]["check"].must_equal true
  end

  it "#project_member? - not member" do
    get :project_member?, token: @project1.access_token, user_id: @tester2.id
    response.code.must_equal "200"
    res = JSON.parse(response.body)
    res["result"]["check"].must_equal false
  end
end

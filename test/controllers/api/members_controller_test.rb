require 'test_helper'

describe Api::MembersController do
  before {
    @project1 = FactoryGirl.create :project1
    @tester1 = FactoryGirl.create :tester1
    @project1.users << @tester1

    # tester1 is administrator of project1
    @project1.administrator_id = @tester1.id
    @project1.save
  }


  it "#create" do
    start_session_test @tester1.id

    post :create, token: @project1.access_token, member: {email: "invite1@samepot.net"}
    res = JSON.parse(response.body)
    res["success"].must_equal true
  end

  it "#create - other project member" do
    tester2 = FactoryGirl.create :tester2

    start_session_test @tester1.id

    post :create, token: @project1.access_token, member: {email: tester2.email}
    res = JSON.parse(response.body)
    res["success"].must_equal true
  end

  it "#create - email required" do
    start_session_test @tester1.id

    post :create, token: @project1.access_token
    res = JSON.parse(response.body)
    res["success"].must_equal false
  end

  it "#create - not allow if no admin" do
    tester2 = FactoryGirl.create :tester2
    start_session_test tester2.id

    post :create, token: @project1.access_token, member: {email: "invite1@samepot.net"}
    res = JSON.parse(response.body)
    res["success"].must_equal false
  end

  it "#create - not allow if over 5 members" do
    5.times do |i|
      Invite.create! email: "invite#{i}@samepot.net", project_id: @project1.id
    end

    start_session_test @tester1.id

    post :create, token: @project1.access_token, member: {email: "invite10@samepot.net"}
    res = JSON.parse(response.body)
    res["success"].must_equal false
  end

  it "#create - not allow if was member already" do
    Invite.create! email: "invite1@samepot.net", project_id: @project1.id

    start_session_test @tester1.id

    post :create, token: @project1.access_token, member: {email: "invite1@samepot.net"}
    res = JSON.parse(response.body)
    res["success"].must_equal false
  end

  it "#create - not allow if was invited already" do
    tester2 = FactoryGirl.create :tester2
    @project1.users << tester2
    @project1.save

    start_session_test @tester1.id

    post :create, token: @project1.access_token, member: {email: tester2.email}
    res = JSON.parse(response.body)
    res["success"].must_equal false
  end

  it "#destroy" do
    tester2 = FactoryGirl.create :tester2
    @project1.users << tester2
    @project1.save

    start_session_test @tester1.id

    post :destroy, token: @project1.access_token, id: tester2.id
    res = JSON.parse(response.body)
    res["success"].must_equal true
  end

  it "#destroy - not existed member" do
    tester2 = FactoryGirl.create :tester2

    start_session_test @tester1.id

    post :destroy, token: @project1.access_token, id: tester2.id
    res = JSON.parse(response.body)
    res["success"].must_equal false
  end
end

require 'test_helper'

describe Api::UsersController do
  before {
    @tester1 = FactoryGirl.create :tester1
  }

  after {
    @controller.reset_session
  }

  it "#update" do
    start_session_test @tester1.id

    post :update, user: {
      name: "new_tester1",
      email: "new_tester1@samepot.net",
      locale: "ja",
      birthday: "2000-01-01"
    }

    res = JSON.parse(response.body)
    res["result"]["name"].must_equal "new_tester1"
    res["result"]["email"].must_equal "new_tester1@samepot.net"
    res["result"]["locale"].must_equal "ja"
    res["result"]["birthday"].must_equal "2000-01-01"

    # check to whether no change password
    current_user.valid_password?("tester1tester1").must_equal true
  end

  it "#update - with new password" do
    start_session_test @tester1.id
    post :update, user: {newpassword: "newer1newer1"}

    current_user.valid_password?("newer1newer1").must_equal true
  end

  it "#destroy" do
    start_session_test @tester1.id

    post :destroy

    res = JSON.parse(response.body)
    res["success"].must_equal true
  end
end

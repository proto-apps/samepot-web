require 'test_helper'

describe Api::TaskCommentsController do
  before {
    @project1 = FactoryGirl.create :project1
    @tester1 = FactoryGirl.create :tester1
    @project1.users << @tester1
    @project1.save

    @task1 = FactoryGirl.create :task1
  }

  it "#index" do
    25.times do |idx|
      TaskComment.create(
        task_id: @task1.id,
        creator_id: @tester1.id,
        content: "comment-#{idx}"
      )
    end

    start_session_test @tester1.id

    get :index, token: @project1.access_token, task_id: @task1.id
    res = JSON.parse(response.body)
    res["result"].size.must_equal 20
  end

  it "#index - page2" do
    25.times do |idx|
      TaskComment.create(
        task_id: @task1.id,
        creator_id: @tester1.id,
        content: "comment-#{idx}"
      )
    end

    start_session_test @tester1.id

    get :index, token: @project1.access_token, task_id: @task1.id, page: 2
    res = JSON.parse(response.body)
    res["result"].size.must_equal 5
  end

  it "#create" do
    start_session_test @tester1.id

    post :create, token: @project1.access_token, task_id: @task1.id, task_comment: {
      content: "comment-1"
    }

    res = JSON.parse(response.body)
    res["result"]["task_id"].must_equal @task1.id
    res["result"]["content"].must_equal "comment-1"
  end

  it "#destroy" do
    comment1 = TaskComment.create(
      task_id: @task1.id,
      creator_id: @tester1.id,
      content: "comment-1"
    )

    start_session_test @tester1.id

    delete :destroy, token: @project1.access_token, task_id: @task1.id, id: comment1.id
    res = JSON.parse(response.body)
    res["success"].must_equal true
  end

  it "#destroy - fail if not a creator" do
    comment1 = TaskComment.create(
      task_id: @task1.id,
      creator_id: @tester1.id,
      content: "comment-1"
    )

    tester2 = FactoryGirl.create :tester2
    start_session_test tester2.id

    delete :destroy, token: @project1.access_token, task_id: @task1.id, id: comment1.id
    res = JSON.parse(response.body)
    res["success"].must_equal false
  end
end

require 'test_helper'

describe Api::TasksController do
  before {
    @project1 = FactoryGirl.create :project1
    @tester1 = FactoryGirl.create :tester1
    @project1.users << @tester1
    @project1.save

    @milestone1 = FactoryGirl.create :milestone1
    @milestone1.project = @project1
    @milestone1.save
  }

  it "#index" do
    25.times do |idx|
      Task.create(
        name: "task-#{idx}",
        project_id: @project1.id,
        milestone_id: @milestone1.id
      )
    end

    start_session_test @tester1.id

    get :index, token: @project1.access_token
    res = JSON.parse(response.body)
    res["result"].size.must_equal 20
  end

  it "#index - page2" do
    25.times do |idx|
      Task.create(
        name: "task-#{idx}",
        project_id: @project1.id,
        milestone_id: @milestone1.id
      )
    end

    start_session_test @tester1.id

    get :index, token: @project1.access_token, page: 2
    res = JSON.parse(response.body)
    res["result"].size.must_equal 5
  end

  it "#create" do
    start_session_test @tester1.id

    post :create, token: @project1.access_token, task: {
      name: "task-1",
      project_id: @project1.id
    }

    res = JSON.parse(response.body)
    res["result"]["name"].must_equal "task-1"
  end

  it "#create - fail if assignee is not a member" do
    tester2 = FactoryGirl.create :tester2

    start_session_test @tester1.id

    post :create, token: @project1.access_token, task: {
      name: "task-1",
      project_id: @project1.id,
      assignee_id: tester2.id
    }

    res = JSON.parse(response.body)
    res["success"].must_equal false
  end

  it "#update" do
    task1 = Task.create(
      name: "task-1",
      project_id: @project1.id
    )

    start_session_test @tester1.id

    put :update, token: @project1.access_token, id: task1.id, task: {
      milestone_id: @milestone1.id
    }

    res = JSON.parse(response.body)
    res["result"]["milestone"]["id"].must_equal @milestone1.id
  end

  it "#update_status" do
    task1 = Task.create(
      name: "task-1",
      project_id: @project1.id
    )

    start_session_test @tester1.id

    put :update_status, token: @project1.access_token, id: task1.id, task: {
      status: "doing"
    }

    res = JSON.parse(response.body)
    res["result"]["status"].must_equal "doing"
  end

  it "#destroy" do
    task1 = Task.create(
      name: "task-1",
      project_id: @project1.id
    )

    start_session_test @tester1.id

    delete :destroy, token: @project1.access_token, id: task1.id
    res = JSON.parse(response.body)
    res["success"].must_equal true
  end
end

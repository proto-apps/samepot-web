require 'test_helper'

describe Task do
  before {
    @doing_task = FactoryGirl.create(:doing_task)
    @review_task = FactoryGirl.create(:review_task)
  }

  context "attributes" do
    it "priority default is none" do
      task1 = FactoryGirl.create(:task1)
      task1.priority.must_equal "none"
    end
    it "status default is none" do
      task1 = FactoryGirl.create(:task1)
      task1.status.must_equal "none"
    end
  end

  context "instance methods" do
    it "doing task is 1 item in project1" do
      tasks = Task.doing(@doing_task.project.id)
      tasks.size.must_equal 1
    end
    it "doing task is 0 item in project2" do
      task2 = FactoryGirl.create(:task2)
      tasks = Task.doing(task2.project.id)
      tasks.size.must_equal 0
    end
    it "review task is 1 item in project1" do
      tasks = Task.review(@review_task.project.id)
      tasks.size.must_equal 1
    end
    it "review task is 0 item in project2" do
      task2 = FactoryGirl.create(:task2)
      tasks = Task.review(task2.project.id)
      tasks.size.must_equal 0
    end
    it "summary" do
      summary = Task.summary(@doing_task.project.id, @doing_task.milestone.id)
      summary["total"].must_equal 1
      summary["doing"].must_equal 1
    end
  end
end

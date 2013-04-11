require 'test_helper'

describe Milestone do
  before {
    @milestone1 = FactoryGirl.create(:milestone1)
  }

  context "instance methods" do
    it "get current milestone" do
      project = @milestone1.project
      current_milestone = Milestone.now(project.id)
      current_milestone.wont_be_nil
    end
  end
end

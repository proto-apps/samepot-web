require 'test_helper'

describe Project do
  before {
    @project1 = FactoryGirl.create(:project1)
  }

  context "attributes" do
    it "#access_token has auto set and 8 chars" do
      @project1.access_token.size.must_equal 8
    end
  end

  context "validator" do
    it "#name is between 1 and 100 chars" do
      prc = Proc.new do
        @project1.name = ""
        @project1.save!
      end
      prc.must_raise ActiveRecord::RecordInvalid

      prc = Proc.new do
        @project1.name = "a" * 101
        @project1.save!
      end
      prc.must_raise ActiveRecord::RecordInvalid
    end
  end
end

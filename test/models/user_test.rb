require 'test_helper'

describe User do
  before {
    @tester1 = FactoryGirl.create(:tester1)
  }

  context "attributes" do
    it "#name returns name" do
      @tester1.name.must_equal "tester1"
    end

    it "#password using MD5 digest" do
      @tester1.valid_password?("tester1tester1").must_equal true
    end

    it "#locale default is en" do
      default_locale = User.locale.default_value
      default_locale.must_equal "en"
      @tester1.locale.must_equal default_locale
    end

    it "#removed default is false" do
      @tester1.removed.must_equal false
    end
  end

  context "validation" do
    it "#name is between 3 and 32 chars" do
      prc = Proc.new do
        @tester1.name = "a"
        @tester1.save!
      end
      prc.must_raise ActiveRecord::RecordInvalid

      prc = Proc.new do
        @tester1.name = "a" * 33
        @tester1.save!
      end
      prc.must_raise ActiveRecord::RecordInvalid
    end

    it "#email is unique and valid format" do
      prc = Proc.new do
        user = User.create!(
          name: "test",
          email: @tester1.email,
          password: "testtest"
        )
      end
      prc.must_raise ActiveRecord::RecordInvalid

      prc = Proc.new do
        user = User.create!(
          name: "test",
          email: "illegal format",
          password: "testtest"
        )
      end
      prc.must_raise ActiveRecord::RecordInvalid

      prc = Proc.new do
        user = User.create!(
          name: "test",
          email: "aaa@aaa",
          password: "testtest"
        )
      end
      prc.must_raise ActiveRecord::RecordInvalid
    end

    it "#password is between 6 and 20 chars" do
      prc = Proc.new do
        @tester1.new_password = "a"
        @tester1.save!
      end
      prc.must_raise ActiveRecord::RecordInvalid

      prc = Proc.new do
        @tester1.new_password = "a" * 21
        @tester1.save!
      end
      prc.must_raise ActiveRecord::RecordInvalid
    end
  end

  context "json" do
    it "#json has not password" do
      json = @tester1.as_json
      json["password_digest"].must_be_nil
      json["password_salt"].must_be_nil
    end
  end
end

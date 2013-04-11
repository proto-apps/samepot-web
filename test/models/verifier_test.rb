require 'test_helper'

describe Verifier do
  before {
    @verifier = FactoryGirl.create(:verifier)
  }

  context "attributes" do
    it "#expired is 7days after" do
      expired_time = Time.zone.now + 7.days
      @verifier.expired.to_s.must_equal expired_time.to_s
    end
  end

  it "#expired enabled within 7days" do
    @verifier.expired?.must_equal false

    time = Time.zone.now + 7.days + 1
    @verifier.expired?(time).must_equal true
  end
end

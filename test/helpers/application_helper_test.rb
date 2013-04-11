require 'test_helper'

describe ApplicationHelper do
  context "HTML tag helpers" do
    it "default locale is en" do
      create_script_tag_message.must_equal "<script src=\"/javascripts/locales/en.js\"></script>"
    end
    it "return user's locale" do
      I18n.locale = "ja"
      create_script_tag_message.must_equal "<script src=\"/javascripts/locales/ja.js\"></script>"
    end
    it "default user image is 14x18" do
      user_image_tag.must_equal "<img alt=\"User 14x18\" src=\"/images/icon/user_14x18.png\" />"
    end
    it "enable to change user image size" do
      user_image_tag("medium").must_equal "<img alt=\"User 18x24\" src=\"/images/icon/user_18x24.png\" />"
    end
    it "set css class in img tag" do
      user_image_tag("small", {class: "foo"}).must_equal "<img alt=\"User 14x18\" class=\"foo\" src=\"/images/icon/user_14x18.png\" />"
    end
  end
end

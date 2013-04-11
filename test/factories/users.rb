FactoryGirl.define do
  sequence(:sequence_string) { |n| "tester#{n}@samepot.net" }

  factory :tester1, class: User do 
    name "tester1"
    email { FactoryGirl.generate(:sequence_string) }
    password "tester1tester1"
  end
  factory :tester2, class: User do 
    name "tester2"
    email { FactoryGirl.generate(:sequence_string) }
    password "tester2tester2"
  end
end

FactoryGirl.define do
  factory :project1, class: Project do 
    name "Samepot-test1"
    association :administrator, factory: :tester1
  end
  factory :project2, class: Project do 
    name "Samepot-test2"
    association :administrator, factory: :tester2
  end
end

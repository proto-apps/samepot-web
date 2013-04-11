FactoryGirl.define do
  factory :milestone1, class: Milestone do
    name "Dev prototype"
    association :project, factory: :project1
    start_day {Time.now.beginning_of_month}
    end_day {Time.now.end_of_month}
  end
  factory :milestone2, class: Milestone do
    name "Dev beta"
    association :project, factory: :project1
    start_day {(Time.now + 1.month).beginning_of_month}
    end_day {(Time.now + 1.month).end_of_month}
  end
end

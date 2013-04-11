FactoryGirl.define do
  factory :task1, class: Task do
    name "Sample task1"
    association :project, factory: :project1
  end
  factory :task2, class: Task do
    name "Sample task2"
    association :project, factory: :project2
  end
  factory :doing_task, class: Task do
    name "Doing task"
    association :project, factory: :project1
    association :milestone, factory: :milestone1
    status "doing"
    association :assignee, factory: :tester1
    association :reviewer, factory: :tester2
  end
  factory :review_task, class: Task do
    name "Review task"
    association :project, factory: :project1
    association :milestone, factory: :milestone1
    status "review"
    association :assignee, factory: :tester1
    association :reviewer, factory: :tester2
  end
end

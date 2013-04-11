class Project < ActiveRecord::Base
  include Concerns::Removable, Concerns::Tokenable

  has_many   :project_user_relations, dependent: :destroy
  has_many   :users, through: :project_user_relations
  has_many   :invites
  has_many   :tasks,      dependent: :destroy
  has_many   :milestones, dependent: :destroy
  has_one    :canvas,     dependent: :destroy
  belongs_to :administrator, class_name: 'User'

  validates :name, presence: true, length: {within: 1..100}


  # ユニークなランダム8文字のトークンを
  # create時にセットする
  before_create {
    begin
      self[:access_token] = generate_token(8)
    end while Project.exists?(:access_token => self[:access_token])
  }
end

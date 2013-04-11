class Milestone < ActiveRecord::Base
  belongs_to :project

  validates :project_id, presence: true
  validates :name,       presence: true

  default_scope -> {order(start_day: :asc)}


  def self.now(project_id)
    binds = {project_id: project_id, today: Time.now}
    self.where(
      "project_id = :project_id AND :today >= start_day AND end_day >= :today", binds
    ).first
  end

  def as_json(options={})
    super except: ["project_id", "created_at", "updated_at"]
  end
end

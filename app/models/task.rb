class Task < ActiveRecord::Base
  extend Enumerize

  attr_accessor :linked_description

  belongs_to :project
  belongs_to :milestone
  belongs_to :assignee, class_name: 'User'
  belongs_to :reviewer, class_name: 'User'
  belongs_to :creator,  class_name: 'User'
  belongs_to :updator,  class_name: 'User'
  has_many   :comments, class_name: 'TaskComment', dependent: :destroy

  validates :project_id, presence: true
  validates :name,       presence: true

  enumerize :priority, in: [:none, :do, :will, :notdo], default: :none
  enumerize :status,   in: [:none, :doing, :review, :done, :pending], default: :none


  # 初期ステータスにpriorityとstatusに"none"を
  # create時にセットする
  before_create {
    self[:priority] = Task.priority.values[0] unless self[:priority]
    self[:status]   = Task.status.values[0]   unless self[:status]
  }


  # 作業中のタスクを取得
  def self.doing(project_id)
    self.includes(:assignee)
        .where(project_id: project_id, status: :doing)
        .order(assignee_id: :asc)
  end

  # レビュー中のタスクを取得
  def self.review(project_id)
    self.includes(:reviewer)
        .where(project_id: project_id, status: :review)
        .order(reviewer_id: :asc)
  end

  # マイルストーンのタスク状況（件数）を取得
  def self.summary(project_id, milestone_id)
    res = self.group(:status)
              .where(project_id: project_id, milestone_id: milestone_id)
              .count()

    res["total"] = 0
    self.status.values.each do |status|
      res[status] = 0 unless res.key? status
      res["total"] += res[status]
    end

    return res
  end

  # 自動リンク
  def linked_description
    content_safe = ERB::Util.html_escape self[:description]
    Rinku.auto_link(content_safe, :urls).html_safe
  end

  def as_json(options = {})
    super only: ["id", "project_id", "name", "description", "priority", "status", "created_at", "updated_at"],
          methods: [:linked_description],
          include: {
            milestone: {only: ["id", "name"]},
            assignee:  {only: ["id", "name", "image_token"]},
            reviewer:  {only: ["id", "name", "image_token"]},
            creator:   {only: ["id", "name", "image_token"]},
            updator:   {only: ["id", "name", "image_token"]},
            comments:  {only: ["id"]}
          }
  end
end

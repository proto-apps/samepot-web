class TaskComment < ActiveRecord::Base
  attr_accessor :linked_content

  belongs_to :task
  belongs_to :creator, class_name: 'User'

  validates :task_id,    presence: true
  validates :creator_id, presence: true
  validates :content,    presence: true


  # 自動リンク
  def linked_content
    content_safe = ERB::Util.html_escape self[:content]
    Rinku.auto_link(content_safe, :urls).html_safe
  end

  def as_json(options = {})
    super only: ["id", "task_id", "content", "created_at"],
          methods: [:linked_content],
          include: {
            creator: {only: ["id", "name", "image_token"]}
          }
  end
end

class Activity < ActiveRecord::Base
  attr_accessor :linked_content

  belongs_to :project
  belongs_to :user

  validates :project_id, presence: true
  validates :resource,   presence: true


  # 自動リンク
  def linked_content
    if self[:resource] == "talk"
      content_safe = ERB::Util.html_escape self[:content]
      Rinku.auto_link(content_safe, :urls).html_safe
    else
      self[:content]
    end
  end

  def as_json(options={})
    super methods: [:linked_content],
          include: {
            project: {only: ["id", "access_token"]},
            user: {only: ["id", "name", "image_token"]}
          }
  end
end

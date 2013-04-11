module Concerns::Projected
  extend ActiveSupport::Concern

  included do
    before_action :check_authenticated_project
  end


  private

  def valid_project!(obj)
    raise AppError.new I18n.t "errors.access" unless obj.project_id.presence == current_project.id
  end
end

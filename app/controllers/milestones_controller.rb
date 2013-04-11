class MilestonesController < ApplicationController
  include Concerns::Projected

  # GET /:token/milestones
  def index
    @milestones = Milestone.where(project_id: current_project.id)
  end
end

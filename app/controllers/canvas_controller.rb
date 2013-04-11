class CanvasController < ApplicationController
  include Concerns::Projected

  # GET /:token/canvas
  def show
    @canvas = Canvas.where(project_id: current_project.id).first_or_create do |canvas|
      canvas.project_id = current_project.id
    end
  end
end

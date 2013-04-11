class Api::CanvasController < Api::ApiController
  include Concerns::Projected

  # PUT /api/:token/canvas
  def update
    canvas = Canvas.find_by!(project_id: current_project.id)
    valid_project!(canvas)
    canvas.update!(canvas_params)

    # 
    ActivitiesWorker.perform_async(
      project_id: current_project.id,
      resource: "canvas",
      action: "update",
      user_id: current_user.id,
      name: nil,
      content: nil,
      url: "#{current_project.access_token}/canvas"
    )

    output canvas
  end


  private

  def canvas_params
    params.permit(
      :problem, :solution, :key_metrics,
      :unique_value, :unfair_advantage, :channels,
      :customer, :cost_structure, :revenue_streams)
  end
end

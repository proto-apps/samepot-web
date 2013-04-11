class Api::MilestonesController < Api::ApiController
  include Concerns::Projected

  # POST /api/:token/milestones
  def create
    milestone = Milestone.create!(
      milestone_params.merge(project_id: current_project.id))
    send_activity(milestone, "create")
    output milestone
  end

  # PUT /api/:token/milestones/:id
  def update
    milestone = Milestone.find(params[:id])
    valid_project!(milestone)
    milestone.update!(milestone_params)
    send_activity(milestone, "update")
    output milestone
  end

  # DELETE /api/:token/milestones/:id
  def destroy
    milestone = Milestone.find(params[:id])
    valid_project!(milestone)
    milestone.destroy!
    output
  end


  private

  def milestone_params
    params.require(:milestone).permit(
      :name, :start_day, :end_day)
  end

  def send_activity(milestone, action)
    # 
    ActivitiesWorker.perform_async(
      project_id: current_project.id,
      resource: "milestone",
      action: action,
      user_id: current_user.id,
      name: milestone.name,
      content: nil,
      url: "#{current_project.access_token}/milestones"
    )
  end
end

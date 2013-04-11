class Api::TalksController < Api::ApiController
  include Concerns::Projected

  # POST /api/:token/talks
  def create
    obj = talk_params

    ActivitiesWorker.perform_async(
      project_id: current_project.id,
      resource: "talk",
      action: "talk",
      user_id: current_user.id,
      name: nil,
      content: obj[:message],
      url: nil
    )

    output
  end


  private

  def talk_params
    params.require(:talk).permit(:message)
  end
end

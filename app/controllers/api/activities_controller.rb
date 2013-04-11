class Api::ActivitiesController < Api::ApiController
  include Concerns::Projected, Concerns::Activitied

  # GET /api/:token/activities
  def index
    activities = find_activities(activities_params)
    output activities
  end
end

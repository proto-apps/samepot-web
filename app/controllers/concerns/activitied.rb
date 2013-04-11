module Concerns::Activitied
  extend ActiveSupport::Concern

  def find_activities(filters={})
    filters = filters.merge(project_id: current_project.id)
    activities = Activity.includes(:user).where(filters)
    return activities
  end


  private

  #
  # term:
  #   today, week, 2weeks, month, 3months, 6months
  #
  def activities_params
    obj = params.permit(:resource, :term)

    res = {}
    res[:resource] = obj[:resource] if obj[:resource]

    # TODO 汚い...
    to = Time.now.at_end_of_day
    case obj[:term]
    when "6months"
      from = to - 6.momths
    when "3months"
      from = to - 3.momths
    when "month"
      from = to - 1.momth
    when "2weeks"
      from = to - 2.weeks
    when "week"
      from = to - 1.week
    when "yesterday"
      from = to - 2.days
    else
      from = to - 1.day
    end
    from += 1
    res[:created_at] = from...to

    return res
  end
end

class TasksController < ApplicationController
  include Concerns::Projected, Concerns::Paginated, Concerns::Tasked

  # GET /:token/tasks
  def index
    @tasks = find_tasks(pager_param, task_filter_params)
    @milestones = Milestone.where(project_id: current_project.id)
    @priorities = Task.priority.options
    @statuses = Task.status.options
    @members = current_project.users
  end

  # GET /:token/tasks/:id
  def show
    @task, @prev, @next = find_task_with_arround params[:id]
    @milestones = Milestone.where(project_id: current_project.id)
    @priorities = Task.priority.options
    @statuses = Task.status.options
    @members = current_project.users
  end
end

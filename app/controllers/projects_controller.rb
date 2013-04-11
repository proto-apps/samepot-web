class ProjectsController < ApplicationController
  include Concerns::Activitied

  before_action :check_authenticated_project, except: [:new]


  # GET /projects/new
  def new
  end

  # GET /:token
  def show
    @activities = find_activities(activities_params)
    @milestone = Milestone.now(current_project.id)
    @summary = Task.summary(current_project.id, @milestone.id) if @milestone.present?
    @doings = Task.doing(current_project.id)
    @reviews = Task.review(current_project.id)
  end

  # GET /:token/edit
  def edit
    @can_project_delete = current_project.administrator_id == current_user.id
  end
end

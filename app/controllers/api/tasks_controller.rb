class Api::TasksController < Api::ApiController
  include Concerns::Projected, Concerns::Tasked, Concerns::Paginated

  # GET /api/:token/tasks
  def index
    tasks = find_tasks pager_param
    output tasks
  end

  # GET /api/:token/tasks/:id
  def show
    task = find_task params[:id]
    output task
  end

  # POST /api/:token/tasks
  def create
    task = create_task
    send_activity(task, "create", nil)
    output task
  end

  # PUT /api/:token/tasks/:id
  def update
    task = update_task params[:id]
    send_activity(task, "update", nil)
    output task
  end

  # PUT /api/:token/tasks/:id/status
  def update_status
    task = update_task_status params[:id]
    send_activity(task, "status", task.status)
    output task
  end

  # DELETE /api/:token/tasks/:id
  def destroy
    destroy_task params[:id]
    output
  end


  private

  def send_activity(task, action, content)
    # 
    ActivitiesWorker.perform_async(
      project_id: current_project.id,
      resource: "task",
      action: action,
      user_id: current_user.id,
      name: task.name,
      content: content,
      url: "#{current_project.access_token}/tasks/#{task.id}"
    )
  end
end

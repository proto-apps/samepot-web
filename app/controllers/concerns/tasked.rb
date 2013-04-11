module Concerns::Tasked
  extend ActiveSupport::Concern

  def find_tasks(page, filters={})
    filters = filters.merge(project_id: current_project.id)

    tasks = Task.includes(:milestone, :assignee, :reviewer, :creator, :updator, :comments)
                .where(filters)
                .order(id: :desc).page(page)
    return tasks
  end

  def find_task(id)
    task = Task.find(id)
    valid_project!(task)
    task
  end

  def find_task_with_arround(id)
    task = Task.find(id)
    valid_project!(task)

    prevTask = Task.where(
      ["project_id = ? and created_at < ?", current_project.id, task.created_at]).last
    nextTask = Task.where(
      ["project_id = ? and created_at > ?", current_project.id, task.created_at]).first
    
    return [task, prevTask, nextTask]
  end

  def create_task
    obj = task_params
    raise AppError.new I18n.t "errors.task.member" unless check_within_user(obj)

    Task.create! obj.merge(
      project_id: current_project.id,
      creator_id: current_user.id,
      updator_id: current_user.id)
  end

  def update_task(id)
    task = Task.find(id)
    valid_project!(task)

    obj = task_params
    raise AppError.new I18n.t "errors.task.member" unless check_within_user(obj)

    task.update! obj.merge(updator_id: current_user.id)
    task
  end

  def destroy_task(id)
    task = Task.find(id)
    valid_project!(task)
    task.destroy!
  end

  def update_task_status(id)
    task = Task.find(id)
    valid_project!(task)

    obj = task_status_params.merge(updator_id: current_user.id)
    task.update!(obj)
    task
  end


  private

  def check_within_user(obj)
    members = current_project.users.to_a

    ok_assignee = obj[:assignee_id].present? ? members.select do |m|
      m.id.to_s == obj[:assignee_id]
    end : [1]
    ok_reviewer = obj[:reviewer_id].present? ? members.select do |m|
      m.id.to_s == obj[:reviewer_id]
    end : [1]

    return (ok_assignee.size > 0 and ok_reviewer.size > 0)
  end

  def task_filter_params
    params.permit(
      :milestone_id, :priority, :status,
      :assignee_id, :reviewer_id)
  end

  def task_params
    params.require(:task).permit(
      :name, :description,
      :milestone_id, :assignee_id, :reviewer_id,
      :priority
    )
  end

  def task_status_params
    params.require(:task).permit(:status)
  end
end

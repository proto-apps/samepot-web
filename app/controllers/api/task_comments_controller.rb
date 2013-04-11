class Api::TaskCommentsController < Api::ApiController
  include Concerns::Projected, Concerns::Paginated

  # GET /api/:token/tasks/:task_id/comments
  def index
    comments = TaskComment.includes(:creator)
                          .where(task_id: params[:task_id])
                          .order(id: :desc)
                          .page(pager_param)
                          .reverse
    output comments
  end

  # POST /api/:token/tasks/:task_id/comments
  def create
    task = Task.find(params[:task_id])

    obj = comment_params.merge(
      task_id: params[:task_id],
      creator_id: current_user.id
    )
    new_comment = TaskComment.create!(obj)

    # 
    ActivitiesWorker.perform_async(
      project_id: current_project.id,
      resource: "task",
      action: "comment",
      user_id: current_user.id,
      name: task.name,
      content: new_comment.content,
      url: "#{current_project.access_token}/tasks/#{task.id}"
    )

    output new_comment
  end

  # DELETE /api/:token/tasks/:task_id/comments/:id
  def destroy
    comment = TaskComment.find(params[:id])

    unless comment.task_id.presence and destroyer?(comment)
      raise AppError.new I18n.t "errors.access"
    end

    comment.destroy!
    output
  end


  private

  def comment_params
    params.require(:task_comment).permit(:content)
  end

  def destroyer?(comment)
    comment.task_id == params[:task_id].to_i and (current_project.administrator_id == current_user.id or comment.creator_id == current_user.id)
  end
end

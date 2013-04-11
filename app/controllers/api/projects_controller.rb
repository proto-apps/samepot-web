class Api::ProjectsController < Api::ApiController
  include Concerns::Blobed

  before_action :check_authenticated_project, except: [:create]


  # POST /api/projects
  def create
    raise AppError.new I18n.t "errors.project.over" unless create_project?

    new_project = Project.create!(
      project_params.merge(administrator_id: current_user.id))

    ProjectUserRelation.create!(
      project_id: new_project.id,
      user_id:    current_user.id
    )

    output new_project
  end

  # PUT /api/:token
  def update
    current_project.update! project_params
    output current_project
  end

  # POST /api/:token/image
  def update_image
    obj = project_image_params
    io = obj[:image]

    raise AppError.new I18n.t "errors.project.file" unless image_file? io.content_type

    blob = save_file(io)

    ImageResizeWorker.perform_async(
      blob.id, model_name: Project.name, model_id: current_project.id)
    output
  end

  # DELETE /api/:token
  def destroy
    current_project.remove!
    output
  end


  private

  def project_params
    params.require(:project).permit(:name)
  end

  def project_image_params
    params.permit(:image)
  end
end

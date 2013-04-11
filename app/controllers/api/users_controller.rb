class Api::UsersController < Api::ApiController
  include Concerns::Blobed

  # PUT /my
  def update
    if params[:user][:newpassword].present?
      current_user.new_password = params[:user][:newpassword]
    end
    current_user.update! user_update_params
    output current_user
  end

  # POST /my/image
  def update_image
    obj = user_update_image_params
    io = obj[:image]

    raise AppError.new I18n.t "errors.post" unless io.present?
    raise AppError.new I18n.t "errors.user.file" unless image_file? io.content_type

    blob = save_file(io)

    ImageResizeWorker.perform_async(
      blob.id, model_name: User.name, model_id: current_user.id)
    output
  end

  # DELETE /my
  def destroy
    current_user.remove!
    reset_session
    output
  end


  private

  def user_update_params
    params.require(:user).permit(
      :name, :email,
      :birthday, :locale, :timezone)
  end

  def user_update_image_params
    params.permit(:image)
  end
end

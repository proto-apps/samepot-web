class UsersController < ApplicationController

  # GET /my
  def show
    @locale = User.locale.options
    @can_account_delete = Project.where(administrator_id: current_user.id).size == 0
  end
end

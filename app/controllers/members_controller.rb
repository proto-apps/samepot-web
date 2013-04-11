class MembersController < ApplicationController
  include Concerns::Projected

  # GET /:token/members
  def index
    # ベータ版は1プロジェクト10人まで
    @invited = Invite.where(project_id: current_project.id)
    @enable_invite = 10 > current_project.users.size + @invited.size
  end
end

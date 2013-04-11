module Concerns::Paginated
  extend ActiveSupport::Concern

  private

  #
  # GETパラメータから"page"を取得
  #
  def pager_param
    page = 0

    obj = params.permit(:page)
    if obj[:page].present? and (obj[:page].is_a?(Integer) or obj[:page] =~ /\d+/)
      page = obj[:page].to_i
    end

    return page
  end
end

class ActionView::Base
  # スラッシュがエスケープしないのでエスケープする
  def json_escape(obj)
    json = ActiveSupport::JSON.encode(obj).html_safe
    result = json.to_s.gsub('/', '\/')
    json.html_safe? ? result.html_safe : result
  end

  # <%= json obj %> で使えるように
  alias json json_escape
end

# 自動でJSON内のHTMLエスケープをする
Samepot::Application.config.active_support.escape_html_entities_in_json = true

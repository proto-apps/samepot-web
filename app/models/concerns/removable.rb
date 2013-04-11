module Concerns::Removable
  extend ActiveSupport::Concern

  included do
    default_scope {where(removed: false)}
    scope :removed, -> {where(removed: true)}
  end

  # 論理削除用
  def remove!
    self.update_column(:removed, true)
  end

  # 論理削除からの復活用
  def unremoved!
    self.update_column(:removed, false)
  end
end

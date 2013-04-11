class CreateProjectUserRelations < ActiveRecord::Migration
  def change
    create_table :project_user_relations do |t|
      t.integer :project_id, null: false
      t.integer :user_id,    null: false

      t.index [:project_id, :user_id], unique: true
    end
  end
end

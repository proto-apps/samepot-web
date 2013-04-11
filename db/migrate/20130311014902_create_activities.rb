class CreateActivities < ActiveRecord::Migration
  def change
    create_table :activities do |t|
      t.integer :project_id, null: false
      t.string  :resource,   null: false, limit: 20
      t.string  :action,     limit: 20
      t.integer :user_id
      t.string  :name
      t.string  :content
      t.string  :url
      t.timestamps

      t.index [:project_id, :created_at]
      t.index [:project_id, :resource, :created_at]
    end
  end
end

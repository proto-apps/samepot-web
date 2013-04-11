class CreateTasks < ActiveRecord::Migration
  def change
    create_table :tasks do |t|
      t.integer :project_id,  null: false
      t.string  :name,        null: false
      t.text    :description
      t.integer :milestone_id
      t.string  :priority,    limit: 20
      t.string  :status,      limit: 20
      t.integer :assignee_id
      t.integer :reviewer_id
      t.integer :creator_id
      t.integer :updator_id
      t.timestamps

      t.index :project_id
      t.index :milestone_id
      t.index :priority
      t.index :status
      t.index :assignee_id
      t.index :reviewer_id
      t.index [:project_id, :status, :assignee_id]
    end
  end
end

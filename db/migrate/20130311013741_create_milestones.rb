class CreateMilestones < ActiveRecord::Migration
  def change
    create_table :milestones do |t|
      t.integer :project_id, null: false
      t.string  :name,       null: false
      t.date    :start_day
      t.date    :end_day
      t.timestamps

      t.index :project_id
      t.index [:project_id, :start_day]
      t.index [:project_id, :start_day, :end_day]
    end
  end
end

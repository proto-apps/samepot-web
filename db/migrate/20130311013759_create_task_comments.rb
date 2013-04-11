class CreateTaskComments < ActiveRecord::Migration
  def change
    create_table :task_comments do |t|
      t.integer :task_id, null: false
      t.string  :content
      t.integer :creator_id
      t.timestamps

      t.index :task_id
    end
  end
end

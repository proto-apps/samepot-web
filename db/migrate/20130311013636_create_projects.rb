class CreateProjects < ActiveRecord::Migration
  def change
    create_table :projects do |t|
      t.string  :name,         null: false, limit: 100
      t.string  :access_token, null: false, limit: 8
      t.string  :image_token,  limit: 8
      t.integer :administrator_id, null: false
      t.boolean :stopped, default: false
      t.boolean :removed, default: false

      t.index :access_token, unique: true
      t.index :administrator_id
      t.index :stopped
      t.index :removed
    end
  end
end

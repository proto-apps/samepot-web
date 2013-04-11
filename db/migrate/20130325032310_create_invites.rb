class CreateInvites < ActiveRecord::Migration
  def change
    create_table :invites do |t|
      t.string   :access_token, null: false, limit: 8
      t.string   :email,        null: false, limit: 128
      t.integer  :project_id
      t.datetime :expired,      null: false

      t.index :access_token, unique: true
      t.index :email
      t.index :project_id
    end
  end
end

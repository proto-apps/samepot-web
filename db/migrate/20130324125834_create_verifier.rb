class CreateVerifier < ActiveRecord::Migration
  def change
    create_table :verifiers do |t|
      t.string   :access_token, null: false, limit: 8
      t.string   :name,         null: false, limit: 32
      t.string   :email,        null: false, limit: 128
      t.string   :password,     null: false, limit: 32
      t.datetime :expired,      null: false

      t.index :access_token, unique: true
      t.index :email
    end
  end
end

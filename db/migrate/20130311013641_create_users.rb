class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.string  :name,            null: false, limit: 32
      t.string  :email,           null: false, limit: 128
      t.string  :password_digest, null: false, limit: 32
      t.string  :password_salt,   null: false, limit: 20
      t.string  :image_token,     limit: 8
      t.date    :birthday
      t.string  :locale,          default: 'ja'
      t.string  :timezone,        default: 'UTC'
      t.boolean :removed,         default: false

      t.index :name
      t.index :email, unique: true
      t.index :removed
    end
  end
end

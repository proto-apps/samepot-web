class CreateBlobs < ActiveRecord::Migration
  def change
    create_table :blobs do |t|
      t.string  :token,     null: false, limit: 8
      t.string  :name
      t.string  :mime_type, limit: 50
      t.integer :size

      t.index :token
    end
  end
end

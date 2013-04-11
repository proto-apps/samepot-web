class CreateCanvas < ActiveRecord::Migration
  def change
    create_table :canvas do |t|
      t.integer :project_id, null: false
      t.string  :problem
      t.string  :solution
      t.string  :key_metrics
      t.string  :unique_value
      t.string  :unfair_advantage
      t.string  :channels
      t.string  :customer
      t.string  :cost_structure
      t.string  :revenue_streams
      t.timestamps

      t.index :project_id, unique: true
    end
  end
end

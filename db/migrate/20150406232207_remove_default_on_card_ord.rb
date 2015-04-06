class RemoveDefaultOnCardOrd < ActiveRecord::Migration
  def change
    change_column :cards, :ord, :float, :default => nil
  end
end

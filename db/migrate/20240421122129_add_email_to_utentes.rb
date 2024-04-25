class AddEmailToUtentes < ActiveRecord::Migration[7.1]
  def change
    add_column :utentes, :email, :string
  end
end

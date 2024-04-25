class AddPasswordResetColumnsToUtentes < ActiveRecord::Migration[7.1]
  def change
    add_column :utentes, :reset_password_token, :string
    add_column :utentes, :reset_password_sent_at, :datetime
  end
end

class AddPasswordDigestToUtentes < ActiveRecord::Migration[7.1]
  def change
    add_column :utentes, :password_digest, :string
  end
end

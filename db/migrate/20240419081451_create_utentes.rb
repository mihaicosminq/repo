# frozen_string_literal: true
class CreateUtentes < ActiveRecord::Migration[7.1]
  def change
    create_table :utentes, id: primary_key do |t|
      t.string :username
      t.string :password
      t.string :nome
      t.string :cognome
      t.string :data_nascita

      t.timestamps
    end
  end
end

class CreateProdotto < ActiveRecord::Migration[7.1]
  def change
    # Create the ENUM type for tipo_prodotto
    create_enum :tipo_prodotto_enum, ["Buste", "Carta", "Toner"]

    # Create the Prodotto table with tipo_prodotto as an ENUM
    create_table :prodotto do |t|
      t.string :nome_oggetto
      t.text :descrizione
      t.datetime :data_inserimento
      t.enum :tipo_prodotto, enum_type: "tipo_prodotto_enum", default: "Buste", null: false

      t.timestamps
    end

    # Add an index on tipo_prodotto for performance
    add_index :prodotto, :tipo_prodotto
  end
end

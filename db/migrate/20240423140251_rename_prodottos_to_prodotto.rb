class RenameProdottosToProdotto < ActiveRecord::Migration[7.1]
  class RenameProdottosToProdotto < ActiveRecord::Migration[6.0]
    def change
      rename_table :prodottos, :prodotto
    end
  end

end

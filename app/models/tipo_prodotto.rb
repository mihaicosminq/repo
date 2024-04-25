class TipoProdotto < ApplicationRecord
  self.table_name = 'tipo_prodotto'
  has_many :prodotti
end

class Prodotto < ApplicationRecord
  self.table_name = 'prodotto'
  belongs_to :tipo_prodotto
  accepts_nested_attributes_for :tipo_prodotto
  validates :tipo_prodotto, presence: true
end

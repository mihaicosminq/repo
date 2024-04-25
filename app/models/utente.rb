class Utente < ApplicationRecord
  self.primary_key="username"
  validates :username, :nome, :cognome, :data_nascita, :email, presence: true
  has_secure_password
  has_secure_token :reset_password_token
  validates :email, uniqueness: true
end

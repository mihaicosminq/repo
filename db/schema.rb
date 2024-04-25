# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.1].define(version: 2024_04_23_142331) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  # Custom types defined in this database.
  # Note that some types may not work with other database engines. Be careful if changing database.
  create_enum "tipo_prodotto_enum", ["Buste", "Carta", "Toner"]

  create_table "prodotto", force: :cascade do |t|
    t.string "nome_oggetto"
    t.text "descrizione"
    t.datetime "data_inserimento"
    t.enum "tipo_prodotto", default: "Buste", null: false, enum_type: "tipo_prodotto_enum"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["tipo_prodotto"], name: "index_prodotto_on_tipo_prodotto"
  end

  create_table "tipo_prodotto", force: :cascade do |t|
    t.string "tipo"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "utentes", id: false, force: :cascade do |t|
    t.string "username"
    t.string "password"
    t.string "nome"
    t.string "cognome"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "data_nascita"
    t.string "email"
    t.string "password_digest"
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
  end

end
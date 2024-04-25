Rails.application.routes.draw do
  get 'utentes/create'
  get "up" => "rails/health#show", as: :rails_health_check
  resources :utentes, only: [:create]
  post 'login', to: 'utentes#login'
  get 'utentes', to: 'utentes#index'
  get '/utentes/:username', to: 'utentes#show'
  patch '/utentes/:username', to: 'utentes#update'
  resources :prodotto, only: [:create, :edit, :update, :destroy, :index]
  get 'prodotto/:id', to: 'prodotto#show', as: 'custom_prodotto'
  delete 'logout', to: 'utentes#destroy'
end

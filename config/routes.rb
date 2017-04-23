Rails.application.routes.draw do
  devise_for :users
  root 'tweets#index'
  resources :tweets do
    resources :comments, only: [:create]
  end
  resources :users, only: [:show]
  namespace :api, format: 'json' do
    resources :tweets do
      resources :comments
    end
  end
end
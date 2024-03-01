Rails.application.routes.draw do
  devise_for :users, controllers: {
    sessions: 'users/sessions',
    omniauth_callbacks: 'users/omniauth_callbacks',
    registrations: 'users/registrations'
  }

  # devise_scope :user do
  #   get '/users/me', to: 'users/sessions#show'
  # end

  # root should point to the nextjs app, define index in application_controller.rb
  namespace :api do
    resources :users, only: %i[index update]
    resources :subscribers, only: [:create]
    resources :onboarding, only: [:create] do
      collection do
        get :success_callback
        get :cancel_callback
      end
    end

    resources :stripe, only: [] do
      collection do
        get :customer_portal
      end
    end
  end
end

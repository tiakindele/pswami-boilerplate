OmniAuth.config.on_failure = proc do |env|
  Users::OmniauthCallbacksController.new(env).redirect_to_failure
end

OmniAuth.config.allowed_request_methods = [:post, :get]
OmniAuth.config.logger = Rails.logger

OmniAuth.config.request_validation_phase = false

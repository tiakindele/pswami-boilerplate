class ApplicationController < ActionController::Base
  include ActionController::Cookies
  include ActionController::RequestForgeryProtection
  include ActionController::MimeResponds

  protect_from_forgery with: :exception
  after_action :set_csrf_cookie

  def set_csrf_cookie
    cookies["CSRF-TOKEN"] = form_authenticity_token
  end

  def ensure_user_active
    return if current_user.active?

    render json: { errors: ['User is not active'] }, status: :forbidden
  end
end

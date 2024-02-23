class Api::UsersController < ApplicationController
  before_action :authenticate_user!, only: :update
  before_action :ensure_user_active, only: :update

  def index
    render json: current_user.as_json(methods: :friendly_plan_name)
  end

  def update
    if current_user.update(user_params)
      render json: current_user.as_json(methods: :friendly_plan_name)
    else
      render json: { errors: current_user.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

  def user_params
    params.require(:user).permit(:name)
  end
end

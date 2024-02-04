class CancelPlanJob < ApplicationJob
  def perform(user_id)
    user = User.find(user_id)

    user.update(plan: nil, active: false)
  end
end

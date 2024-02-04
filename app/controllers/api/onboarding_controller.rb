class Api::OnboardingController < ApplicationController
  before_action :authenticate_user!

  def create
    current_user.update!(name: onboarding_params[:name])

    session = Stripe::Checkout::Session.create(
      payment_method_types: ['card'],
      line_items: [{ price: User::PLAN[onboarding_params[:plan]], quantity: 1 }],
      mode: 'subscription',
      success_url: "#{request.url}/success_callback?session_id={CHECKOUT_SESSION_ID}",
      cancel_url: "#{request.url}/cancel_callback"
    )

    render json: { session_url: session.url }, status: :ok
  end

  def success_callback
    session = Stripe::Checkout::Session.retrieve(params[:session_id])
    subscription = Stripe::Subscription.retrieve(session.subscription)
    plan = subscription.items.first.price.lookup_key
    stripe_customer_id = session.customer

    current_user.update!(
      active: true,
      plan: plan,
      stripe_customer_id: stripe_customer_id,
      onboarding_completed_at: Time.now
    )

    redirect_to '/home'
  end

  def cancel_callback
    redirect_to '/home'
  end

  private

  def onboarding_params
    params.require(:onboarding).permit(:name, :plan, :terms_and_conditions)
  end
end

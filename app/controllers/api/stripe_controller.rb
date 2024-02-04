class Api::StripeController < ApplicationController
  before_action :authenticate_user!

  def webhooks
    payload = JSON.parse(request.body.read, symbolize_names: true)
    event = Stripe::Event.construct_from(payload)
    object = event['data']['object']

    case event.type
    when 'subscription_schedule.aborted'
      CancelPlanJob.perform_later(current_user.id)
    end

    head :ok
  rescue JSON::ParserError => e
    head :bad_request
  end

  def customer_portal
    session = Stripe::BillingPortal::Session.create({
      customer: current_user.stripe_customer_id,
      return_url: request.referrer || '/home'
    })

    render json: { url: session.url }, status: :ok
  end
end

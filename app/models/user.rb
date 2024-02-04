# == Schema Information
#
# Table name: users
#
#  id                     :integer          not null, primary key
#  email                  :string           default(""), not null
#  encrypted_password     :string           default(""), not null
#  reset_password_token   :string
#  reset_password_sent_at :datetime
#  remember_created_at    :datetime
#  created_at             :datetime         not null
#  updated_at             :datetime         not null
#
class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable, :omniauthable,
         omniauth_providers: %i[google_oauth2]

  PLAN = {
    basic_plan: 'price_1OcMSICMi6SN7IlBndQb6J1Y',
    premium_plan: 'price_1OcMTxCMi6SN7IlByfLvYBpO'
  }.with_indifferent_access.freeze

  def self.from_omniauth(access_token)
    data = access_token.info
    user = User.where(email: data['email']).first

    # Uncomment the section below if you want users to be created if they don't exist
    unless user
        user = User.create(
            email: data['email'],
            password: Devise.friendly_token[0,20]
        )
    end
    user
  end

  def friendly_plan_name
    case plan
    when 'basic_plan'
      'Basic'
    when 'premium_plan'
      'Premium'
    end
  end
end

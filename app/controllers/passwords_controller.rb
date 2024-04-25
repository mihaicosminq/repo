class PasswordsController < ApplicationController
  skip_before_action :verify_authenticity_token, only: [:forgot]
  def forgot
    email = params[:Utente][:email]&.downcase
    if email.present? && email.match?(URI::MailTo::EMAIL_REGEXP)
      user = Utente.find_by(email: email)
      if user.present?
        user.send_reset_password_instructions
        render json: { status: 'ok' }, status: :ok
      else
        render json: { error: 'Email address not found. Please check and try again.' }, status: :not_found
      end
    else
      render json: { error: 'Email parameter is missing or invalid.' }, status: :bad_request
    end
  end



  def reset
    user = Utente.find_by(reset_password_token: params[:token])
    if user.present? && user.reset_password_token_valid?
      if user.reset_password!(params[:password])
        render json: { status: 'ok' }, status: :ok
      else
        render json: { error: user.errors.full_messages }, status: :unprocessable_entity
      end
    else
      render json: { error: 'Link not valid or expired. Try generating a new link.' }, status: :not_found
    end
  end

end

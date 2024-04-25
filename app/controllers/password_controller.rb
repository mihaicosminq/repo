

class PasswordsResetController < ApplicationController
  def new

  end
  def create
    @utente = Utente.find_by(email: params[:email])

    if @user.present?
      PasswordMailer.with(utente: @utente).reset.deliver_now
    else

    end
  end
end
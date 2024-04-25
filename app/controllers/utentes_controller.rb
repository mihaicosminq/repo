class UtentesController < ApplicationController
  # POST /utentes
  skip_before_action :verify_authenticity_token

  def destroy
    session[:username] = nil
    respond_to do |format|
      format.json { render json: { message: "user logged out" }, status: :ok }
    end
  end

  def update
    username = params[:username]
    user = Utente.find_by(username: username)

    if user
      if user.update(utente_params)
        render json: user, status: :ok
      else
        render json: { error: user.errors.full_messages }, status: :unprocessable_entity
      end
    else
      render json: { error: "User not found" }, status: :not_found
    end
  end

  def show
    username = params[:username]
    user = Utente.find_by(username: username)
    if user
      render json: user
    else
      render json: { error: "User not found" }, status: :not_found
    end
  end

  def index
    @utentes = Utente.all
    render json: @utentes
  end

  def create
    @utente = Utente.new(utente_params)
    if @utente.save
      token = JsonWebToken.encode({ user_id: @utente.id })
      render json: { token: token }, status: :created
    else
      render json: @utente.errors, status: :unprocessable_entity
    end
    Rails.logger.debug @utente.inspect
  end

  # POST /login
  def login
    utente = Utente.find_by(email: params[:utente][:email])
    if utente && utente.authenticate(params[:utente][:password])

      token = JsonWebToken.encode({ user_id: utente.id })
      render json: { token: token, username: utente.username }, status: :ok
    else
      render json: { error: 'Invalid email or password' }, status: :unauthorized
    end
  end

  private

  def utente_params
    params.fetch(:utente, {}).permit(:email, :username, :password, :nome, :cognome, :data_nascita)
  end

end

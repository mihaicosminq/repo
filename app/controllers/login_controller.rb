def login
  utente = Utente.find_by(email: params[:email])
  if utente && utente.authenticate(params[:password])
    token = JsonWebToken.encode({ user_id: utente.id, username: utente.username })
    render json: { token: token, username: utente.username }, status: :ok
  else
    render json: { error: 'Invalid email or password' }, status: :unauthorized
  end
end

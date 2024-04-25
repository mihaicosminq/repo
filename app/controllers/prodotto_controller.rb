class ProdottoController < ApplicationController
  skip_before_action :verify_authenticity_token

  def index
    @prodotti = Prodotto.all
    render json: @prodotti
  end

  def create
    tipo_prodotto_symbol = params[:prodotto][:tipo_prodotto].downcase.to_sym

    tipo_prodotto = TipoProdotto.find_or_create_by(tipo: tipo_prodotto_symbol)

    @prodotto = Prodotto.new(prodotto_params)
    @prodotto.tipo_prodotto = tipo_prodotto

    if @prodotto.save
      render json: @prodotto, status: :created
    else
      render json: @prodotto.errors, status: :unprocessable_entity
    end
  end

  def edit
    @prodotto = Prodotto.find(params[:id])
  end

  def show
    idProdotto = params[:id]
    specificProdotto = Prodotto.find_by(id: idProdotto)
    if specificProdotto
      render json: specificProdotto
    else
      render json: { error: "Prodotto not found" }, status: :not_found
    end
  end



  def update
    @prodotto = Prodotto.find(params[:id])
    tipo_prodotto = TipoProdotto.find_by(id: params[:prodotto][:tipo_prodotto][:id])
    if tipo_prodotto.nil?
      render json: { error: "TipoProdotto not found" }, status: :not_found
      return
    end
    @prodotto.tipo_prodotto = tipo_prodotto
    if @prodotto.update(prodotto_params.except(:tipo_prodotto))
      render json: @prodotto, status: :ok
    else
      render json: @prodotto.errors, status: :unprocessable_entity
    end
  end


  def destroy
    Rails.logger.debug "Attempting to destroy Prodotto with ID: #{params[:id]}"
    @prodotto = Prodotto.find_by(id: params[:id])
    if @prodotto
      @prodotto.destroy
      redirect_to prodotto_index_path, notice: 'Prodotto was successfully destroyed.'
    else
      Rails.logger.debug "Prodotto with ID #{params[:id]} not found."
      redirect_to prodotto_index_path, alert: 'Prodotto not found.'
    end
  end

  private
  def prodotto_params
    params.require(:prodotto).permit(:nome_oggetto, :descrizione, :data_inserimento, tipo_prodotto: [:id, :tipo])
  end




end

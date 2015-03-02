ShakeItUp::Admin.controllers :accounts do
  get :index, :provides => [:json] do
    content_type 'application/json'
    status 200
    @accounts = Account.all.to_json(:exclude => [:crypted_password])
  end

  post :index, :provides => :json do
    content_type 'application/json'
    data = JSON.parse(request.body.read)

    @account = Account.new(data)

    if @account.save
      status 201
      @account.to_json(:exclude => [:crypted_password])
    else
      status 409
      {:error => pat(:create_error, :model => 'account')}.to_json
    end
  end

  get :index, :with => :id, :provides => :json do
    content_type 'application/json'
    @account = Account.get(params[:id])
    if @account
      status 200
      @account.to_json(:exclude => [:crypted_password])
    else
      status 404
      {:error => pat('Could not find account.', :model => 'account'), :id => "#{params[:id]}"}.to_json
    end
  end

  put :index, :with => :id, :provides => :json do
    content_type 'application/json'
    @account = Account.get(params[:id])
    if @account
      data = JSON.parse(request.body.read)

      if @account.update(data)
        status 201
        @account.to_json(:exclude => [:crypted_password])
      else
        status 409
        {:error => pat(:update_error, :model => 'account')}.to_json
      end
    else
      halt 404
      {:error => pat(:update_warning, :model => 'account', :id => "#{params[:id]}")}.to_json
    end
  end

  delete :index, :with => :id, :provides => :json do
    content_type 'application/json'
    account = Account.get(params[:id])
    if account
      if account != current_account && account.destroy
        halt 204
      else
        status 400
        {:error => pat(:delete_error, :model => 'account')}.to_json
      end
    else
      status 404
      {:error => pat(:delete_warning, :model => 'account', :id => "#{params[:id]}")}.to_json
    end
  end

=begin
  delete :destroy_many do
    @title = "Accounts"
    unless params[:account_ids]
      flash[:error] = pat(:destroy_many_error, :model => 'account')
      redirect(url(:accounts, :index))
    end
    ids = params[:account_ids].split(',').map(&:strip)
    accounts = Account.all(:id => ids)
    
    if accounts.include? current_account
      flash[:error] = pat(:delete_error, :model => 'account')
    elsif accounts.destroy
    
      flash[:success] = pat(:destroy_many_success, :model => 'Accounts', :ids => "#{ids.to_sentence}")
    end
    redirect url(:accounts, :index)
  end
=end
end

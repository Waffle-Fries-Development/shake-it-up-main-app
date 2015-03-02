ShakeItUp::Admin.controllers :flavors do

  get :index, :provides => :json do
    content_type 'application/json'
    status 200
    @flavors = Flavor.all.to_json
  end

  get :index, :with => :id, :provides => :json do
    content_type 'application/json'
    @flavor = Flavor.get(params[:id])
    if @flavor
      status 200
      @flavor.to_json
    else
      status 404
      {:error => pat('Could not find flavor.', :model => 'flavor'), :id => "#{params[:id]}"}.to_json
    end
  end

  post :index, :provides => :json do
    content_type 'application/json'
    data = JSON.parse(request.body.read)

    @flavor = Flavor.new(data)

    if @flavor.save
      status 201
      @flavor.to_json
    else
      status 409
      {:error => pat(:create_error, :model => 'flavor')}.to_json
    end
  end

  put :index, :with => :id, :provides => :json do
    content_type 'application/json'
    @flavor = Flavor.get(params[:id])
    if @flavor
      data = JSON.parse(request.body.read)

      if @flavor.update(data)
        status 201
        @flavor.to_json
      else
        status 409
        {:error => pat(:update_error, :model => 'flavor')}.to_json
      end
    else
      halt 404
      {:error => pat(:update_warning, :model => 'flavor', :id => "#{params[:id]}")}.to_json
    end
  end

  delete :index, :with => :id, :provides => :json do
    content_type 'application/json'
    flavor = Flavor.get(params[:id])
    if flavor
      flavor.destroy
      halt 204
    else
      status 404
      {:error => pat(:delete_warning, :model => 'flavor', :id => "#{params[:id]}")}.to_json
    end
  end

end

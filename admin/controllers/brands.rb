ShakeItUp::Admin.controllers :brands do

  get :index, :provides => :json do
    content_type 'application/json'
    status 200
    @brand = Brand.all.to_json(:relationships => {:flavors => {:include => [:name]}})
  end

  get :index, :with => :id, :provides => :json do
    content_type 'application/json'
    @brand = Brand.get(params[:id])
    if @brand
      status 200
      @brand.to_json(:relationships => {:flavors => {:include => [:name]}})
    else
      status 404
      {:error => pat('Could not find brand.', :model => 'brand'), :id => "#{params[:id]}"}.to_json
    end
  end

  post :index, :provides => :json do
    content_type 'application/json'
    data = JSON.parse(request.body.read)

    flavors = []

    if data.has_key?('flavors')
      flavors = data.fetch('flavors')
      data.delete('flavors')
    end

    @brand = Brand.new(data)
    @brand.add_flavors(flavors)

    if @brand.save
      status 201
      @brand.to_json(:relationships => {:flavors => {:include => [:name]}})
    else
      status 409
      {:error => pat(:create_error, :model => 'brand')}.to_json
    end
  end

  put :index, :with => :id, :provides => :json do
    content_type 'application/json'
    @brand = Brand.get(params[:id])
    if @brand
      data = JSON.parse(request.body.read)

      flavors = []

      if data.has_key?('flavors')
        flavors = data.fetch('flavors')
        data.delete('flavors')
      end

      @brand.update_flavors(flavors)

      if @brand.update(data)
        status 200
        @brand.to_json(:relationships => {:flavors => {:include => [:name]}})
      else
        status 409
        {:error => pat(:update_error, :model => 'brand')}.to_json
      end
    else
      status 404
      {:error => pat(:update_warning, :model => 'brand', :id => "#{params[:id]}")}.to_json
    end
  end

  delete :index, :with => :id, :provides => :json do
    content_type 'application/json'
    brand = Brand.get(params[:id])
    if brand
      brand.delete_flavors
      brand.destroy
      halt 204
    else
      status 204
      {:error => pat(:delete_warning, :model => 'brand', :id => "#{params[:id]}")}.to_json
    end
  end


end
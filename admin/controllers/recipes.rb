ShakeItUp::Admin.controllers :recipes do

  get :index, :provides => :json do
    content_type 'application/json'
    status 200
    @recipes = Recipe.all.to_json(
        :exclude => [:brand_id, :flavor_id],
        :relationships => {
            :flavor => {:include => [:name]},
            :brand => {:include => [:name], :relationships => {:flavors => {:include => [:name]}}}
        })
  end

  get :index, :with => :id, :provides => :json do
    content_type 'application/json'
    @recipe = Recipe.get(params[:id])

    if @recipe
      status 200
      @recipe.to_json(
          :exclude => [:brand_id, :flavor_id],
          :relationships => {
              :flavor => {:include => [:name]},
              :brand => {:include => [:name], :relationships => {:flavors => {:include => [:name]}}}
          })
    else
      status 404
      {:error => pat('Could not find recipe.', :model => 'recipe'), :id => "#{params[:id]}"}.to_json
    end
  end

  post :preview, :provides => :html do
    content_type 'text/html'
    markdown = Kramdown::Document.new(request.body.read)
    markdown.to_html
  end

  post :index, :provides => :json do
    content_type 'application/json'
    data = JSON.parse(request.body.read)

    if data.has_key?('brand')
      data['brand'] = Brand.first_or_new(data.fetch('brand'))
    end

    if data.has_key?('flavor')
      data['flavor'] = Flavor.first_or_new(data.fetch('flavor'))
    end

    @recipe = Recipe.new(data)

    if @recipe.save
      status 201
      @recipe.to_json(
          :exclude => [:brand_id, :flavor_id],
          :relationships => {
              :flavor => {:include => [:name]},
              :brand => {
                  :include => [:name],
                  :relationships => {:flavors => {:include => [:name]}}
              }
          })
    else
      status 409
      {:error => pat(:create_error, :model => 'recipe')}.to_json
    end
  end

  put :index, :with => :id, :provides => :json do
    content_type 'application/json'
    @recipe = Recipe.first({:id => params[:id]})
    if @recipe
      data = JSON.parse(request.body.read)

      if data.has_key?('brand')
        data['brand_id'] = data.fetch('brand')['id']
        data.delete('brand')
      end

      if data.has_key?('flavor')
        data['flavor_id'] = data.fetch('flavor')['id']
        data.delete('flavor')
      end

      if @recipe.update(data)
        status 201
        @recipe.to_json(
            :exclude => [:brand_id, :flavor_id],
            :relationships => {
                :flavor => {:include => [:name]},
                :brand => {
                    :include => [:name],
                    :relationships => {:flavors => {:include => [:name]}}
                }
            })
      else
        status 409
        {:error => pat(:update_error, :model => 'recipe')}.to_json
      end
    else
      halt 404
      {:error => pat(:update_warning, :model => 'recipe', :id => "#{params[:id]}")}.to_json
    end
  end

  delete :index, :with => :id, :provides => :json do
    content_type 'application/json'
    recipe = Recipe.first({:id => params[:id]})
    if recipe
      recipe.destroy
      halt 204
    else
      status 404
      {:error => pat(:delete_warning, :model => 'recipe', :id => "#{params[:id]}")}.to_json
    end
  end

end
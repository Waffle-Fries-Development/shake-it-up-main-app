ShakeItUp::App.controllers :recipes do

  get :index, provides: :json do
    content_type 'application/json'
    status 200

    @recipes = Recipe.all.to_json(
        :exclude => [:brand_id, :flavor_id],
        :relationships => {
            :flavor => {:include => [:name]},
            :brand => {:include => [:name]}
        })
  end

  get :details, :with => :id, provides: :json do
    content_type 'application/json'

    @recipe = Recipe.first({id: params[:id]})

    if @recipe
      status 200
      @recipe.to_json(:exclude => [:brand_id, :flavor_id], :methods => [:html_instructions])
    else
      status 404
      {:error => 'Could not find recipe.', :id => "#{params[:id]}"}.to_json
    end

  end

  get :index, :with => :flavor, provides: :json do
    content_type 'application/json'
    status 200

    flavors = Flavor.all(:conditions => ['lower(name) LIKE ?', "%#{params[:flavor].downcase}%"])

    @recipes = Recipe.all(:flavor => flavors)
      .to_json(
        :exclude => [:brand_id, :flavor_id],
        :relationships => {
            :flavor => {:include => [:name]},
            :brand => {:include => [:name]}
        })
  end

end
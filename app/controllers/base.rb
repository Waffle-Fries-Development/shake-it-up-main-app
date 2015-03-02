ShakeItUp::App.controllers :base do
  get :index, :map => '/' do
    slim :'base/index'
  end
end

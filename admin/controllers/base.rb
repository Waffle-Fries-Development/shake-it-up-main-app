ShakeItUp::Admin.controllers :base do
  get :index, :map => '/' do
    if current_account.nil?
      redirect url(:sessions, :new)
    end
    slim :'base/index'
  end
end

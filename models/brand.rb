class Brand
  include DataMapper::Resource
  include DataMapper::Validate

  # Properties
  property :id, Serial
  property :name, String

  has n, :flavors, :through => Resource

  has n, :recipes

  # Validations
  validates_presence_of      :name

  def add_flavors(flavors)
    flavors.each { |f| self.flavors << Flavor.first({:id => f['id']}) }
    self
  end

  def update_flavors(flavors)
    self.flavors.reject! { |f| !flavors.include?(f) }
    self.add_flavors(flavors)
    self.save
    self
  end

  def delete_flavors
    if self.flavors.count > 0
      self.flavors.clear
      self.save
      self.reload
    end
    self
  end
end

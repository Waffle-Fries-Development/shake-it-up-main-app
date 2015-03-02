class Flavor
  include DataMapper::Resource
  include DataMapper::Validate

  # Properties
  property :id, Serial
  property :name, String

  has n, :brands, :through => Resource

  has n, :recipes

  # Validations
  validates_presence_of      :name
end

class Recipe
  include DataMapper::Resource

  # property <name>, <type>
  property :id, Serial
  property :name, String
  property :instructions, Text

  belongs_to :brand, :key => true
  belongs_to :flavor, :key => true

  # Validations
  validates_presence_of      :name
  validates_uniqueness_of    :name, :case_sensitive => false
  validates_presence_of      :instructions

  def set_brand(data)
    self.brand = Brand.first(data)
    self
  end

  def set_flavor(data)
    self.flavor = Flavor.first(data)
    self
  end

  def html_instructions
    markdown = Kramdown::Document.new(self.instructions)
    markdown.to_html
  end

end

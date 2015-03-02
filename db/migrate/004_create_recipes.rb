migration 4, :create_recipes do
  up do
    create_table :recipes do
      column :id, Integer, :serial => true
      column :name, DataMapper::Property::String, :length => 255
      column :instructions, DataMapper::Property::Text
    end
  end

  down do
    drop_table :recipes
  end
end

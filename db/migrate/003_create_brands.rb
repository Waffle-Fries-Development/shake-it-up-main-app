migration 3, :create_brands do
  up do
    create_table :brands do
      column :id, Integer, :serial => true
      column :name, DataMapper::Property::String, :length => 255
    end
  end

  down do
    drop_table :brands
  end
end

migration 2, :create_flavors do
  up do
    create_table :flavors do
      column :id, Integer, :serial => true
      column :name, DataMapper::Property::String, :length => 255
    end
  end

  down do
    drop_table :flavors
  end
end

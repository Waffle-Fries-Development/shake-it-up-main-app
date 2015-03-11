source 'https://rubygems.org'
ruby '2.1.4'

# Distribute your app as a gem
# gemspec

# Server requirements
# gem 'thin' # or mongrel
# gem 'trinidad', :platform => 'jruby'
gem 'puma', '~> 2.11.1'
gem 'foreman', '~> 0.77.0'

# Optional JSON codec (faster performance)
# gem 'oj'

# Project requirements
gem 'rake'

# Component requirements
gem 'bcrypt'
gem 'slim'
gem 'dm-validations'
gem 'dm-timestamps'
gem 'dm-migrations'
gem 'dm-constraints'
gem 'dm-aggregates'
gem 'dm-types'
gem 'dm-core'
gem 'dm-serializer'
gem 'dm-sqlite-adapter', :groups => [:development, :test]
gem 'dm-postgres-adapter', :group => :production
gem 'kramdown', '~> 1.5.0'

# Development only components
group :test, :development do
  gem 'compass'
  gem 'uglifier', '2.1.1'
  gem 'yui-compressor', '0.9.6'
end

# Test requirements
group :test, :development do
  gem 'rspec'
  gem 'capybara'
  gem 'cucumber'
  gem 'rack-test'
end


# Padrino Stable Gem
gem 'padrino', '0.12.4'

# Or Padrino Edge
# gem 'padrino', :github => 'padrino/padrino-framework'

# Or Individual Gems
# %w(core support gen helpers cache mailer admin).each do |g|
#   gem 'padrino-' + g, '0.12.4'
# end

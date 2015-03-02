# Enables support for Compass, a stylesheet authoring framework based on SASS.
# See http://compass-style.org/ for more details.
# Store Compass/SASS files (by default) within 'app/stylesheets'.

module CompassInitializer
  def self.registered(app)
    require 'sass/plugin/rack'

    output_style = :expanded

    if Padrino.env == :testing
      output_style = :compact
    end

    if Padrino.env == :production
      output_style = :compressed
    end

    Compass.configuration do |config|
      # noinspection RubyResolve
      config.project_path = Padrino.root
      # noinspection RubyResolve
      config.sass_dir = "#{File.dirname(app.app_file)}/assets/stylesheets"
      # noinspection RubyResolve
      config.additional_import_paths = '/bower_components'
      # noinspection RubyResolve
      config.project_type = :stand_alone
      # noinspection RubyResolve
      config.http_path = '/'
      # noinspection RubyResolve
      config.css_dir = 'public/stylesheets'
      # noinspection RubyResolve
      config.images_dir = 'public/images'
      # noinspection RubyResolve
      config.javascripts_dir = 'public/javascripts'
      # noinspection RubyResolve
      config.output_style = output_style
    end

    Compass.configure_sass_plugin!
    Compass.handle_configuration_change!

    app.use Sass::Plugin::Rack
  end
end

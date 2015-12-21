source 'https://rubygems.org'
ruby '2.2.4'

gem 'rails', '4.2.5'
gem 'sass-rails', '~> 5.0'
gem 'uglifier', '>= 1.3.0'
gem 'coffee-rails', '~> 4.1.0'
gem 'jquery-rails'
gem 'jbuilder', '~> 2.0'

gem 'bootstrap-sass'
gem 'devise'
gem 'devise-i18n'
gem 'figaro'
gem 'pg'
gem 'simple_form'
gem 'slim-rails'

gem 'doorkeeper', '~> 2.2.2'
gem 'wine_bouncer'
gem 'kramdown'
gem 'kaminari'
gem 'grape'
gem 'active_model_serializers'
gem 'grape-active_model_serializers'
gem 'grape-swagger'
gem 'api-pagination'
gem 'rack-cors', :require => 'rack/cors'

# Temporarily remote branch because updates, for more info look at
# https://github.com/d4be4st/swagger-ui_rails/pull/13
gem 'swagger-ui_rails', github: 'audionerd/swagger-ui_rails'

group :development do
  gem 'web-console', '~> 2.0'
  gem 'spring'
  gem 'better_errors'
  gem 'guard-bundler'
  gem 'guard-rails'
  gem 'guard-rspec'
  gem 'quiet_assets'
  gem 'rails_layout'
  gem 'rb-fchange', :require=>false
  gem 'rb-fsevent', :require=>false
  gem 'rb-inotify', :require=>false
  gem 'spring-commands-rspec'
end

group :development, :test do
  gem 'byebug'
  gem 'factory_girl_rails'
  gem 'faker'
  gem 'pry-rails'
  gem 'pry-rescue'
  gem 'rspec-rails'
  gem 'rubocop'
end

group :test do
  gem 'capybara'
  gem 'database_cleaner'
  gem 'launchy'
  gem 'selenium-webdriver'
end

group :production do
  gem 'unicorn'
end

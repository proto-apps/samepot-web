Samepot::Application.routes.draw do
  # The priority is based upon order of creation: first created -> highest priority.
  # See how all your routes lay out with "rake routes".

  #
  # No authentication
  #

  root to: 'sites#index'
  get '/signup'        => 'sites#signup'
  get '/verify/:token' => 'sites#verify', :as => 'verify'
  get '/invite/:token' => 'sites#invite', :as => 'invite'
  get '/logout'        => 'sites#logout'


  #
  # Require authentication
  #

  get '/home'         => 'home#index'
  scope 'my' do
    resource 'user', :path => '/', :only => [:show]
  end
  get '/blobs/image/:token/:size' => 'blobs#download_image', :as => 'download_image'

  # Project view
  get '/projects/new' => 'projects#new'
  scope ':token', :token => /(\w|\-){8}/ do
    resource 'project', :path => '/', :only => [:show, :edit] do
      resource  'canvas',     :only => [:show]
      resources 'milestones', :only => [:index]
      resources 'tasks',      :only => [:index, :show]
      resources 'members',    :only => [:index]
    end
  end


  #
  # API route
  #

  namespace :api do
    #
    # No authentication
    #
    
    post '/auth/login'              => 'auth#login'
    post '/auth/signup'             => 'auth#signup'
    post '/auth/signup_with_invite' => 'auth#signup_with_invite'
    get  '/auth/:token/:user_id'    => 'auth#project_member?'


    #
    # Require authentication
    #

    scope 'my' do
      resource 'user', :path => '/', :only => [:update, :destroy] do
        post 'image' => 'users#update_image'
      end
    end

    # Project api
    post '/projects'   => 'projects#create'
    scope ':token', :token => /(\w|\-){8}/ do
      resource 'project', :path => '/', :only => [:update, :destroy] do
        post '/image' => 'projects#update_image'

        resource  'canvas',     :only => [:update]
        resources 'milestones', :only => [:create, :update, :destroy]
        resources 'tasks',      :only => [:index, :create, :update, :destroy] do
          resources 'task_comments', :only => [:index, :create, :destroy], :path => 'comments'
        end
        put 'tasks/status/:id' => 'tasks#update_status'
        resources 'members',    :only => [:create, :destroy]
        resources 'activities', :only => [:index]
        resources 'talks',      :only => [:create]
      end
    end
  end


  #
  # No match
  #
  get '*a' => redirect("/")
end

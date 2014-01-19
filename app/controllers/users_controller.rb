class UsersController < ApplicationController
	def create
		@graph = Koala::Facebook::API.new(params["accessToken"])
		@fb_user = @graph.get_object("me")

		@player = User.find_or_create_by(facebook_id: @fb_user["id"])

		respond_to do |format|
		  format.json { render json: @player.to_json }
		end

	end

	def save
		p "%" * 50
		p params
		@graph = Koala::Facebook::API.new(params["authResponse"]["accessToken"])
        @fb_user = @graph.get_object("me")

        @player = User.find_or_create_by(facebook_id: @fb_user["id"])

        @player.stage = params["stage"]
        @player.level = params["level"]
        @player.save

		respond_to do |format|
		  format.json { render json: {'status' => 'its done'}.to_json }
		end
		
	end

	def destroy
	end
	
	private
	def user_params
		params.require(:user).permit(:id, :email, :name, :first_name, :last_name, :link)
	end
end

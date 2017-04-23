class Api::CommentsController < ApplicationController
  def index
    @comments = Comment.includes(:user).where(tweet_id: params[:tweet_id])
  end

  def create
    binding.pry
    @comment = Comment.create(text: params[:text], tweet_id: params[:tweet_id], user_id: current_user.id)
  end
end

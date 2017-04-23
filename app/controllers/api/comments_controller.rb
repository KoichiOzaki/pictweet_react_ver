class Api::CommentsController < ApplicationController
  def index
    @comments = Comment.includes(:user).where(tweet_id: params[:tweet_id])
  end

  def create
    @comment = Comment.create(text: params[:comment], tweet_id: params[:tweet_id], user_id: current_user.id)
  end
end

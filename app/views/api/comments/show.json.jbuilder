json.extract!(@comment,:user_id, :tweet_id, :text)
json.nickname @comment.user.nickname

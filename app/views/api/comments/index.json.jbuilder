json.data(@comments) { |d| 
  json.nickname d.user.nickname
  json.extract!(d, :user_id, :text)
}

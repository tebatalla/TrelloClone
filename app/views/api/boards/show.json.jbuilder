# write some jbuilder to return some json about a board
# it should include the board
#  - its lists
#    - the cards for each list

json.extract! @board, :id, :title, :created_at

json.user @board.user, :id, :email

json.members @board.members do |member|
  json.extract! member, :id, :email
end

json.lists @board.lists do |list|
  json.extract! list, :id, :title, :ord
  json.cards list.cards do |card|
    json.extract! card, :id, :title, :description, :ord
  end
end
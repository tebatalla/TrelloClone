# == Schema Information
#
# Table name: lists
#
#  id         :integer          not null, primary key
#  title      :string(255)      not null
#  board_id   :integer          not null
#  ord        :float            default(0.0)
#  created_at :datetime
#  updated_at :datetime
#

class List < ActiveRecord::Base
  validates :title, :board, :ord, presence: true
  after_initialize :increment_max_ord

  belongs_to :board
  has_many :cards, dependent: :destroy

  default_scope { order(:ord) }

  def increment_max_ord
    if ord == 0.0
      ord_max = List.where(board_id: board.id).maximum(:ord)
      if ord_max.nil?
        self.ord = 1.0
      else
        self.ord = ord_max + 1
      end
    end
  end

  # TODO: class method for updating orders?
end

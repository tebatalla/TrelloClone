# == Schema Information
#
# Table name: cards
#
#  id          :integer          not null, primary key
#  title       :string(255)      not null
#  list_id     :integer          not null
#  description :text
#  ord         :float            default(0.0)
#  created_at  :datetime
#  updated_at  :datetime
#

class Card < ActiveRecord::Base
  belongs_to :list
  before_save :increment_max_ord
  has_many :items, dependent: :destroy
  has_many :card_assignments, dependent: :destroy

  default_scope { order(:ord) }

  def increment_max_ord
    if ord.nil?
      ord_max = Card.where(list_id: list.id).maximum(:ord)
      if ord_max.nil?
        self.ord = 1.0
      else
        self.ord = ord_max + 1
      end
    end
  end
end

class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable,  :validatable

  has_many :group_users
  has_many :groups, through: :group_users
  has_many :messages
  def show_names
    last_message.content? ? last_message.content : '画像が投稿されています'
  end
end
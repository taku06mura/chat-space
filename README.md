## usersテーブル
|Column|Type|Options|
|------|----|-------|
|email|string|null: false|
|password|string|null: false|
|username|string|null: false|

### Association
-has_many :messages
-has_many :users_groups
-has_many :groups, through:  :users_groups

## groupsテーブル
|Column|Type|Options|
|------|----|-------|
|groupname|string|null: false|

### Association
-has_many :messages
-has_many :users_groups
-has_many :users, through:  :users_groups

## add_index
-groups, :groupname

## groups_usersテーブル

|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association
-belongs_to :group
-belongs_to :user

## messagesテーブル

|Column|Type|Options|
|------|----|-------|
|body|text||
|image|string||
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foregin_key: true|

### Association
-belongs_to :group
-belongs_to :user
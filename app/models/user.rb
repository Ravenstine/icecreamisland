class User
  include Mongoid::Document
  field :facebook_id, type: String
  field :stage, type: Integer, default: 0
  field :level, type: Integer, default: 0
end

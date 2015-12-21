class UserSerializer < ActiveModel::Serializer
  attributes :id, :email, :name, :sign_in_count
end

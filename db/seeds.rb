# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

#
User.delete_all

user1 = User.create!(
  name:     'test1',
  password: 'test1test1',
  email:    'test1@samepot.net',
  birthday: '1981-10-15',
  timezone: 'Tokyo',
  locale: 'ja'
)
user2 = User.create!(
  name:     'demo1',
  password: 'demo1demo1',
  email:    'demo1@samepot.net',
  birthday: '2000-02-01',
  timezone: 'Tokyo',
  locale: 'ja'
)
user3 = User.create!(
  name:     'demo2',
  password: 'demo2demo2',
  email:    'demo2@samepot.net',
  birthday: '2000-03-01',
  timezone: 'Tokyo',
  locale: 'ja'
)


#
Project.delete_all

project1 = Project.create!(
  name: 'Samepot dev',
  administrator_id: user1.id
)
project2 = Project.create!(
  name: 'Demo project',
  administrator_id: user2.id
)

#
ProjectUserRelation.delete_all

ProjectUserRelation.create!(
  project_id: project1.id,
  user_id:    user1.id
)
ProjectUserRelation.create!(
  project_id: project2.id,
  user_id:    user2.id
)
ProjectUserRelation.create!(
  project_id: project2.id,
  user_id:    user3.id
)

UsersCollegeInfo = new Mongo.Collection("users_college_info");

People   = new Mongo.Collection("People");

UsersCollegeInfo.userCanInsert = function(userId, doc) {
  return true;
};

UsersCollegeInfo.allow({
  insert: function(userId, doc){
    return true;
  }
});

UsersCollegeInfo.allow({
  update: function(userId, doc){
    return true;
  }
});

Meteor.users.allow({
  insert: function(userId, doc){
    return true;
  }
});

Meteor.users.allow({
  update: function(userId, doc){
    return true;
  }
});

People.allow({
  insert: function () {
    return true;
  },
  remove: function () {
    return true;
  }
});
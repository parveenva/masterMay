Meteor.publish("college_list", function() {
	return UsersCollegeInfo.find({}, {});
});

Meteor.publish("people_list", function() {
	return People.find({}, {});
});

Meteor.publish("colleges_null", function() {
	return UsersCollegeInfo.find({_id:null}, {});
});

Meteor.publish("college", function(collegeId) {
	return UsersCollegeInfo.find({_id:collegeId}, {});
});

Meteor.publish('userData', function() {
   
  return Meteor.users.find(this.userId, {
   // schoolNames: 1, firstName: 1, lastName: 1, email: 1,phone: 1, whySchool: 1,hearAboutUs:1
  });
});

Meteor.publish('allUsers', function() {
   return Meteor.users.find({}, {fields:{profile:1,username:1,emails:1,firstName: 1, lastName: 1, email: 1,phone: 1}})
 })


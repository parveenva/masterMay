this.UsersCollegeInfo = new Mongo.Collection("users_college_info");

this.UsersCollegeInfo.userCanInsert = function(userId, doc) {
	return true;
};

this.UsersCollegeInfo.userCanUpdate = function(userId, doc) {
	return true;
};

this.UsersCollegeInfo.userCanRemove = function(userId, doc) {
	return true;
};

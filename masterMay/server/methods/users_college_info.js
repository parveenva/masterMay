Meteor.methods({
	"usersCollegeInfoInsert": function(data) {
		if(!UsersCollegeInfo.userCanInsert(this.userId, data)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		return UsersCollegeInfo.insert(data);
	},

	"usersCollegeInfoUpdate": function(id, data) {
		var doc = UsersCollegeInfo.findOne({ _id: id });
		if(!UsersCollegeInfo.userCanUpdate(this.userId, doc)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		UsersCollegeInfo.update({ _id: id }, { $set: data });
	},

	"usersCollegeInfoRemove": function(id) {
		var doc = UsersCollegeInfo.findOne({ _id: id });
		if(!UsersCollegeInfo.userCanRemove(this.userId, doc)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		UsersCollegeInfo.remove({ _id: id });
	}




        
});

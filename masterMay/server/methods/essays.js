Meteor.methods({
	"essaysInsert": function(data) {
		if(!Essays.userCanInsert(this.userId, data)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		return Essays.insert(data);
	},

	"essaysUpdate": function(id, data) {
		var doc = Essays.findOne({ _id: id });
		if(!Essays.userCanUpdate(this.userId, doc)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		Essays.update({ _id: id }, { $set: data });
	},

"essaysUpdateManyBP": function(id, data) {
		
		Essays.update({ "peopleID": id }, { $set:{"createdBy":data}  }, { multi: true });
	},

	"essaysRemove": function(id) {
		var doc = Essays.findOne({ _id: id });
		if(!Essays.userCanRemove(this.userId, doc)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		Essays.remove({ _id: id });
	}
});

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
	"peopleInsertEmail": function(data) {
	
var existingEmail = People.findOne({ "Email": data });
	 console.log("existingEmail"+existingEmail);

if(existingEmail){
		  

	return false;
}else{
			  

		var id = 	  People.insert({ "Email": data });
//replaceSubstrings();
	 console.log("id"+id);

			 sendPeopleVerificationEmail(id,data) ;
	return true;

}
	},
"sendPeopleVerificationEmailMethod": function(id, data) {
			console.log("sendPeopleVerificationEmailMethod");

		sendPeopleVerificationEmail(id,data) ;
	},

"peopleUpdateByID": function(id, token) {
			console.log("peopleUpdateByID");

		People.update({ _id: id }, { $set:{"verificationToken":token,"verified":false}  });
	},

	"essaysRemove": function(id) {
		var doc = Essays.findOne({ _id: id });
		if(!Essays.userCanRemove(this.userId, doc)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		Essays.remove({ _id: id });
	},



 "verifyPeopleEmail": function (token) {
        console.log("verifyPeopleEmail");

      var people = People.findOne({
        'verificationToken.token': token
      }, {fields:{_id:1 }});
     console.log(people);
      People.update({
        _id: people._id 
      }, {
        $set: {
          'verified': true
        },
        $unset: {
          'verificationToken': {
             'token': token
          }
        }
      });
       
}

});
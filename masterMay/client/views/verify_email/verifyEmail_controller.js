this.VerifyEmailController = RouteController.extend({
	template: "verifyEmail",
	
	

	yieldTemplates: {
		/*YIELD_TEMPLATES*/
	},

	onBeforeAction: function() {

		Meteor.subscribe("people_list");
		Meteor.subscribe("essay_list");

		this.next();
	},

	action: function() {
		if(this.isReady()) { this.render(); } else { this.render("loading"); }
		/*ACTION_FUNCTION*/
	},

	isReady: function() {

		
		var token = this.params.token;

		var acc = Accounts.verifyEmail(token, function () {

			
        });

		var userID =  Meteor.userId();


if(userID!=null){
	alert("userid-------"+userID);

	var email = Meteor.user().emails[0].address;
			alert("email---"+email);

			var  peopleID = People.findOne({"Email":email},{ fields: { "_id": 1 }});

			alert("peopleID-------"+peopleID);

 
if(peopleID!=null){

	alert("peopleID-------"+peopleID._id);

			// alert("peopleID---"+peopleID._id);
Meteor.call("essaysUpdateManyBP", peopleID._id, userID, function(err, res) {
			if(err) {
				alert(err.message);
			}else{
                              //alert("done");
            
            }
		});

	}
			  
Router.go("home_dash");		
}else{

	var  peopleID = People.findOne({"verificationToken.token":token},{ fields: { "_id": 1 }});

 
	if(peopleID!=null){

//alert("people ---" +peopleID._id);
	Meteor.call("verifyPeopleEmail", token, function(err, res) {
		if(err) {
			//alert(err.message);
		}else{
						  //alert("done");
		
		}
		});

		Session.set("peopleID", peopleID._id);


		Router.go("submittedEssays");		
	}

}


		var subs = [
		];
		var ready = true;
		_.each(subs, function(sub) {
			if(!sub.ready())
				ready = false;
		});
		return ready;
	},

	data: function() {
		

		var data = {
			params: this.params || {}
		};
		

		

		return data;
	},

	onAfterAction: function() {
		
	}
});
this.VerifyEmailController = RouteController.extend({
	template: "verifyEmail",
	

	yieldTemplates: {
		/*YIELD_TEMPLATES*/
	},

	onBeforeAction: function() {
		this.next();
	},

	action: function() {
		if(this.isReady()) { this.render(); } else { this.render("loading"); }
		/*ACTION_FUNCTION*/
	},

	isReady: function() {
		Meteor.subscribe("people_list");
		Meteor.subscribe("essay_list");

		var acc = Accounts.verifyEmail(this.params.token, function () {
	
			var userID =  Meteor.userId();
			if(userID){

			var email = Meteor.user().emails[0].address;
			alert("email---"+email);



 

   var  peopleID = People.findOne({"Email":email},{ fields: { "_id": 1 }});

			alert("peopleID---"+peopleID._id);


			   var  essayID = Essays.findOne({"peopleID":peopleID._id},{ fields: { "_id": 1 }});
		
			alert("essayID---"+essayID._id);

			Essays.update({"_id":essayID._id},{$set:{"createdBy":userID}},function(error, result){
            if(error){
              alert(error);
            }else{
                              alert("done");
            
            }
          });


			            Router.go('/verified');
			}
        });

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
var pageSession = new ReactiveDict();

Meteor.subscribe("people_list");
		Meteor.subscribe("essay_list");

Template.verifyEmail.onCreated(function() {
	pageSession.set("errorMessage", "");
	
});

Template.verifyEmail.onDestroyed(function() {
	
});



Template.verifyEmail.onRendered(function() {
		//alert("Meteor.userId()"+Meteor.userId());

});



Template.verified.onRendered(function() {

	var userID =  Meteor.userId();


	if(userID!=null){
   Session.set("fromVerifyEmail", "true" );
Router.go("home_dash");		
	}else{
	
		var 	token= 	Session.get("emailToken");


		Meteor.call("verifyPeopleEmail", token, function(err, res) {
				if(err) {
					//alert(err.message);
				}else{

					var essayCount = Essays.find({"peopleID": res });
 					if(essayCount!=null && essayCount.count()>0){
								   Session.set("peopleID", res);
								     Session.set("essaysTopMsg", "Thank you for verifying your email address!" );
								     Session.set("fromVerifyEmail", "true" );

								   Router.go("submittedEssays");		
				}
				}
				});
		
		 
		
		
	
	}


});


Template.verified.onDestroyed(function() {
	var userID =  Meteor.userId();


	if(userID!=null){
		//	alert("userid-------"+userID);
	
		var email = Meteor.user().emails[0].address;
				//alert("email---"+email);
	
				var  peopleID1 = People.findOne({"Email":email},{ fields: { "_id": 1 }});
	
				//alert("peopleID-------"+peopleID);
	
	 
	if(peopleID1!=null){
	
		//alert("peopleID-------"+peopleID._id);
	
				// alert("peopleID---"+peopleID._id);
	Meteor.call("essaysUpdateManyBP", peopleID1._id, userID, function(err, res) {
				if(err) {
					alert(err.message);
				}else{
								  //alert("done");
				
				}
			});
	
		}
				  
//	Router.go("home_dash");		
	}else{
	
		
	

//			Router.go("submittedEssays");		
		}
	
	

});


var pageSession = new ReactiveDict();

Meteor.subscribe("people_list");
		Meteor.subscribe("essay_list");

Template.verifyEmail.onCreated(function() {
	pageSession.set("errorMessage", "");
	
});

Template.verifyEmail.onDestroyed(function() {
	
});

Template.verifyEmail.onRendered(function() {
		//alert("verified--"+Meteor.userId());

		var userID =  Meteor.userId();
			if(userID){

			var email = Meteor.user().emails[0].address;
			//alert("email---"+email);



 

   var  peopleID = People.findOne({"Email":email},{ fields: { "_id": 1 }});

			// alert("peopleID---"+peopleID._id);
Meteor.call("essaysUpdateManyBP", peopleID._id, userID, function(err, res) {
			if(err) {
				alert(err.message);
			}else{
                              //alert("done");
            
            }
		});
	  			/*Essays.update({"peopleID":peopleID._id},{$set:{"createdBy":userID}},function(error, result){
            if(error){
              alert(error);
            }else{
                              alert("done");
            
            }
          });*/
}

});


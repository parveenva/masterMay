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
		//alert("verified--"+Meteor.userId());

		var userID =  Meteor.userId();
			if(userID){

			var email = Meteor.user().emails[0].address;
			//alert("email---"+email);



 

   var  peopleID = People.findOne({"Email":email},{ fields: { "_id": 1 }});

			//alert("peopleID---"+peopleID._id);


			   var  essayID = Essays.findOne({"peopleID":peopleID._id},{ fields: { "_id": 1 }});
		
			//alert("essayID---"+essayID._id);

			Essays.update({"_id":essayID._id},{$set:{"createdBy":userID}},function(error, result){
            if(error){
              alert(error);
            }else{
                             // alert("done");
            
            }
          });
}

});


Template.submittedEssays.helpers({


	"peopleEssayList": function() {
  
   
 		if(Session.get("peopleID")!=null ){
		  //alert("essay_list.-------"+Essays);
		  //alert("essay_list.count()-------"+Essays.find().count());
			return Essays.find({"peopleID": Session.get("peopleID") });
		} else{return null}
	  }
		   
	  });
  
  
 
  
  
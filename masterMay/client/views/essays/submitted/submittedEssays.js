Template.submittedEssays.helpers({

"peopleEssayCount": function() {

    var peopleEssay = Essays.find({"peopleID": Session.get("peopleID") });
    if(peopleEssay!=null && peopleEssay.count()>0) {
             return true;
             }else{
             	return false;
             }
  
    } ,
	"peopleEssayList": function() {
  
   
 		if(Session.get("peopleID")!=null ){
		  //alert("essay_list.-------"+Essays);
		  //alert("essay_list.count()-------"+Essays.find().count());
			return Essays.find({"peopleID": Session.get("peopleID") });
		} else{return null}
	  },
	  "backURL": function() {
  
   var fromVerifyEmail = Session.get("fromVerifyEmail");
 		if(fromVerifyEmail !=null  ){
		  return "/home_public";
		} else{return "javascript:history.back()";}
	  }
		   
	  });
  
  
 
  
  
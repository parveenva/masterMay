import { ReactiveVar } from 'meteor/reactive-var'
var pageSession = new ReactiveDict();
Template.HomePublic.onCreated(function() {
	
});

Template.HomePublic.onDestroyed(function() {
	
});

Template.HomePublic.onRendered(function() {
	//$('section, .jumbotron').css('min-height', $(window).height()/2 + 'px'); window.scrollTo(0, 0);
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.HomePublic.events({

			
});

Template.HomePublicJumbotronJumbotronContent.helpers({

	"nextURL": function() {
		 if(Meteor.user()){ return "/home_dash";}  
		  return "/dashboard_page";
	},
	
});

Template.HomePublicJumbotron.onCreated(function() {
	
});

Template.HomePublicJumbotron.onDestroyed(function() {
	
});

Template.HomePublicJumbotron.onRendered(function() {
	
});

Template.HomePublicJumbotron.events({
	"click #jumbotron-button": function(e, t) {
		e.preventDefault();
		Router.go("", {});
	}
	
});

Template.HomePublicJumbotron.helpers({
	
});

Template.HomePublicJumbotronJumbotronContent.events({

});

Template.HomePublicJumbotronJumbotronContent.helpers({

});

Template.HomePublicSection4.events({

});

Template.HomePublicSection4.helpers({

});

Template.HomePublicSection4AllEssaysHome.events({

	
			"click .card": function(e, t) {
		

localStorage.setItem('essayId',this._id);
	//Session.set('essayId',this._id);
console.log(localStorage.getItem('essayId'));
	}

});

Template.HomePublicSection4AllEssaysHome.helpers({

	"pendingEssayList": function() {
		//alert("essay_list.-------"+Essays);
		//alert("essay_list.count()-------"+Essays.find().count());
		  return Essays.find({"approval": "Approved" });
	},
	"formattedContent": function() {
		//alert("essay_list.-------"+Essays);
		//alert("essay_list.count()-------"+Essays.find().count());


   var tmp = document.createElement("DIV");
   tmp.innerHTML = this.Content;
   var tmp1 = tmp.textContent || tmp.innerText || "";

	return tmp1	  ;
	},

});

Template.HomePublicPublicFooter.events({

	"click #footer-button": function(e, t) {

	// }, 

	// 'submit #search-form' : function(e, t) {console.log("function me ara hai");
	// 	e.preventDefault();

var register_email = t.find('#register_email').value.trim();		
		if(!isValidEmail(register_email))
		{   console.log("2345647");

			pageSession.set("errorMessage", "Please enter a valid e-mail address.");
			t.find('#register_email').focus();
			return false;
		}


	 Meteor.call("peopleInsertEmail",  register_email , function(e, r) { if(e) errorAction(e);   
else{
	 
	if(!r){
			 

		pageSession.set("errorMessage", "Email already exists.");
			t.find('#register_email').focus();
			return false;
	}else{
		  formSubmitted.set(true);

	}
}
	});
		

}
});
  formSubmitted = new ReactiveVar( false );
  // errorMessage = new ReactiveVar( false );

Template.HomePublicPublicFooter.helpers({
"formSubmitted": function() {
		 
		  return formSubmitted.get();
	},
		errorMessage: function() {
		return pageSession.get("errorMessage");
	},
});

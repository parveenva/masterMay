import { ReactiveVar } from 'meteor/reactive-var'

Template.HomePublic.onCreated(function() {
	
});

Template.HomePublic.onDestroyed(function() {
	
});

Template.HomePublic.onRendered(function() {
	$('section, .jumbotron').css('min-height', $(window).height()/2 + 'px'); window.scrollTo(0, 0);
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

	
			"click .blue-button": function(e, t) {
		

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

});

Template.HomePublicPublicFooter.events({

	"click #footer-button": function(e, t) {
   formSubmitted.set(true);
	},

});
  formSubmitted = new ReactiveVar( false );

Template.HomePublicPublicFooter.helpers({
"formSubmitted": function() {
		 
		  return formSubmitted.get();
	},
});

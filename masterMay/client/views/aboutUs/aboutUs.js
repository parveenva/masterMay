

Template.aboutUs.onCreated(function() {

});

Template.aboutUs.onDestroyed(function() {
	
});



Template.aboutUs.onRendered(function() {
		//alert("Meteor.userId()"+Meteor.userId());
Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});
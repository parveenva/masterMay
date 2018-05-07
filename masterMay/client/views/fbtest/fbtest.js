Template.Fbtest.onCreated(function() {
	
});

Template.Fbtest.onDestroyed(function() {
	
});

Template.Fbtest.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.Fbtest.events({
	
});

Template.Fbtest.helpers({
	
});

Template.FbtestFbComponent.events({

});

Template.FbtestFbComponent.helpers({

});

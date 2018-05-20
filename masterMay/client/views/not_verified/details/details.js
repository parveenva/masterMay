var pageSession = new ReactiveDict();

Template.NotVerifiedDetails.onCreated(function() {
	
});

Template.NotVerifiedDetails.onDestroyed(function() {
	
});

Template.NotVerifiedDetails.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.NotVerifiedDetails.events({
	
});

Template.NotVerifiedDetails.helpers({
	
});

Template.NotVerifiedDetailsForm.onCreated(function() {
	
});

Template.NotVerifiedDetailsForm.onDestroyed(function() {
	
});

Template.NotVerifiedDetailsForm.onRendered(function() {
	

	pageSession.set("notVerifiedDetailsFormInfoMessage", "");
	pageSession.set("notVerifiedDetailsFormErrorMessage", "");

	$(".input-group.date").each(function() {
		var format = $(this).find("input[type='text']").attr("data-format");

		if(format) {
			format = format.toLowerCase();
		}
		else {
			format = "mm/dd/yyyy";
		}

		$(this).datepicker({
			autoclose: true,
			todayHighlight: true,
			todayBtn: true,
			forceParse: false,
			keyboardNavigation: false,
			format: format
		});
	});

	$("input[type='file']").fileinput();
	$("select[data-role='tagsinput']").tagsinput();
	$(".bootstrap-tagsinput").addClass("form-control");
	$("input[autofocus]").focus();
});

Template.NotVerifiedDetailsForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("notVerifiedDetailsFormInfoMessage", "");
		pageSession.set("notVerifiedDetailsFormErrorMessage", "");

		var self = this;

		function submitAction(result, msg) {
			var notVerifiedDetailsFormMode = "read_only";
			if(!t.find("#form-cancel-button")) {
				switch(notVerifiedDetailsFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("notVerifiedDetailsFormInfoMessage", message);
					}; break;
				}
			}

			/*SUBMIT_REDIRECT*/
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("notVerifiedDetailsFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				
			}
		);

		return false;
	},
	"click #form-cancel-button": function(e, t) {
		e.preventDefault();

		

		/*CANCEL_REDIRECT*/
	},
	"click #form-close-button": function(e, t) {
		e.preventDefault();

		Router.go("not_verified", mergeObjects(Router.currentRouteParams(), {}));
	},
	"click #form-back-button": function(e, t) {
		e.preventDefault();

		Router.go("not_verified", mergeObjects(Router.currentRouteParams(), {}));
	}

	
});

Template.NotVerifiedDetailsForm.helpers({
	"infoMessage": function() {
		return pageSession.get("notVerifiedDetailsFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("notVerifiedDetailsFormErrorMessage");
	}
	
});

var pageSession = new ReactiveDict();

Template.SendEmailDetails.onCreated(function() {
	
});

Template.SendEmailDetails.onDestroyed(function() {
	
});

Template.SendEmailDetails.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.SendEmailDetails.events({
	
});

Template.SendEmailDetails.helpers({
	
});

Template.SendEmailDetailsForm.onCreated(function() {
	
});

Template.SendEmailDetailsForm.onDestroyed(function() {
	
});

Template.SendEmailDetailsForm.onRendered(function() {
	

	pageSession.set("sendEmailDetailsFormInfoMessage", "");
	pageSession.set("sendEmailDetailsFormErrorMessage", "");

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

Template.SendEmailDetailsForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("sendEmailDetailsFormInfoMessage", "");
		pageSession.set("sendEmailDetailsFormErrorMessage", "");

		var self = this;

		function submitAction(result, msg) {
			var sendEmailDetailsFormMode = "read_only";
			if(!t.find("#form-cancel-button")) {
				switch(sendEmailDetailsFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("sendEmailDetailsFormInfoMessage", message);
					}; break;
				}
			}

			/*SUBMIT_REDIRECT*/
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("sendEmailDetailsFormErrorMessage", message);
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

		Router.go("send_email", mergeObjects(Router.currentRouteParams(), {}));
	},
	"click #form-back-button": function(e, t) {
		e.preventDefault();

		Router.go("send_email", mergeObjects(Router.currentRouteParams(), {}));
	}

	
});

Template.SendEmailDetailsForm.helpers({
	"infoMessage": function() {
		return pageSession.get("sendEmailDetailsFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("sendEmailDetailsFormErrorMessage");
	}
	
});

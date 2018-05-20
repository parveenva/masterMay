var pageSession = new ReactiveDict();

Template.SendEmailUpdate.onCreated(function() {
	
});

Template.SendEmailUpdate.onDestroyed(function() {
	
});

Template.SendEmailUpdate.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.SendEmailUpdate.events({
	
});

Template.SendEmailUpdate.helpers({
	
});

Template.SendEmailUpdateForm.onCreated(function() {
	
});

Template.SendEmailUpdateForm.onDestroyed(function() {
	
});

Template.SendEmailUpdateForm.onRendered(function() {
	

	pageSession.set("sendEmailUpdateFormInfoMessage", "");
	pageSession.set("sendEmailUpdateFormErrorMessage", "");

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

Template.SendEmailUpdateForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("sendEmailUpdateFormInfoMessage", "");
		pageSession.set("sendEmailUpdateFormErrorMessage", "");

		var self = this;

		function submitAction(result, msg) {
			var sendEmailUpdateFormMode = "update";
			if(!t.find("#form-cancel-button")) {
				switch(sendEmailUpdateFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("sendEmailUpdateFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("send_email", mergeObjects(Router.currentRouteParams(), {}));
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("sendEmailUpdateFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				Meteor.call("updateUserAccount", t.data.users._id, values, function(e, r) { if(e) errorAction(e); else submitAction(r); });
			}
		);

		return false;
	},
	"click #form-cancel-button": function(e, t) {
		e.preventDefault();

		

		Router.go("send_email", mergeObjects(Router.currentRouteParams(), {}));
	},
	"click #form-close-button": function(e, t) {
		e.preventDefault();

		/*CLOSE_REDIRECT*/
	},
	"click #form-back-button": function(e, t) {
		e.preventDefault();

		/*BACK_REDIRECT*/
	}

	
});

Template.SendEmailUpdateForm.helpers({
	"infoMessage": function() {
		return pageSession.get("sendEmailUpdateFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("sendEmailUpdateFormErrorMessage");
	}
	
});

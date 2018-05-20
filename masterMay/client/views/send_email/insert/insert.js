var pageSession = new ReactiveDict();

Template.SendEmailInsert.onCreated(function() {
	
});

Template.SendEmailInsert.onDestroyed(function() {
	
});

Template.SendEmailInsert.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.SendEmailInsert.events({
	
});

Template.SendEmailInsert.helpers({
	
});

Template.SendEmailInsertForm.onCreated(function() {
	
});

Template.SendEmailInsertForm.onDestroyed(function() {
	
});

Template.SendEmailInsertForm.onRendered(function() {
	

	pageSession.set("sendEmailInsertFormInfoMessage", "");
	pageSession.set("sendEmailInsertFormErrorMessage", "");

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

Template.SendEmailInsertForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("sendEmailInsertFormInfoMessage", "");
		pageSession.set("sendEmailInsertFormErrorMessage", "");

		var self = this;

		function submitAction(result, msg) {
			var sendEmailInsertFormMode = "insert";
			if(!t.find("#form-cancel-button")) {
				switch(sendEmailInsertFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("sendEmailInsertFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("send_email", mergeObjects(Router.currentRouteParams(), {}));
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("sendEmailInsertFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				Meteor.call("createUserAccount", values, function(e, r) { if(e) errorAction(e); else submitAction(r); });
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

Template.SendEmailInsertForm.helpers({
	"infoMessage": function() {
		return pageSession.get("sendEmailInsertFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("sendEmailInsertFormErrorMessage");
	}
	
});

var pageSession = new ReactiveDict();

Template.NotVerifiedUpdate.onCreated(function() {
	
});

Template.NotVerifiedUpdate.onDestroyed(function() {
	
});

Template.NotVerifiedUpdate.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.NotVerifiedUpdate.events({
	
});

Template.NotVerifiedUpdate.helpers({
	
});

Template.NotVerifiedUpdateForm.onCreated(function() {
	
});

Template.NotVerifiedUpdateForm.onDestroyed(function() {
	
});

Template.NotVerifiedUpdateForm.onRendered(function() {
	

	pageSession.set("notVerifiedUpdateFormInfoMessage", "");
	pageSession.set("notVerifiedUpdateFormErrorMessage", "");

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

Template.NotVerifiedUpdateForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("notVerifiedUpdateFormInfoMessage", "");
		pageSession.set("notVerifiedUpdateFormErrorMessage", "");

		var self = this;

		function submitAction(result, msg) {
			var notVerifiedUpdateFormMode = "update";
			if(!t.find("#form-cancel-button")) {
				switch(notVerifiedUpdateFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("notVerifiedUpdateFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("not_verified", mergeObjects(Router.currentRouteParams(), {}));
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("notVerifiedUpdateFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				Meteor.call("peopleUpdate", t.data.people._id, values, function(e, r) { if(e) errorAction(e); else submitAction(r); });
			}
		);

		return false;
	},
	"click #form-cancel-button": function(e, t) {
		e.preventDefault();

		

		Router.go("not_verified", mergeObjects(Router.currentRouteParams(), {}));
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

Template.NotVerifiedUpdateForm.helpers({
	"infoMessage": function() {
		return pageSession.get("notVerifiedUpdateFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("notVerifiedUpdateFormErrorMessage");
	}
	
});

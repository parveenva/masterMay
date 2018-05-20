var pageSession = new ReactiveDict();

Template.NotVerifiedInsert.onCreated(function() {
	
});

Template.NotVerifiedInsert.onDestroyed(function() {
	
});

Template.NotVerifiedInsert.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.NotVerifiedInsert.events({
	
});

Template.NotVerifiedInsert.helpers({
	
});

Template.NotVerifiedInsertForm.onCreated(function() {
	
});

Template.NotVerifiedInsertForm.onDestroyed(function() {
	
});

Template.NotVerifiedInsertForm.onRendered(function() {
	

	pageSession.set("notVerifiedInsertFormInfoMessage", "");
	pageSession.set("notVerifiedInsertFormErrorMessage", "");

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

Template.NotVerifiedInsertForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("notVerifiedInsertFormInfoMessage", "");
		pageSession.set("notVerifiedInsertFormErrorMessage", "");

		var self = this;

		function submitAction(result, msg) {
			var notVerifiedInsertFormMode = "insert";
			if(!t.find("#form-cancel-button")) {
				switch(notVerifiedInsertFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("notVerifiedInsertFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("not_verified", mergeObjects(Router.currentRouteParams(), {}));
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("notVerifiedInsertFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				Meteor.call("peopleInsert", values, function(e, r) { if(e) errorAction(e); else submitAction(r); });
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

Template.NotVerifiedInsertForm.helpers({
	"infoMessage": function() {
		return pageSession.get("notVerifiedInsertFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("notVerifiedInsertFormErrorMessage");
	}
	
});

var pageSession = new ReactiveDict();

Template.CollegesDetails.onCreated(function() {
	
});

Template.CollegesDetails.onDestroyed(function() {
	
});

Template.CollegesDetails.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.CollegesDetails.events({
	
});

Template.CollegesDetails.helpers({
	
});

Template.CollegesDetailsForm.onCreated(function() {
	
});

Template.CollegesDetailsForm.onDestroyed(function() {
	
});

Template.CollegesDetailsForm.onRendered(function() {
	

	pageSession.set("collegesDetailsFormInfoMessage", "");
	pageSession.set("collegesDetailsFormErrorMessage", "");

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

Template.CollegesDetailsForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("collegesDetailsFormInfoMessage", "");
		pageSession.set("collegesDetailsFormErrorMessage", "");

		var self = this;

		function submitAction(result, msg) {
			var collegesDetailsFormMode = "read_only";
			if(!t.find("#form-cancel-button")) {
				switch(collegesDetailsFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("collegesDetailsFormInfoMessage", message);
					}; break;
				}
			}

			/*SUBMIT_REDIRECT*/
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("collegesDetailsFormErrorMessage", message);
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

		Router.go("colleges", mergeObjects(Router.currentRouteParams(), {}));
	},
	"click #form-back-button": function(e, t) {
		e.preventDefault();

		Router.go("colleges", mergeObjects(Router.currentRouteParams(), {}));
	}

	
});

Template.CollegesDetailsForm.helpers({
	"infoMessage": function() {
		return pageSession.get("collegesDetailsFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("collegesDetailsFormErrorMessage");
	}
	
});

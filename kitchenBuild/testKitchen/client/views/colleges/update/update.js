var pageSession = new ReactiveDict();

Template.CollegesUpdate.onCreated(function() {
	
});

Template.CollegesUpdate.onDestroyed(function() {
	
});

Template.CollegesUpdate.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.CollegesUpdate.events({
	
});

Template.CollegesUpdate.helpers({
	
});

Template.CollegesUpdateForm.onCreated(function() {
	
});

Template.CollegesUpdateForm.onDestroyed(function() {
	
});

Template.CollegesUpdateForm.onRendered(function() {
	

	pageSession.set("collegesUpdateFormInfoMessage", "");
	pageSession.set("collegesUpdateFormErrorMessage", "");

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

Template.CollegesUpdateForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("collegesUpdateFormInfoMessage", "");
		pageSession.set("collegesUpdateFormErrorMessage", "");

		var self = this;

		function submitAction(result, msg) {
			var collegesUpdateFormMode = "update";
			if(!t.find("#form-cancel-button")) {
				switch(collegesUpdateFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("collegesUpdateFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("colleges", mergeObjects(Router.currentRouteParams(), {}));
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("collegesUpdateFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				Meteor.call("usersCollegeInfoUpdate", t.data.college._id, values, function(e, r) { if(e) errorAction(e); else submitAction(r); });
			}
		);

		return false;
	},
	"click #form-cancel-button": function(e, t) {
		e.preventDefault();

		

		Router.go("colleges", mergeObjects(Router.currentRouteParams(), {}));
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

Template.CollegesUpdateForm.helpers({
	"infoMessage": function() {
		return pageSession.get("collegesUpdateFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("collegesUpdateFormErrorMessage");
	}
	
});

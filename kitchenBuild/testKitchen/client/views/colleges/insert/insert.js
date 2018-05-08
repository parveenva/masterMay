var pageSession = new ReactiveDict();

Template.CollegesInsert.onCreated(function() {
	
});

Template.CollegesInsert.onDestroyed(function() {
	
});

Template.CollegesInsert.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.CollegesInsert.events({
	
});

Template.CollegesInsert.helpers({
	
});

Template.CollegesInsertForm.onCreated(function() {
	
});

Template.CollegesInsertForm.onDestroyed(function() {
	
});

Template.CollegesInsertForm.onRendered(function() {
	

	pageSession.set("collegesInsertFormInfoMessage", "");
	pageSession.set("collegesInsertFormErrorMessage", "");

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

Template.CollegesInsertForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("collegesInsertFormInfoMessage", "");
		pageSession.set("collegesInsertFormErrorMessage", "");

		var self = this;

		function submitAction(result, msg) {
			var collegesInsertFormMode = "insert";
			if(!t.find("#form-cancel-button")) {
				switch(collegesInsertFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("collegesInsertFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("colleges", mergeObjects(Router.currentRouteParams(), {}));
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("collegesInsertFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				Meteor.call("usersCollegeInfoInsert", values, function(e, r) { if(e) errorAction(e); else submitAction(r); });
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

Template.CollegesInsertForm.helpers({
	"infoMessage": function() {
		return pageSession.get("collegesInsertFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("collegesInsertFormErrorMessage");
	}
	
});

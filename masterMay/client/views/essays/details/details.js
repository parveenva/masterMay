var pageSession = new ReactiveDict();

Template.registerHelper('equals', function(param1, param2) {
	return param1 === param2;
  });

  
  Template.registerHelper('commonORschool', function(param1) {
	if(param1 === "common"){
 return "Common Essay"
	}else{

		return "School specific Essay"
	}
  });
  
  

Template.EssaysDetails.onCreated(function() {
	
});

Template.EssaysDetails.onDestroyed(function() {
	
});

Template.EssaysDetails.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.EssaysDetails.events({
	
});

Template.EssaysDetails.helpers({
	
});

Template.EssaysDetailsForm.onCreated(function() {
	
});

Template.EssaysDetailsForm.onDestroyed(function() {
	
});

Template.EssaysDetailsForm.onRendered(function() {
	

	pageSession.set("essaysDetailsFormInfoMessage", "");
	pageSession.set("essaysDetailsFormErrorMessage", "");

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

Template.EssaysDetailsForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("essaysDetailsFormInfoMessage", "");
		pageSession.set("essaysDetailsFormErrorMessage", "");

		var self = this;

		function submitAction(result, msg) {
			var essaysDetailsFormMode = "insert";
			if(!t.find("#form-cancel-button")) {
				switch(essaysDetailsFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("essaysDetailsFormInfoMessage", message);
					}; break;
				}
			}

			/*SUBMIT_REDIRECT*/
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("essaysDetailsFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				
				Meteor.call("essaysUpdate", t.data.essay._id, values, function(e, r) { if(e) errorAction(e); else submitAction(r); });

				
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

		Router.go("home_dash", mergeObjects(Router.currentRouteParams(), {}));
	},
	"click #form-back-button": function(e, t) {
		e.preventDefault();

		Router.go("home_dash", mergeObjects(Router.currentRouteParams(), {}));
	}

	
});

Template.EssaysDetailsForm.helpers({
	"infoMessage": function() {
		return pageSession.get("essaysDetailsFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("essaysDetailsFormErrorMessage");
	},
	"statusPending": function(e, t){

				//alert( t.data);
						//alert( data.essay);

return true;
		//alert( data.essay.approval);
		//return  data.essay.approval=="Pending" ;
	},
	"isAdmin": function() {
		var isAdmin = false;

		if (Meteor.user().roles.indexOf("admin") != -1)  {

		isAdmin = true;
		
	}

		  return isAdmin;
	},

	
});

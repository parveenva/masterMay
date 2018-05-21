var pageSession = new ReactiveDict();
isSchoolEssay = new ReactiveVar( false );

Template.EssaysInsert.onCreated(function() {
	
});

Template.EssaysInsert.onDestroyed(function() {
	
});

Template.EssaysInsert.onRendered(function() {
	    isSchoolEssay.set(false);

	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});

	});

Template.EssaysInsert.events({
	
});

Template.EssaysInsert.helpers({
	
});

Template.EssaysInsertForm.onCreated(function() {
	
});

Template.EssaysInsertForm.onDestroyed(function() {
	
});

Template.EssaysInsertForm.onRendered(function() {
	
  Session.set("essaysTopMsg", "Submit your college essays and get a free $50 gift card." );

	pageSession.set("essaysInsertFormInfoMessage", "");
	pageSession.set("essaysInsertFormErrorMessage", "");

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

  tinymce.EditorManager.editors = [];
  tinymce.init({
  selector: '#Content',
  skin_url: '/packages/teamon_tinymce/skins/lightgray',
      height : "480",
});

	$("input[type='file']").fileinput();
	$("select[data-role='tagsinput']").tagsinput();
	$(".bootstrap-tagsinput").addClass("form-control");
	$("input[autofocus]").focus();
});

Template.EssaysInsertForm.events({

	'click #sse': function(event, template){
    
    isSchoolEssay.set(true);

  },
  'click #cae': function(event, template){
    
    isSchoolEssay.set(false);

  },
 
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("essaysInsertFormInfoMessage", "");
		pageSession.set("essaysInsertFormErrorMessage", "");

		var self = this;

		   // alert("We events!!");


		function submitAction(result, msg) {
			var essaysInsertFormMode = "update";
			if(!t.find("#form-cancel-button")) {
				switch(essaysInsertFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("essaysInsertFormInfoMessage", message);
					}; break;
				}
			}
 if(Meteor.user()){
			Router.go("home_dash", mergeObjects(Router.currentRouteParams(), {}));
		}
		else{
						Router.go("addmore", mergeObjects(Router.currentRouteParams(), {}));

		}
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("essaysInsertFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				if( !(Meteor.user()) && Session.get("peopleID")){
					//alert("only from out");
					 values.peopleID =Session.get("peopleID");
					// alert( values.peopleID);
				}
				
				Meteor.call("essaysInsert", values, function(e, r) { if(e) errorAction(e); else submitAction(r); });
			}
		);

		return false;
	},
	"click #form-cancel-button": function(e, t) {
		e.preventDefault();

	 if(Meteor.user()){
			Router.go("home_dash", mergeObjects(Router.currentRouteParams(), {}));
		}
		else{
						Router.go("addmore", mergeObjects(Router.currentRouteParams(), {}));

		}
		}
	,
	"click #form-close-button": function(e, t) {
		e.preventDefault();

		/*CLOSE_REDIRECT*/
	},
	"click #form-back-button": function(e, t) {
		e.preventDefault();

		/*BACK_REDIRECT*/
	}

	
});

Template.EssaysInsertForm.helpers({
	"infoMessage": function() {
		return pageSession.get("essaysInsertFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("essaysInsertFormErrorMessage");
	},
	isSchoolEssay: function() {
                  return isSchoolEssay.get();

        }
	
});

function myCustomOnPageLoad() {
    alert("We are nearly ready to rumble!!");
}


 

 
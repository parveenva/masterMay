var pageSession = new ReactiveDict();

Template.HomeDash.onCreated(function() {
	
});

Template.HomeDash.onDestroyed(function() {
			  Session.set("fromVerifyEmail",null);

});

Template.HomeDash.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.HomeDash.events({
	
});

Template.HomeDash.helpers({

	"userId": function() {
		return  Meteor.userId() ;
	},
	

	"isAdmin": function() {
		var isAdmin = false;

		if (Meteor.user().roles.indexOf("admin") != -1)  {

		isAdmin = true;
		}

		  return isAdmin;
	},

	  "fromVerifyEmail": function() {
  
   var fromVerifyEmail = Session.get("fromVerifyEmail");
 		if(fromVerifyEmail !=null  ){

		  return true;
		} else{return false;}
	  }
		   
	
	
});

Template.AdminDash.helpers({



	"userCount": function() {
		//alert("userCount-"+Meteor.users.find({}).count());
		  return Meteor.users.find().count()-1;
	},
	"essayCount": function() {
		//alert("essay_list.-------"+Essays);
		//alert("essay_list.count()-------"+Essays.find().count());
		  return Essays.find().count();
	},
	 "pendingEssayCount": function() {
		//alert("essay_list.-------"+Essays);
		//alert("essay_list.count()-------"+Essays.find().count());
		  return Essays.find({"approval": { $in: [ "", "Pending" ] }}).count();
	},
	
});
var HomeDashHomeDashDvItems = function(cursor) {
	if(!cursor) {
		return [];
	}

	var searchString = pageSession.get("HomeDashHomeDashDvSearchString");
	var sortBy = pageSession.get("HomeDashHomeDashDvSortBy");
	var sortAscending = pageSession.get("HomeDashHomeDashDvSortAscending");
	if(typeof(sortAscending) == "undefined") sortAscending = true;

	var raw = cursor.fetch();

	// filter
	var filtered = [];
	if(!searchString || searchString == "") {
		filtered = raw;
	} else {
		searchString = searchString.replace(".", "\\.");
		var regEx = new RegExp(searchString, "i");
		var searchFields = ["title", "Content", "document"];
		filtered = _.filter(raw, function(item) {
			var match = false;
			_.each(searchFields, function(field) {
				var value = (getPropertyValue(field, item) || "") + "";

				match = match || (value && value.match(regEx));
				if(match) {
					return false;
				}
			})
			return match;
		});
	}



//owner
   if(Meteor.user().roles.indexOf("admin") == -1){
			regEx = new RegExp(Meteor.userId(), "i");
		  searchFields = ["createdBy"];
		filtered = _.filter(filtered, function(item) {
			var match = false;
			_.each(searchFields, function(field) {
				var value = (getPropertyValue(field, item) || "") + "";

				match = match || (value && value.match(regEx));
				if(match) {
					return false;
				}
			})
			return match;
		});

}

	// sort
	if(sortBy) {
		filtered = _.sortBy(filtered, sortBy);

		// descending?
		if(!sortAscending) {
			filtered = filtered.reverse();
		}
	}

	return filtered;
};

var HomeDashHomeDashDvExport = function(cursor, fileType) {
	var data = HomeDashHomeDashDvItems(cursor);
	var exportFields = [];

	var str = exportArrayOfObjects(data, exportFields, fileType);

	var filename = "export." + fileType;

	downloadLocalResource(str, filename, "application/octet-stream");
}

Template.HomeDashHomeDashDv.onCreated(function() {
	
});

Template.HomeDashHomeDashDv.onDestroyed(function() {
	
});

Template.HomeDashHomeDashDv.onRendered(function() {
	pageSession.set("HomeDashHomeDashDvStyle", "table");
	
});

Template.HomeDashHomeDashDv.events({
	"submit #dataview-controls": function(e, t) {
		return false;
	},

	"click #dataview-search-button": function(e, t) {
		e.preventDefault();
		var form = $(e.currentTarget).parent();
		if(form) {
			var searchInput = form.find("#dataview-search-input");
			if(searchInput) {
				searchInput.focus();
				var searchString = searchInput.val();
				pageSession.set("HomeDashHomeDashDvSearchString", searchString);
			}

		}
		return false;
	},

	"keydown #dataview-search-input": function(e, t) {
		if(e.which === 13)
		{
			e.preventDefault();
			var form = $(e.currentTarget).parent();
			if(form) {
				var searchInput = form.find("#dataview-search-input");
				if(searchInput) {
					var searchString = searchInput.val();
					pageSession.set("HomeDashHomeDashDvSearchString", searchString);
				}

			}
			return false;
		}

		if(e.which === 27)
		{
			e.preventDefault();
			var form = $(e.currentTarget).parent();
			if(form) {
				var searchInput = form.find("#dataview-search-input");
				if(searchInput) {
					searchInput.val("");
					pageSession.set("HomeDashHomeDashDvSearchString", "");
				}

			}
			return false;
		}

		return true;
	},

	"click #dataview-insert-button": function(e, t) {
		e.preventDefault();
		/**/
	},

	"click #dataview-export-default": function(e, t) {
		e.preventDefault();
		HomeDashHomeDashDvExport(this.essay_list, "csv");
	},

	"click #dataview-export-csv": function(e, t) {
		e.preventDefault();
		HomeDashHomeDashDvExport(this.essay_list, "csv");
	},

	"click #dataview-export-tsv": function(e, t) {
		e.preventDefault();
		HomeDashHomeDashDvExport(this.essay_list, "tsv");
	},

	"click #dataview-export-json": function(e, t) {
		e.preventDefault();
		HomeDashHomeDashDvExport(this.essay_list, "json");
	}

	
});

Template.HomeDashHomeDashDv.helpers({

	"essayCount": function() {
		//alert("essay_list.-------"+Essays);
		//alert("essay_list.count()-------"+Essays.find().count());
		  return Essays.find({"createdBy": { $in: [ "",  Meteor.userId()] }}).count();
	},
	 "approvedEssayCount": function() {
		//alert("essay_list.-------"+Essays);
		//alert("essay_list.count()-------"+Essays.find().count());
		  // return Essays.find(    {"approval": { $in: [ "", "Approved" ] }}    ).count();
	
           return Essays.find( { $and: [  {"approval": { $in: [ "", "Approved" ] }} , {"createdBy": { $in: [ "",  Meteor.userId()] }} ] } ).count();


	},




	"pendingEssayCount": function() {
		//alert("essay_list.-------"+Essays);
		//alert("essay_list.count()-------"+Essays.find().count());
		  // return Essays.find({"approval": { $in: [ "", "Pending" ] }}).count();
 return Essays.find( { $and: [  {"approval": { $in: [ "", "Pending" ] }} , {"createdBy": { $in: [ "",  Meteor.userId()] }} ] } ).count();

	},
	"insertButtonClass": function() {
		return Essays.userCanInsert(Meteor.userId(), {}) ? "" : "hidden";
	},

	"isEmpty": function() {

		var dt = HomeDashHomeDashDvItems(this.essay_list);

		return !this.essay_list || dt.count() == 0;
	},
	"isNotEmpty": function() {
				var dt = HomeDashHomeDashDvItems(this.essay_list);
//alert(dt.length);
//return true;
		return dt.length > 0;
	},
	"isNotFound": function() {
		return this.essay_list && pageSession.get("HomeDashHomeDashDvSearchString") && HomeDashHomeDashDvItems(this.essay_list).length == 0;
	},
	"searchString": function() {
		return pageSession.get("HomeDashHomeDashDvSearchString");
	},
	"viewAsTable": function() {
		return pageSession.get("HomeDashHomeDashDvStyle") == "table";
	},
	"viewAsBlog": function() {
		return pageSession.get("HomeDashHomeDashDvStyle") == "blog";
	},
	"viewAsList": function() {
		return pageSession.get("HomeDashHomeDashDvStyle") == "list";
	},
	"viewAsGallery": function() {
		return pageSession.get("HomeDashHomeDashDvStyle") == "gallery";
	}

	
});



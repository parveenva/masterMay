var pageSession = new ReactiveDict();

Meteor.subscribe("allUsers");
Meteor.subscribe("people_list");


Template.Essays.onCreated(function() {
	
});

Template.Essays.onDestroyed(function() {
	
});

Template.Essays.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.Essays.events({
	
});

Template.Essays.helpers({
	
});

var EssaysViewItems = function(cursor) {
	if(!cursor) {
		return [];
	}

	var searchString = pageSession.get("EssaysViewSearchString");
	var sortBy = pageSession.get("EssaysViewSortBy");
	var sortAscending = pageSession.get("EssaysViewSortAscending");
	if(typeof(sortAscending) == "undefined") sortAscending = true;

	var raw = cursor.fetch();

	// filter
	var filtered = [];
	if(!searchString || searchString == "") {
		filtered = raw;
	} else {
		searchString = searchString.replace(".", "\\.");
		var regEx = new RegExp(searchString, "i");
		var searchFields = ["title", "Content", "document", "approval"];
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


alert("1");

   if(Meteor.user().roles.indexOf("admin") == -1){
	alert("2");		
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

var EssaysViewExport = function(cursor, fileType) {
	var data = EssaysViewItems(cursor);
	var exportFields = [];

	var str = exportArrayOfObjects(data, exportFields, fileType);

	var filename = "export." + fileType;

	downloadLocalResource(str, filename, "application/octet-stream");
}

Template.EssaysView.onCreated(function() {
	
});

Template.EssaysView.onDestroyed(function() {
	
});

Template.EssaysView.onRendered(function() {
	pageSession.set("EssaysViewStyle", "table");
	
});

Template.EssaysView.events({
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
				pageSession.set("EssaysViewSearchString", searchString);
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
					pageSession.set("EssaysViewSearchString", searchString);
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
					pageSession.set("EssaysViewSearchString", "");
				}

			}
			return false;
		}

		return true;
	},

	"click #dataview-insert-button": function(e, t) {
		e.preventDefault();
		Router.go("essays.insert", mergeObjects(Router.currentRouteParams(), {}));
	},

	"click #dataview-export-default": function(e, t) {
		e.preventDefault();
		EssaysViewExport(this.essay_list, "csv");
	},

	"click #dataview-export-csv": function(e, t) {
		e.preventDefault();
		EssaysViewExport(this.essay_list, "csv");
	},

	"click #dataview-export-tsv": function(e, t) {
		e.preventDefault();
		EssaysViewExport(this.essay_list, "tsv");
	},

	"click #dataview-export-json": function(e, t) {
		e.preventDefault();
		EssaysViewExport(this.essay_list, "json");
	}

	
});

Template.EssaysView.helpers({

	"insertButtonClass": function() {
		return Essays.userCanInsert(Meteor.userId(), {}) ? "" : "hidden";
	},

	"isEmpty": function() {
		return !this.essay_list || this.essay_list.count() == 0;
	},
	"isNotEmpty": function() {
		return this.essay_list && this.essay_list.count() > 0;
	},
	"isNotFound": function() {
		return this.essay_list && pageSession.get("EssaysViewSearchString") && EssaysViewItems(this.essay_list).length == 0;
	},
	"searchString": function() {
		return pageSession.get("EssaysViewSearchString");
	},
	"viewAsTable": function() {
		return pageSession.get("EssaysViewStyle") == "table";
	},
	"viewAsBlog": function() {
		return pageSession.get("EssaysViewStyle") == "blog";
	},
	"viewAsList": function() {
		return pageSession.get("EssaysViewStyle") == "list";
	},
	"viewAsGallery": function() {
		return pageSession.get("EssaysViewStyle") == "gallery";
	}

	
});


Template.EssaysViewTable.onCreated(function() {
	
});

Template.EssaysViewTable.onDestroyed(function() {
	
});

Template.EssaysViewTable.onRendered(function() {
	
});

Template.EssaysViewTable.events({
	"click .th-sortable": function(e, t) {
		e.preventDefault();
		var oldSortBy = pageSession.get("EssaysViewSortBy");
		var newSortBy = $(e.target).attr("data-sort");

		pageSession.set("EssaysViewSortBy", newSortBy);
		if(oldSortBy == newSortBy) {
			var sortAscending = pageSession.get("EssaysViewSortAscending") || false;
			pageSession.set("EssaysViewSortAscending", !sortAscending);
		} else {
			pageSession.set("EssaysViewSortAscending", true);
		}
	}
});

Template.EssaysViewTable.helpers({
	"tableItems": function() {
		return EssaysViewItems(this.essay_list);
	}
});


Template.EssaysViewTableItems.onCreated(function() {
	
});

Template.EssaysViewTableItems.onDestroyed(function() {
	
});

Template.EssaysViewTableItems.onRendered(function() {
	
});

Template.EssaysViewTableItems.events({
	

	"click td": function(e, t) {
		e.preventDefault();
		
		Router.go("essays.details", mergeObjects(Router.currentRouteParams(), {essayId: this._id}));
		return false;
	},

	"click .inline-checkbox": function(e, t) {
		e.preventDefault();

		if(!this || !this._id) return false;

		var fieldName = $(e.currentTarget).attr("data-field");
		if(!fieldName) return false;

		var values = {};
		values[fieldName] = !this[fieldName];

		Meteor.call("essaysUpdate", this._id, values, function(err, res) {
			if(err) {
				alert(err.message);
			}
		});

		return false;
	},

	"click #delete-button": function(e, t) {
		e.preventDefault();
		var me = this;
		bootbox.dialog({
			message: "Delete? Are you sure?",
			title: "Delete",
			animate: false,
			buttons: {
				success: {
					label: "Yes",
					className: "btn-success",
					callback: function() {
						Meteor.call("essaysRemove", me._id, function(err, res) {
							if(err) {
								alert(err.message);
							}
						});
					}
				},
				danger: {
					label: "No",
					className: "btn-default"
				}
			}
		});
		return false;
	},
	"click #edit-button": function(e, t) {
		e.preventDefault();
		Router.go("essays.update", mergeObjects(Router.currentRouteParams(), {essayId: this._id}));
		return false;
	}
});

Template.EssaysViewTableItems.helpers({
	

	"checked": function(value) { return value ? "checked" : "" }, 
	"editButtonClass": function() {
		return Essays.userCanUpdate(Meteor.userId(), this) ? "" : "hidden";
	},

	"deleteButtonClass": function() {
		return Essays.userCanRemove(Meteor.userId(), this) ? "" : "hidden";
	},
	createdByUserDetails: function () {
		
		if(this.createdBy){
        return Users.findOne({_id: this.createdBy});
    	}else{
        return People.findOne({_id: this.peopleID});

    	}
    },

    "formattedContent": function() {
		//alert("essay_list.-------"+Essays);
		//alert("essay_list.count()-------"+Essays.find().count());


   var tmp = document.createElement("DIV");
   tmp.innerHTML = this.Content;
   var tmp1 = tmp.textContent || tmp.innerText || "";

	return tmp1	  ;
	}
	
    

   
});


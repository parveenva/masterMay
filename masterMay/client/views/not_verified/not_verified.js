var pageSession = new ReactiveDict();
Meteor.subscribe("people_list");
Meteor.subscribe("essay_list");


Template.NotVerified.onCreated(function() {
	
});

Template.NotVerified.onDestroyed(function() {
	
});

Template.NotVerified.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.NotVerified.events({
	
});

Template.NotVerified.helpers({
	
});

var NotVerifiedViewItems = function(cursor) {
	if(!cursor) {
		return [];
	}

	var searchString = pageSession.get("NotVerifiedViewSearchString");
	var sortBy = pageSession.get("NotVerifiedViewSortBy");
	var sortAscending = pageSession.get("NotVerifiedViewSortAscending");
	if(typeof(sortAscending) == "undefined") sortAscending = true;

	var raw = cursor.fetch();

	// filter
	var filtered = [];
	if(!searchString || searchString == "") {
		filtered = raw;
	} else {
		searchString = searchString.replace(".", "\\.");
		var regEx = new RegExp(searchString, "i");
		var searchFields = ["firstName", "lastName", "email"];
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

var NotVerifiedViewExport = function(cursor, fileType) {
	var data = NotVerifiedViewItems(cursor);
	var exportFields = [];

	var str = exportArrayOfObjects(data, exportFields, fileType);

	var filename = "export." + fileType;

	downloadLocalResource(str, filename, "application/octet-stream");
}

Template.NotVerifiedView.onCreated(function() {
	
});

Template.NotVerifiedView.onDestroyed(function() {
	
});

Template.NotVerifiedView.onRendered(function() {
	pageSession.set("NotVerifiedViewStyle", "table");
	
});

Template.NotVerifiedView.events({
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
				pageSession.set("NotVerifiedViewSearchString", searchString);
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
					pageSession.set("NotVerifiedViewSearchString", searchString);
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
					pageSession.set("NotVerifiedViewSearchString", "");
				}

			}
			return false;
		}

		return true;
	},

	"click #dataview-insert-button": function(e, t) {
		e.preventDefault();
		Router.go("not_verified.insert", mergeObjects(Router.currentRouteParams(), {}));
	},

	"click #dataview-export-default": function(e, t) {
		e.preventDefault();
		NotVerifiedViewExport(this.people_list, "csv");
	},

	"click #dataview-export-csv": function(e, t) {
		e.preventDefault();
		NotVerifiedViewExport(this.people_list, "csv");
	},

	"click #dataview-export-tsv": function(e, t) {
		e.preventDefault();
		NotVerifiedViewExport(this.people_list, "tsv");
	},

	"click #dataview-export-json": function(e, t) {
		e.preventDefault();
		NotVerifiedViewExport(this.people_list, "json");
	}

	
});

Template.NotVerifiedView.helpers({

	"insertButtonClass": function() {
		return People.userCanInsert(Meteor.userId(), {}) ? "" : "hidden";
	},

	"isEmpty": function() {
		return !this.people_list || this.people_list.count() == 0;
	},
	"isNotEmpty": function() {
		return this.people_list && this.people_list.count() > 0;
	},
	"isNotFound": function() {
		return this.people_list && pageSession.get("NotVerifiedViewSearchString") && NotVerifiedViewItems(this.people_list).length == 0;
	},
	"searchString": function() {
		return pageSession.get("NotVerifiedViewSearchString");
	},
	"viewAsTable": function() {
		return pageSession.get("NotVerifiedViewStyle") == "table";
	},
	"viewAsBlog": function() {
		return pageSession.get("NotVerifiedViewStyle") == "blog";
	},
	"viewAsList": function() {
		return pageSession.get("NotVerifiedViewStyle") == "list";
	},
	"viewAsGallery": function() {
		return pageSession.get("NotVerifiedViewStyle") == "gallery";
	}

	
});


Template.NotVerifiedViewTable.onCreated(function() {
	
});

Template.NotVerifiedViewTable.onDestroyed(function() {
	
});

Template.NotVerifiedViewTable.onRendered(function() {
	
});

Template.NotVerifiedViewTable.events({
	"click .th-sortable": function(e, t) {
		e.preventDefault();
		var oldSortBy = pageSession.get("NotVerifiedViewSortBy");
		var newSortBy = $(e.target).attr("data-sort");

		pageSession.set("NotVerifiedViewSortBy", newSortBy);
		if(oldSortBy == newSortBy) {
			var sortAscending = pageSession.get("NotVerifiedViewSortAscending") || false;
			pageSession.set("NotVerifiedViewSortAscending", !sortAscending);
		} else {
			pageSession.set("NotVerifiedViewSortAscending", true);
		}
	}
});

Template.NotVerifiedViewTable.helpers({
	"tableItems": function() {
		return NotVerifiedViewItems(this.people_list);
	}
});


Template.NotVerifiedViewTableItems.onCreated(function() {
	
});

Template.NotVerifiedViewTableItems.onDestroyed(function() {
	
});

Template.NotVerifiedViewTableItems.onRendered(function() {
	
});

Template.NotVerifiedViewTableItems.events({
	

	// "click td": function(e, t) {
	// 	e.preventDefault();
		
	// 	Router.go("not_verified.details", mergeObjects(Router.currentRouteParams(), {peopleId: this._id}));
	// 	return false;
	// },

	"click .inline-checkbox": function(e, t) {
		e.preventDefault();

		if(!this || !this._id) return false;

		var fieldName = $(e.currentTarget).attr("data-field");
		if(!fieldName) return false;

		var values = {};
		values[fieldName] = !this[fieldName];

		Meteor.call("peopleUpdate", this._id, values, function(err, res) {
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
						Meteor.call("peopleRemove", me._id, function(err, res) {
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
		Router.go("not_verified.update", mergeObjects(Router.currentRouteParams(), {peopleId: this._id}));
		return false;
	}
});

Template.NotVerifiedViewTableItems.helpers({
	

	"checked": function(value) { return value ? "checked" : "" }, 
	"editButtonClass": function() {
		return People.userCanUpdate(Meteor.userId(), this) ? "" : "hidden";
	},

	"deleteButtonClass": function() {
		 
		return People.userCanRemove(Meteor.userId(), this) ? "" : "hidden";
			}
		// ,
	// "abc":function(){

	// 	return People.find().count();
	// }
,
createdByUserDetails: function () {
		
		if(this.createdBy){
        return Users.findOne({_id: this.createdBy});
    	}else{
        return People.findOne({_id: this.peopleID});

    	}
    }

});










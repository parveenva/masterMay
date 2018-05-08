var pageSession = new ReactiveDict();

Template.Colleges.onCreated(function() {
	
});

Template.Colleges.onDestroyed(function() {
	
});

Template.Colleges.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.Colleges.events({
	
});

Template.Colleges.helpers({
	
});

var CollegesViewItems = function(cursor) {
	if(!cursor) {
		return [];
	}

	var searchString = pageSession.get("CollegesViewSearchString");
	var sortBy = pageSession.get("CollegesViewSortBy");
	var sortAscending = pageSession.get("CollegesViewSortAscending");
	if(typeof(sortAscending) == "undefined") sortAscending = true;

	var raw = cursor.fetch();

	// filter
	var filtered = [];
	if(!searchString || searchString == "") {
		filtered = raw;
	} else {
		searchString = searchString.replace(".", "\\.");
		var regEx = new RegExp(searchString, "i");
		var searchFields = ["schoolNames", "whySchool", "message"];
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

var CollegesViewExport = function(cursor, fileType) {
	var data = CollegesViewItems(cursor);
	var exportFields = [];

	var str = exportArrayOfObjects(data, exportFields, fileType);

	var filename = "export." + fileType;

	downloadLocalResource(str, filename, "application/octet-stream");
}

Template.CollegesView.onCreated(function() {
	
});

Template.CollegesView.onDestroyed(function() {
	
});

Template.CollegesView.onRendered(function() {
	pageSession.set("CollegesViewStyle", "table");
	
});

Template.CollegesView.events({
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
				pageSession.set("CollegesViewSearchString", searchString);
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
					pageSession.set("CollegesViewSearchString", searchString);
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
					pageSession.set("CollegesViewSearchString", "");
				}

			}
			return false;
		}

		return true;
	},

	"click #dataview-insert-button": function(e, t) {
		e.preventDefault();
		Router.go("colleges.insert", mergeObjects(Router.currentRouteParams(), {}));
	},

	"click #dataview-export-default": function(e, t) {
		e.preventDefault();
		CollegesViewExport(this.college_list, "csv");
	},

	"click #dataview-export-csv": function(e, t) {
		e.preventDefault();
		CollegesViewExport(this.college_list, "csv");
	},

	"click #dataview-export-tsv": function(e, t) {
		e.preventDefault();
		CollegesViewExport(this.college_list, "tsv");
	},

	"click #dataview-export-json": function(e, t) {
		e.preventDefault();
		CollegesViewExport(this.college_list, "json");
	}

	
});

Template.CollegesView.helpers({

	"insertButtonClass": function() {
		return UsersCollegeInfo.userCanInsert(Meteor.userId(), {}) ? "" : "hidden";
	},

	"isEmpty": function() {
		return !this.college_list || this.college_list.count() == 0;
	},
	"isNotEmpty": function() {
		return this.college_list && this.college_list.count() > 0;
	},
	"isNotFound": function() {
		return this.college_list && pageSession.get("CollegesViewSearchString") && CollegesViewItems(this.college_list).length == 0;
	},
	"searchString": function() {
		return pageSession.get("CollegesViewSearchString");
	},
	"viewAsTable": function() {
		return pageSession.get("CollegesViewStyle") == "table";
	},
	"viewAsBlog": function() {
		return pageSession.get("CollegesViewStyle") == "blog";
	},
	"viewAsList": function() {
		return pageSession.get("CollegesViewStyle") == "list";
	},
	"viewAsGallery": function() {
		return pageSession.get("CollegesViewStyle") == "gallery";
	}

	
});


Template.CollegesViewTable.onCreated(function() {
	
});

Template.CollegesViewTable.onDestroyed(function() {
	
});

Template.CollegesViewTable.onRendered(function() {
	
});

Template.CollegesViewTable.events({
	"click .th-sortable": function(e, t) {
		e.preventDefault();
		var oldSortBy = pageSession.get("CollegesViewSortBy");
		var newSortBy = $(e.target).attr("data-sort");

		pageSession.set("CollegesViewSortBy", newSortBy);
		if(oldSortBy == newSortBy) {
			var sortAscending = pageSession.get("CollegesViewSortAscending") || false;
			pageSession.set("CollegesViewSortAscending", !sortAscending);
		} else {
			pageSession.set("CollegesViewSortAscending", true);
		}
	}
});

Template.CollegesViewTable.helpers({
	"tableItems": function() {
		return CollegesViewItems(this.college_list);
	}
});


Template.CollegesViewTableItems.onCreated(function() {
	
});

Template.CollegesViewTableItems.onDestroyed(function() {
	
});

Template.CollegesViewTableItems.onRendered(function() {
	
});

Template.CollegesViewTableItems.events({
	

	"click td": function(e, t) {
		e.preventDefault();
		
		Router.go("colleges.details", mergeObjects(Router.currentRouteParams(), {collegeId: this._id}));
		return false;
	},

	"click .inline-checkbox": function(e, t) {
		e.preventDefault();

		if(!this || !this._id) return false;

		var fieldName = $(e.currentTarget).attr("data-field");
		if(!fieldName) return false;

		var values = {};
		values[fieldName] = !this[fieldName];

		Meteor.call("usersCollegeInfoUpdate", this._id, values, function(err, res) {
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
						Meteor.call("usersCollegeInfoRemove", me._id, function(err, res) {
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
		Router.go("colleges.update", mergeObjects(Router.currentRouteParams(), {collegeId: this._id}));
		return false;
	}
});

Template.CollegesViewTableItems.helpers({
	

	"checked": function(value) { return value ? "checked" : "" }, 
	"editButtonClass": function() {
		return UsersCollegeInfo.userCanUpdate(Meteor.userId(), this) ? "" : "hidden";
	},

	"deleteButtonClass": function() {
		return UsersCollegeInfo.userCanRemove(Meteor.userId(), this) ? "" : "hidden";
	}
});

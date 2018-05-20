var pageSession = new ReactiveDict();

Template.SendEmail.onCreated(function() {
	
});

Template.SendEmail.onDestroyed(function() {
	
});

Template.SendEmail.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.SendEmail.events({
	
});

Template.SendEmail.helpers({
	
});

var SendEmailViewItems = function(cursor) {
	if(!cursor) {
		return [];
	}

	var searchString = pageSession.get("SendEmailViewSearchString");
	var sortBy = pageSession.get("SendEmailViewSortBy");
	var sortAscending = pageSession.get("SendEmailViewSortAscending");
	if(typeof(sortAscending) == "undefined") sortAscending = true;

	var raw = cursor.fetch();

	// filter
	var filtered = [];
	if(!searchString || searchString == "") {
		filtered = raw;
	} else {
		searchString = searchString.replace(".", "\\.");
		var regEx = new RegExp(searchString, "i");
		var searchFields = [];
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

var SendEmailViewExport = function(cursor, fileType) {
	var data = SendEmailViewItems(cursor);
	var exportFields = [];

	var str = exportArrayOfObjects(data, exportFields, fileType);

	var filename = "export." + fileType;

	downloadLocalResource(str, filename, "application/octet-stream");
}

Template.SendEmailView.onCreated(function() {
	
});

Template.SendEmailView.onDestroyed(function() {
	
});

Template.SendEmailView.onRendered(function() {
	pageSession.set("SendEmailViewStyle", "table");
	
});

Template.SendEmailView.events({
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
				pageSession.set("SendEmailViewSearchString", searchString);
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
					pageSession.set("SendEmailViewSearchString", searchString);
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
					pageSession.set("SendEmailViewSearchString", "");
				}

			}
			return false;
		}

		return true;
	},

	"click #dataview-insert-button": function(e, t) {
		e.preventDefault();
		Router.go("send_email.insert", mergeObjects(Router.currentRouteParams(), {}));
	},

	"click #dataview-export-default": function(e, t) {
		e.preventDefault();
		SendEmailViewExport(this.users_list, "csv");
	},

	"click #dataview-export-csv": function(e, t) {
		e.preventDefault();
		SendEmailViewExport(this.users_list, "csv");
	},

	"click #dataview-export-tsv": function(e, t) {
		e.preventDefault();
		SendEmailViewExport(this.users_list, "tsv");
	},

	"click #dataview-export-json": function(e, t) {
		e.preventDefault();
		SendEmailViewExport(this.users_list, "json");
	}

	
});

Template.SendEmailView.helpers({

	

	"isEmpty": function() {
		return !this.users_list || this.users_list.count() == 0;
	},
	"isNotEmpty": function() {
		return this.users_list && this.users_list.count() > 0;
	},
	"isNotFound": function() {
		return this.users_list && pageSession.get("SendEmailViewSearchString") && SendEmailViewItems(this.users_list).length == 0;
	},
	"searchString": function() {
		return pageSession.get("SendEmailViewSearchString");
	},
	"viewAsTable": function() {
		return pageSession.get("SendEmailViewStyle") == "table";
	},
	"viewAsBlog": function() {
		return pageSession.get("SendEmailViewStyle") == "blog";
	},
	"viewAsList": function() {
		return pageSession.get("SendEmailViewStyle") == "list";
	},
	"viewAsGallery": function() {
		return pageSession.get("SendEmailViewStyle") == "gallery";
	}

	
});


Template.SendEmailViewTable.onCreated(function() {
	
});

Template.SendEmailViewTable.onDestroyed(function() {
	
});

Template.SendEmailViewTable.onRendered(function() {
	
});

Template.SendEmailViewTable.events({
	"click .th-sortable": function(e, t) {
		e.preventDefault();
		var oldSortBy = pageSession.get("SendEmailViewSortBy");
		var newSortBy = $(e.target).attr("data-sort");

		pageSession.set("SendEmailViewSortBy", newSortBy);
		if(oldSortBy == newSortBy) {
			var sortAscending = pageSession.get("SendEmailViewSortAscending") || false;
			pageSession.set("SendEmailViewSortAscending", !sortAscending);
		} else {
			pageSession.set("SendEmailViewSortAscending", true);
		}
	}
});

Template.SendEmailViewTable.helpers({
	"tableItems": function() {
		return SendEmailViewItems(this.users_list);
	}
});


Template.SendEmailViewTableItems.onCreated(function() {
	
});

Template.SendEmailViewTableItems.onDestroyed(function() {
	
});

Template.SendEmailViewTableItems.onRendered(function() {
	
});

Template.SendEmailViewTableItems.events({
	

	"click td": function(e, t) {
		e.preventDefault();
		
		Router.go("send_email.details", mergeObjects(Router.currentRouteParams(), {usersId: this._id}));
		return false;
	},

	"click .inline-checkbox": function(e, t) {
		e.preventDefault();

		if(!this || !this._id) return false;

		var fieldName = $(e.currentTarget).attr("data-field");
		if(!fieldName) return false;

		var values = {};
		values[fieldName] = !this[fieldName];

		Meteor.call("usersUpdate", this._id, values, function(err, res) {
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
						Meteor.call("usersRemove", me._id, function(err, res) {
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
		Router.go("send_email.update", mergeObjects(Router.currentRouteParams(), {usersId: this._id}));
		return false;
	}
});

Template.SendEmailViewTableItems.helpers({
	

	"checked": function(value) { return value ? "checked" : "" }, 
	"editButtonClass": function() {
		return Users.isAdmin(Meteor.userId()) ? "" : "hidden";
	},

	"deleteButtonClass": function() {
		return Users.isAdmin(Meteor.userId()) ? "" : "hidden";
	}
});

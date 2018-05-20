this.SendEmailUpdateController = RouteController.extend({
	template: "SendEmailUpdate",
	

	yieldTemplates: {
		/*YIELD_TEMPLATES*/
	},

	onBeforeAction: function() {
		this.next();
	},

	action: function() {
		if(this.isReady()) { this.render(); } else { this.render("loading"); }
		/*ACTION_FUNCTION*/
	},

	isReady: function() {
		

		var subs = [
			Meteor.subscribe("users", this.params.usersId)
		];
		var ready = true;
		_.each(subs, function(sub) {
			if(!sub.ready())
				ready = false;
		});
		return ready;
	},

	data: function() {
		

		var data = {
			params: this.params || {},
			users: Users.findOne({_id:this.params.usersId}, {})
		};
		

		

		return data;
	},

	onAfterAction: function() {
		
	}
});
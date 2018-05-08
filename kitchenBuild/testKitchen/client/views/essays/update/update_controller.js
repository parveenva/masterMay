this.EssaysUpdateController = RouteController.extend({
	template: "EssaysUpdate",
	

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
			Meteor.subscribe("essay", this.params.essayId)
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
			essay: Essays.findOne({_id:this.params.essayId}, {})
		};
		

		

		return data;
	},

	onAfterAction: function() {
		
	}
});
this.VerifyEmailController = RouteController.extend({
	template: "verifyEmail",
	

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
		
		var token = this.params.token;

		var acc = Accounts.verifyEmail(token, function () {

			
        });



		if(!acc){
			 Meteor.call("verifyPeopleEmail", token, function(err, res) {
			if(err) {
				//alert(err.message);
			}else{
                              //alert("done");
            
            }
			});
		} 

		var subs = [
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
			params: this.params || {}
		};
		

		

		return data;
	},

	onAfterAction: function() {
		
	}
});
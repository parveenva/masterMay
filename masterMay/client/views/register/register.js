var pageSession = new ReactiveDict();

Template.Register.onCreated(function() {
	pageSession.set("errorMessage", "");
	
});

Template.Register.onDestroyed(function() {
	
});

Template.Register.onRendered(function() {
	pageSession.set("errorMessage", "");
	pageSession.set("verificationEmailSent", false);

	

	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.Register.events({
	'submit #register_form' : function(e, t) {
		e.preventDefault();

		var submit_button = $(t.find(":submit"));

		var register_name = t.find('#register_name').value.trim();
		var register_email = t.find('#register_email').value.trim();
		var register_password = t.find('#register_password').value;
		var register_password_copy = t.find('#register_password_copy').value;

		// check name
		if(register_name == "")
		{
			pageSession.set("errorMessage", "Please enter your name.");
			t.find('#register_name').focus();
			return false;
		}

		// check email
		if(!isValidEmail(register_email))
		{
			pageSession.set("errorMessage", "Please enter valid e-mail address.");
			t.find('#register_email').focus();
			return false;
		}

		// check password
		var min_password_len = 6;
		if(!isValidPassword(register_password, min_password_len))
		{
			pageSession.set("errorMessage", "Your password must be at least " + min_password_len + " characters long.");
			t.find('#register_password').focus();
			return false;
		}

		if(!isValidPassword(register_password_copy, min_password_len) || register_password_copy != register_password)
		{
			//pageSession.set("errorMessage", "Your password must be at least " + min_password_len + " characters long.");
			pageSession.set("errorMessage", "Passwords do not match.");
			t.find('#register_password_copy').focus();
			return false;
		}

		submit_button.button("loading");
		Accounts.createUser({email: register_email, password : register_password, profile: { name: register_name }}, function(err) {
			submit_button.button("reset");
			if(err) {
				if(err.error === 499) {
					pageSession.set("verificationEmailSent", true);
				} else {
					pageSession.set("errorMessage", err.message);
				}
			}
			else
			{
				pageSession.set("errorMessage", "");
				pageSession.set("verificationEmailSent", true);
			}
		});
		return false;
	},

	"click .go-home": function(e, t) {
		Router.go("/");
	}
	
});

Template.Register.helpers({
	errorMessage: function() {
		return pageSession.get("errorMessage");
	},
	verificationEmailSent: function() {
		return pageSession.get("verificationEmailSent");
	}
	
});

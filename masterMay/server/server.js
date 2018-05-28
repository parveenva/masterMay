var verifyEmail = true;

Accounts.config({ sendVerificationEmail: verifyEmail });

Accounts.emailTemplates.verifyEmail.subject = function(user, url) {
    return 'Open College Essays - confirm your email address.' ;
};

Accounts.emailTemplates.verifyEmail.from = function(user, url) {
    return 'Open College Essays <info@openessays.org>' ;
};


Accounts.emailTemplates.verifyEmail.html = function(user, url) {
    return `
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
	<meta name="viewport" content="width=device-width">
	<title> Open College Essays - confirm your  email address</title>
	<style type="text/css">
@media (min-width: 500px) {
  .avatar__media .media__fluid {
    margin-top: 3px !important;
  }
}


@media (min-width: 500px) {
  .button,
	.button__shadow {
    font-size: 16px !important;
    display: inline-block !important;
    width: auto !important;
  }
}


@media (min-width: 500px) {
  footer li {
    display: inline-block !important;
    margin-right: 20px !important;
  }
}


@media (min-width: 500px) {
  .mt1--lg {
    margin-top: 10px !important;
  }
}


@media (min-width: 500px) {
  .mt2--lg {
    margin-top: 20px !important;
  }
}


@media (min-width: 500px) {
  .mt3--lg {
    margin-top: 30px !important;
  }
}


@media (min-width: 500px) {
  .mt4--lg {
    margin-top: 40px !important;
  }
}


@media (min-width: 500px) {
  .mb1--lg {
    margin-bottom: 10px !important;
  }
}


@media (min-width: 500px) {
  .mb2--lg {
    margin-bottom: 20px !important;
  }
}


@media (min-width: 500px) {
  .mb3--lg {
    margin-bottom: 30px !important;
  }
}


@media (min-width: 500px) {
  .mb4--lg {
    margin-bottom: 40px !important;
  }
}


@media (min-width: 500px) {
  .pt1--lg {
    padding-top: 10px !important;
  }
}


@media (min-width: 500px) {
  .pt2--lg {
    padding-top: 20px !important;
  }
}


@media (min-width: 500px) {
  .pt3--lg {
    padding-top: 30px !important;
  }
}


@media (min-width: 500px) {
  .pt4--lg {
    padding-top: 40px !important;
  }
}


@media (min-width: 500px) {
  .pb1--lg {
    padding-bottom: 10px !important;
  }
}


@media (min-width: 500px) {
  .pb2--lg {
    padding-bottom: 20px !important;
  }
}


@media (min-width: 500px) {
  .pb3--lg {
    padding-bottom: 30px !important;
  }
}


@media (min-width: 500px) {
  .pb4--lg {
    padding-bottom: 40px !important;
  }
}


@media (min-width: 500px) {
  pre {
    font-size: 14px !important;
  }
  .body {
    font-size: 14px !important;
    line-height: 24px !important;
  }
  h1 {
    font-size: 22px !important;
  }
  h2 {
    font-size: 16px !important;
  }
  small {
    font-size: 12px !important;
  }
}


@media (min-width: 500px) {
  .user-content pre,
	.user-content code {
    font-size: 14px !important;
    line-height: 24px !important;
  }
  .user-content ul,
	.user-content ol,
	.user-content pre {
    margin-top: 12px !important;
    margin-bottom: 12px !important;
  }
  .user-content hr {
    margin: 12px 0 !important;
  }
  .user-content h1 {
    font-size: 22px !important;
  }
  .user-content h2 {
    font-size: 16px !important;
  }
  .user-content h3 {
    font-size: 14px !important;
  }
}
</style>
</head>

<body class="body" style="font-family: -apple-system, BlinkMacSystemFont, Roboto, Ubuntu, Helvetica, sans-serif; line-height: initial; max-width: 580px;">

	<h1 style="box-sizing: border-box; font-size: 1.25rem; margin: 0; margin-bottom: 0.5em; padding: 0;">Thanks for joining Open College Essays!</h1>
	<p style="box-sizing: border-box; margin: 0; margin-bottom: 0.5em; padding: 0;">Please confirm that your email address is correct to continue. Click the link below to confirm.</p>
	
	<p class="mt2 mb2 mt3--lg mb3--lg" style="box-sizing: border-box; margin: 0; margin-bottom: 20px; margin-top: 20px; padding: 0;">
		<span class="button__shadow" style="border-bottom: 2px solid rgba(0,0,0,0.1); border-radius: 4px; box-sizing: border-box; display: block; width: 100%;">
			<a class="button" href="${url}" style="background: #204dd5; border: 1px solid #000; border-radius: 3px; box-sizing: border-box; color: white; display: block; font-size: 1rem; font-weight: 600; padding: 12px 20px; text-align: center; text-decoration: none; width: 100%;" target="_blank">
				Confirm Email Address
			</a>
		</span></p>
	
	 
 
	<p></p>
	
	<footer class="mt2 mt4--lg" style="border-top: 1px solid #D9D9D9; margin-top: 20px; padding: 20px 0;">
		<ul style="box-sizing: border-box; list-style: none; margin: 0; margin-bottom: 0; padding: 0;">
			<li style="box-sizing: border-box; margin: 0; margin-bottom: 10px; padding: 0;">
				<small style="box-sizing: border-box; color: #999;"><a href="http://www.openessays.org/" style="border-bottom: 1px solid #E6E6E6; box-sizing: border-box; color: inherit; text-decoration: none;" target="_blank">Open College Essays</a></small>
			</li>
			 
		</ul>
	</footer>
</body>`
      ;
};

Meteor.startup(function() {
	// read environment variables from Meteor.settings
	if(Meteor.settings && Meteor.settings.env && _.isObject(Meteor.settings.env)) {
		for(var variableName in Meteor.settings.env) {
			process.env[variableName] = Meteor.settings.env[variableName];
		}
	}
  process.env.MAIL_URL="smtp://xgendemo:R1tew0rk@smtp.gmail.com:587/";	//
	// Setup OAuth login service configuration (read from Meteor.settings)
	//
	// Your settings file should look like this:
	//
	// {
	//     "oauth": {
	//         "google": {
	//             "clientId": "yourClientId",
	//             "secret": "yourSecret"
	//         },
	//         "github": {
	//             "clientId": "yourClientId",
	//             "secret": "yourSecret"
	//         }
	//     }
	// }
	//
	if(Accounts && Accounts.loginServiceConfiguration && Meteor.settings && Meteor.settings.oauth && _.isObject(Meteor.settings.oauth)) {
		// google
		if(Meteor.settings.oauth.google && _.isObject(Meteor.settings.oauth.google)) {
			// remove old configuration
			Accounts.loginServiceConfiguration.remove({
				service: "google"
			});

			var settingsObject = Meteor.settings.oauth.google;
			settingsObject.service = "google";

			// add new configuration
			Accounts.loginServiceConfiguration.insert(settingsObject);
		}
		// github
		if(Meteor.settings.oauth.github && _.isObject(Meteor.settings.oauth.github)) {
			// remove old configuration
			Accounts.loginServiceConfiguration.remove({
				service: "github"
			});

			var settingsObject = Meteor.settings.oauth.github;
			settingsObject.service = "github";

			// add new configuration
			Accounts.loginServiceConfiguration.insert(settingsObject);
		}
		// linkedin
		if(Meteor.settings.oauth.linkedin && _.isObject(Meteor.settings.oauth.linkedin)) {
			// remove old configuration
			Accounts.loginServiceConfiguration.remove({
				service: "linkedin"
			});

			var settingsObject = Meteor.settings.oauth.linkedin;
			settingsObject.service = "linkedin";

			// add new configuration
			Accounts.loginServiceConfiguration.insert(settingsObject);
		}
		// facebook
		if(Meteor.settings.oauth.facebook && _.isObject(Meteor.settings.oauth.facebook)) {
			// remove old configuration
			Accounts.loginServiceConfiguration.remove({
				service: "facebook"
			});

			var settingsObject = Meteor.settings.oauth.facebook;
			settingsObject.service = "facebook";

			// add new configuration
			Accounts.loginServiceConfiguration.insert(settingsObject);
		}
		// twitter
		if(Meteor.settings.oauth.twitter && _.isObject(Meteor.settings.oauth.twitter)) {
			// remove old configuration
			Accounts.loginServiceConfiguration.remove({
				service: "twitter"
			});

			var settingsObject = Meteor.settings.oauth.twitter;
			settingsObject.service = "twitter";

			// add new configuration
			Accounts.loginServiceConfiguration.insert(settingsObject);
		}
		// meteor
		if(Meteor.settings.oauth.meteor && _.isObject(Meteor.settings.oauth.meteor)) {
			// remove old configuration
			Accounts.loginServiceConfiguration.remove({
				service: "meteor-developer"
			});

			var settingsObject = Meteor.settings.oauth.meteor;
			settingsObject.service = "meteor-developer";

			// add new configuration
			Accounts.loginServiceConfiguration.insert(settingsObject);
		}
	}

	
});

Meteor.methods({
	"createUserAccount": function(options) {
		if(!Users.isAdmin(Meteor.userId())) {
			throw new Meteor.Error(403, "Access denied.");
		}

		var userOptions = {};
		if(options.username) userOptions.username = options.username;
		if(options.email) userOptions.email = options.email;
		if(options.password) userOptions.password = options.password;
		if(options.profile) userOptions.profile = options.profile;
		if(options.profile && options.profile.email) userOptions.email = options.profile.email;

		Accounts.createUser(userOptions);
	},
	"updateUserAccount": function(userId, options) {
		// only admin or users own profile
		if(!(Users.isAdmin(Meteor.userId()) || userId == Meteor.userId())) {
			throw new Meteor.Error(403, "Access denied.");
		}

		// non-admin user can change only profile
		if(!Users.isAdmin(Meteor.userId())) {
			var keys = Object.keys(options);
			if(keys.length !== 1 || !options.profile) {
				throw new Meteor.Error(403, "Access denied.");
			}
		}

		var userOptions = {};
		if(options.username) userOptions.username = options.username;
		if(options.email) userOptions.email = options.email;
		if(options.password) userOptions.password = options.password;
		if(options.profile) userOptions.profile = options.profile;

		if(options.profile && options.profile.email) userOptions.email = options.profile.email;
		if(options.roles) userOptions.roles = options.roles;

		if(userOptions.email) {
			var email = userOptions.email;
			delete userOptions.email;
			var userData = Users.findOne(this.userId);
			if(userData.emails && !userData.emails.find(function(mail) { return mail.address == email; })) {
				userOptions.emails = [{ address: email }];
			}
		}

		var password = "";
		if(userOptions.password) {
			password = userOptions.password;
			delete userOptions.password;
		}

		if(userOptions) {
			for(var key in userOptions) {
				var obj = userOptions[key];
				if(_.isObject(obj)) {
					for(var k in obj) {
						userOptions[key + "." + k] = obj[k];
					}
					delete userOptions[key];
				}
			}
			Users.update(userId, { $set: userOptions });
		}

		if(password) {
			Accounts.setPassword(userId, password);
		}
	},

	"sendMail": function(options) {
		this.unblock();

		Email.send(options);
	}
});

Accounts.onCreateUser(function (options, user) {
	user.roles = ["user"];

	if(options.profile) {
		user.profile = options.profile;
	}

	if(!Users.findOne({ roles: "admin" }) && user.roles.indexOf("admin") < 0) {
		user.roles = ["admin"];
	 }

	return user;
});

Accounts.validateLoginAttempt(function(info) {

	// reject users with role "blocked"
	if(info.user && Users.isInRole(info.user._id, "blocked")) {
		throw new Meteor.Error(403, "Your account is blocked.");
	}

  if(verifyEmail && info.user && info.user.emails && info.user.emails.length && !info.user.emails[0].verified ) {
			throw new Meteor.Error(  "Please click on the link in the verification email we have sent you to sign-in.");
  }

	return true;
});


Users.before.insert(function(userId, doc) {
	if(doc.emails && doc.emails[0] && doc.emails[0].address) {
		doc.profile = doc.profile || {};
		doc.profile.email = doc.emails[0].address;
	} else {
		// oauth
		if(doc.services) {
			// google e-mail
			if(doc.services.google && doc.services.google.email) {
				doc.profile = doc.profile || {};
				doc.profile.email = doc.services.google.email;
			} else {
				// github e-mail
				if(doc.services.github && doc.services.github.accessToken) {
					var github = new GitHub({
						version: "3.0.0",
						timeout: 5000
					});

					github.authenticate({
						type: "oauth",
						token: doc.services.github.accessToken
					});

					try {
						var result = github.user.getEmails({});
						var email = _.findWhere(result, { primary: true });
						if(!email && result.length && _.isString(result[0])) {
							email = { email: result[0] };
						}

						if(email) {
							doc.profile = doc.profile || {};
							doc.profile.email = email.email;
						}
					} catch(e) {
						console.log(e);
					}
				} else {
					// linkedin email
					if(doc.services.linkedin && doc.services.linkedin.emailAddress) {
						doc.profile = doc.profile || {};
						doc.profile.name = doc.services.linkedin.firstName + " " + doc.services.linkedin.lastName;
						doc.profile.email = doc.services.linkedin.emailAddress;
					} else {
						if(doc.services.facebook && doc.services.facebook.email) {
							doc.profile = doc.profile || {};
							doc.profile.email = doc.services.facebook.email;
						} else {
							if(doc.services.twitter && doc.services.twitter.email) {
								doc.profile = doc.profile || {};
								doc.profile.email = doc.services.twitter.email;
							} else {
								if(doc.services["meteor-developer"] && doc.services["meteor-developer"].emails && doc.services["meteor-developer"].emails.length) {
									doc.profile = doc.profile || {};
									doc.profile.email = doc.services["meteor-developer"].emails[0].address;
								}
							}
						}
					}
				}
			}
		}
	}
});

Users.before.update(function(userId, doc, fieldNames, modifier, options) {
	if(modifier.$set && modifier.$set.emails && modifier.$set.emails.length && modifier.$set.emails[0].address) {
		modifier.$set.profile.email = modifier.$set.emails[0].address;
	}
});

Accounts.onLogin(function (info) {
	
});

Accounts.urls.resetPassword = function (token) {
	return Meteor.absoluteUrl('reset_password/' + token);
};

Accounts.urls.verifyEmail = function (token) {
	return Meteor.absoluteUrl('verify_email/' + token);
};

Accounts.urls.enrollAccount = function (token) {
	return Meteor.absoluteUrl('create_password/' + token);
};

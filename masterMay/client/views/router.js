Router.configure({
	templateNameConverter: "upperCamelCase",
	routeControllerNameConverter: "upperCamelCase",
	layoutTemplate: "layout",
	notFoundTemplate: "notFound",
	loadingTemplate: "loading"
});

Router.publicRoutes = [
	"login",
	"register",
	"forgot_password",

	"reset_password",
	"aboutUs"
];

Router.privateRoutes = [
	"essays",
	"essays.details",
	"essays.update",
	"customers",
	"customers.insert",
	"customers.details",
	"customers.edit",
	"invoices",
	"invoices.insert",
	"invoices.details",
	"invoices.details.items",
	"invoices.details.insert",
	"invoices.details.edit",
	"invoices.edit",
	"admin",
	"admin.users",
	"admin.users.details",
	"admin.users.insert",
	"admin.users.edit",
	"user_settings",
	"user_settings.profile",
	"user_settings.change_pass",
	"logout",
	"colleges",
	"colleges.details",
	"colleges.insert",
	"colleges.update",
	
	"home_dash",
	"not_verified",
	"not_verified.details",
	"not_verified.insert",
	"not_verified.update"
];

Router.freeRoutes = [
	"home_public",
	"fbtest",
	"dashboard_page",
	"readblog",
	"more_essay",
		"essays.insert",
		"submittedEssays",
"aboutUs"
];

Router.roleMap = [
	{ route: "invoices",	roles: ["admin"] },
	{ route: "invoices.insert",	roles: ["admin"] },
	{ route: "invoices.details",	roles: ["admin"] },
	{ route: "invoices.details.items",	roles: ["admin"] },
	{ route: "invoices.details.insert",	roles: ["admin"] },
	{ route: "invoices.details.edit",	roles: ["admin"] },
	{ route: "invoices.edit",	roles: ["admin"] },
	{ route: "admin",	roles: ["admin"] },
	{ route: "admin.users",	roles: ["admin"] },
	{ route: "admin.users.details",	roles: ["admin"] },
	{ route: "admin.users.insert",	roles: ["admin"] },
	{ route: "admin.users.edit",	roles: ["admin"] }
];

Router.defaultFreeRoute = "home_public";
Router.defaultPublicRoute = "login";
Router.defaultPrivateRoute = "home_dash";

Router.waitOn(function() { 
	Meteor.subscribe("current_user_data");
});

Router.onBeforeAction(function() {
	// loading indicator here
	if(!this.ready()) {
		this.render('loading');
		$("body").addClass("wait");
	} else {
		$("body").removeClass("wait");
		this.next();
	}
});

Router.onBeforeAction(Router.ensureNotLogged, {only: Router.publicRoutes});
Router.onBeforeAction(Router.ensureLogged, {only: Router.privateRoutes});
Router.onBeforeAction(Router.ensureGranted, {only: Router.freeRoutes}); // yes, route from free zone can be restricted to specific set of user roles

Router.map(function () {
	this.route("/readblog", {name: "readblog",

                                   onBeforeAction: function (pause) {
                if (!Meteor.user()) { 
                // render the login template but keep the url in the browser the same
                this.render('Login');
            }
else {
//     // otherwise don't hold up the rest of hooks or our route/action function
//     // from running
    this.next();}
       },





	 title: "", controller: "ReadblogController"});
	
	this.route("/", {name: "home_public", title: "", controller: "HomePublicController"});
	this.route("/fbtest", {name: "fbtest", title: "", controller: "FbtestController"});
	this.route("/login", {name: "login", title: "", controller: "LoginController"});
	this.route("/register", {name: "register", title: "", controller: "RegisterController"});
	this.route("/forgot_password", {name: "forgot_password", title: "", controller: "ForgotPasswordController"});
	this.route("/reset_password/:resetPasswordToken", {name: "reset_password", title: "", controller: "ResetPasswordController"});
	this.route("/essays", {name: "essays", title: "", controller: "EssaysController"});
	this.route("/essays/details/:essayId", {name: "essays.details", title: "", controller: "EssaysDetailsController"});
	this.route("/essays/insert", {name: "essays.insert", title: "", controller: "EssaysInsertController"});
	this.route("/essays/update/:essayId", {name: "essays.update", title: "", controller: "EssaysUpdateController"});
	this.route("/customers", {name: "customers", title: "", controller: "CustomersController"});
	this.route("/customers/insert", {name: "customers.insert", title: "", controller: "CustomersInsertController"});
	this.route("/customers/details/:customerId", {name: "customers.details", title: "", controller: "CustomersDetailsController"});
	this.route("/customers/edit/:customerId", {name: "customers.edit", title: "", controller: "CustomersEditController"});
	this.route("/invoices", {name: "invoices", title: "", controller: "InvoicesController"});
	this.route("/invoices/insert", {name: "invoices.insert", title: "", controller: "InvoicesInsertController"});
	this.route("/invoices/details/:invoiceId", {name: "invoices.details", title: "", controller: "InvoicesDetailsController"});
	this.route("/invoices/details/:invoiceId/items", {name: "invoices.details.items", title: "", controller: "InvoicesDetailsItemsController"});
	this.route("/invoices/details/:invoiceId/insert", {name: "invoices.details.insert", title: "", controller: "InvoicesDetailsInsertController"});
	this.route("/invoices/details/:invoiceId/edit/:itemId", {name: "invoices.details.edit", title: "", controller: "InvoicesDetailsEditController"});
	this.route("/invoices/edit/:invoiceId", {name: "invoices.edit", title: "", controller: "InvoicesEditController"});
	this.route("/admin", {name: "admin", title: "", controller: "AdminController"});
	this.route("/admin/users", {name: "admin.users", title: "", controller: "AdminUsersController"});
	this.route("/admin/users/details/:userId", {name: "admin.users.details", title: "", controller: "AdminUsersDetailsController"});
	this.route("/admin/users/insert", {name: "admin.users.insert", title: "", controller: "AdminUsersInsertController"});
	this.route("/admin/users/edit/:userId", {name: "admin.users.edit", title: "", controller: "AdminUsersEditController"});
	this.route("/user_settings", {name: "user_settings", title: "", controller: "UserSettingsController"});
	this.route("/user_settings/profile", {name: "user_settings.profile", title: "", controller: "UserSettingsProfileController"});
	this.route("/user_settings/change_pass", {name: "user_settings.change_pass", title: "", controller: "UserSettingsChangePassController"});
	this.route("/logout", {name: "logout", title: "", controller: "LogoutController"});
	this.route("/colleges", {name: "colleges", title: "", controller: "CollegesController"});
	this.route("/colleges/details/:collegeId", {name: "colleges.details", title: "", controller: "CollegesDetailsController"});
	this.route("/colleges/insert", {name: "colleges.insert", title: "", controller: "CollegesInsertController"});
	this.route("/colleges/update/:collegeId", {name: "colleges.update", title: "", controller: "CollegesUpdateController"});
	this.route("/dashboard_page", {name: "dashboard_page", title: "", controller: "DashboardPageController"});
	this.route("/home_dash", {name: "home_dash", title: "", controller: "HomeDashController"});
	this.route("/submittedEssays", {name: "submittedEssays", title: "", controller: "submittedEssays_controller"});

      this.route('addmore', {
        path: '/addmore',
        template: 'addmore'
    }); 	
	this.route('/verify_email/:token', {
		name: "verify_email",
        controller: 'VerifyEmailController',
        title: ""
       
    });

    this.route('verified', {
        path: '/verified',
        template: 'verified'
    });

    this.route('verifyemail', {
        path: '/verifyemail',
        template: 'verifyemail'
	});
	
    Router.route('/AddStudentData', {
  name: 'AddStudentData'
});

this.route("/not_verified", {name: "not_verified", title: "", controller: "NotVerifiedController"});
	this.route("/not_verified/details/:peopleId", {name: "not_verified.details", title: "", controller: "NotVerifiedDetailsController"});
	this.route("/not_verified/insert", {name: "not_verified.insert", title: "", controller: "NotVerifiedInsertController"});
	this.route("/not_verified/update/:peopleId", {name: "not_verified.update", title: "", controller: "NotVerifiedUpdateController"});

this.route("/aboutUs", {name: "aboutUs", title: "", controller: "AboutUsController"});
this.route('aboutUs1', {
        path: '/aboutUs1',
        template: 'aboutUs1'
    });

this.route('RegisterTerms', {
        path: '/RegisterTerms',
        template: 'RegisterTerms'
    });
});

import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';
 SimpleSchema.extendOptions(['autoform']);


Schemas = {};

Template.DashboardPage.onRendered(function() {

 tinymce.EditorManager.editors = [];
  tinymce.init({
  selector: '#Content',
  skin_url: '/packages/teamon_tinymce/skins/lightgray',
      height : "480",
      width : "800",
});

});

Schemas.Person = new SimpleSchema({
  firstName: {
    type: String
   
   },
  lastName: {
    type: String 
  },
  
  Email: {
    type: String,
    
 regEx: SimpleSchema.RegEx.Email
   
   },

}, { tracker: Tracker });


Schemas.essayInformation = new SimpleSchema({
   title:{
    type: String ,
         label: "Essay Prompt"

  },
  commonAppSchool: {
    type: String, 
     label: "Common App/School"
  },
  Content: {
    type: String,

    label: 'Essay',
    autoform: {
         type: 'textarea',
          id: 'Content'
      }
    }
}, { tracker: Tracker });

Schemas.essayInformation1 = new SimpleSchema({
  title:{
    type: String 
  },
  commonAppSchool: {
    type: String 
 
  },
  Content: {
    type: String 
 
  },
  userType: {
    type: String 
 
  },
  peopleID: {
    type: String 
 
  },
  createdBy: {
    type: String,
    optional : true 
 
  },
  approval: {
    type: String,
    optional : true 
 
  }
}, { tracker: Tracker });


Essays.attachSchema(Schemas.essayInformation1);


 
//var data = {};
//Essays.attachSchema(Schema.essayInformation1);

var Collections = {};

Template.registerHelper("Collections", Collections);

 People.attachSchema(Schemas.Person);

var combinedSchema = {};
var schemaB = Schemas.essayInformation.schema();
var schemaA = Schemas.Person.schema();

for (var key in schemaA) {
   combinedSchema[key] = schemaA[key];
}
for (var key in schemaB) {
   combinedSchema[key] = schemaB[key];
}
  CombinedForm = new SimpleSchema(combinedSchema);




  AutoForm.addHooks('afInsertDemo', {

      
    onSubmit: function (insertDoc, updateDoc, currentDoc) {
        this.event.preventDefault();
        
 
        var docA = {};
            var docB = {};
            
            for (var key in Schemas.essayInformation.schema()) {
               
                docB[key] = insertDoc[key];
 
               
            }

for (var key in Schemas.Person.schema()) {
               
                docA[key] = insertDoc[key];
 
               
            }
           Session.set("peopleFirstName", docA["firstName"]);
            Session.set("peopleLastName", docA["lastName"]);
            Session.set("peopleEmail", docA["Email"]);

var peopleID =  People.insert(docA, function(err, id) {
          if (err) {
           alert(err);
          } else {
 
          }
        });
            Session.set("peopleID", peopleID);

            var extend =  _.extend(docB, {"userType":"people","peopleID":peopleID,"approval":"Pending"});
  Essays.insert(extend, function(err, id) {
          if (err) {
                      alert(err);

          } else {
           
          }
        });
        
 
     Router.go("/addmore", {});

        return true;
    },
});



  
Template.DashboardPage.events({
  'click #cae': function(event, template){
   

 
console.log("clicked");
Session.set("isEditSession", "true");

  },
//   'click #sse': function(event, template){
   

 
// console.log("clicked");
// Session.set("isEditSession", "false");

//   }
});


Template.DashboardPage.helpers({
        isEdit: function() {
            console.log("edit helper : " + Session.get("isEditSession"));
            return Session.get("isEditSession");
        }
    });

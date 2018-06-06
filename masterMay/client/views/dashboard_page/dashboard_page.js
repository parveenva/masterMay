import { ReactiveVar } from 'meteor/reactive-var'

import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';
 SimpleSchema.extendOptions(['autoform']);



Schemas = {};
  Session.set("essaysTopMsg", "Submit your college essays and get a free $50 gift card." );

Template.DashboardPage.onRendered(function() {

  if(Session.get("peopleID")!=null) {
		
    Router.go( "addmore");

  }

  Session.set("essaysTopMsg", "Submit your college essays and get a free $50 gift card." );


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
  
  title: {
    type: String,

    label: 'Essay Prompt',
    autoform: {
         type: 'textarea',
          id: 'Essay Prompt'
      }
    },
    essayCategory: {
    type: String,
        label: 'Common App or School Specific',

    autoform: {
      afFieldInput: {
        options: function () { return {
          common: 'Common App Essay',
          school: 'School Specific Essay',
         
        } }
      }
    }
  },
  schoolName: {
    type: String ,
    optional:true,
     autoform: {
         placeholder: 'School name'
       }
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
  essayCategory: {
    type: String ,
             optional:true

 
  },
  schoolName: {
    type: String ,
             optional:true

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
  
 
});



Template.essaysTop.helpers({
        essaysTopMsg: function() {
                  return Session.get("essaysTopMsg");


        } 
    });

 Template.addmore.onCreated(function() {
        Blaze._allowJavascriptUrls();

}); 

Template.addmore.onRendered(function() {
 Session.set("essaysTopMsg", "Thank you for the submission." );
});


Template.addmore.helpers({

  "peopleEssayCount": function() {
if(Session.get("peopleID")!=null){
    var peopleEssay = Essays.find({"peopleID": Session.get("peopleID") });
    if(peopleEssay!=null) {
      return peopleEssay.count();
      }
    }
      return 0;
  
    } ,

    "peopleExists": function() {
 if(Session.get("verificationEmailSentSession")!=null && Session.get("verificationEmailSentSession")){
       
 
      return true;
       
    }
      return false;
  
    } 
});


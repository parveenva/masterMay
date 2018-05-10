import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';
 

Schemas = {};

 
Schemas.Person = new SimpleSchema({
  firstName: {
    type: String
   
   },
  lastName: {
    type: String 
  },
  age: {
    type: Number 
  },
  Email: {
    type: String
   
   },

}, { tracker: Tracker });


Schemas.essayInformation = new SimpleSchema({
  title:{
    type: String 
  },
  Content: {
    type: String 
 
  }
}, { tracker: Tracker });

Schemas.essayInformation1 = new SimpleSchema({
  title:{
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
var peopleID =  People.insert(docA, function(err, id) {
          if (err) {
           alert(err);
          } else {
 
          }
        });
alert("peopleID---"+peopleID);
            var extend =  _.extend(docB, {"userType":"people","peopleID":peopleID});
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
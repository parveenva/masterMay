import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

Schemas = {};

Template.registerHelper("Schemas", Schemas);

Schemas.Person = new SimpleSchema({
  firstName: {
    type: String
   
   },
  lastName: {
    type: String,
    optional: true
  },
  age: {
    type: Number,
    optional: true
  }
}, { tracker: Tracker });

var Collections = {};

Template.registerHelper("Collections", Collections);

 People.attachSchema(Schemas.Person);


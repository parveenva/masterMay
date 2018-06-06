import { publishPagination } from 'meteor/kurounin:pagination';

 

publishPagination(Essays/*, {
    filters: {is_published: true}
}*/);

Meteor.publish("essay_list", function() {
	return Essays.find({}, {});
});

Meteor.publish("essays_null", function() {
	return Essays.find({_id:null}, {});
});

Meteor.publish("essay", function(essayId) {
	return Essays.find({_id:essayId}, {});
});


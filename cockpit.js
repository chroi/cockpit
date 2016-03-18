Items = new Mongo.Collection("items");
Subscriptions = new Mongo.Collection("subscriptions");

client = "AMON CONSULTING MANAGMENT";

if (Meteor.isClient) {

    Template.body.helpers({
        items: function () {
        return Items.find({client: client});
        },

        amount: function() {
            return Subscriptions.find({client: client});
        }
    });

    
/* old stuff that has to do with the example app */
    
  // counter starts at 0
  Session.setDefault('counter', 0);

  Template.hello.helpers({
    counter: function () {
      return Session.get('counter');
    }
  });

  Template.hello.events({
    'click button': function () {
      // increment the counter when button is clicked
      Session.set('counter', Session.get('counter') + 1);
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}

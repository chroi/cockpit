Items = new Mongo.Collection("items");
Subscriptions = new Mongo.Collection("subscriptions");

client = "AMON CONSULTING MANAGMENT";

Item = Astro.Class({
  name: 'Item',
  collection: Items,
  fields: {
    client: 'string',
    project: 'string',
    started_at: 'date',
    ended_at: 'date',
    description: 'string'
  },
  methods: {
      duration: function() {
          return (this.started_at - this.ended_at);
      }
  }
});

if (Meteor.isClient) {

    Template.body.helpers({
        items: function () {
        return Items.find({client: client});
        },

        amount: function() {
            return _.reduce(_.map(Subscriptions.find({client: client}).fetch(), 
                function(sub) {
                  //map
                  return sub.amount;
                }), 
                function(amount, sum){ 
                  //reduce
                  return amount + sum;
                });
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

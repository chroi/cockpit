Items = new Mongo.Collection("items");
Subscriptions = new Mongo.Collection("subscriptions");

client = "AMON CONSULTING MANAGMENT";
//client = "HARMONIOUS BREATHING";

AccountsTemplates.configure({
    forbidClientAccountCreation: true,
});

T9n.setLanguage('fr');

Subscription = Astro.Class({
  name: 'Subscription',
  collection: Subscriptions,
  fields: {
    client: 'string',
    started_at: 'date',
    amount: 'number'
  }
});

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
          return moment.duration(this.ended_at - this.started_at).asHours();
      },
      date: function() {
          return moment(this.started_at).format("LL");
      }
  }
});

if (Meteor.isClient) {

    Template.body.helpers({
        items: function() {
        return Items.find({client: client, started_at: {$gte: new Date('2016-03-01'), $lte: new Date('2016-03-29')}});
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
                }) - _.reduce(_.map(Items.find({client: client}).fetch(), 
                function(item) {
                  //map
                  return item.duration();
                }), 
                function(amount, sum){ 
                  //reduce
                  return amount + sum;
                });
        },

        sumForMonth: function() {
            return _.reduce(_.map(Items.find({client: client, started_at: {$gte: new Date('2016-03-01'), $lte: new Date('2016-03-29')}}).fetch(), 
                function(item) {
                  //map
                  return item.duration();
                }), 
                function(amount, sum){ 
                  //reduce
                  return amount + sum;
                });
        },

        currentMonth: function() {
            return "Mars";
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

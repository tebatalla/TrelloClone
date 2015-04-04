TrelloClone.Views.ListShow = Backbone.CompositeView.extend({
  template: JST['list/show'],

  className: 'col-md-4',

  events: {
    "click .delete": "deleteList",
    "click .add": "displayAddCard",
    "click .remove-add": "removeAddCard"
  },

  render: function () {
    var content = this.template({
      list: this.model
    });
    this.$el.html(content);

    this.model.cards().each( function (card) {
      var cardInListView = new TrelloClone.Views.ListShowItem({
        model: card
      });
      this.addSubview('.cards', cardInListView);
    }.bind(this));

    this.addCardView = $('<a class="add">Add a new card</a>');
    
    this.$('.cards').after(this.addCardView);
  
    return this;
  },

  initialize: function() {
    this.listenTo(this.model.cards(), "add", this.render);
  },

  removeAddCard: function () {
    this.newCardView.$el.replaceWith(this.addCardView);
  },

  displayAddCard: function (event) {
    event.preventDefault();

    this.newCardView = new TrelloClone.Views.CardForm({
      model: new TrelloClone.Models.Card(),
      collection: this.model.cards(),
      list: this.model
    });

    this.addCardView.replaceWith(this.newCardView.render().$el);
  },

  deleteList: function () {
    this.remove();
    this.newCardView && this.newCardView.remove();
    this.addCardView && this.addCardView.remove();
    this.model.destroy();
  }
});
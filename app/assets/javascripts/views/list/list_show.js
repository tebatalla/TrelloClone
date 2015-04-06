TrelloClone.Views.ListShow = Backbone.CompositeView.extend({
  template: JST['list/show'],

  className: 'list-item',
  tagName: 'li',

  events: {
    "click .delete": "deleteList",
    "click .add": "displayAddCard",
    "click .remove-add": "removeAddCard"
  },

  attributes: function () {
    return {
      "data-id": this.model.id
    };
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

    this.$('.cards').sortable({
      connectWith: '.cards',
      placeholder: "card-placeholder",
      stop: this.dropDraggable.bind(this)
    });
  
    return this;
  },

  dropDraggable: function (event, ui) {
    var newListId = ui.item.parent().parent().parent().data('id');
    var cards = ui.item.parent().children();

    _.each( cards, function (card, index) {
      var cardModel, oldCollection;
      var newCollection = this.collection.get(newListId).cards();
      var id = $(card).data('id');
      if ($(card).data('id') === ui.item.data('id')) {
        oldCollection = this.model.cards();
        cardModel = oldCollection.get(id);
      } else {
        oldCollection = newCollection;
        cardModel = oldCollection.get(id);
      }
      cardModel.set({
        "ord": index,
        "list_id": newListId
      });
      cardModel.save({}, {
        success: function (cardModel) {
          oldCollection.remove(cardModel);
          newCollection.add(cardModel);
        }.bind(this)
      });
    }.bind(this));
  },

  initialize: function(options) {
    this.board = options.board;
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
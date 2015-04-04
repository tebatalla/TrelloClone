TrelloClone.Views.ListShow = Backbone.CompositeView.extend({
  template: JST['list/show'],

  className: 'col-md-3',

  events: {
    "click .delete": "deleteList",
    "click .add": "displayAddCard",
    "dblclick": "displayAddCard"
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
  
  
    return this;
  },

  displayAddCard: function () {
    this.$el.off('dblclick');
    this.$el.off('click', '.add');
    var newCardView = new TrelloClone.Views.CardForm({
      model: new TrelloClone.Models.Card(),
      collection: this.model.cards(),
      list: this.model
    });

    this.addSubview('.cards', newCardView);
  },

  deleteList: function () {
    this.remove();
    this.model.destroy();
  }
});
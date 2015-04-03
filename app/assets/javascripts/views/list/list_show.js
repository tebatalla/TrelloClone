TrelloClone.Views.ListShow = Backbone.CompositeView.extend({
  template: JST['list/show'],

  className: 'col-md-3',

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
});
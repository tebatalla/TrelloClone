TrelloClone.Views.CardForm = Backbone.View.extend({
  template: JST['card/new'],

  tagName: 'form',

  events: {
    'submit': 'createCard'
  },

  render: function () {
    var content = this.template();
  
    this.$el.html(content);
  
    return this;
  },
});
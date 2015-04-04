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

  initialize: function(options) {
    this.list = options.list;
  },

  createCard: function () {
    event.preventDefault();

    var data = this.$el.serializeJSON();
    this.model.set(data);
    this.model.set({
      'list_id': this.list.id,
      'ord': this.setOrd()
    });
    this.model.save({}, {
      success: function () {
        this.collection.add(this.model);
        this.remove();
      }.bind(this)
    });
  },

  setOrd: function () {
    TrelloClone.Views.ListForm.prototype.setOrd.call(this);
  }
});
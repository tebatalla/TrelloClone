TrelloClone.Views.ListShowItem = Backbone.View.extend({
  template: JST['list/show_item'],

  render: function () {
    var content = this.template({
      card: this.model
    });
  
    this.$el.html(content);
  
    return this;
  },

  className: 'list-group-item card'
});
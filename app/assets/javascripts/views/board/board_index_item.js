TrelloClone.Views.BoardIndexItem = Backbone.View.extend({
  className: 'list-group-item board-item',
  
  render: function () {
    var content = this.template({
      board: this.model
    });
  
    this.$el.html(content);

    return this;
  },

  template: JST['board/index_item']
});
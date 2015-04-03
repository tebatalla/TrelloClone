TrelloClone.Views.BoardIndex = Backbone.CompositeView.extend({
  template: JST['board/index'],

  initialize: function () {
    this.listenTo(this.collection, "add sync", this.render);
  },

  render: function () {
    var viewContent = this.template();
    this.$el.html(viewContent);

    this.collection.each( function (board) {
      var boardIndexItem = new TrelloClone.Views.BoardIndexItem({
        model: board
      });
      this.addSubview('.boards', boardIndexItem);
    }.bind(this));

    return this;
  }
});
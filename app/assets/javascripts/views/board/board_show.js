TrelloClone.Views.BoardShow = Backbone.CompositeView.extend({
  template: JST['board/show'],

  initialize: function () {
    this.listenTo(this.model, "sync", this.render);
  },

  render: function () {
    var content = this.template({
      board: this.model
    });
  
    this.$el.html(content);

    this.model.lists().each( function (list) {
      var listView = new TrelloClone.Views.ListShow({
        model: list,
        collection: this.model.lists()
      });
      this.addSubview('.lists', listView);
    }.bind(this));
  
    return this;
  }
  
});
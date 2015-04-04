TrelloClone.Views.BoardShow = Backbone.CompositeView.extend({
  template: JST['board/show'],

  initialize: function () {
    this.listenTo(this.model, "sync", this.render);
    this.listenTo(this.model.lists(), "add", this.render);
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

    var newListView = new TrelloClone.Views.ListForm({
      model: new TrelloClone.Models.List({}),
      board: this.model,
      collection: this.model.lists()
    });

    this.addSubview('.container', newListView);

    this.$('.lists').sortable({
      connectWith: '.lists'
    });
  
    return this;
  },

  className: 'jumbotron'
  
});
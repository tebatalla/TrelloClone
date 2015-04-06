TrelloClone.Views.BoardShow = Backbone.CompositeView.extend({
  template: JST['board/show'],

  initialize: function () {
    this.listenTo(this.model, "sync", this.render);
    this.listenTo(this.model.lists(), "add", this.render);
  },

  events: {
    "click .new-list": "displayAddListForm",
    "click .remove-new-list": "removeAddListForm"
  },

  displayAddListForm: function (event) {
    event.preventDefault();
    var newListView = new TrelloClone.Views.ListForm({
      model: new TrelloClone.Models.List({}),
      board: this.model,
      collection: this.model.lists()
    });

    this.$newList && this.$newList.remove();

    this.$('.lists').append(newListView.render().$el);

  },

  render: function () {
    var content = this.template({
      board: this.model
    });
  
    this.$el.html(content);

    this.model.lists().each( function (list) {
      var listView = new TrelloClone.Views.ListShow({
        model: list,
        collection: this.model.lists(),
        board: this.model
      });
      this.addSubview('.lists', listView);
    }.bind(this));

    this.$newList = $('<li class="list-item">');
    this.$newList.append('<div class="list">');
    this.$newList.find('.list').append('<a class="new-list">Add a new list</a>');
    this.$('.lists').append(this.$newList);


    // this.$el.append(newListView.render().$el);


    this.$('.lists').sortable({
      connectWith: '.lists',
      placeholder: "list-placeholder"
    });
  
    return this;
  },

  className: 'board-lists'
  
});
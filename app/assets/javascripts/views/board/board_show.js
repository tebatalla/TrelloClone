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

  dropDraggable: function (event, ui) {
    var lists = ui.item.parent().children();
    var newListModels = [];
    _.each( lists.slice(0, lists.length - 1), function (list, index) {
      var listId = $(list).data('id');
      var listModel = this.model.lists().get(listId);
      listModel.set('ord', index);
      listModel.save({});
      newListModels.push(listModel);
    }.bind(this));

    this.model.lists().set(newListModels);
    // var cards = ui.item.parent().children();

    // _.each( cards, function (card, index) {
    //   var cardModel, oldCollection;
    //   var newCollection = this.collection.get(newListId).cards();
    //   var id = $(card).data('id');
    //   if ($(card).data('id') === ui.item.data('id')) {
    //     oldCollection = this.model.cards();
    //     cardModel = oldCollection.get(id);
    //   } else {
    //     oldCollection = newCollection;
    //     cardModel = oldCollection.get(id);
    //   }
    //   cardModel.set({
    //     "ord": index,
    //     "list_id": newListId
    //   });
    //   cardModel.save({}, {
    //     success: function (cardModel) {
    //       oldCollection.remove(cardModel);
    //       newCollection.add(cardModel);
    //     }.bind(this)
    //   });
    // }.bind(this));
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

    this.$newList = $('<li class="list-item not-sortable">');
    this.$newList.append('<div class="list">');
    this.$newList.find('.list').append('<a class="new-list">Add a new list</a>');
    this.$('.lists').append(this.$newList);


    this.$('.lists').sortable({
      connectWith: '.lists',
      placeholder: "list-placeholder",
      stop: this.dropDraggable.bind(this),
      items: "li:not(.not-sortable)"
    });
  
    return this;
  },

  className: 'board-lists'
  
});
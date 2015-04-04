TrelloClone.Collections.Lists = Backbone.Collection.extend({
  model: TrelloClone.Models.List,
  url: '/api/lists',

  comparator: "ord",

  initialize: function (options) {
    this.board = options.board;
  }
});
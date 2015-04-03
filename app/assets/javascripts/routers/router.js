TrelloClone.Routers.Router = Backbone.Router.extend({
  routes: {
    "": "boardIndex",
    "boards/new": "newBoard"
  },

  boardIndex: function () {
    var view = new TrelloClone.Views.BoardIndex({
      collection: this.collection
    });

    this._swapView(view);
  },

  initialize: function ($rootEl) {
    this.$rootEl = $rootEl;
    this.collection = new TrelloClone.Collections.Boards();
    this.collection.fetch();
  },

  newBoard: function () {
    var view = new TrelloClone.Views.BoardForm({
      model: new TrelloClone.Models.Board(),
      collection: this.collection
    });

    this._swapView(view);
  },

  _swapView: function (view) {
    this._currentView && this._currentView.remove();
    this._currentView = view;
    this.$rootEl.html(view.render().$el);
  }
});
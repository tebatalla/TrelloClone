window.TrelloClone = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function($rootEl) {
    new TrelloClone.Routers.Router($rootEl);
    Backbone.history.start();
  }
};

$(document).ready(function(){
  TrelloClone.initialize($('#main'));
});

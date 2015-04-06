TrelloClone.Views.ListShowItem = Backbone.View.extend({
  template: JST['list/show_item'],

  events: {
    'mouseenter': 'displayRemoveButton',
    'mouseleave': 'removeRemoveButton',
    'click .remove': 'removeCard'
  },

  render: function () {
    var content = this.template({
      card: this.model
    });
  
    this.$el.html(content);
  
    return this;
  },

  className: 'list-group-item card',

  attributes: function () {
    return {
      "data-id": this.model.id
    };
  },

  displayRemoveButton: function () {
    this.$button = $('<button>').addClass('remove btn btn-default btn-sm pull-right badge');
    this.$button.attr('aria-label', 'Remove Card');
    this.$button.append($('<span>').addClass('glyphicon glyphicon-remove'));

    this.$el.append(this.$button);
  },

  removeRemoveButton: function () {
    this.$button && this.$button.remove();
  },

  removeCard: function () {
    this.model.destroy();
    this.remove();
  }
});
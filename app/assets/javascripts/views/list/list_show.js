TrelloClone.Views.ListShow = Backbone.CompositeView.extend({
  template: JST['list/show'],

  className: 'col-sm-3',

  render: function () {
    var content = this.template({
      list: this.model
    });
  
    this.$el.html(content);
  
    return this;
  },
});
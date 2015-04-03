TrelloClone.Views.BoardForm = Backbone.View.extend({

  addBoard: function (event) {
    event.preventDefault();
    var data = $(event.currentTarget).serializeJSON();
    this.model.save(data, {
      success: function () {
        this.collection.add(this.model);
        Backbone.history.navigate('boards/' + this.model.id, { trigger: true });
      }.bind(this)
    });
  },

  className: 'col-sm-offset-3 col-sm-6',

  events: {
    "submit form": "addBoard"
  },

  render: function () {
    var content = this.template();
  
    this.$el.html(content);

    return this;
  },

  template: JST['board/_form'],
});
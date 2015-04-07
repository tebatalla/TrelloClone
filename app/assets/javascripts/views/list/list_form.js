TrelloClone.Views.ListForm = Backbone.View.extend({
  template: JST['list/_form'],

  events: {
    "submit form": "addList",
    "keydown .has-error": "removeError"
  },

  tagName: 'li',

  className: 'list-item',

  addList: function (event) {
    event.preventDefault();
    var data = $(event.currentTarget).serializeJSON();
    if (data.title === "") {
      this.$('.form-group').addClass('has-error');
      this.$('.help-block').toggle('highlight');
    } else {
      this.model.set(data);
      this.model.set({
        'board_id': this.board.id,
        'ord': this.setOrd()
      });
      this.model.save({}, {
        success: function () {
          this.collection.add(this.model);
          this.render();
        }.bind(this)
      });
    }
  },

  removeError: function (event) {
    $(event.currentTarget).removeClass('has-error');
    this.$('.help-block').remove('highlight');
  },

  render: function () {
    var content = this.template({});
  
    this.$el.html(content);
  
    return this;
  },

  initialize: function (options) {
    this.board = options.board;
  },

  setOrd: function () {
    var maxOrd = this.collection.max( function (list) {
      return list.get('ord');
    }.bind(this));

    maxOrd = maxOrd === -Infinity ? 1 : maxOrd.get('ord');

    if (!this.model.has('ord')) {
      return maxOrd + 1;
    } else {
      return this.model.get('ord');
    }
  }
});
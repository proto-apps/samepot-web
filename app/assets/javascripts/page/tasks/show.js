/**
 * @fileoverview Task show page.
 * @author yo_waka
 */

(function() {
  'use strict';


  /**
   * @extends {Backbone.Events}
   */
  var TaskApp = _.extend({
    /**
     * @param {Object} options .
     */
    initialize: function(options) {
      this.options = options;
      this.infoModel = new models.Task();
      this.statusModel = new models.TaskStatus();

      // setup info view
      var info = new views.TaskInfo({model: this.infoModel});
      // setup status view
      var statusForm = new views.TaskStatusForm({model: this.statusModel});

      // delete button
      $('#task-delete').bind('click', _.bind(this.handleDelete, this));
    },

    /**
     * @type {boolean}
     */
    wasRendered: false,

    /**
     */
    renderAll: function() {
      if (this.wasRendered) {
        return;
      }
      this.infoModel.set(this.options.data);
      this.statusModel.set({
        id: this.options.data.id,
        status: this.options.data.status || 'none'
      });
      this.wasRendered = true;
    },

    /**
     * @param {Event} evt .
     */
    handleDelete: function(evt) {
      var message = util.i18n.getMsg('tasks.confirm_delete');
      if (!window.confirm(message)) {
        return false;
      }

      var params = {
        authenticity_token: util.data.get('authenticity_token')
      };

      $(document.body).activity();

      $.ajax({
        url: util.uri.api.project('tasks/' + this.options.data.id),
        type: 'DELETE',
        data: params,
        dataType: 'json'
      })
      .done(function(result) {
        $(document.body).activity(false);
        showNotification({
          message: util.i18n.getMsg('tasks.deleted'),
          type: 'success',
          autoClose: true,
          duration: 3
        });
        window.location.href = util.uri.page.project('tasks');
        return;
      })
      .fail(function(xhr) {
        $(document.body).activity(false);
        showNotification({
          message: util.i18n.getMsg('errors.request'),
          type: 'error',
          autoClose: true,
          duration: 3
        });
      });
    }
  }, Backbone.Events);


  /**
   * @extends {Backbone.Events}
   */
  var TaskCommentsApp = _.extend({
    /**
     * @param {Object} options .
     */
    initialize: function(options) {
      this.options = options;
      this.collection = new collections.TaskComments();

      // setup add form
      var form = new views.TaskCommentForm();
      this.listenTo(form, 'submit_form', this.createItem);

      // setup list view
      var list = new views.TaskCommentList({collection: this.collection});
    },

    /**
     * @type {boolean}
     */
    wasRendered: false,

    /**
     */
    renderAll: function() {
      if (this.wasRendered) {
        return;
      }
      _.each(this.options.data, _.bind(function(data) {
        this.createItem(data);
      }, this));
      this.wasRendered = true;
    },

    /**
     * @param {Object} data .
     */
    createItem: function(data) {
      this.collection.createItem(data, this.invalidHandler);
    },

    /**
     * @param {Object} model .
     * @param {Object} attrs .
     * @param {Object} options .
     */
    invalidHandler: function(model, attrs, options) {
      alert(model.validationError);
    }
  }, Backbone.Events);


  /**
   * @extends {Backbone.Router}
   */
  var Router = Backbone.Router.extend({
    /**
     */
    initialize: function() {
      ui.navi.init();

      this.task = _.extend({}, TaskApp);
      this.task.initialize({
        data: util.data.get('task')
      });
      this.comments = _.extend({}, TaskCommentsApp);
      this.comments.initialize({
        data: util.data.get('comments')
      });
    },

    /**
     */
    routes: {
      '*action': 'defaultAction'
    },

    /**
     */
    defaultAction: function() {
      this.task.renderAll();
      this.comments.renderAll();
    }
  });


  // set
  util.Routers.set('tasks', 'show', Router);
})();

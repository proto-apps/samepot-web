/**
 * @fileoverview Form utility.
 * @author yo_waka
 */

if (!util) {
  var util = {};
}


/**
 * @type {Object}
 */
util.form = {};


/**
 * @param {string=} opt_name .
 * @param {Object=} opt_form jQuery object.
 * @return {Object} .
 */
util.form.params = function(opt_name, opt_form) {
  var params = {};
  if (opt_name) {
    params[opt_name] = {};
  }
  if (opt_form) {
    _.each(opt_form.serializeArray(), function(input) {
      if (opt_name) {
        params[opt_name][input.name] = input.value;
      } else {
        params[input.name] = input.value;
      }
    });
  }
  params['authenticity_token'] = util.data.get('authenticity_token');

  return params;
};


/**
 * @param {Object} options .
 * @param {Object=} opt_indicatorTarget jQuery object.
 * @param {Function} done .
 * @param {Function} fail .
 */
util.form.send = function(options, opt_indicatorTarget, done, fail) {
  var ajaxOptions = _.extend({dataType: 'json'}, options);
  opt_indicatorTarget && opt_indicatorTarget.activity();

  var req = $.ajax(ajaxOptions);
  req.done(function(result) {
    opt_indicatorTarget && opt_indicatorTarget.activity(false);

    done(result);
  })
  .fail(function(xhr) {
    opt_indicatorTarget && opt_indicatorTarget.activity(false);
    showNotification({
      message: util.i18n.getMsg('errors.request'),
      type: 'error',
      autoClose: true,
      duration: 3
    });

    var res = $.parseJSON(xhr.responseText);
    fail(res);
  });

  return req;
};


/**
 * @param {Object} form jQuery object.
 * @param {string} url .
 */
util.form.sendFile = function(form, url) {
  function createFileInfo(file) {
    return escape(file.name) + ' (' + (file.type || 'N/A') + ') - ' + file.size + ' bytes';
  }
  function createButton() {
    var button = $('<button>').addClass('button primary action icon edit')
                              .attr('type', 'submit')
                              .text(util.i18n.getMsg('action.change'));
    return button;
  }

  form.fileupload({
    url: url,
    dataType: 'json',
    change: function (e, data) {
      $.each(data.files, function (index, file) {
        var text = createFileInfo(file);
        form.find('.selected-file').text(text);
      });
    },
    add: function (e, data) {
      var button = createButton();
      form.find('#file-submit').replaceWith(button);

      button.click(function(evt) {
        evt.preventDefault();

        form.find('.progress').text(util.i18n.getMsg('action.uploading'));
        form.activity();
        data.submit();
        return false
      });
      data.context = button;
    },
    done: function(e, data) {
      form.activity(false);
      form.find('.progress').text('');

      var replacer = $('<span>').addClass('finished')
                                .text(util.i18n.getMsg('action.upload_finished'));
      data.context.replaceWith(replacer);
    },
    fail: function(e, data) {
      form.activity(false);
      form.find('.progress').text(util.i18n.getMsg('action.upload_error'));
    }
  });
};

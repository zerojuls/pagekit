require(['jquery', 'uikit!form-select', 'domReady!'], function($, uikit) {

    var form = $('#js-page'), id = $('input[name="id"]', form);

    // slug handling
    var slug  = $('input[name="page[slug]"]', form),
        title = $('input[name="page[title]"]', form),
        slugPreview = $('.js-slug[data-uk-toggle]', form);

    slugPreview.on('click', function() {
        setTimeout(function() { slug.focus(); }, 10);
    });

    title.on('blur', function () {
        if (!(id.val()-0)) slug.val('');
        slug.trigger('blur');
    });

    slug.on('blur', function() {
        $.post(slug.data('url'), { slug: slug.val() || title.val(), id: id.val() }, function(data) {
            slug.val(data).addClass('uk-hidden');
            slugPreview.text(data).removeClass('uk-hidden');
        }, 'json');
    });

    // status handling
    var status   = $('input[name="page[status]"]', form),
        statuses = $('.js-status', form).on('click', function() {
            status.val(statuses.addClass('uk-hidden').not(this).removeClass('uk-hidden').data('status'));
        });

    // markdown status handling
    var markdownStatus   = $('input[name="page[data][markdown]"]'),
        markdownStatuses = $('.js-markdown').on('click', function() {
            markdownStatus.val(markdownStatuses.addClass('uk-hidden').not(this).removeClass('uk-hidden').data('value'));
            $('#page-content', form).trigger(markdownStatus.val() == '1' ? 'enableMarkdown' : 'disableMarkdown');
        });

    // show title checkbox
    var showtitleinput = $('input[name="page[data][title]"]', form),
        showtitle      = $('.js-title', form).on('click', function() {
            showtitleinput.val(showtitle.addClass('uk-hidden').not(this).removeClass('uk-hidden').data('value'));
        });

    // form ajax saving
    form.on('submit', function(e) {

        e.preventDefault();
        e.stopImmediatePropagation();

        $.post(form.attr('action'), form.serialize(), function(response) {

            uikit.notify(response.message, response.error ? 'danger' : 'success');

            if (response.id) {
                id.val(response.id);
            }
        });
    });

});
var LOADER = {
    timer: null,
    show: function () {
        clearTimeout(this.timer);
        this.timer = setTimeout(function () {
            $('#preloader').show();
        }, 500);
    },
    hide: function () {
        clearTimeout(this.timer);
        $('#preloader').hide();
    }
};
$(function () {
    var owlItemsOptions = {
        items: 4,
        itemsDesktop: [1199, 3],
        itemsDesktopSmall: [979, 2],
        itemsTablet: [768, 1],
        itemsMobile: [479, 1],
        navigation: true,
        pagination: false,
        navigationText: ["", ""],
        rewindNav: false,
        scrollPerPage: true,
        beforeInit: function () {
            $("#owl-items").html($("#owl-items-data").html());
        },
        afterInit: function () {
            setTimeout(filtering_catalog, 1000);
        }
    };
    function filtering_catalog() {
        var $filterig_links = $('.filterig_links');
        if ($filterig_links.find('li.active').length > 0) {
            var id = $filterig_links.find('li.active a').data('section-id');
            var hide = false;
            $("#owl-items").data('owlCarousel').destroy();
            $("#owl-items").owlCarousel(owlItemsOptions);
            do {
                hide = false;
                $("#owl-items .owl-item > div").each(function (i) {
                    var $this = $(this);
                    if ($this.data('section-id') !== id) {
                        hide = true;
                        $("#owl-items").data('owlCarousel').removeItem(i);
                        return false;
                    }
                });
            } while (hide);
        }
    }
    $("#owl-items").owlCarousel(owlItemsOptions);
    owlItemsOptions.afterInit = function () {};
    $("#owl-items").on('click', '.owl-item a', function () {
        var $this = $(this);
        var $catalogItemWrap = $this.closest('.catalog-item-wrap');
        $("#owl-items .catalog-item-wrap").removeClass('open');
        $this.closest('.catalog-item-wrap').addClass('open');
        $('<div class="modal-backdrop fade in"></div>').appendTo(document.body);
        var $clone = $catalogItemWrap.clone();
        var $overlayItem = $('<div/>').addClass('overlayItem');
        $clone.find('.catalog_item').append('<a href="#" class="close_item">×</a>');
        $clone.appendTo($overlayItem);
        $overlayItem.appendTo(document.body);
        $('body > .overlayItem').css('width', $catalogItemWrap.css('width'));
        $('body > .overlayItem').css('left', $catalogItemWrap.offset().left + 'px');
        $('body > .overlayItem').css('top', $catalogItemWrap.offset().top + 'px');
        $('body > .modal-backdrop, body > .overlayItem a.close_item').on('click', function () {
            $('body > .overlayItem').remove();
            $('body > .modal-backdrop').remove();
            $catalogItemWrap.removeClass('open');
            return false;
        });
        return false;
    });
    $("#owl-main-slider").owlCarousel({
        items: 1,
        singleItem: true,
        itemsDesktop: [1199, 1],
        itemsDesktopSmall: [979, 1],
        itemsTablet: [768, 1],
        itemsMobile: [479, 1],
        navigation: true,
        pagination: false,
        navigationText: ["", ""],
        rewindNav: false,
        scrollPerPage: true,
        afterInit: function () {
            $(".main_slider .owl-wrapper-outer").after($(".main_slider .icons-aera"));
        }
    });
    $('.filterig_links a').on('click', function () {
        var $this = $(this);
        var $li = $this.closest('li');
        $this.closest('ul').find('li').removeClass('active');
        $li.addClass('active');
        filtering_catalog();
        return false;
    });
    $("#owl-reviews").owlCarousel({
        items: 5,
        margin: 38,
        navText: ['<i class="icon s-left"></i>', '<i class="icon s-right"></i>'],
        nav: true,
        dots: false,
        responsive: {
            0: {
                items: 2,
                slideBy: 2
            },
            768: {
                items: 4,
                slideBy: 4
            },
            992: {
                items: 4,
                slideBy: 4
            },
            1200: {
                items: 5,
                slideBy: 5
            }
        }
    });
    $("#owl-audio-reviews").owlCarousel({
        items: 1,
        navText: ['<i class="icon s-left"></i>', '<i class="icon s-right"></i>'],
        nav: true,
        dots: false
    });
    $('#owl-catalog-slider').owlCarousel({
        items: 1,
        nav: false,
        dots: true
    });
    $('#feedBack input[name="phone"]').mask('+7 (999) 999 9999', {placeholder: '_'});
    $('#buyOneClick input[name="phone"]').mask('+7 (999) 999 9999', {placeholder: '_'});
    $('#PHONE').mask('+7 (999) 999 9999', {placeholder: '_'});
    $('.authPhone').mask('(999)-999-99-99', {placeholder: '_'});
    $('#ORDER_PROP_3').mask('+7 (999) 999 9999', {placeholder: '_'});
    $('.footer-feedback form input[name="phone"]').mask('+7 (999) 999 9999', {placeholder: '_'});
    if (SHOW_GEO_WINDOW) {
        $('#choiceCityFirst').modal({show: true});
    }
    $('#choiceCity .modal-body .btn').on('click', function () {
        var $this = $(this);
        $.post('/', {action: 'set_geo', geo_code: $('#choiceCity select').val()}, function () {
            location.reload();
        });
        return false;
    });
    $('#footer_city_select').on('change', function () {
        var $this = $(this);
        $.post('/', {action: 'set_geo', geo_code: $this.val()}, function () {
            location.reload();
        });
        return false;
    });
    var SEARCH_TIMEOUT;
    $('#head_search').on('keyup', function () {
        var $this = $(this);
        var val = $this.val();
        var $form = $this.closest('form');
        var $header_search_result = $('#header_search_result');
        $header_search_result.html('');
        if (val.length > 2) {
            var data = $form.serializeArray();
            clearTimeout(SEARCH_TIMEOUT);
            SEARCH_TIMEOUT = setTimeout(function () {
                ajaxSearch(data);
            }, 500);
        }
    });
    if ($("#price-range").length > 0) {
        $("#price-range").slider({
            range: true,
            min: 0,
            max: 250000,
            values: [0, 150000],
            slide: function (event, ui) {
                $('#price_from').val(ui.values[0]);
                $('#price_to').val(ui.values[1]);
            }
        });
        $('#price_from').val($("#price-range").slider("values", 0));
        $('#price_to').val($("#price-range").slider("values", 1));
    }
    if ($("#width-range").length > 0) {
        $("#width-range").slider({
            range: "min",
            min: 100,
            max: 200,
            value: 180,
            slide: function (event, ui) {
                $('#width').val(ui.value);
            }
        });
        $('#width').val($("#width-range").slider("value"));
    }
    if ($("#height-range").length > 0) {
        $("#height-range").slider({
            range: "min",
            min: 70,
            max: 90,
            value: 70,
            slide: function (event, ui) {
                $('#height').val(ui.value);
            }
        });
        $('#height').val($("#height-range").slider("value"));
    }
    if ($("#depth-range").length > 0) {
        $("#depth-range").slider({
            range: "min",
            min: 36,
            max: 53,
            value: 45,
            slide: function (event, ui) {
                $('#depth').val(ui.value);
            }
        });
        $('#depth').val($("#depth-range").slider("value"));
    }
    if ($("#height_pallet-range").length > 0) {
        $("#height_pallet-range").slider({
            range: "min",
            min: 10,
            max: 40,
            value: 30,
            slide: function (event, ui) {
                $('#height_pallet').val(ui.value);
            }
        });
        $('#height_pallet').val($("#height_pallet-range").slider("value"));
    }
//    if($('section.catalog-filter .property .checkbox-group-class').length > 0 ){
//        $('section.catalog-filter .property .checkbox-group-class').enscroll({
//            verticalTrackClass: 'vertical-track2',
//            verticalHandleClass: 'vertical-handle2',
//            minScrollbarLength: 36,
//            drawCorner : false
//
//        });
//    }
    if ($('.select-checkboxed .list .inner').length > 0) {
        $('.select-checkboxed .list .inner').enscroll({
            verticalTrackClass: 'vertical-track2',
            verticalHandleClass: 'vertical-handle2',
            minScrollbarLength: 36,
            drawCorner: false,
            easingDuration: 100
        });
    }
    $('.card_slider-lg').clone().appendTo( ".mymodal" );
    $('.mymodal .card_slider-lg').attr("id","owl-big-imageModal");
    $('.card_slider-sm').clone().appendTo( ".mymodal" );
    $('.mymodal .card_slider-sm').attr("id","owl-big-image-smModal");
    
    
    $("#owl-big-image").owlCarousel({
        singleItem: true,
        pagination: false,
        afterAction: function () {
            var $active = $("#slider-vertical .item:eq(" + this.owl.currentItem + ")");

            if (this.owl.currentItem > this.prevItem) {
                if ((this.owl.currentItem + 1) % 5 === 0) {
                    $('#slider-vertical .slider-next').trigger('click');
                }
            } else {
                if ((this.owl.currentItem + 1) % 4 === 0) {
                    $('#slider-vertical .slider-prev').trigger('click');
                }
            }

            $("#slider-vertical .item").removeClass('active');
            $active.addClass('active');
        }
    });
    $("#owl-big-image-sm").owlCarousel({
        pagination: false,
        navigation: true,
        items: 3,
        itemsDesktop: [1199, 3],
        itemsDesktopSmall: [979, 3],
        itemsTablet: [768, 3],
        itemsMobile: [479, 3],
        navigationText: ["", ""],
        scrollPerPage: true
    });
    $("#owl-big-image-sm .item").on('click', function () {
        var $this = $(this);
        var index = $("#owl-big-image-sm .item").index($this);
        $("#owl-big-image").trigger('owl.goTo', index);
        return false;
    });
    if ($('#countdown').length > 0) {
        var date = $('#countdown').data('value').split(',');
        var days = $('#countdown').data('action-days') === undefined ? false : $('#countdown').data('action-days');
        var austDay = new Date(date[0], date[1], date[2], date[3], date[4], date[5]);
        var DateNow = new Date();
        if (!days === false) {
            var lastDate = new Date();
            lastDate.setDate(austDay.getDate());
            while (austDay >= DateNow) {
                lastDate.setTime(austDay.getTime());
                austDay.setDate(austDay.getDate() - days);
            }
            if (austDay <= DateNow) {
                austDay.setTime(lastDate.getTime());
            }
        }
        $('#countdown').countdown({
            until: austDay,
            padZeroes: true
        });
    }
    $('a[rel=popover]').popover({
        html: true,
        trigger: 'hover',
        placement: 'right',
        content: function () {
            return '<img src="' + $(this).data('img') + '" />';
        }
    });
    $('[data-toggle="popover"]').popover({
        html: true,
        trigger: 'hover'
    });
    $('a[data-toggle="popover"]').on('click', function () {
        return false;
    });
    $('body').on('click', '.spiner-minus', function () {
        var $this = $(this);
        var $formControl = $this.closest('.spiner-group');
        var $input = $formControl.find('input.form-control');
        var val = parseInt($input.val());
        clearTimeout($formControl.data('timer'));
        val = isNaN(val) ? 2 : val;
        if (val > 1) {
            $input.val(--val);
            $formControl.data('timer', setTimeout(function () {
                if (typeof submitForm === 'function') {
                    submitForm();
                }
                updateCart($formControl.data('id'), val);
            }, 1000));
        }
        return false;
    });
    $('body').on('click', '.spiner-plus', function () {
        var $this = $(this);
        var $formControl = $this.closest('.spiner-group');
        var $input = $formControl.find('input.form-control');
        var val = parseInt($input.val());
        clearTimeout($formControl.data('timer'));
        val = isNaN(val) ? 0 : val;
        $input.val(++val);
        $formControl.data('timer', setTimeout(function () {
            if (typeof submitForm === 'function') {
                submitForm();
            }
            updateCart($formControl.data('id'), val);
        }, 1000));
        return false;
    });
    $('body').on('change', '.spiner-group input.form-control', function () {
        var $this = $(this);
        var val = parseInt($this.val());
        var $formControl = $this.closest('.spiner-group');
        clearTimeout($formControl.data('timer'));
        val = isNaN(val) ? 1 : val;
        $this.val(val);
        $formControl.data('timer', setTimeout(function () {
            if (typeof submitForm === 'function') {
                submitForm();
            }
            updateCart($formControl.data('id'), val);
        }, 1000));
    });
    $('body').on('click', '.fast-cart a.del, .cart-list a.del', function () {
        var $this = $(this);
        var id = $this.data('id');
        LOADER.show();
        if (typeof submitForm === 'function') {
            submitForm();
        }
        $.post('/personal/cart/ajax.php', {action: 'delete', id: id}, function (html) {
            $('.cart-block .special-menu-item-cart').html($(html).find('.special-menu-item-cart').html());
            var $modalBody = $(html).find('.fast-cart-wrap .modal-body');
            if ($modalBody.length > 0) {
                $('.cart-block .fast-cart-wrap .modal-body').html($modalBody.html());
            } else {
                $('.cart-block .fast-cart-wrap .modal-body').html('');
                $('#fastCart').modal('hide');

            }
            LOADER.hide();
            var $delID = $(html).find('#delID');
            if ($delID.length > 0) {
                var $els = $('.addToCart[data-id="' + $delID.val() + '"],.addToCart_[data-id="' + $delID.val() + '"]');
                $els.addClass('btn-primary')
                        .removeClass('in-cart')
                        .removeClass('btn-default')
                        .text('').on('click', function () {
                    var $this = $(this);
                    return addTocartBind($this);
                });
            }
            $('.basket_items tr[data-id="' + id + '"]').fadeOut(function () {
                $(this).remove();
                if ($('table.basket_items tbody').length > 0) {
                    if ($('table.basket_items tbody tr').length === 0) {
                        location.reload(true);
                    }
                }
            });
        });
        return false;
    });
    $('.kit-product .item .checkbox').on('click', function () {
        var price = 0;
        var count = 0;
        var ids = new Array();
        $('.kit-product .item .checkbox').each(function () {
            var $this = $(this);
            var id = $this.find('input').data('id');
            var $kitProduct = $this.closest('.kit-product');
            if ($this.find(':checkbox').is(':checked')) {
                price += parseFloat($this.data('price'));
                count++;
                ids.push($this.find(':checkbox').data('id'));
                if (!$kitProduct.hasClass('selected')) {
                    if ($('#kit_products_area .kit-product[data-id="' + $kitProduct.data('id') + '"]').length === 0) {
                        var $clone = $kitProduct.clone();
                        $clone.addClass('selected');
                        $clone.find('.checkbox-wrap').remove();
                        $clone.find('.name-wrap').attr('class', 'col-xs-6 col-sm-6 col-md-8');
                        $clone.find('.price').html($clone.find('.price').html().replace('+', ''));
                        $clone.hide();
                        $('#kit_products_area').append($clone.fadeIn());
                    }
                }
            } else {
                if (!$kitProduct.hasClass('selected')) {
                    $('#kit_products_area .kit-product[data-id="' + id + '"]').fadeOut(function () {
                        $('#kit_products_area .kit-product[data-id="' + id + '"]').remove();
                    });
                }
            }
            $('a.complectToCart').data('ids', ids.join(','));

        });
        $('#complect_price').text(price_format(price));
        $('#complect_count').text(count + ' позици' + sklonenie(count, ['я', 'и', 'й']));

    });
    $('.getMore-wrap').on('click', 'a.pag-page', function () {
        var $this = $(this);
        LOADER.show();
        $.get(delPrm($this.attr('href'), 'ajax_catalog'), {ajax_catalog: 'yes'}, function (html) {
            var $pageNavigation = $(html).find('.getMore-wrap .page-navigation');
            var $catalogItems = $('section.catalog_items');
            $catalogItems.html($(html).find('section.catalog_items').html());
            if ($pageNavigation.length > 0) {
                $('.getMore-wrap').html($pageNavigation);
            } else {
                $('.getMore-wrap .page-navigation').remove();
            }
            chLocation(delPrm(delPrm(delPrm($this.attr('href'), 'ajax_catalog'), 'PAGE_ELEMENT_COUNT'), 'sort'));
            $("html, body").delay(100).animate({scrollTop: $catalogItems.offset().top - 100}, 500, undefined, function () {
            });
            LOADER.hide();
        });
        return false;
    });
    $('select.onPageView').on('change', function () {
        var $this = $(this);
        var value = $this.val();
        var data = new Array();
        data.push({
            name: 'ajax_catalog',
            value: 'yes'
        });
        data.push({
            name: 'PAGE_ELEMENT_COUNT',
            value: value
        });
        LOADER.show();
        $.ajax({
            url: location.href,
            dataType: 'html',
            data: data,
            success: catalogListSuccess
        });
        return false;
    });
    $('select.show_as').on('change', function () {
        var $this = $(this);
        var value = $this.val();
        var data = new Array();
        data.push({
            name: 'ajax_catalog',
            value: 'yes'
        });
        data.push({
            name: 'sort',
            value: value
        });
        LOADER.show();
        $.ajax({
            url: delPrm(location.href, 'ajax_catalog'),
            dataType: 'html',
            data: data,
            success: catalogListSuccess
        });
        return false;
    });

    $('.order-control .btn-sort').on('click', function () {
        var $this = $(this);
        var $icon = $this.find('.glyphicon');
        var value = $this.val();
        var data = new Array();


        if ($this.hasClass('active-sort')) {
            $this.val($this.data('invert'));
            $this.data('invert', value);
            value = $this.val();
            if ($icon.hasClass('glyphicon-sort-by-attributes')) {
                $icon.removeClass('glyphicon-sort-by-attributes').addClass('glyphicon-sort-by-attributes-alt');
            } else {
                $icon.removeClass('glyphicon-sort-by-attributes-alt').addClass('glyphicon-sort-by-attributes');
            }
        } else {
            $this.addClass('active-sort');
        }
        $('.order-control .btn-sort').not($this).removeClass('active-sort');

        data.push({
            name: 'ajax_catalog',
            value: 'yes'
        });
        data.push({
            name: 'sort',
            value: value
        });
        $.ajax({
            url: location.href,
            dataType: 'html',
            data: data,
            success: catalogListSuccess
        });
        return false;
    });


    $('body').on('click', 'a.addToCart', function () {
        var $this = $(this);
        return addTocartBind($this);
    });
    $('body').on('click', '.overlayItem a.addToCart_', overlay_inCartEvent);
    $('a.complectToCart').on('click', function () {
        var $this = $(this);
        LOADER.show();
        $.post('/personal/cart/ajax.php', {action: 'add_kit', ids: $this.data('ids').toString().split(',')}, function (html) {
            $('.cart-block.row .description').html($(html).find('.description').html());
            $('.cart-block.row .fast-cart-wrap').html($(html).find('.fast-cart-wrap').html());
            LOADER.hide();
        });
        return false;
    });
    $('#buyOneClick form').on('submit', function () {
        var $form = $(this);
        var $mess = $form.find('.message_area');
        var data = $form.serializeArray();
        var error = false;
        var errorClass = 'has-error';
        var $button = $('a[data-target="#buyOneClick"]');
        $mess.html('');
        $form.find('input[type="text"]').each(function () {
            var $this = $(this);
            if ($this.val() === '' || /^[\s]+$/.test($this.val())) {
                error = true;
                $this.closest('.form-group').addClass(errorClass);
            } else {
                $this.closest('.form-group').removeClass(errorClass);
            }
        });
        if (error) {
            return false;
        }

        if ($button.length > 0) {
            if ($button.hasClass('fromCart')) {
                var IDS = [];
                data.push({name: 'multi', value: 'Y'});
                var count = 0;
                $('.basket_items tr').each(function () {
                    var $this = $(this);
                    var val = $this.data('product');
                    if (val > 0) {
                        if (count === 0) {
                            data.push({name: 'id', value: val});
                        }
                        IDS.push(val);
                        count++;
                    }
                });
                data.push({name: 'ids', value: IDS.join(',')});
            }
        }

        data.push({name: 'action', value: 'buy_one_click'});
        data.push({name: 'sessid', value: BX.bitrix_sessid()});
        LOADER.show();
        $.post('/personal/cart/ajax.php', data, function (html) {
            $mess.html(html);
            if ($(html).find('.alert-success').length > 0) {
                $form.find('button').remove();
            }
            LOADER.hide();
        });
        return false;
    });
    $('#feedBack form').on('submit', function () {
        var $form = $(this);
        var data = $form.serializeArray();
        var $messageArea = $form.find('.message_area');
        var error = false;
        var errorClass = 'has-error';
        $messageArea.html('');
        $form.find('input[type="text"]').each(function () {
            var $this = $(this);
            if ($this.val() === '' || /^[\s]+$/.test($this.val())) {
                error = true;
                $this.closest('.form-group').addClass(errorClass);
            } else {
                $this.closest('.form-group').removeClass(errorClass);
            }
        });
        if (error) {
            return false;
        }
        LOADER.show();
        $.post('', data, function (html) {
            $messageArea.html(html);
            if ($(html).hasClass('alert-success')) {
                $form.find('button').remove();
            }
            LOADER.hide();
        });
        return false;
    });
    $('.footer-feedback form').on('submit', function () {
        var $form = $(this);
        var data = $form.serializeArray();
        var $messageArea = $form.find('.message_area');
        var error = false;
        var errorClass = 'has-error';
        $messageArea.html('');
        $form.find('.req').each(function () {
            var $this = $(this);
            if ($this.val() === '' || /^[\s]+$/.test($this.val())) {
                error = true;
                $this.closest('.form-group').addClass(errorClass);
            } else {
                $this.closest('.form-group').removeClass(errorClass);
            }
        });
        if (error) {
            return false;
        }
        LOADER.show();
        $.post('', data, function (html) {
            var $html = $(html);
            if ($html.find('#captcha_sid').length > 0) {
                var captcha_code = $html.find('#captcha_sid').val();
                $html.find('#captcha_sid').remove();
                $form.find('[name="captcha_sid"]').val(captcha_code);
                $form.find('img.captcha_img').attr('src', '/bitrix/tools/captcha.php?captcha_sid=' + captcha_code);
            }
            $messageArea.html($(html));
            if ($html.hasClass('alert-success')) {
                $form.find('button').remove();
            }
            LOADER.hide();
        });
        return false;
    });
    $('.fancybox').fancybox();
    $('#slider-vertical').append($('<a href="#" class="slider-prev"></a>'));
    $('#slider-vertical').append($('<a href="#" class="slider-next"></a>'));
    $('#slider-vertical').data('item', 0);
    $('#slider-vertical').data('count', $('#slider-vertical .item').length);
    $('#slider-vertical .item').on('click', function () {
        var $this = $(this);
        var index = $("#slider-vertical .item").index($this);
        $("#slider-vertical .item").removeClass('active');
        $this.addClass('active');
        $("#owl-big-image").trigger('owl.goTo', index);
        return false;
    });
    $('#slider-vertical .slider-prev').on('click', function () {
        var $items = $('#slider-vertical .slider-items');
        var step = 80;
        var count = 4;
        var all_count = $('#slider-vertical').data('count');
        var item = $('#slider-vertical').data('item');
        var i;
        var new_item = false;
        for (i = 1; i <= count; i++) {
            if (item - i >= 0) {
                new_item = item - i;
            }
        }
        if (new_item !== false) {
            $('#slider-vertical').data('item', new_item);
            $items.stop().animate({
                top: (new_item * step) * -1 + 'px'
            }, 400);
        }

        return false;
    });
    $('#slider-vertical .slider-next').on('click', function () {
        var $items = $('#slider-vertical .slider-items');
        var step = 80;
        var count = 4;
        var all_count = $('#slider-vertical').data('count');
        var item = $('#slider-vertical').data('item');
        var i;
        var new_item = false;
        for (i = 1; i <= count; i++) {
            if (item + i <= all_count - count) {
                new_item = item + i;
            }
        }
        if (new_item !== false) {
            $('#slider-vertical').data('item', new_item);
            $items.stop().animate({
                top: (new_item * step) * -1 + 'px'
            }, 400);
        }

        return false;
    });
    $('.preview-text .moreLink').on('click', function () {

        $('a[href="#description"]').click();
        $("html, body").delay(100).animate({scrollTop: $('#description_tabs').offset().top}, 1000, undefined, function () {
            location.hash = '#description_tabs';
        });
        return false;


    });
    $('.toReviewsLink').on('click', function () {

        $('a[href="#comments"]').click();
        $("html, body").delay(100).animate({scrollTop: $('#comments').offset().top}, 500, undefined, function () {
            location.hash = '#comments';
        });
        return false;


    });
//    $('.preview-text .moreLink').on('click', function(){
//        var $this = $(this);
//        var $icon = $this.find('.fa');
//        var $text = $this.find('span');
//        var $inner = $this.parent().find('.inner');
//        if($inner.hasClass('closed')){
//            $inner.removeClass('closed');
//            $icon.removeClass('fa-angle-down');
//            $icon.addClass('fa-angle-up');
//            $text.text($this.data('open'));
//            return false;
//        }
//        $inner.addClass('closed');
//        $icon.removeClass('fa-angle-up');
//        $icon.addClass('fa-angle-down');
//        $text.text($this.data('closed'));
//        return false;
//    });
    $('.kit-section-name a').on('click', function () {
        var $this = $(this);
        var $icon = $this.find('i');
        var $text = $this.parent().parent().find('.kit-products');
        if ($this.hasClass('closed')) {
            $this.removeClass('closed');
            $icon.removeClass('fa-angle-down');
            $icon.addClass('fa-angle-up');
            $text.slideDown();
            return false;
        }
        $this.addClass('closed');
        $icon.removeClass('fa-angle-up');
        $icon.addClass('fa-angle-down');
        $text.slideUp();
        return false;
    });
    $('.audio-track-wrap').each(function () {
        var $audioTrackWrap = $(this);
        var $audio = $audioTrackWrap.find('audio');
        var $play = $audioTrackWrap.find('.play_audio');
        var $time = $audioTrackWrap.find('.time');
        var $progrss = $audioTrackWrap.find('.progress-track');
        var $progrssWrap = $audioTrackWrap.find('.audio-line-wrap');
        var activeSong = $audio.get(0);
        $audio.on('timeupdate', function () {
            var progress = Math.floor((100 / activeSong.duration) * activeSong.currentTime);
            var currentSeconds = (Math.floor(activeSong.currentTime % 60) < 10 ? '0' : '') + Math.floor(activeSong.currentTime % 60);
            var currentMinutes = Math.floor(activeSong.currentTime / 60);
            $time.text((currentMinutes < 9 ? '0' : '') + currentMinutes + '.' + currentSeconds);
            $progrss.css('width', progress + '%');
        });
        $play.on('click', function () {
            var $icon = $play.find('.icon');
            if ($icon.hasClass('pause')) {
                $icon.removeClass('pause').addClass('play');
                activeSong.pause();
                return false;
            }
            $icon.removeClass('play').addClass('pause');
            $('.audio-track-wrap audio').not($audio).each(function () {
                var $otherAudio = $(this);
                var othreActiveSong = $otherAudio.get(0);
                $otherAudio.parent().find('.play_audio .icon.pause').removeClass('pause').addClass('play');
                othreActiveSong.pause();
            });
            activeSong.play();
            return false;
        });
        $progrssWrap.on('click', function (e) {
            var offset = $(this).offset();
            var relativeX = e.pageX - offset.left;
            var width = $progrssWrap.width();
            var value = relativeX * 100 / width;
            activeSong.currentTime = value * activeSong.duration / 100;
            return false;
        });

    });
    $('#confirmCurrentCity').on('click', function () {
        var $this = $(this);
        $.post('/', {action: 'set_geo', geo_code: $this.data('code')}, function () {
            $('#choiceCityFirst').modal('hide');
        });

    });
    $('body').on('click', '.modal-backdrop', function () {
        $('.modal.in').modal('hide');
    });
    $('.select-checkboxed').each(function () {
        var speed = 100;
        var $selectCheckboxed = $(this);
        var $title = $selectCheckboxed.find('> .title');
        var $list = $selectCheckboxed.find('> .list');
        $title.on('click', function () {
            if ($list.hasClass('open')) {
                $list.removeClass('open');
                $list.slideUp(speed);
                return false;
            }
            $('.select-checkboxed > .list.open').not($list).removeClass('open').slideUp(speed);
            $list.addClass('open');
            $list.slideDown(speed);
            return false;
        });
    });
    $('body').on('click', function (e) {
        var speed = 100;
        if ($(e.target).closest('.select-checkboxed-wrap').length === 0) {
            $('.select-checkboxed > .list.open').removeClass('open').slideUp(speed);
        }
        if ($('.menu-down-wrap .navbar-collapse.collapse.in').length > 0 && $(e.target).closest('.menu-down-wrap').length === 0 && !$(e.target).hasClass('catalog-menu-item')) {
            if ($(window).width() > 991) {
                $('.catalog-menu-item').trigger('click');
            }
        }
        if ($(e.target).closest('.sub-catalog').length === 0) {
            $('.sub-catalog > ul > li.activate').removeClass('activate');
        }
    });
    $('.filter_hidden_area_show').on('click', function () {
        var $this = $(this);
        var $filterHiddenArea = $('.filter_hidden_area');
        if ($this.hasClass('open')) {
            $filterHiddenArea.slideUp(function () {
                $this.removeClass('open').text($this.data('close'));
            });
            return false;
        }
        $filterHiddenArea.slideDown(function () {
            $this.addClass('open').text($this.data('open'));

        });
        return false;
    });
    $('body').on('click', '.selected_filter_items .selected_filter_item .icon', function () {
        var $this = $(this);
        var $item = $this.closest('.selected_filter_item');
        if ($this.hasClass('from-slider')) {
            var $wrap = $('#' + $item.data('id')).closest('.bx_filter_parameters_box');
            $item.remove();
            var $min = $wrap.find('input.min-price');
            var $max = $wrap.find('input.max-price');
            var $slider_range = $wrap.find('.bx_ui_slider_range');
            var key = $slider_range.attr('id').replace('drag_tracker_', '');
            var trackBar = window['trackBar' + key];
            $min.val('').trigger('keyup');
            $max.val('').trigger('keyup');
            trackBar.leftPercent = 0;
            trackBar.rightPercent = 0;
            trackBar.makeLeftSliderMove(false);
            trackBar.makeRightSliderMove(false);
        } else {
            $('#' + $item.data('id')).trigger('click');
        }
        return false;
    });
    $('#fastCart').on('shown.bs.modal', function () {
        if ($(window).width() > 991) {
            $('body').removeClass('modal-open');
        }
    });
    $('.catalog-navbar .nav > li').on('mouseover', function () {
        var $this = $(this);
        var id = $this.data('id');
        if (id !== undefined && id > 0) {
            var $sub = $('#sub_' + id);
            if ($sub.length > 0) {
                $('.sub-catalog > ul > li').not($sub).removeClass('activate');
                $sub.addClass('activate');
            }
        }
    });
    var normalizePhone = function (phone) {
        return phone
                .replace(/\s/, '')
                .replace('-', '')
                .replace('-', '')
                .replace('-', '')
                .replace('(', '')
                .replace(')', '');
    };
    var testPhone = function (phone) {
        if (phone.length === 10 && /^[0-9]{10}$/.test(phone)) {
            return true;
        }
        return false;
    };
    $('#authfromStart form').on('submit', function () {
        var $input = $('#authPhone');
        var $wrap = $input.parent();
        $wrap.removeClass('has-error');
        var phone = normalizePhone($input.val());
        if (testPhone(phone)) {
            LOADER.show();
            $.ajax({
                url: '/auth/check.php',
                dataType: 'json',
                type: 'POST',
                data: {
                    sessid: BX.bitrix_sessid(),
                    phone: phone
                },
                success: function (data) {
                    LOADER.hide();
                    if (data.error === '') {
                        $('#authfromStart').addClass('hide');
                        $('#authPhoneLogin').val($('#authPhone').val());
                        $('#authPhoneReg').val($('#authPhone').val());
                        if (data.find === true && data.login !== '') {
                            $('#authfromLogin').removeClass('hide');
                        } else {
                            $('#authfromReg').removeClass('hide');
                        }
                    }
                }
            });
        } else {
            $wrap.addClass('has-error');
        }

        return false;
    });
    $('#authfromLogin form').on('submit', function () {
        var $phone = $('#authPhoneLogin');
        var phone = normalizePhone($phone.val());
        var $wrapPhone = $phone.parent();
        var $password = $('#authPassword');
        var $passwordWrap = $password.parent();
        var password = $password.val();
        var error = false;


        $wrapPhone.removeClass('has-error');
        $passwordWrap.removeClass('has-error');
        $('#login-error').html('');

        if (!testPhone(phone)) {
            error = true;
            $wrapPhone.addClass('has-error');
        }
        if (!(password.length > 5)) {
            error = true;
            $passwordWrap.addClass('has-error');
        }
        if (!error) {
            LOADER.show();
            $.ajax({
                url: '/auth/login.php',
                dataType: 'json',
                type: 'POST',
                data: {
                    sessid: BX.bitrix_sessid(),
                    phone: phone,
                    password: password
                },
                success: function (data) {
                    LOADER.hide();
                    if (data.auth) {
                        location.reload(true);
                    } else {
                        $('#login-error').html('<p class="text-danger">' + data.result.MESSAGE + '</p>');
                    }
                }
            });
        }
        return false;
    });
    $('#authfromReg form').on('submit', function () {
        var $form = $(this);
        var $phone = $('#authPhoneReg');
        var phone = normalizePhone($phone.val());
        var $wrapPhone = $phone.parent();
        var error = false;
        var data = $form.serializeArray();
        var $button = $form.find('button');


        $form.find('.has-error').removeClass('has-error');
        $('#reg-error').html('');

        $form.find('input.req').each(function () {
            var $input = $(this);
            if ($input.attr('type') === 'checkbox') {
                if (!$input.is(':checked')) {
                    $input.parent().addClass('has-error');
                    error = true;
                }
            } else {
                if ($input.val().replace(/\s/, '') === '') {
                    $input.parent().addClass('has-error');
                    error = true;
                }
            }

        });

        if (!testPhone(phone)) {
            error = true;
            $wrapPhone.addClass('has-error');
        }

        if (!error) {
            LOADER.show();
            data.push({name: 'sessid', value: BX.bitrix_sessid()});
            data.push({name: 'phone', value: phone});
            $.ajax({
                url: '/auth/reg.php',
                dataType: 'json',
                type: 'POST',
                data: data,
                success: function (data) {
                    LOADER.hide();
                    if (data.send_code) {
                        $('#reg-error').html('<p class="text-success">' + data.result + '</p>');
                        $('#text_for_code').html(data.result);
                        $('#authfromReg').addClass('hide');
                        $('#authfromRegCode').removeClass('hide');
                        //$button.prop('disabled', true);

                    } else {
                        $('#reg-error').html('<p class="text-danger">' + data.result + '</p>');
                    }
                }
            });
        }
        return false;
    });
    $('#authfromRegCode form').on('submit', function () {
        var $form = $(this);
        var $code = $('#regCode');
        var $wrap = $code.parent();
        var code = $code.val();

        $wrap.removeClass('has-error');

        $('#code-error').html('');

        if (code.length > 4) {
            LOADER.show();
            $.ajax({
                url: '/auth/reg.php',
                dataType: 'json',
                type: 'POST',
                data: {
                    sessid: BX.bitrix_sessid(),
                    code: code
                },
                success: function (data) {
                    LOADER.hide();
                    if (data.reg) {
                        location.href = '/personal/';
                    } else {
                        $('#code-error').html('<p class="text-danger">' + data.result + '</p>');
                    }
                }
            });
        } else {
            $wrap.addClass('has-error');
        }
        return false;
    });
    $('#backToReg').on('click', function () {
        $('#authfromRegCode').addClass('hide');
        $('#authfromReg').removeClass('hide');
        $('#reg-error').html('');
        return false;
    });
    $('#sendSmsPass').on('click', function () {
        var $this = $(this);
        var $phone = $('#authPhoneReg');
        var phone = normalizePhone($phone.val());
        var $wrapPhone = $phone.parent();

        $wrapPhone.removeClass('has-error');

        if (!testPhone(phone)) {
            $wrapPhone.addClass('has-error');
        } else {
            var data = {
                AUTH_FORM: 'Y',
                TYPE: 'SEND_PWD',
                USER_LOGIN: phone,
                USER_EMAIL: phone,
                send_account_info: 'Выслать'
            };
            LOADER.show();
            $.post('/auth/?forgot_password=yes', data, function () {
                LOADER.hide();
                $('#login-error').html('<p class="text-success">Пароль отправлен</p>');
            });
        }
        return false;
    });
    $('.delivery-wrap input[type="radio"]').on('change', function () {
        var $this = $(this);
        var $wrap = $this.closest('.delivery-wrap');
        var name = $this.attr('name');
        var subName = $this.data('name');
        var id = $this.attr('id');
        if ($this.is(':checked')) {

            if (subName !== undefined && subName !== '') {
                $('.delivery-wrap input[type="radio"][name="' + subName + '"]').each(function () {
                    var $this = $(this);
                    var $wrap = $this.closest('.delivery-wrap');
                    $this.prop('checked', false);
                    $wrap.removeClass('active');
                });
                var $childWrap = $wrap.next();
                var $child = $childWrap.find('input[type="radio"]:checked');
                if ($child.length === 0) {
                    $childWrap.find('input[type="radio"]:first').prop('checked', true);
                }
            }
            if (!$wrap.hasClass('active')) {
                $wrap.addClass('active');
            }
            $('.slave-block[data-for="' + id + '"]').slideDown(500);
        }
        $('.delivery-wrap input[type="radio"][name="' + name + '"], .delivery-wrap input[type="radio"][data-name="' + name + '"]').not($this).each(function () {
            var $this = $(this);
            var $wrap = $this.closest('.delivery-wrap');
            var id = $this.attr('id');
            $this.prop('checked', false);
            $wrap.removeClass('active');
            $('.slave-block[data-for="' + id + '"]').slideUp(500);
        });
    });
    $('input[type="radio"].child-radio').on('change', function () {
        var $this = $(this);
        var $parent = $('#' + $this.data('parent'));
        if ($this.is(':checked') && !$parent.is(':checked')) {
            $parent.prop('checked', true).trigger('change');
            ;
        }
    });
    var goToStep = function (step) {
        var $nextStep = $('.order-step[data-step="' + (step) + '"]');
        if ($nextStep.length > 0) {
            $('.order-step.active').removeClass('active');
            $nextStep.addClass('active');
            $('.order-menu .item').removeClass('activated');
            $('.order-menu .item').removeClass('active');

            $('.order-menu .item').each(function () {
                var $this = $(this);
                var s = $this.data('step');
                if (s < step) {
                    $this.addClass('activated');
                } else if (s === step) {
                    $this.addClass('active');
                }
            });
        }
    };
    $('.order-step button.gonext').on('click', function () {
        var $this = $(this);
        var $orderStep = $this.closest('.order-step');
        var haveErrors = false;
        var step = $orderStep.data('step');
        var emailPreg = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        $orderStep.find('input[required]:visible').each(function () {
            var $input = $(this);
            var val = $input.val();
            var $wrap = $input.parent();
            if ($input.attr('type') === 'text' || $input.attr('type') === 'email') {
                if (val === '') {
                    $wrap.addClass('has-error');
                    haveErrors = true;
                } else if ($input.attr('type') === 'email' && !emailPreg.test(val)) {
                    $wrap.addClass('has-error');
                    haveErrors = true;
                } else {
                    $wrap.removeClass('has-error');
                }
            }
        });
        if (!haveErrors) {
            goToStep(step + 1);
        }
    });
    $('body').on('click', '.order-menu .item.activated', function () {
        var $this = $(this);
        var step = $this.data('step');
        goToStep(step);
    });
});
function ajaxSearch(data) {
    var $header_search_result = $('#header_search_result');
    var $header = $('<div/>').addClass('search_result');
    $.ajax({
        url: '/search/ajax.php',
        dataType: 'json',
        data: data,
        success: function (json) {
            if (json.items !== undefined && json.items.length > 0) {
                $.each(json.items, function (i, val) {
                    $header.append($('<div/>').addClass('item').html('<div class="img-wrap">'
                            + (val.img === null ? '' : '<a href="' + val.link + '"><img src="' + val.img + '" alt="" /></a>')
                            + '</div><div class="product-name"><a href="' + val.link + '">' + val.name + '</a></div>'));
                });
            }
            $header_search_result.append($header);
        }

    });
}
function price_format(number) {
    if (/\.[0-9]+/.test(number)) {
        return number.formatMoney(2, '.', ' ');
    } else {
        return number.formatMoney(0, '.', ' ');
    }
}
function sklonenie(n, forms) {
    return n % 10 === 1 && n % 100 !== 11 ? forms[0] : (n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? forms[1] : forms[2]);
}
Number.prototype.formatMoney = function (c, d, t) {
    var n = this,
            c = isNaN(c = Math.abs(c)) ? 2 : c,
            d = d === undefined ? "." : d,
            t = t === undefined ? "," : t,
            s = n < 0 ? "-" : "",
            i = parseInt(n = Math.abs(+n || 0).toFixed(c)) + "",
            j = (j = i.length) > 3 ? j % 3 : 0;
    return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
};
function catalogListSuccess(html) {
    var $pagin = $('.getMore-wrap .page-navigation');
    var $getMore = $(html).find('.getMore-wrap .page-navigation');
    $('section.catalog_items').html($(html).find('section.catalog_items').html());
    if ($getMore.length > 0) {
        $('.getMore-wrap').html($getMore);
    } else {
        $pagin.remove();
    }
    LOADER.hide();
}
function updateCart(id, q) {
    LOADER.show();
    $.post('/personal/cart/ajax.php', {action: 'add', id: id, q: q}, function (html) {
        $('.cart-block .special-menu-item-cart').html($(html).find('.special-menu-item-cart').html());
        $('.cart-block .fast-cart-wrap .modal-body').html($(html).find('.fast-cart-wrap .modal-body').html());
        LOADER.hide();
    });
}
function setInCartButtons(IDS) {
//    var inCarttext = 'Оформить';
    if (IDS === undefined || IDS.length === 0) {
        return false;
    }
    $.each(IDS, function (i, id) {
        $('.addToCart[data-id="' + id + '"],.addToCart_[data-id="' + id + '"]').not('in-cart')
                .addClass('btn-default')
                .addClass('in-cart')
                .removeClass('btn-primary')
//                .text(inCarttext)
                .attr('href', '/personal/cart/')
                .off();
    });
}
function setInCartItems(items) {
    if (items === undefined || items.length === 0 || items.items === undefined || items.items.length === 0) {
        return false;
    }
    $.each(items.items, function (i, item) {
        var $tr = $('#basket_items tr[data-id="' + item.id + '"]');
        if ($tr.length > 0) {
            $tr.find('.price .price-val').text(item.price);
        }
    });
    if (items.total !== undefined) {
        $('#allSum_FORMATED .price-val').text(items.total);
    }
}
function addTocartBind($this) {
    if ($this.hasClass('in-cart')) {
        return true;
    }
    var data = {action: 'add', id: $this.data('id')};
    var $toCartSpinner = $('#toCartSpinner');
    if ($toCartSpinner.length > 0) {
        data.q = $toCartSpinner.val();
    }
    LOADER.show();
    $.post('/personal/cart/ajax.php', data, function (html) {
        $('.cart-block .special-menu-item-cart').html($(html).find('.special-menu-item-cart').html());
        $('.cart-block .fast-cart-wrap .modal-body').html($(html).find('.fast-cart-wrap .modal-body').html());
        LOADER.hide();
    });
    return false;
}
function overlay_inCartEvent() {
    var $this = $(this);
    if ($this.hasClass('in-cart')) {
        location.href = '/personal/cart/';
        return false;
    }
    LOADER.show();
    $.post('/personal/cart/ajax.php', {action: 'add', id: $this.data('id')}, function (html) {
        $('.cart-block.row .description').html($(html).find('.description').html());
        $('.cart-block.row .fast-cart-wrap').html($(html).find('.fast-cart-wrap').html());
        LOADER.hide();
    });
    return false;
}
function chLocation(loc) {
    try {
        history.pushState({}, '', loc);
        return;
    } catch (e) {
    }
    location.hash = '#' + loc;
}
function delPrm(Url, Prm) {
    if (typeof Url === 'undefined') {
        return Url;
    }

    var arrUrl = Url.split('?');

    if (typeof arrUrl[1] === "undefined") {
        return Url;
    }
    var arParams = arrUrl[1].split('&');
    $.each(arParams, function (key, val) {
        if (typeof val !== 'undefined' && val !== 'undefined') {
            var arParam = val.split('=');
            if (arParam[0] === Prm || arParam[0] === 'undefined') {
                arParams.splice(arParams.indexOf(key), 1);
            }

        } else {
            arParams.splice(arParams.indexOf(key), 1);
        }
    });
    var params = arParams.join('&');

    if (params !== '') {
        params = '?' + params;
    }
    return arrUrl[0] + params;
}


 
//card slider
$(document).ready(function () {
    //clone  for gallery
$('.card_slider-lg').clone().appendTo('.gallery-content').attr('id', 'owl-big-imageModal');
$('.card_slider-sm').clone().appendTo('.gallery-content').attr('id', 'owl-big-image-smModal');

    $("#owl-big-image1").owlCarousel({
         items: 1,
        pagination: false,
        nav: false,
        dots: false
    });
    
    var owlSmOptions = {
        pagination: false,
        nav: true,
        items: 3,
        navText: ['<span class="icon slider-prev"></span><span class="icon slider-prev-disabled"></span>',
            '<span class="icon slider-next"></span><span class="icon slider-next-disabled"></span>'],
        scrollPerPage: true,
        margin: 15
    };
    
    $("#owl-big-image-sm1").owlCarousel(owlSmOptions);
     $("#owl-big-image-sm1").on('changed.owl.carousel', function(event) {
        // alert()
});
    $("#owl-big-image-sm1 .item").on('click', function () {
        var $this = $(this);      
        var index = $("#owl-big-image-sm1 .item").index($this);        
        $("#owl-big-image1").trigger('to.owl', index);
        return false;
    });
    $(".tab-components_slider").owlCarousel({
        pagination: false,
        navText: ['<span class="icon slider-prev"></span>', '<span class="icon slider-next"></span>'],
        scrollPerPage: true,
        margin: 7,
        responsive: {
            1200: {
                nav: true,
                items: 8
            },
            979: {
                nav: true,
                items: 4
            },
            495: {
                items: 3
            },
            0: {
                items: 2,
                nav: false
            }
        }
    });
    $(".rewiew-slider").owlCarousel({
        pagination: false,
        navText: ['<span class="icon s-left"></span>', '<span class="icon s-right"></span>'],
        scrollPerPage: true,
        margin: 8,
        responsive: {
            1200: {
                nav: true,
                items: 7
            },
            979: {
                nav: true,
                items: 4
            },
            595: {
                items: 3
            },
            0: {
                items: 2,
                nav: false
            }
        }
    });

    $('.cert-slider').owlCarousel({
        pagination: false,
        navText: ['<span class="icon s-left"></span>', '<span class="icon s-right"></span>'],
        scrollPerPage: true,
        margin: 30,
        responsive: {
            1200: {
                nav: true,
                items: 7
            },
            979: {
                nav: true,
                items: 4
            },
            595: {
                items: 3
            },
            0: {
                items: 2,
                nav: false
            }
        }
    });


    $('.panel-slider_1').owlCarousel({
        pagination: false,
        nav: true,
        navText: ['<span class="icon brand-prev"></span><span class="icon brand-prev-disabled"></span>',
            '<span class="icon brand-next"></span><span class="icon brand-next-disabled"></span>'],
        scrollPerPage: true,
        margin: 10,
        items: 1
    });

    var owlOptions = {
        pagination: false,
        nav: true,
        navText: ['<span class="icon brand-prev"></span><span class="icon brand-prev-disabled"></span>',
            '<span class="icon brand-next"></span><span class="icon brand-next-disabled"></span>'],
        scrollPerPage: true,
        margin: 10,
        responsive: {
            1200: {
                nav: true,
                items: 4
            },
            979: {
                nav: true,
                items: 3
            },
            500: {
                items: 2,
                 nav: false
            },
            0: {
                items: 1,
                nav: false
            }
        }
    };

    $('.category-slider_1').owlCarousel(owlOptions);
    $('.category-slider_2').owlCarousel(owlOptions);
    $('.category-slider_3').owlCarousel(owlOptions);
    $('.category-slider_4').owlCarousel(owlOptions);
    $('.category-slider_5').owlCarousel(owlOptions);


    if ($('.tab-pane_set ').length > 0) {
        $('.tab-pane_set ').enscroll({
            verticalTrackClass: 'vertical-track2',
            verticalHandleClass: 'vertical-handle2',
            minScrollbarLength: 35,
            drawCorner: false,
            easingDuration: 100
        });
    }


    $(function () {
        var $this = $("[data-timer]");        
        if ($this.length < 1) return;
        var timerDescription = $this.prop('title');
        var dateArr = $this.data("timer").split(",");
        dateArr = $.map(dateArr, function (elem) {
            return parseInt(elem);
        });

        dateArr[1]--;
        var date = new Date(dateArr[0], dateArr[1], dateArr[2], dateArr[3], dateArr[4], dateArr[5]);

        $this.countdown({
            until: date,
            padZeroes: true
        });

    });

    // scroll отзывы - таб панель

    $(".to-review").on("click", function (event) {
        event.preventDefault();
        var id = $('#feedback');

        $('.nav-tab-sm.active').removeClass('active');
        $('a[href^="#feedback"]').parent().addClass('active');
        $('.js-tab').removeClass('in').removeClass('active');

        id.addClass('in').addClass('active');

        var top = $(id).offset().top - 80;
        $('body,html').animate({scrollTop: top}, 1500);
    });


    $(".to-description").on("click", function (event) {
        event.preventDefault();
        var id = $('#descr');

        $('.nav-tab-sm.active').removeClass('active');
        $('a[href^="#descr"]').parent().addClass('active');
        $('.js-tab').removeClass('in').removeClass('active');

        id.addClass('in').addClass('active');

        var top = $(id).offset().top - 80;
        $('body,html').animate({scrollTop: top}, 1500);
    });

    $(".set_change a").on("click", function (event) {
        event.preventDefault();
        var id = $('#components');

        $('.nav-tab-sm.active').removeClass('active');
        $('a[href^="#components"]').parent().addClass('active');
        $('.js-tab').removeClass('in').removeClass('active');

        id.addClass('in').addClass('active');

        var top = $(id).offset().top - 80;
        $('body,html').animate({scrollTop: top}, 1500);
    });

    //brand
//    $(".category-nav_item").on("click", function (event) {
//        event.preventDefault();
//        var id = $(this).children('a').attr('href');
//
//        $('.category-nav_item.active').removeClass('active');        
//
//        var btn = $('.panel_title').children('a[href^=' + id + ']');
//         $(btn).trigger('click');
//         
//        $('.cross').addClass('closed');       
//       $('.panel_title a[aria-expanded="true"]').siblings('.cross').removeClass('closed'); 
//       
//       var newId = $('.panel_title a[aria-expanded="true"]').attr('href');
//       $('a[href^=' + newId + ']').parent('.category-nav_item').addClass('active');
//
//        var top = $(id).offset().top - 60;
//        $('body,html').animate({scrollTop: top}, 1500);
//    });
//
//    $('.panel_title').on("click", function (event) {
//        event.preventDefault();
//        $(this).children('.cross').toggleClass('closed');      
//        $('.category-nav_item.active').removeClass('active');
//        var id = $(this).find('a').attr('href');
//        $('.category-nav_item').children('a[href^=' + id + ']').parent().addClass('active');        
//    });      
//
//    $('.panel_title .cross ').click(function () {       
//         var btn = $(this).siblings('a');             
//        $(btn).trigger('click');      
//    });
    

//     скролл дополнительно todo

    $(window).scroll(function () {
        $('.js-popup').each(function () {
            var scrolled = document.documentElement.scrollTop;
            var heightEl = $(this).offset().top;
            if (scrolled > heightEl - 300) {
                $(this).addClass("show");
            }
        });
    });
        $('.popup .close').click(function () {
        $(this).closest('.show').css('opacity', '0').removeClass('show');
    });

 if ($('.js-fixed ').length > 0) {
    var heightEl = $('.js-fixed').offset().top;
    window.onscroll = function () {

        var scrolled = window.scrollY;

        var elHeight = $('.js-fixed').outerHeight();
        if (scrolled > heightEl) {
            $('.js-fixed').addClass("fixed");
            $('.js-placeholder').css('height', elHeight);

        } else {
            $('.js-fixed').removeClass("fixed");
            $('.js-placeholder').css('height', '');
        }
    };
}

    // 'tab-components_link  
    $('.js-slideup').click(function () {
        $(this).closest('div').siblings().slideToggle(500);
        return false;
    });

// scroll to element
    $(".slider_item").on("click", function (event) {
        event.preventDefault();
        var id = $(this).find('a').attr("href");
        
        var idTab = $(id).closest('.tab-pane').attr('id');
        
        $('#components .nav-tabs li').removeClass('active');
       $('.nav-tabs').find('a[href="#' + idTab + '"]').parent().addClass('active');         
        
        $('#components .tab-pane').removeClass('in').removeClass('active');

        $('#'+idTab).addClass('in').addClass('active');                  
        var top = $(id).offset().top - 200;        
        $('body,html').animate({scrollTop: top}, 1500);
    });

// scroll to tab todo
    $(".slider_item").on("click", function (event) {
        event.preventDefault();
        var id = $(this).find('a').attr("href");
        
        var idTab = $(id).closest('.tab-pane').attr('id');
        
        $('#components .nav-tabs li').removeClass('active');
       $('.nav-tabs').find('a[href="#' + idTab + '"]').parent().addClass('active');         
        
        $('#components .tab-pane').removeClass('in').removeClass('active');

        $('#'+idTab).addClass('in').addClass('active');                  
        var top = $(id).offset().top - 200;        
        $('body,html').animate({scrollTop: top}, 1500);
    });
    
    
//todo
    //$('#topcontrol').append('<span class="icon up"></span>'); 
    
    $('.btn-up').on("click", function (event) {
        event.preventDefault();
         $('body,html').animate({scrollTop: 0}, 1500);
    });
    $(window).scroll(function () {

        var scrolled = document.documentElement.scrollTop;
        var footer = $('footer').offset().top;

        if (scrolled < 20) {
            $('.btn-up').removeClass('visible');
        } else {
             $('.btn-up').addClass('visible');
        }

        if ($('.btn-up').offset().top + $('.btn-up').height()
                >= footer)
            $('.btn-up').removeClass('fixed');
        if ($(document).scrollTop() + window.innerHeight < footer)
            $('.btn-up').addClass('fixed');
    });
    
    
    //gallery
    
        $("#owl-big-imageModal").owlCarousel({
        pagination: false,
        nav: true,
        navText: ['<span class="icon brand-prev"></span><span class="icon brand-prev-disabled"></span>',
            '<span class="icon brand-next"></span><span class="icon brand-next-disabled"></span>'],
        scrollPerPage: true,
        margin: 10,
        items: 1,               
        onTranslated: findHeader
    });
    $("#owl-big-image-smModal").owlCarousel({
        pagination: false,
        nav: true,             
                responsive: {
            1199: {               
                items: 6
            },
            979: {             
                items: 3
            },
            768: {
                items: 3               
            },
            0: {
                items: 3                
            }
        },
        navText: ['<span class="icon brand-prev"></span><span class="icon brand-prev-disabled"></span>',
            '<span class="icon brand-next"></span><span class="icon brand-next-disabled"></span>'],
        scrollPerPage: true,
        margin: 1
    });
    $("#owl-big-image-smModal .item").on('click', function () {
        var $this = $(this);
        var index = $("#owl-big-image-smModal .item").index($this);
        $("#owl-big-imageModal").trigger('to.owl', index);
        return false;
    });
    
     
    function findHeader(event) {
        var title = $('#owl-big-imageModal').find('.owl-item.active').find('img').attr('alt');
          $('.gallery-title').text(title);
          
         var index =  $('#owl-big-imageModal').find('.owl-item.active').index();
        
         $("#owl-big-image-smModal .item .img-wrap").removeClass(' underline');
         $("#owl-big-image-smModal .item .img-wrap").eq(index).addClass(' underline');         
}   

    
    $("#owl-big-image1").on("click", function (event) {
         event.preventDefault();
        var title = $(event.target).attr('alt');
        $('.gallery-title').text(title);      
        
        var start = $('#owl-big-image1').find('.owl-item.active').index();      
        
        $("#owl-big-image-smModal .item .img-wrap").removeClass(' underline');
        $("#owl-big-image-smModal .item .img-wrap").eq(start).addClass(' underline');
         $('#gallery').modal({show: true});         
       
        //sync for sliders
        
        var next = $('#owl-big-imageModal').find('.owl-next');
        next.on("click", function (event) {
            $("#owl-big-image-smModal").trigger('next.owl.carousel');
        });
        
        var prev = $('#owl-big-imageModal').find('.owl-prev');
        prev.on("click", function (event) {
            $("#owl-big-image-smModal").trigger('prev.owl.carousel');
        });
    }); 
    
        $('[data-fancybox ="certificate"]').fancybox({              
        animationEffect: 'fade',
        transitionEffect: false,       
        infobar: true,
        arrows: false,
        toolbar: false,        
        loop: false,        
        afterLoad : function( instance, current ) {
    if ( instance.group.length > 1 && current.$content ) {

                var arrowLeft = '<a data-fancybox-next = "" class="btn-fancybox button-next " href="javascript:;"><i class="icon s-right"></i></a>';
                var arrowRight = '<a data-fancybox-prev = "" class=" btn-fancybox button-prev" href="javascript:;"><i class="icon s-left"></i></a>';
                current.$content.append(arrowLeft + arrowRight);

                if (current.index === 0) {
                    $('.button-prev').addClass('disabled');
                }
                if (current.index === instance.group.length - 1) {
                    $('.button-next').addClass('disabled');
                }           
    }    
    
        }
    });
});

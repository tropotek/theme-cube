

// for the tk-panel generator to keep bootstrap 3/4 compatability
config.tkPanel = {
  template:
  '<div class="main-box">\n' +
  '  <header class="main-box-header clearfix"><h2 class=""><i class="tp-icon"></i> <span class="tp-title"></span></h2></header>\n' +
  '  <div class="tp-body main-box-body clearfix"></div>\n' +
  '</div>'
};


$(function($) {

  // ------------------   dropdown menu     -----------------------------------
  $('.tk-ui-menu.nav-dropdown').each(function () {
    $(this).addClass('dropdown-menu dropdown-menu-right');
    $(this).find('.divider').addClass('dropdown-divider');
  });

  // Side menu
  $('.tk-ui-menu.nav-side').each(function () {
    $(this).prepend('<li class="nav-header nav-header-first d-none d-lg-block">Navigation</li>');
    $(this).addClass('nav navbar-nav nav-pills nav-stacked').find('ul').addClass('submenu');
    $(this).find('li.submenu > a').addClass('dropdown-toggle dropdown-nocaret').append('<i class="fa fa-angle-right drop-icon"></i>');
    $(this).find('li.submenu').removeClass('submenu');
  });

  $('.tk-ui-menu').css('visibility', 'visible');



  // Activate the appropriate side nav for this url, expands any sub-nav items
	var subItems = $('.submenu a');



  function activateItem(a) {
    var $item = a.parent();
		if (!$item.hasClass('open')) {
			$item.parent().find('.open .submenu').slideUp('fast');
			$item.parent().find('.open').toggleClass('open');
		}
		$item.toggleClass('open');
		if ($item.hasClass('open')) {
			$item.children('.submenu').slideDown('fast');
		} else {
			$item.children('.submenu').slideUp('fast');
		}
  }


	// First check the page URL for a match
	subItems.each(function () {
		var url = location.href.split("?")[0];
		var href = $(this).attr('href').split("?")[0];
		if (url === href)
				activateItem($(this).parent().parent().parent().find('.dropdown-toggle'));
	});

	// Check breadcrumbs if no menu item active
	if (!$('#sidebar-nav li.open').length) {
		$($('.breadcrumb a').get().reverse()).each(function () {
			var linkHref = $(this).attr('href').split("?")[0];
			var a = subItems.find('[href="' + linkHref + '"]');
			if (a.length) {
				activateItem(a.parent().parent().parent().find('.dropdown-toggle'));
				return false;
			}
		});
	}


	// // First check the page URL for a match
	// $('#sidebar-nav a:not(.dropdown-toggle)').each(function () {
	// 	var url = location.href.split("?")[0];
	// 	var href = $(this).attr('href').split("?")[0];
	// 	if (url === href)
	// 		if($(this).closest('ul').is('.submenu'))
	// 			activateItem($(this).parent().parent().parent().find('.dropdown-toggle'));
	// 	//activateItem($(this).parent().parent().parent().find('.dropdown-toggle'));
	// });
	//
	// // Check breadcrumbs if no menu item active
	// if (!$('#sidebar-nav li.open').length) {
	// 	$($('.breadcrumb a').get().reverse()).each(function () {
	// 		var linkHref = $(this).attr('href').split("?")[0];
	// 		var a = $('#sidebar-nav a[href="' + linkHref + '"]');
	// 		if (a.length) {
	// 			activateItem(a.parent().parent().parent().find('.dropdown-toggle'));
	// 			return false;
	// 		}
	// 	});
	// }
  // ------------------   end  -----------------------------------



	setTimeout(function() {
		$('#content-wrapper > .row').css({
			opacity: 1
		});
	}, 200);

	$('#sidebar-nav, #nav-col-submenu').on('click', '.dropdown-toggle', function (e) {
		e.preventDefault();
		activateItem($(this));
	});

	$('body').on('mouseenter', '#page-wrapper.nav-small #sidebar-nav .dropdown-toggle', function (e) {
		if ($( document ).width() >= 992) {
			var $item = $(this).parent();

			if ($('body').hasClass('fixed-leftmenu')) {
				var topPosition = $item.position().top;

				if ((topPosition + 4*$(this).outerHeight()) >= $(window).height()) {
					topPosition -= 6*$(this).outerHeight();
				}

				$('#nav-col-submenu').html($item.children('.submenu').clone());
				$('#nav-col-submenu > .submenu').css({'top' : topPosition});
			}

			$item.addClass('open');
			$item.children('.submenu').slideDown('fast');
		}
	});
	
	$('body').on('mouseleave', '#page-wrapper.nav-small #sidebar-nav > .nav-pills > li', function (e) {
		if ($( document ).width() >= 992) {
			var $item = $(this);
	
			if ($item.hasClass('open')) {
				$item.find('.open .submenu').slideUp('fast');
				$item.find('.open').removeClass('open');
				$item.children('.submenu').slideUp('fast');
			}
			
			$item.removeClass('open');
		}
	});
	$('body').on('mouseenter', '#page-wrapper.nav-small #sidebar-nav a:not(.dropdown-toggle)', function (e) {
		if ($('body').hasClass('fixed-leftmenu')) {
			$('#nav-col-submenu').html('');
		}
	});
	$('body').on('mouseleave', '#page-wrapper.nav-small #nav-col', function (e) {
		if ($('body').hasClass('fixed-leftmenu')) {
			$('#nav-col-submenu').html('');
		}
	});
	
	$('#make-small-nav').click(function (e) {
		$('#page-wrapper').toggleClass('nav-small');
	});
	
	$(window).smartresize(function(){
		if ($( document ).width() <= 991) {
			$('#page-wrapper').removeClass('nav-small');
		}
	});
	
	$('.mobile-search').click(function(e) {
		e.preventDefault();
		
		$('.mobile-search').addClass('active');
		$('.mobile-search form input.form-control').focus();
	});
	$(document).mouseup(function (e) {
		var container = $('.mobile-search');

		if (!container.is(e.target) // if the target of the click isn't the container...
			&& container.has(e.target).length === 0) // ... nor a descendant of the container
		{
			container.removeClass('active');
		}
	});
	
	$('.fixed-leftmenu #col-left').nanoScroller({
    	alwaysVisible: false,
    	iOSNativeScrolling: false,
    	preventPageScrolling: true,
    	contentClass: 'col-left-nano-content'
    });
	
	// build all tooltips from data-attributes
	$("[data-toggle='tooltip']").each(function (index, el) {
		$(el).tooltip({
			placement: $(this).data("placement") || 'top'
		});
	});
});







$.fn.removeClassPrefix = function(prefix) {
    this.each(function(i, el) {
        var classes = el.className.split(" ").filter(function(c) {
            return c.lastIndexOf(prefix, 0) !== 0;
        });
        el.className = classes.join(" ");
    });
    return this;
};

(function($,sr){
	// debouncing function from John Hann
	// http://unscriptable.com/index.php/2009/03/20/debouncing-javascript-methods/
	var debounce = function (func, threshold, execAsap) {
		var timeout;

		return function debounced () {
			var obj = this, args = arguments;
			function delayed () {
				if (!execAsap)
					func.apply(obj, args);
				timeout = null;
			};

			if (timeout)
				clearTimeout(timeout);
			else if (execAsap)
				func.apply(obj, args);

			timeout = setTimeout(delayed, threshold || 100);
		};
	}
	// smartresize 
	jQuery.fn[sr] = function(fn){	return fn ? this.bind('resize', debounce(fn)) : this.trigger(sr); };

})(jQuery,'smartresize');
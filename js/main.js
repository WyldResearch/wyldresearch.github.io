$(function() {
  
  // topbar scroll

  var navbar = $('#topbar');
  //var navbarOffset = navbar.offset().top;
  // console.log('menu: ', navbarOffset);

  // sticky menu 

  $(window).bind('scroll', function () {
    //var breakpoint = $(window).height() - 120; // 120 = navbar-height
    var breakpoint = $(window).height()/3;

    if ($(window).scrollTop() > breakpoint) {
        navbar.addClass('scrolled');
    } else {
        navbar.removeClass('scrolled');
    }
  });

  // vide

  // $('#vide1').vide({
  //   mp4: 'path/to/video1',
  //   webm: 'path/to/video2',
  //   ogv: 'path/to/video3',
  //   poster: 'path/to/poster'
  // }, {
  //   volume: 1,
  //   playbackRate: 1,
  //   muted: true,
  //   loop: true,
  //   autoplay: true,
  //   position: '50% 50%', // Similar to the CSS `background-position` property.
  //   posterType: 'detect', // Poster image type. "detect" — auto-detection; "none" — no poster; "jpg", "png", "gif",... - extensions.
  //   resizing: true, // Auto-resizing, read: https://github.com/VodkaBears/Vide#resizing
  //   bgColor: 'transparent', // Allow custom background-color for Vide div,
  //   className: '' // Add custom CSS class to Vide div
  // });

  // smooth scroll

  smoothScroll.init({
    selector: '[data-scroll]', // Selector for links (must be a valid CSS selector)
    selectorHeader: '[data-scroll-header]', // Selector for fixed headers (must be a valid CSS selector)
    speed: 750, // Integer. How fast to complete the scroll in milliseconds
    easing: 'easeInOutCubic', // Easing pattern to use
    offset: 0, // Integer. How far to offset the scrolling anchor location in pixels
    updateURL: true, // Boolean. If true, update the URL hash on scroll
    callback: function ( anchor, toggle ) {} // Function to run after scrolling
  });

  // height equalizer
  
  heightEqualizer();

  // $(window).on('resize', function(){
  //   debounce(heightEqualizer, 100);
  // })
  
  // slider
  
  // $('.slider').slick({
  //   dots: true,
  //   adaptiveHeight: false,
  //   autoplay: true,
  //   autoplaySpeed: 8000,
  //   mobileFirst: true
  //   // prevArrow: '<button type="button" class="slick-prev">Previous</button>',
  //   // nextArrow: '<button type="button" class="slick-next">Next</button>',
  // }).on('beforeChange', function(event, slick, direction){
  //   console.log(direction);
  // }).on('afterChange', function(event, slick, direction){
  //   console.log(direction);
  // });

  // nav
  console.log('hello?');
  $('#topbar a').on('click', function(){
    console.log('hello');
    $('#navbar').collapse('hide');
  });
});

/*
  Equalizer
 */

function heightEqualizer(){
  $("[data-equal]").each(function(){
    var parent = $(this);
    var type = parent.attr('data-equal');
    var array = type.split(",");

    $.each(array,function(i,e){
        var H = 0;
        parent.find( "[data-equal-watch="+e+"]" ).each(function(){
            var h = $(this).height();
            if( h > H ){ H = h; }
        });
        $("[data-equal-watch="+e+"]").height(H);
    });
  });
}

/*
  Mobile Check
 */

function isMobile(){
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

/*
  Debounce
 */

function debounce(func, wait, immediate) {
  var timeout;
  return function() {
    var context = this, args = arguments;
    var later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
};
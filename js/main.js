$(function() {
  
  // TOPBAR SCROLL

  var navbar = $('#topbar');
  //var navbarOffset = navbar.offset().top;

  $(window).bind('scroll', debounce(checkTopbarScroll, 10));

  function checkTopbarScroll() {
    //var breakpoint = $(window).height() - 120; // 120 = navbar-height
    var breakpoint = 100;

    if ($(window).scrollTop() > breakpoint) {
        navbar.addClass('scrolled');
    } else {
        navbar.removeClass('scrolled');
    }
  }
  
  checkTopbarScroll();

  $('.navbar-collapse .nav a').on('click', function(){
     $('.navbar-collapse').collapse('hide');
  })

  // SMOOTH SCROLL

  smoothScroll.init({
    selector: '[data-scroll]', // Selector for links (must be a valid CSS selector)
    selectorHeader: '[data-scroll-header]', // Selector for fixed headers (must be a valid CSS selector)
    speed: 750, // Integer. How fast to complete the scroll in milliseconds
    easing: 'easeInOutCubic', // Easing pattern to use
    offset: 71, // Integer. How far to offset the scrolling anchor location in pixels
    updateURL: false,
    callback: function ( anchor, toggle ) {} // Function to run after scrolling
  });

  // HEIGHT EQUALIZER
  
  heightEqualizer();
  //$(window).on('resize', debounce(heightEqualizer, 50));
  
  // DISABLE COLLAPSED MENU TRANSITION
  $.support.transition = false;

  // BIG VIDEO SLIDE SHOW
  
  // Use Modernizr to detect for touch devices, 
  // which don't support autoplay and may have less bandwidth, 
  // so just give them the poster images instead
  var screenIndex = 1,
      numScreens = $('.screen').length,
      isTransitioning = true,
      transitionDur = 1000,
      BV,
      videoPlayer,
      isTouch = Modernizr.touch,
      $bigImage = $('.big-image'),
      $window = $(window);
  
  unblockTransitioning();

  if (!isTouch) {
      // initialize BigVideo
      BV = new $.BigVideo({
        forceAutoplay: isTouch,
        controls: true,
        doLoop: false
      });

      BV.init();
      showVideo();
      
      BV.getPlayer().addEvent('loadeddata', function() {
          onVideoLoaded();
      });

      // adjust image positioning so it lines up with video
      $bigImage
          .css('position','relative')
          .imagesLoaded(adjustImagePositioning);
      // and on window resize
      $window.on('resize', adjustImagePositioning);
  }else{
    // adjust for mobile
    adjustImagePositioning();
  }
  
  $bigImage.css('opacity', 1);
  $('.wrapper').css('opacity', 1);

  if (Modernizr.csstransitions){
    $('.wrapper').transit(
      {'left':'0'},
      transitionDur);
  }    

  // Next button click goes to next div
  $('#next-btn').on('click', function(e) {
      e.preventDefault();
      if (!isTransitioning) {
          next();
      }
  });

 $('#prev-btn').on('click', function(e) {
      e.preventDefault();
      if (!isTransitioning) {
          prev();
      }
  });

  function showVideo() {
      BV.show($('#screen-'+screenIndex).attr('data-video'),{ambient:true});
  }

  function prev() {
      isTransitioning = true;

      // update video index, reset image opacity if starting over
      if (screenIndex === 1) {
          $bigImage.css('opacity', 1);
          screenIndex = numScreens;
      } else {
          screenIndex--;
      }
      
      $('#screen-'+screenIndex).find('.big-image').css('opacity', 1);

      // var tx_pos = -(screenIndex-1)*20;

      if (!isTouch) {
          $('#big-video-wrap').transit({'left':'+100%'},transitionDur);
          // $('#big-video-wrap').transit({'transform':'translateX('+ tx_pos +')'}, transitionDur);
      }

      (Modernizr.csstransitions)?
          $('.wrapper').transit(
              {'left':'-'+ (100*(screenIndex-1)) +'%'},
              // {'transform':'translateX('+ tx_pos +')'},
              transitionDur,
              onTransitionComplete):
          onTransitionComplete();
  }

  function next() {
      isTransitioning = true;

      // update video index, reset image opacity if starting over
      if (screenIndex === numScreens) {
          $bigImage.css('opacity', 1);
          screenIndex = 1;
      } else {
          screenIndex++;
      }
      
      $('#screen-'+screenIndex).find('.big-image').css('opacity', 1);

      // var tx_pos = -(screenIndex-1)*20;

      if (!isTouch) {
        $('#big-video-wrap').transit({'left':'-100%'}, transitionDur);
        //$('#big-video-wrap').transit({'transform':'translateX('+ tx_pos +')'}, transitionDur)
      }

      (Modernizr.csstransitions)?
          $('.wrapper').transit(
              {'left':'-'+ (100*(screenIndex-1)) +'%'},
              // {'translateX':'translateX('+ tx_pos +')'},
              transitionDur,
              onTransitionComplete):
          onTransitionComplete();
  }

  function onVideoLoaded() { 
    $('#screen-'+screenIndex).find('.big-image').transit({'opacity': 0}, 500)
  }
  // $('#big-video-wrap').css('display','none');

  function unblockTransitioning() {
    // minor delay to avoid no-image bug
      setTimeout(function(){
        isTransitioning = false;
      }, 350);
  }

  function onTransitionComplete() {
      unblockTransitioning();

      if (!isTouch) {
          $('#big-video-wrap').css('left',0);
         showVideo();
      }
  }

  function adjustImagePositioning() {
    $bigImage.each(function(){
        var $img = $(this),
            img = new Image();

        img.src = $img.attr('src');

        var windowWidth = $window.width(),
            windowHeight = $window.height(),
            r_w = windowHeight / windowWidth,
            i_w = img.width,
            i_h = img.height,
            r_i = i_h / i_w,
            new_w, new_h, new_left, new_top;

        if( r_w > r_i ) {
            new_h   = windowHeight;
            new_w   = windowHeight / r_i;
        }
        else {
            new_h   = windowWidth * r_i;
            new_w   = windowWidth;
        }

        $img.css({
            width   : new_w,
            height  : new_h,
            left    : ( windowWidth - new_w ) / 2,
            top     : ( windowHeight - new_h ) / 2
        })
    });
  }

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
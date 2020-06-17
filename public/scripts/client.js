/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(() => {
  $(document).ready(function() {
    $(document).scroll(function () {
        var scroll = $(this).scrollTop();
        var topDist = $("#header").position();
        if (scroll > topDist.top) {
            $('nav').addClass('sticky');
        } else {
            $('nav').removeClass('sticky');
        }
    })
});

  $("#tweetsArticle").hover(function() {
    $(this).addClass('shadowed')
    $("#handle").removeClass('username')
  }, function(){
    $(this).removeClass('shadowed')
    $("#handle").addClass('username')
  })
})

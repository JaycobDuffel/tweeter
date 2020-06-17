/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(() => {

  const createTweetElement = (tweetData) => {
    const $tweet = $(`
    <article class="tweetArticle">
      <header>
        <div id="avatar">
          <img src="${tweetData.user.avatars}">
          <span id="name">${tweetData.user.name}</span>
        </div>
        <span class="handle username">${tweetData.user.handle}</span>
      </header>
      <span id="tweetSpan">${tweetData.content.text}</span>
      <footer>
        <span>${new Date(tweetData.created_at).toDateString()}</span>
        <div class="tweetButtons">
          <a href="#"><img src="/images/002-flag.png" alt="flag-tweet"></a>
          <a href="#"><img src="/images/001-retweet.png" alt="retweet"></a>
          <a href="#"><img src="/images/003-love.png" alt="heart-tweet"></a>
        </div>
      </footer>
    </article>`)

    return $tweet;
  }

  const renderTweets = (tweets) => {
    for (const tweet of tweets) {
      const $tweet = createTweetElement(tweet)
      $('#tweet-container').prepend($tweet)
    }
  }

  $(document).ready(function () {
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

  $(function () {
    const $button = $('#submitTweetBtn')
    $button.on("click", (event) => {
      event.preventDefault(event);
      const data = $("#txtArea").serialize();
      $.post("/tweets", data)
        .then(function () {
          loadTweets()
        })
    })
  })

  const loadTweets = () => {
    $.getJSON('/tweets')
      .then(function (data) {
        $('#tweet-container').empty();
        renderTweets(data);
      })
  }

  loadTweets();
})

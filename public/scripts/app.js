$(function () {

  $('#writeTweet').on('submit', function (submitEvent) {
    submitEvent.preventDefault();
    var textArea = $('.new-tweet textarea').val().length
    if (textArea === null || textArea === 0 || textArea === undefined) {
      $('.warnings').text('Please enter a tweet');
    } else if (textArea > 140) {
      $('.warnings').text('Your tweet is too long');
    } else {
      $.ajax({
        method: 'POST',
        url: '/tweets',
        // sends the content of the form to the server
        data: $(this).serialize()
      }).done(function (data) {
        // reset the form
        submitEvent.target.reset();
        loadTweets();
      });
    }
  })

  function loadTweets() {
    $.ajax({
      method: 'GET',
      url: '/tweets'
    }).done(renderTweets);
  }

  var renderTweets = (tweets) => {
    let tweetsHtml = tweets.map(createTweetElement)
    tweetsHtml.reverse()
    $('#tweetFeed').prepend(tweetsHtml)
  }

  loadTweets();

  function createTweetElement(tweet) {
    // add all content for header
    var $tweetHeader = $('<header>').addClass('tweet-header');
    var $tweetAuthorThumb = $('<div>').addClass('tweet-author-thumb-container');
    var $tweetAuthorThumbFrame = $('<div>').addClass('tweet-author-thumb-frame');
    var $tweetAuthorThumbImg = $('<img>').addClass('tweet-author-thumb').attr("src", tweet.user.avatars.regular);
    var $tweetAuthorName = $('<h4>').addClass('tweet-author-name').text(tweet.user.name);
    var $tweetAuthorUsername = $('<span>').addClass('tweet-author-username').text(tweet.user.handle);
    // append it all to their parents, then append to header
    $tweetAuthorThumb.append($tweetAuthorThumbFrame);
    $tweetAuthorThumbFrame.append($tweetAuthorThumbImg);
    $tweetHeader.append($tweetAuthorThumb, $tweetAuthorName, $tweetAuthorUsername);
    // add all content for tweet content
    var $tweetContent = $('<div>').addClass('tweet-content').text(tweet.content.text);
    // add all content for tweet footer
    var $tweetDate = $('<span>').addClass('tweet-date').text(tweet.created_at);
    var $tweetFooter = $('<footer>').addClass('tweet-footer');
    $tweetFooter.append($tweetDate);
    // call the tweet element
    var $tweet = $('<article>').addClass('tweet');
    // append everything to the article for the tweet
    $tweet.append($tweetHeader, $tweetContent, $tweetFooter);
    return $tweet;
  }

  $('.new-tweet').toggle("blind", 100);

  $('#compose-button').click(function() {
    $('.new-tweet').toggle( "blind", 1000 );
    $('.new-tweet textarea').focus();
  });

});
var server = 'http://search.twitter.com/search.json';
var query = '?q=-RT%20%23yolo%20lang%3Aen&rpp=1';

function refreshFeed() {
  $.ajax({
    url: server+query,
    dataType:'jsonp',
    success: function(data){
      query = data.refresh_url;
      $.each(data.results, function(index, item){
        $('.container').prepend('<p class="tweet new-tweet">' + item.text + '</p>');
        $('.new-tweet').fadeTo(600, 1.0, function() {
          $(this).removeClass('new-tweet');
        });
      });
      setTimeout(function(){refreshFeed(); return false}, 2000);
    },
    error:function(XMLHttpRequest, textStatus, errorThrown) {
      refreshFeed();
    }
  })
}

$(document).ready(function(){
  refreshFeed();
})
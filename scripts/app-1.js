var server = 'http://search.twitter.com/search.json';
// var query = '?q=-RT%20%23yolo%20lang%3Aen&src=typd&rpp=1';
// var query = '?q=-http%3A%2F%2F%2C%20-RT%20%23yolo&src=typd&rpp=1';
var query = '?q=-http%20-RT%20%23yolo%20lang%3Aen&rpp=1';
// var firstRefresh = true;

// function relative_time(time_value) {
//   var parsed_date = Date.parse(time_value);
//   var relative_to = (arguments.length > 1) ? arguments[1] : new Date();
//   var delta = parseInt((relative_to.getTime() - parsed_date) / 1000);
//   // delta = delta + (relative_to.getTimezoneOffset() * 60);

//   var r = '';
//   if (delta < 30) {
//     r = 'A few moments ago';
//   } else if (delta < 60) {
//   r = 'A minute ago';
//   } else if(delta < 120) {
//   r = 'A couple minutes ago';
//   } else if(delta < (45*60)) {
//   r = (parseInt(delta / 60)).toString() + ' minutes ago';
//   } else if(delta < (90*60)) {
//   r = 'An hour ago';
//   } else if(delta < (24*60*60)) {
//   r = '' + (parseInt(delta / 3600)).toString() + ' hours ago';
//   } else if(delta < (48*60*60)) {
//   r = 'Yesterday';
//   } else {
//   r = (parseInt(delta / 86400)).toString() + ' days ago';
//   }

//   return r;
// }

function refreshFeed() {
  $.ajax({
    url: server+query,
    dataType:'jsonp',
    success: function(data){
      // console.log(data.refresh_url)
      query = data.refresh_url;
      // if (firstRefresh) {
      //   firstRefresh = false;
      //   console.log('first refresh!')
      // }
      $.each(data.results, function(index, item){
        $('.twitter').prepend('<p class="tweet">' + item.text + '</p>');
        $('.tweet').fadeIn('slow', function() {
          // Animation complete
        });
      });
      // for(var i=0; i<data.messages.length; i++){
      //   addStatus(data.messages[i].message.name,data.messages[i].message.message,data.messages[i].message.created_at)
      // };
      // $('abbr.timeago').timeago();
      // if(data.messages.length>0){  // greater than 0 messages
      //   lastRefresh=dateTimeStringtoDate(data.messages[data.messages.length-1].message.created_at)
      // };
      setTimeout(function(){refreshFeed(); return false}, 1000);
    },
    error:function(XMLHttpRequest, textStatus, errorThrown) {
      console(textStatus);
      console(errorThrown);
    }
  })
}

$(document).ready(function(){

  refreshFeed();
  // $('#refresh').click(function(){refreshFeed(); return false});

});
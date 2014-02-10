$(function() {
  render();
});

title = "[title]";  //default title, soon to be replaced
url = "";
matches = [];

self.on("message", function(message) {
  console.log("message received!");
  if (message.title) {
    console.log("title message!");
    title = message.title;
    url = message.url;
  } else if (message.matches) {
    console.log("matches message!");
    for (var i=0; i<message.matches.length; i++) {
      console.log(message.matches[i])
      matches.push({
        "name": message.matches[i],
        "share":
        [
        {
          "policy": message.partners ? "yes" : "no"
        },
        {
          "policy": message.public ? "yes" : "no"          
        }
        ]
      });
    }
  }
  render();
});

function render() {
  var source = $("#template-holder").html();
  var template = Handlebars.compile(source);
  console.log("length: " + matches.length);
  if (matches.length > 0) {
    privacy_data['types'] = $.extend(privacy_data.types, matches)
  }
  var context = $.extend(privacy_data, {"site":title, "url": url});
  var html = template(context);
  $('#chart').html(html);
}
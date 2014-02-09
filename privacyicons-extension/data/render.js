$(function() {
  render();
});

title = "[title]";  //default title, soon to be replaced
url = "";

self.on("message", function(message) {
  title = message.title;
  url = message.url;
  render();
});

function render() {
  var source = $("#template-holder").html();
  var template = Handlebars.compile(source);
  var context = $.extend(privacy_data, {"site":title, "url": url});
  var html = template(context);
  $('#chart').html(html);
}
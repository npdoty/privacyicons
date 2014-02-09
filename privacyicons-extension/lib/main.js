var widgets = require("sdk/widget");
var tabs = require("sdk/tabs");
var data = require("sdk/self").data;

var icon_panel = require("sdk/panel").Panel({
  width: 600,
  height: 500,
  contentURL: data.url("panel.html"),
  contentScriptFile: [
    data.url("jquery-1.10.2.min.js"),
    data.url("handlebars-v1.3.0.js"), 
    data.url("acme.json"),
    data.url("render.js")
  ]
});

var widget = widgets.Widget({
  id: "privacy-icons",
  label: "See this site's privacy policy",
  contentURL: "http://www.mozilla.org/favicon.ico",
  panel: icon_panel
});

tabs.on("ready", function(tab){
  console.log("tab ready");
  icon_panel.postMessage({"title": tab.title, "url": tab.url});
});
var widgets = require("sdk/widget");
var tabs = require("sdk/tabs");
var data = require("sdk/self").data;

var icon_panel = require("sdk/panel").Panel({
  width: 412,
  height: 500,
  contentURL: data.url("panel.html"),
  //contentScriptFile: data.url("get-text.js")
});

var widget = widgets.Widget({
  id: "privacy-icons",
  label: "See this site's privacy policy",
  contentURL: "http://www.mozilla.org/favicon.ico",
  panel: icon_panel
});
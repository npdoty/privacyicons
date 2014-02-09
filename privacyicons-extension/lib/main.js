var widgets = require("sdk/widget");
var tabs = require("sdk/tabs");
var data = require("sdk/self").data;
var Request = require("sdk/request").Request;

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
  
  var p3pRequest = Request({
    url: tab.url + "/w3c/p3p.xml",
    onComplete: function(response) {
      console.log(response.text);

      var re = new RegExp("<POLICY-REF about=\"(.+)\"");
      var matches = response.text.match(re);
      // var policyRefs = dom.getElementsByTagName("POLICYREF");
      // var ref = policyRefs[0].attributes['about'].value;
      console.log(matches[1]);
      var p3pSubrequest = Request({
        url: matches[1],
        onComplete: function(response) {
          console.log(response.text);
          var categoriesRe = new RegExp("<CATEGORIES>\s+<(.+?)\/>", "m");
          var categoryMatches = response.text.match(categoriesRe);
          console.log("length: " + categoryMatches.length);
        }
      });
      p3pSubrequest.get();
    }
  });
  p3pRequest.get();
});
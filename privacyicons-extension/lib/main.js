var widgets = require("sdk/widget");
var tabs = require("sdk/tabs");
var data = require("sdk/self").data;
var Request = require("sdk/request").Request;

// sample function from: https://stackoverflow.com/questions/736513/how-do-i-parse-a-url-into-hostname-and-path-in-javascript
function getLocation(href) {
    var match = href.match(/^(https?\:)\/\/(([^:\/?#]*)(?:\:([0-9]+))?)(\/[^?#]*)(\?[^#]*|)(#.*|)$/);
    return match && {
        protocol: match[1],
        host: match[2],
        hostname: match[3],
        port: match[4],
        pathname: match[5],
        search: match[6],
        hash: match[7]
    }
}

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
  icon_panel.postMessage({"title": tab.title, "url": tab.url});
    
  getLocation(tab.url)['host'];
  var url = getLocation(tab.url)['protocol'] + "//" + getLocation(tab.url)['host'] + "/w3c/p3p.xml";
  var host = getLocation(tab.url)['protocol'] + "//" + getLocation(tab.url)['host'];
  
  var p3pRequest = Request({
    url: url,
    onComplete: function(response) {
      console.log(response.text);

      var re = new RegExp("<POLICY-REF about=\"(.+)\"");
      var matches = response.text.match(re);
      // var policyRefs = dom.getElementsByTagName("POLICYREF");
      // var ref = policyRefs[0].attributes['about'].value;
      console.log(matches[1]);
      var newUrl = "";
      if (getLocation(matches[1])) {
        newUrl = matches[1];
      } else {
        newUrl = host + matches[1];
      }
      
      var p3pSubrequest = Request({
        url: newUrl,
        onComplete: function(response) {
          console.log(response.text);
          var categoriesRe = new RegExp("<CATEGORIES>\\s*<(.+?)\\/>", "g");
          var categoryMatches = response.text.match(categoriesRe);
          var trimMatches = [];
          for (var i=0; i < categoryMatches.length; i++) {
            var match = categoryMatches[i].split("<CATEGORIES>")[1].split("<")[1].split("/")[0].trim();
            trimMatches.push(match);
            console.log(match);
          }
          
          var oursRe = new RegExp("<ours\\/>", "g");
          var ours = response.text.match(oursRe) != null;
          var publicRe = new RegExp("<public\\/>", "g");
          var publicFora = response.text.match(publicRe) != null;
          
          icon_panel.postMessage({"matches": trimMatches, "partners": ours, "public": publicFora});
        }
      });
      p3pSubrequest.get();
    }
  });
  p3pRequest.get();
});
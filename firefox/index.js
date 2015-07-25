// Source code inspired from
// http://stackoverflow.com/questions/5205672/modify-url-before-loading-page-in-firefox/
var {Cc, Ci} = require("chrome");

var httpRequestObserver =
{
  observe: function(subject, topic, data)
  {
    if (topic == "http-on-modify-request")
    {   
        
        var httpChannel = subject.QueryInterface(Ci.nsIHttpChannel);
        //console.log(httpChannel.URI.spec);
        if(httpChannel.URI.spec.indexOf("0.facebook.com")>-1){
            
            var newURL = httpChannel.URI.spec.replace("0.facebook.com","www.facebook.com");
            var newuri = Cc["@mozilla.org/network/standard-url;1"]
                .createInstance(Ci.nsIStandardURL);
            newuri.init(Ci.nsIStandardURL.URLTYPE_STANDARD, 80, newURL, 'utf-8', null);
            newuri = newuri.QueryInterface(Ci.nsIURI);
            console.log(newuri);
            httpChannel.redirectTo( newuri );
        }
    }
  },
 
  get observerService() {
    return Cc["@mozilla.org/observer-service;1"]
                     .getService(Ci.nsIObserverService);
  },
 
  register: function()
  {
    this.observerService.addObserver(this, "http-on-modify-request", false);
  },
 
  unregister: function()
  {
    this.observerService.removeObserver(this, "http-on-modify-request");
  }
};

httpRequestObserver.register();
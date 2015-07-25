chrome.webRequest.onBeforeRequest.addListener(
    function(details) {
        //change the url
        //console.log(details);
        var badUrl = details.url;
        badUrl = badUrl.replace("0.facebook.com","www.facebook.com");
        return {redirectUrl:badUrl}; 
    },
        {urls: ["*://0.facebook.com/*"]},
        ["blocking"]);
// content/index.js

if (window.openYouTubePopup == null) {

  window.getQueryVariable = function(variable)
  {
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i=0;i<vars.length;i++) {
      var pair = vars[i].split("=");
      if (pair[0] == variable) {
        return pair[1];
        }
    }
    return null;
  }

  window.openYouTubePopup = function(video) {

    console.log(video);
    
    var title = "YouTube Popup";
    var width = 640;
    var height = 360;

    var titleElement = document.querySelector("#title>h1");
    if (titleElement != null && titleElement.lastElementChild != null)
    {
      title = titleElement.lastElementChild.innerText;
      console.log("title: " + title);
    }

    var bgImgOvly = document.querySelector(".ytp-cued-thumbnail-overlay-image");
    if (bgImgOvly != null)
    {
      width = bgImgOvly.offsetWidth;
      height = bgImgOvly.offsetHeight;
      if (width == 0) width = 640;        
      if (height == 0) height = 360;        
      console.log("size: " + width + " x " + height );
    }

    v = window.window.getQueryVariable("v");    
    console.log("v: " + v);
    
    if (v!=null) {
        
      chrome.runtime.sendMessage({
        type: "close-popup"
      });
      
      chrome.runtime.sendMessage({
        type: "open-video-popup",
        title: title,
        width: width,
        height: height,
        v: v
      });

      return;
    }  
  };
}

var videos = document.getElementsByTagName("video");
console.log(videos);

if (videos.length > 0) {  
  window.openYouTubePopup(videos[0]);
}

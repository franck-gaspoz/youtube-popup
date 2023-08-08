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
      
      w = window.open("", "\_blank", "location=no,popup,width=" + width + ",height=" + height);
      var doc = w.document;
      var url = "https://www.youtube.com/embed/" + v;
      doc.write("<!DOCTYPE html>");
      doc.write("<html lang=\"en\">");
      doc.write("<head>");
      doc.write("<meta charset=\"utf-8\" />");
      doc.write("<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\"/>");
      doc.write("<title>" + title + "</title>");
      doc.write("</head>");
      doc.write("<body>");
      doc.write("<style>");
      doc.write("html,body,iframe {");
      doc.write("width: 100%;");
      doc.write("height: 100%;");
      doc.write("margin: 0;");
      doc.write("padding: 0;");
      doc.write("overflow: hidden;");
      doc.write("background: black;");
      doc.write("}");
      doc.write("</style>");
      doc.write("<iframe src=\"" + url + "\" title=\"" + title + "\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share\" allowfullscreen></iframe>");
      doc.write("</body>");
      doc.write("</html>");
    }
  
  };
}

var videos = document.getElementsByTagName("video");
console.log(videos);

if (videos.length > 0) {  
  window.openYouTubePopup(videos[0]);
}

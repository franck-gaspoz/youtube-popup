// popup/video.js

const getQueryVariable = function(variable)
{
  var query = window.location.search.substring(1);
  var vars = query.split("&");
  for (var i = 0; i < vars.length; i++) {
    var pair = vars[i].split("=");
    if (pair[0] == variable) {
      return pair[1];
      }
  }
  return null;
};

window.addEventListener("blur",()=>
{
  console.log('video-popup lost focus');
  window.focus();
});

var title = decodeURI(getQueryVariable('title'));
if (title !== null)
  document.getElementsByTagName('title')[0].innerText = title;

var src = 'https://www.youtube.com/embed/'
  + getQueryVariable('v');

console.log('video-popup: play ' + src);

var video = document.getElementById('video');
video.setAttribute('title', title);
video.setAttribute('src', src);
document
  .getElementById('embed')
  .appendChild(video);

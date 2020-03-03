let imageLoadActive;

function sync(){
  chrome.storage.sync.get(['imageLoadActive'], function(result) {
    imageLoadActive = result.imageLoadActive;
  });

  if(imageLoadActive == undefined){
      imageLoadActive = true;
  }

  document.getElementById("activeState").innerHTML = imageLoadActive;

  document.getElementById("activeButton").addEventListener("click",function(){
      let newVal = !imageLoadActive;
      chrome.storage.sync.set({imageLoadActive: newVal}, function() {
          sync();
      });
  });
}

document.addEventListener('DOMContentLoaded', function() {  
    sync();
});


chrome.browserAction.onClicked.addListener(displayIt);

function getUrl() {
  return "https://www.notion.so/";
}

function displayIt() {
  var selected = localStorage["favorite_display_type"];
  if (selected=="tab") displayTab();
    else displayPopup();
  }


// Open in Popup:
var vid;
function displayPopup() {
	chrome.windows.getAll({}, function(window_list) {
    for (chromeWindow in window_list) {
        if(window_list[chromeWindow].id == vid) {
            chrome.windows.update(vid, {focused: true});
            return;
        }
    }
    // Creating New:
    chrome.windows.create({type:'panel',url:getUrl(),width:500,height:800,focused:true},
	function(chromeWindow){ vid = chromeWindow.id; }
	);
  });
  }

// Open in Tab:
function displayTab() {
  chrome.tabs.getAllInWindow(undefined, function(tabs) {
  for (var i = 0, tab; tab = tabs[i]; i++) {
      if (tab.url && (tab.url.indexOf(getUrl()) == 0)) {
        chrome.tabs.update(tab.id, {selected: true});
        return;
      }
    }
    chrome.tabs.create({url: getUrl()});
 });
 }

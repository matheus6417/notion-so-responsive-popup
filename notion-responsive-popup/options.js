// Saves options to localStorage.
function save_options() {
  var select = document.getElementById("display_type");
  var display_type = select.children[select.selectedIndex].value;
  localStorage["favorite_display_type"] = display_type;

  // Update status to let user know options were saved.
  var status = document.getElementById("status");
  status.innerHTML = "Options Saved.";

  setTimeout(function () {
    closeTab()
  }, 500);
}

function closeTab() {
  chrome.tabs.getCurrent(function (tab) {
    chrome.tabs.remove(tab.id, function () {});
  });
}

// Restores select box state to saved value from localStorage.
function restore_options() {
  var selected = localStorage["favorite_display_type"];
  if (!selected) {
    return;
  }
  var select = document.getElementById("display_type");
  for (var i = 0; i < select.children.length; i++) {
    var child = select.children[i];
    if (child.value == selected) {
      child.selected = "true";
      break;
    }
  }
}

document.addEventListener('DOMContentLoaded', restore_options);
document.querySelector('#save').addEventListener('click', save_options);
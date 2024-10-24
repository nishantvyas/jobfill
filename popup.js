document.addEventListener('DOMContentLoaded', function() {
  const settingsIcon = document.getElementById('settings-icon');

  settingsIcon.addEventListener('click', function() {
    chrome.tabs.create({ url: 'settings.html' });
  });

  console.log("Popup script loaded");
});


let winId = 1;

chrome.browserAction.onClicked.addListener(function() { // executes when icon is clicked
    chrome.tabs.executeScript({file: "./src/main.js"}, function() { // executes script
        console.log("main.js is loaded");
    });
    chrome.windows.update(winId, {focused: true}, function() { // checks to see if a window is already open, open one if not
        if (chrome.runtime.lastError) {
            chrome.windows.create({
                url: chrome.runtime.getURL("./list.html"),
                height: 500,
                width: 600,
                type: "popup"
            }, function(win) {
                winId = win.id;
                console.log(winId);
            })
        }
    })
});

chrome.commands.onCommand.addListener(function() { // executes when hotkey is pressed
    chrome.tabs.executeScript({file: "./src/main.js"}, function() {
        console.log("main.js is loaded");
    });
    chrome.windows.update(winId, {focused: true}, function() {
        if (chrome.runtime.lastError) {
            chrome.windows.create({
                url: chrome.runtime.getURL("./list.html"),
                height: 400,
                width: 300,
                type: "popup"
            }, function(win) {
                winId = win.id;
                console.log(winId);
            })
        }
    })
});
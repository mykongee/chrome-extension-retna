// Javascript file for list.html popup window
// handles rendering of dom elements based on entries in chrome storage

// keys array (need this to render the correct amount of table rows)
let keys = [];

// event listeners on the popup window. when it's focused, it will refresh the display, same with blur and refresh
window.addEventListener('focus', function() {
    renderDisplay();
})
window.addEventListener('blur', function() {
    renderDisplay();
})
window.addEventListener('refresh', function() {
    renderDisplay();
})

// button in popup window to clear out all contents of chrome.storage.local
const clearBtn = document.querySelector("#clear-btn");

// for some reason, need this if/else to add an event listener. possible bug
if (clearBtn) {
    clearBtn.addEventListener('click', function() {
        chrome.storage.local.clear();
        keys = []; 
        renderDisplay();
        location.reload(); // reloads the window itself, to show an empty table
    })
} else {
    console.log(clearBtn);
}

function renderDisplay() {

    const table = document.querySelector(".table");
    chrome.storage.local.get(null, function(items) {
        let allKeys = Object.keys(items);

        // for each value stored in chrome.storage.local, render a new row 
        // creating dom elements with eventlisteners for copy paste functionality
        for (const key of allKeys) {
            // this conditional ensures we don't render a color that we've already displayed
            if (!keys.includes(key)) {
                const newRow = document.createElement("tr");
                const hex = items[key][0];
                const rgb = items[key][1];
                const hsl = items[key][2];
                
                const preview = document.createElement("td");
                preview.style.backgroundColor = hex;

                const hexTd = document.createElement("td");
                hexTd.innerHTML = hex;
                hexTd.setAttribute("id", `${key}${hex}`)
                hexTd.addEventListener('click', function() {
                    navigator.clipboard.writeText(hexTd.innerText);
                })

                const rgbTd = document.createElement("td");
                rgbTd.innerHTML = rgb;
                rgbTd.setAttribute("id", `${key}${rgb}`)
                rgbTd.addEventListener('click', function() {
                    navigator.clipboard.writeText(rgbTd.innerText);
                })

                const hslTd = document.createElement("td");
                hslTd.innerHTML = hsl;
                hslTd.setAttribute("id", `${key}${hsl}`)
                hslTd.addEventListener('click', function() {
                    navigator.clipboard.writeText(hslTd.innerText);
                })
                
                // event listeners to copy paste directly to clipboard
                newRow.appendChild(preview);
                newRow.appendChild(hexTd);
                newRow.appendChild(rgbTd);
                newRow.appendChild(hslTd);
                table.appendChild(newRow);
                keys.push(key);
            }
        }
    });
}
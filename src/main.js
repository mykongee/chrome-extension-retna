// get rgb value of a pixel in the browser
    // get coordinates of cursor 
    // somewhere to display rgb value wherever cursor is pointing
        // stretch: display should move around with cursor (tooltip?)
    // cache to store values 
    // copy over values to cache when clicking 
        // stretch: export cache as some type of file (.txt, .csv, etc.)
    // stretch: game mode - like find waldo, gives you a specific color that you have to find on the page
    // save screenshots, persist in local storage url you can access
// rgb, hex, hsb 

// [x] when turning extension on, initiate cache, etc.
// [x] get coordinates of cursor (store in js variable)
// [x] get pixel data 
    // [x] get rgb value of pixel, convert to hex, hsb
// [x] store color values in localstorage when clicking
// [ ] display color value somewhere

// open new Eyedropper() to select pixel data, storing it inside chrome storage

new EyeDropper().open().then(result => {
    console.log(result.sRGBHex)
    console.log(typeof result.sRGBHex)
    const color = [result.sRGBHex, hexToRgb(result.sRGBHex), hexToHSL(result.sRGBHex)]
    chrome.storage.local.set({[result.sRGBHex]: color}, function() {
        // console.log("stored!");
    });
}).catch((e) => console.log(e));


function hexToRgb(hex) {
    let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? `rgb(${parseInt(result[1], 16)},${parseInt(result[2], 16)},${parseInt(result[3], 16)})` : null;
  }

function hexToHSL(hex) {
var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    r = parseInt(result[1], 16);
    g = parseInt(result[2], 16);
    b = parseInt(result[3], 16);
    r /= 255, g /= 255, b /= 255;
    var max = Math.max(r, g, b), min = Math.min(r, g, b);
    var h, s, l = (max + min) / 2;
    if(max == min){
    h = s = 0; // achromatic
    }else{
    var d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch(max){
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
    }
var HSL = new Object();
HSL['h']=h;
HSL['s']=s;
HSL['l']=l;
return `(${HSL['h']}, ${HSL['s']}, ${HSL['l']})`;
}

function RGBToHSL(str) {
    let r = Number(result)
    // Make r, g, and b fractions of 1
    r /= 255;
    g /= 255;
    b /= 255;

    // Find greatest and smallest channel values
    let cmin = Math.min(r,g,b),
        cmax = Math.max(r,g,b),
        delta = cmax - cmin,
        h = 0,
        s = 0,
        l = 0;
    // Calculate hue
    // No difference
    if (delta == 0)
    h = 0;
    // Red is max
    else if (cmax == r)
    h = ((g - b) / delta) % 6;
    // Green is max
    else if (cmax == g)
    h = (b - r) / delta + 2;
    // Blue is max
    else
    h = (r - g) / delta + 4;

    h = Math.round(h * 60);
    
    // Make negative hues positive behind 360°
    if (h < 0)
        h += 360;

    // Calculate lightness
    l = (cmax + cmin) / 2;

    // Calculate saturation
    s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
        
    // Multiply l and s by 100
    s = +(s * 100).toFixed(1);
    l = +(l * 100).toFixed(1);

    return "hsl(" + h + "," + s + "%," + l + "%)";
}
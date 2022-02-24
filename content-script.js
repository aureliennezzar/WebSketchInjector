const _sheetClass = "web-sketch-injector-style";
const _head = document.head || document.getElementsByTagName('head')[0];
const createSketch = function (sketchBase64) {

    let file = new Image();

    file.onload = function () {
        const _sheet = document.createElement('style');
        if (_sheet.length > 0) {
            _sheet.remove();
        }
        _sheet.classList.add(_sheetClass);
        _sheet.innerHTML += `
body{
    width:${file.width}px;
    min-width:${file.width}px;
    min-height:${file.height}px;
}
        
body:before{
    content:'';
    position:absolute;
    z-index:999999;
    background-position:center;
    pointer-events: none;
    height:${file.height}px;
    top: 0;
    left: 0;
    bottom: 0;
    width:100%;
    background-repeat: no-repeat;
    background-size: cover;
    background-image:url('${sketchBase64}');
    opacity: .5;
}`
        _head.appendChild(_sheet);
        console.log('Web Sketch Injector $ Sketch resolution is : ' + file.width + 'px by ' + file.height + 'px')
    }
    file.src = sketchBase64;
};
const clearSketch = function () {
    const _sheets = document.getElementsByClassName(_sheetClass);
    if (_sheets.length > 0) {
        Array.from(_sheets).forEach(sheet => {
            sheet.remove();
        })
    }
}

const updateOpacity = function (opacity) {
    const _sheet = document.createElement('style');
    if (_sheet.length > 0) {
        _sheet.remove();
    }
    _sheet.classList.add(_sheetClass);
    _sheet.innerHTML += `
    body:before{
    opacity:${opacity} !important}`
    _head.appendChild(_sheet);
}
chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        switch (request.func) {
            case 0:
                try {
                    createSketch(request.url)
                } catch {
                    alert('An error occured');
                }
                break;
            case 1:
                // try {
                clearSketch()
                // } catch {
                //     alert('An error occured');
                // }
                break;
            case 2:
                try {
                    updateOpacity(request.opacity)
                } catch {
                    alert('An error occured');
                }
                break;
        }
    }
);
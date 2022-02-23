const _sheetId = "pseudoStyles";
const createSketch = function (sketchBase64, opacity) {

    let file = new Image();

    file.onload = function () {
        const _head = document.head || document.getElementsByTagName('head')[0];
        const _sheet = document.getElementById(_sheetId) || document.createElement('style');
        if (_sheet.length > 0) {
            _sheet.remove();
        }
        _sheet.id = _sheetId;
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
    opacity: ${opacity};
}`

        _head.appendChild(_sheet);
        console.log('Web Sketch Injector $ Sketch resolution is : ' + file.width + 'px by ' + file.height + 'px')
    }
    file.src = sketchBase64;
};
const clearSketch = function () {
    var _sheet = document.getElementById(_sheetId) || document.createElement('style');
    if (_sheet) {
        _sheet.remove();
    }
}
chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        switch (request.func) {
            case 0:
                createSketch(request.url, request.opacity)
                break;
            case 1:
                clearSketch()
                break;
        }
    }
);
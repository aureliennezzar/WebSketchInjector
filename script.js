function getBase64(file) {
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
        chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
            chrome.tabs.sendMessage(tabs[0].id, {
                func: 0,
                url: reader.result,
                opacity: slider.value / 100,
            });
        });
    };
    reader.onerror = function (error) {
        console.log('Error: ', error);
    };
}

var slider = document.getElementById("opacity-range");
var output = document.querySelector(".slidecontainer > p");
output.style.left = ((((slider.value / 100) * ((slider.getBoundingClientRect().width - 7.5) - 7.5)) + 7.5) - (output.getBoundingClientRect().width * .15) - 7) + "px"

output.innerHTML = slider.value +"%"; // Display the default slider value

// Update the current slider value (each time you drag the slider handle)
slider.oninput = function () {
    output.style.left = (((((this.value - 0) / (100 - 0)) * ((slider.getBoundingClientRect().width - 7.5) - 7.5)) + 7.5) - (output.getBoundingClientRect().width * .15) -7) + "px"
    output.innerHTML = this.value +"%";
}

document.addEventListener('DOMContentLoaded', function () {
    document.querySelector('.clean-btn').addEventListener('click', function () {
        chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
            chrome.tabs.sendMessage(tabs[0].id, {
                func: 1,
            });
        });
    })
    document.querySelector("#sketch-image").addEventListener('change', function (e) {
        document.querySelector('.upload-btn').style.border = 'none';
        document.querySelector('.image-msg').innerHTML = e.target.files[0].name;
    })
    document.querySelector('form').addEventListener('submit', function (e) {
        e.preventDefault();
        const sketchInput = document.querySelector("#sketch-image");
        if (sketchInput.files.length > 0) {
            getBase64(sketchInput.files[0])
        } else {
            document.querySelector('.upload-btn').style.boxShadow = '0 0 0 2px red';
        }
    });
});
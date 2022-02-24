//INIT
function getBase64(file) {
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
        chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
            chrome.tabs.sendMessage(tabs[0].id, {
                func: 0,
                url: reader.result,
                // opacity: slider.value / 100,
            });
        });
    };
    reader.onerror = function (error) {
        console.log('Error: ', error);
    };
}


//AFTER PLUGIN LOAD
document.addEventListener('DOMContentLoaded', function () {

    //CLEAR QUERY
    document.querySelector('.clean-btn').addEventListener('click', function () {
        document.querySelector('.btn[type="submit"]').classList.remove('hidden')
        document.querySelector('.slidecontainer').classList.add('hidden')
        document.querySelector(".slidecontainer > p").innerHTML = '50%'
        document.getElementById("opacity-range").value = 50;
        chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
            chrome.tabs.sendMessage(tabs[0].id, {
                func: 1,
            });
        });
    })

    //ON FILE INPUT CHANGE
    document.querySelector("#sketch-image").addEventListener('change', function (e) {
        document.querySelector('.upload-btn').style.border = 'none';
        document.querySelector('.image-msg').innerHTML = e.target.files[0].name;
    })

    //ON SKETCH SUBMIT
    document.querySelector('form').addEventListener('submit', function (e) {
        e.preventDefault();

        const sketchInput = document.querySelector("#sketch-image");
        if (sketchInput.files.length > 0) {
            //Display range slider
            document.querySelector('.btn[type="submit"]').classList.add('hidden')
            document.querySelector('.slidecontainer').classList.remove('hidden')

            const slider = document.getElementById("opacity-range");
            const output = document.querySelector(".slidecontainer > p");
            output.style.left = ((((slider.value / 100) * ((slider.getBoundingClientRect().width - 7.5) - 7.5)) + 7.5) - (output.getBoundingClientRect().width * .15) - 7) + "px"

            output.innerHTML = slider.value + "%"; // Display the default slider value
            // Update the current slider value (each time you drag the slider handle)
            slider.oninput = function () {
                output.style.left = (((((this.value - 0) / (100 - 0)) * ((slider.getBoundingClientRect().width - 7.5) - 7.5)) + 7.5) - (output.getBoundingClientRect().width * .15) - 7) + "px"
                output.innerHTML = this.value + "%";
            }
            //On range slider change
            slider.addEventListener('change', function (e) {
                chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
                    chrome.tabs.sendMessage(tabs[0].id, {
                        func: 2,
                        opacity: e.target.value / 100,
                    });
                });
            })

            getBase64(sketchInput.files[0])
        } else {
            document.querySelector('.upload-btn').style.boxShadow = '0 0 0 2px red';
        }
    });
});
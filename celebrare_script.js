const fileInput = document.querySelector(".file-input"),
imagePre = document.querySelector(".left-panel img"),
frameOptions = document.querySelectorAll(".frame button"),
RotateOption = document.querySelectorAll(".rotate button"),
// allFrame = document.querySelectorAll(".frame button"),
resetFilterBtn = document.querySelector(".reset-filter"),
// SimplyCrop = document.querySelector(".crop-info name");
chooseImgBtn = document.querySelector(".upload-img");
saveImgBtn = document.querySelector(".save-img");

let rotate = 0; flipHorizontal = 1; flipVertical = 1;

// function changeFrame(){
//     if(option.id === "btn-circle"){
//         allFrame.className = "btn-circle circle";
//     }
//     else if(option.id === "btn-heart"){
//         allFrame.className = "btn-heart heart";
//     }
//     else if(option.id === "btn-square"){
//         allFrame.className = "btn-square square";
//     }
//     else{
//         allFrame.className = "btn-rectangle rectangle";
//     }
// }

const applyfilters = () => {
    imagePre.style.transform = `rotate(${rotate}deg) scale(${flipHorizontal}, ${flipVertical})`;
}

const loadImage = () => {
    let file = fileInput.files[0]; //for user to select file
    if(!file) return; // if no file has been selected
    imagePre.src = URL.createObjectURL(file); // creates url of object
    imagePre.addEventListener("load", () => {
        resetFilterBtn.click();
        document.querySelector(".container").classList.remove("disable");
    });
}

// sort of hover for buttons after selecting the image
frameOptions.forEach(option => {
    option.addEventListener("click", () => {
        document.querySelector(".active").classList.remove("active");
        option.classList.add("active");
    });
});

// allFrame.forEach(option => {
//     option.addEventListener("click", () => {
//         changeFrame();
//         });
// });

RotateOption.forEach(option => {
    option.addEventListener("click", () => { // selecting click for buttons
        // console.log(option);
        if(option.id === "left"){
            rotate -= 90; //it will rotate by -90 degree
        }
        else if(option.id === "right"){
            rotate += 90; //it will rotate by +90 degree
        }
        else if(option.id === "horizontal") {
            flipHorizontal = flipHorizontal === 1 ? -1 : 1;
        }
        else {
            flipVertical = flipVertical === 1 ? -1 : 1;
        }

        applyfilters();
    });
});

const resetFilter = () =>{
    //Setting it to default
    rotate = 0; flipHorizontal = 1; flipVertical = 1;
    frameOptions[0].click();
    applyfilters();
}

const saveImage = () => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    canvas.width = imagePre.naturalWidth;
    canvas.height = imagePre.naturalHeight;

    ctx.translate(canvas.width / 2, canvas.height / 2);
    if(rotate !== 0) {
        ctx.rotate(rotate * Math.PI / 180);
    }
    ctx.scale(flipHorizontal, flipVertical);
    ctx.drawImage(imagePre, -canvas.width / 2, -canvas.height / 2, canvas.width, canvas.height);

    const link = document.createElement("a");//created anchor 
    link.download = "image.jpg"; //passing anchor to download
    link.href = canvas.toDataURL(); //then passing it to canvas
    link.click();//download button inshort
}

// allFrame.addEventListener("click", changeFrame);
fileInput.addEventListener("change", loadImage);
chooseImgBtn.addEventListener("click", () => fileInput.click());
resetFilterBtn.addEventListener("click", resetFilter);
saveImgBtn.addEventListener("click", saveImage);



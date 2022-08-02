// Code by bevatsal1122
// Trust God, Your Code Will Work

const dragZone = document.querySelector(".drop-zone");
const headUpload = document.querySelector(".head-upload");
const fileInput = document.querySelector("#fileInput");
const fileContainer = document.querySelector(".file-container");
const browseButton = document.querySelector("#BrowseButton");
const titleLink = document.querySelector("#title-link");
const uploadBar = document.querySelector(".upload-bar");
const smallUploadBar = document.querySelector(".small-upload-bar");
const progressBar = document.querySelector(".progress-bar");
const uploadingText = document.querySelector("#uploading-text");
const fileURL = document.querySelector("#fileURL");
const responseBar = document.querySelector(".response-bar");
const copyImage = document.querySelector("#copyImage");
const fileDetails = document.querySelector("#file-details");
const emailForm = document.querySelector("#email-form");
const toastAlert = document.querySelector(".toast-alert");

const host = "https://upsurge-holdyourbit.herokuapp.com";
const uploadURL = `${host}/api/files/upload`;
const emailURL = `${host}/api/files/sendemail`;

function add(dragZone)
{
    if (!dragZone.classList.contains("draggedTrue"))
    {
        dragZone.classList.add("draggedTrue")
    }
}

function remove(dragZone)
{
    if (dragZone.classList.contains("draggedTrue"))
    {
        dragZone.classList.remove("draggedTrue")
    }
}

let toastActive;
async function toastAnimation(text, btm, shiftX = 310) {
    toastAlert.style.bottom = `${btm}px`;
    toastAlert.innerText = text;
    toastAlert.style.transform = `translateX(${shiftX}%)`;
    clearTimeout(toastActive);
    toastActive = setTimeout(() => {
        toastAlert.style.transform = "translateX(-200%)";
    }, 2500);
}

const updateProgress = (e) => {
    let progress = e.loaded/e.total;
    let progressPercent = Math.round(progress*100)
    setTimeout(() => {
        uploadingText.innerHTML = `Uploading ${progressPercent}%`;
    }, 150)
    uploadBar.style.transform = `scaleX(${progress})`;
    smallUploadBar.style.transform = `scaleX(${progress})`;
}

const showLink = ({file, size}) => {
    fileDetails.innerHTML = `${parseInt(size*0.97)} KB &ensp;●&ensp; Link expires in 24 hours &ensp; ● &ensp; <a href="${file}" target="_blank">Download Page</a>`;
    responseBar.style.display = "block";
    fileURL.value = file;
}

const copyLink = () => {
    fileURL.select();
    navigator.clipboard.writeText(fileURL.value);
    toastAnimation("Link Copied", 15);
}

copyImage.addEventListener("click", copyLink);

const uploadFile = () => {
    let file = fileInput.files[0];
    if (parseInt(file.size / 1E6) > 53) {
        toastAnimation("File_Size <= 50 MB", 20, 180);
    }
    else {
        let formData = new FormData();
        formData.append("myFile", file);

        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = () => {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                if (JSON.parse(xhr.response)) {
                    setTimeout(() => {
                        headUpload.style.paddingTop = "10px";   
                        uploadingText.innerHTML = `Uploaded 100%`; 
                        fileContainer.innerHTML = "<h3>Status: 200 OK<br>File Uploaded Successfully :)</h3>"; 
                        showLink(JSON.parse(xhr.response));
                    }, 600);
            }
            }
        }

        xhr.upload.onprogress = updateProgress;
        xhr.upload.onerror = () => {
            toastAnimation("Error in Uploading...");
            fileInput.value = "";
        }
        progressBar.style.display = "flex";
        dragZone.style.display = "none";
        headUpload.style.marginTop = "3vh"; 
        fileContainer.innerHTML = "<h3>Status: ---<br>File Uploading...</h3>"; 
        xhr.open('POST', uploadURL);
        xhr.send(formData);
    }
}

browseButton.addEventListener("click", () => {
    fileInput.click();
})

titleLink.addEventListener("click", () => {
    window.location.href = "./";
})

fileInput.addEventListener("change", () => {
    uploadFile();
})

emailForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = {
        "UUID": fileURL.value.split('/').splice(-1, 1)[0],
        "emailHost": emailForm.elements["sender-email"].value,
        "emailAcceptor": emailForm.elements["receiver-email"].value
    }
    fetch(emailURL, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
    .then(res => res.json())
    .then(({code}) => {
        if (code) {
            emailForm[0].setAttribute("disabled", "true");
            emailForm[1].setAttribute("disabled", "true");
            emailForm[2].style.display = "none";
            toastAnimation("Email Sent", 22);
        }
    })
})

dragZone.addEventListener("dragover", (e) => {
    e.preventDefault();
    add(dragZone);
})

dragZone.addEventListener("dragleave", (e) => {
    remove(dragZone);
})

dragZone.addEventListener("drop", (e) => {
    e.preventDefault()
    remove(dragZone);
    const transfer = e.dataTransfer;
    const draggedFile = transfer.files;
    if (draggedFile.length) {
        fileInput.files = draggedFile;
        uploadFile();
    }
})

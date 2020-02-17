const IFRAME_ASPECT_RATIO = 1.77;

function toggleDark() {
    if (document.body.classList.contains("body-dark")) {
        document.body.classList.remove("body-dark");
        darkToggleButton.innerHTML = "Dark mode";
        document.cookie = "";
    } else {
        document.body.classList.add("body-dark");
        darkToggleButton.innerHTML = "Light mode";
        document.cookie = "dark";
    }
}


const darkToggleButton = document.getElementById("dark-toggle-btn");
darkToggleButton.onclick = toggleDark;
if (document.cookie == "dark") {
    toggleDark();
}

function resizeFrames() {
    const frames = document.querySelectorAll("iframe");
    for (const frame of frames) {
        const rect = frame.parentElement.getBoundingClientRect();
        frame.style.width = rect.width.toString() + "px";
        frame.style.height = (rect.width / IFRAME_ASPECT_RATIO).toString() + "px";
    }
}

window.addEventListener("resize", resizeFrames);
resizeFrames();

const IFRAME_ASPECT_RATIO = 1.77;

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

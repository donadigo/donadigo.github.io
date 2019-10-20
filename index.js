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
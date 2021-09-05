const title = document.getElementById('section-title');
const links = document.querySelectorAll('.sidebar a.nav-link');
const pathname = location.pathname.replace(/\/$/, "");
for (const link of links) {
    if (link.getAttribute('href') === pathname) {1
        const spans = link.getElementsByClassName('sidebar-item');
        spans[0].classList.add('sidebar-item-selected');
    }
}

const sidebar = document.querySelector(".sidebar");
const currentScroll = localStorage.getItem("sidebar-scroll");
if (currentScroll !== null) {
  sidebar.scrollTop = parseInt(currentScroll);
}

window.addEventListener("beforeunload", () => {
  localStorage.setItem("sidebar-scroll", sidebar.scrollTop);
});
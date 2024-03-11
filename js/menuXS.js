const ContXS = document.querySelector('.cont-menuXS');
const XS = document.querySelectorAll('.menuXS');
const menuContainer = document.querySelector('.menuContainer');

let menuAperto = false;

function toggleMenu() {
    if (!menuAperto) {
        XS[0].style.transform = "rotate(45deg) translateY(2px) translateX(-2px)";
        XS[1].style.transform = "translateX(-10000px)";
        XS[2].style.transform = "rotate(-45deg) translateY(-12px) translateX(9px)";
    } else {
        XS[0].style.transform = "rotate(0deg) translateY(0) translateX(0)";
        XS[1].style.transform = "translateX(0)";
        XS[2].style.transform = "rotate(0deg) translateY(0) translateX(0)";
    }
    menuAperto = !menuAperto;
}

ContXS.addEventListener('click', toggleMenu);
ContXS.addEventListener('click', () => {
    menuContainer.classList.toggle('open'); // Toggle della classe "open"
});
window.addEventListener('resize', () => {
    if (window.innerWidth > 1025) {
        menuContainer.classList.remove('open');
        // Reimposta le trasformazioni delle linee del menu
        XS[0].style.transform = "rotate(0deg) translateY(0) translateX(0)";
        XS[1].style.transform = "translateX(0)";
        XS[2].style.transform = "rotate(0deg) translateY(0) translateX(0)";
    }
});

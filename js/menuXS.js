const ContXS = document.querySelector('.cont-menuXS');
const XS = document.querySelectorAll('.menuXS');
const menuContainer = document.querySelector('.menuContainer');
const ListA = document.querySelectorAll('.A-10 > *');

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

ContXS.addEventListener('click', () => {
    toggleMenu();
    menuContainer.classList.toggle('open');
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

document.body.addEventListener('click', (event) => {
    const isClickedInsideMenu = menuContainer.contains(event.target);
    const isClickedOnXS = Array.from(XS).some((element) => element.contains(event.target));
    const isClickedOnListA = Array.from(ListA).some((element) => element.contains(event.target));

    if (!isClickedInsideMenu && !isClickedOnXS && !isClickedOnListA) {
        menuContainer.classList.remove('open');
        XS[0].style.transform = "rotate(0deg) translateY(0) translateX(0)";
        XS[1].style.transform = "translateX(0)";
        XS[2].style.transform = "rotate(0deg) translateY(0) translateX(0)";
        menuAperto = false;
    }
    // Se l'evento si è verificato su uno degli elementi all'interno del menu
    if (isClickedInsideMenu && isClickedOnListA) {
        // Rimuovi la classe "open" dal menuContainer
        menuContainer.classList.remove('open');
        // Riporta le linee del menu nella loro posizione originale
        XS[0].style.transform = "rotate(0deg) translateY(0) translateX(0)";
        XS[1].style.transform = "translateX(0)";
        XS[2].style.transform = "rotate(0deg) translateY(0) translateX(0)";
        // Imposta lo stato del menu come chiuso
        menuAperto = false;
    }
});

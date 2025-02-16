const contAbout = document.querySelector(".Mtop-50");
const slides1 = document.querySelectorAll(".service-P");
const contAboutUs = document.querySelector(".contAboutUs");
const slides = document.querySelectorAll(".contAbout");
const dotsContainer1 = document.querySelector(".carousel-dots1");
const dotsContainer = document.querySelector(".carousel-dots");

// Variabile per tenere traccia dello stato del mouse
let mouseDown = false;
// Variabile per memorizzare la posizione iniziale del mouse
let startX = 0;
// Variabile per memorizzare la posizione iniziale del contenitore delle schede
let scrollLeftStart = 0;

// Aggiungi i pallini per la navigazione per le schede .contAbout
slides.forEach((_, index) => {
  const dot = document.createElement("span");
  dot.classList.add("dot");
  if (index === 0) dot.classList.add("active");
  dot.addEventListener("click", () => {
    goToSlide(index);
  });
  dotsContainer.appendChild(dot);
});

// Gestisci la navigazione con i pallini per le schede .contAbout
function goToSlide(index) {
  slides.forEach((slide, i) => {
    slide.style.scrollSnapType = "none";
    slide.style.transform = `translateX(${-index * slide.offsetWidth}px)`;
    slide.style.scrollSnapType = "x mandatory";
  });

  const dots = document.querySelectorAll(".dot");
  dots.forEach((dot, i) => {
    dot.classList.remove("active");
    if (i === index) dot.classList.add("active");
  });
}

// Aggiungi i pallini per la navigazione per le schede .service-P
slides1.forEach((_, index) => {
  const dot1 = document.createElement("span");
  dot1.classList.add("dot1");
  if (index === 0) dot1.classList.add("active1");
  dot1.addEventListener("click", () => {
    goToSlide1(index);
  });
  dotsContainer1.appendChild(dot1);
});

// Gestisci la navigazione con i pallini per le schede .service-P
function goToSlide1(index) {
  slides1.forEach((slide, i) => {
    slide.style.scrollSnapType = "none";
    slide.style.transform = `translateX(${-index * slide.offsetWidth}px)`;
    slide.style.scrollSnapType = "x mandatory";
  });

  const dots = document.querySelectorAll(".dot1");
  dots.forEach((dot1, i) => {
    console.log(i);
    console.log(dot1);
    dot1.classList.remove("active1");
    if (i === index) dot1.classList.add("active1");
  });
}

// Funzione per gestire gli eventi di scorrimento per un contenitore delle schede
function handleTabContainerEvents(container) {
  container.addEventListener("pointerdown", (event) => {
    mouseDown = true;
    startX = event.pageX - container.offsetLeft;
    scrollLeftStart = container.scrollLeft;
    container.setPointerCapture(event.pointerId);
  });

  container.addEventListener("pointermove", (event) => {
    if (!mouseDown) return;
    const x = event.pageX - container.offsetLeft;
    const distanza = x - startX;
    container.scrollLeft = scrollLeftStart - distanza;
  });

  container.addEventListener("pointerup", () => {
    mouseDown = false;
  });

  container.addEventListener("pointerleave", () => {
    mouseDown = false;
  });
}
// Funzione per gestire gli eventi di scorrimento per un contenitore delle schede
function handleTabContainerScroll(container, container1) {
  container.addEventListener("scroll", () => {
    const scrollPos = container.scrollLeft;
    const containerWidth = container.offsetWidth;

    let activeIndex = Math.round(scrollPos / containerWidth);
    // Aggiorna lo stile dei pallini
    const dots = document.querySelectorAll(".dot");
    dots.forEach((dot, index) => {
      if (index === activeIndex) {
        dot.classList.add("active");
      } else {
        dot.classList.remove("active");
      }
    });
  });
  container1.addEventListener("scroll", () => {
    const scrollPos = container1.scrollLeft;
    const containerWidth = container1.offsetWidth;

    let activeIndex1 = Math.round(scrollPos / containerWidth);

    const dots1 = document.querySelectorAll(".dot1");
    dots1.forEach((dot1, index) => {
      if (index === activeIndex1) {
        dot1.classList.add("active1");
      } else {
        dot1.classList.remove("active1");
      }
    });
  });
}

// Chiama la funzione per gestire gli eventi per ciascun contenitore delle schede
handleTabContainerEvents(contAbout);
handleTabContainerEvents(contAboutUs);
handleTabContainerScroll(contAboutUs, contAbout);

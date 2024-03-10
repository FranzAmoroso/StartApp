const slides1 = document.querySelectorAll('.service-P');
const slides = document.querySelectorAll('.contAbout');
const dotsContainer1 = document.querySelector('.carousel-dots1');
const dotsContainer = document.querySelector('.carousel-dots');
let touchStartX = 0;

// Aggiungi i pallini per la navigazione per le schede .contAbout
slides.forEach((_, index) => {
  const dot = document.createElement('span');
  dot.classList.add('dot');
  if (index === 0) dot.classList.add('active');
  dot.addEventListener('click', () => {
    goToSlide(index);
  });
  dotsContainer.appendChild(dot);
});

// Gestisci la navigazione con i pallini per le schede .contAbout
function goToSlide(index) {
  slides.forEach((slide, i) => {
    slide.style.scrollSnapType = 'none';
    slide.style.transform = `translateX(${-index * slide.offsetWidth}px)`;
    slide.style.scrollSnapType = 'x mandatory';
  });

  const dots = document.querySelectorAll('.dot');
  dots.forEach((dot, i) => {
    dot.classList.remove('active');
    if (i === index) dot.classList.add('active');
  });
}

// Aggiungi i pallini per la navigazione per le schede .service-P
slides1.forEach((_, index) => {
  const dot1 = document.createElement('span');
  dot1.classList.add('dot1');
  if (index === 0) dot1.classList.add('active1');
  dot1.addEventListener('click', () => {
    goToSlide1(index);
  });
  dotsContainer1.appendChild(dot1);
});

// Gestisci la navigazione con i pallini per le schede .service-P
function goToSlide1(index) {
  slides1.forEach((slide, i) => {
    slide.style.scrollSnapType = 'none';
    slide.style.transform = `translateX(${-index * slide.offsetWidth}px)`;
    slide.style.scrollSnapType = 'x mandatory';
  });

  const dots = document.querySelectorAll('.dot1');
  dots.forEach((dot1, i) => {
    console.log(i);
    console.log(dot1);
    dot1.classList.remove('active1');
    if (i === index) dot1.classList.add('active1');
  });
}

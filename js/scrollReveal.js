//ScrollReveal Library
//install to terminal with script: npm install scrollreveal --save

//crea un instanza ScrollReveal
let sr = ScrollReveal();

// Configura l'animazione per la classe 'div'
let className = [
  ".scroll, .AR-20, .C-16, .cont-description, .service-P, inp-contact",
];

// Configura gli effetti di animazione di default
let optionDefault = {
  origin: "bottom",
  distance: "100px",
  duration: "1500",
  delay: "200",
  easing: "ease-in-out",
};




// Applica l'effetto di animazione a ciascuna classe nel tuo array
className.forEach((className) => {
  sr.reveal(className, optionDefault);
});

//specificare gli effetti di animatione per la classe
sr.reveal('.img' , {
  origin : "right",
  distance: "200%",
  duration: "500",
  delay: "500",
  easing: "ease-in-out"
})
sr.reveal(".imgI, .BT-S10", {
    duration: "500",
    delay: "200",
  // Aggiungi l'opzione hover per effetto al passaggio del mouse
  hover: {
    transform: "scale(1.2)",
  },
  trigger: "onEnter", // Imposta il trigger onEnter per attivare l'effetto hover
});
sr.reveal(".scroll-10", {
  origin: "left",
  distance: "100px",
  duration: "1500",
  delay: "200",
  easing: "ease-in-out",
});
sr.reveal(".scroll-20", {
  origin: "right",
  distance: "20px",
  duration: "1500",
  delay: "200",
  easing: "ease-in-out",
});

sr.reveal(".scroll-img", {
  origin: "left",
  distance: "140px",
  duration: "2500",
  delay: "200",
  easing: "ease-in-out",
});

sr.reveal(".T-15", {
  origin: "left",
  distance: "100%",
  duration: "1000",
  delay: "200",
  easing: "ease-in-out",
});

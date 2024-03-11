document.addEventListener('copy', (event) => {
    event.preventDefault(); // Impedisce l'azione di copia predefinita
});

document.addEventListener('paste', (event) => {
    event.preventDefault(); // Impedisce l'azione di incolla predefinita
});

      
//       let menu = document.querySelector('.M');
//       let logoS = document.querySelector('.LS')
//       let NBS = document.querySelector('.NBS')
//       let MB10 = document.querySelector('.MB-10')

//      /*  window.addEventListener('scroll', () =>{
//         let scrollZ = 0
//         if(scrollY > scrollZ){
//           menu.classList.add('Menu')
//           MB10.classList.add('menu-bar')
//           MB10.classList.remove('dispNone')
//           logoS.classList.add('logoS')
//           NBS.classList.add('NS-10')
        
          
//         }else{
//           menu.classList.remove('Menu');
//           MB10.classList.add('dispNone');
//           MB10.classList.remove('menu-bar')
//           logoS.classList.remove('logoS')
//           NBS.classList.remove('NS-10')
//         }
        
//       }) */

// })
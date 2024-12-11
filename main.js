let navbar = document.querySelector('#navbar');
let links = document.querySelectorAll('.nav-link');
let logoNavbar = document.querySelector('#logoNavbar');
let spadaLaser = document.querySelector('#spadaLaser');
let collapse = document.querySelector('#collapse');
let check = false;
console.dir(spadaLaser);

window.addEventListener('scroll',()=>{
    let scrolled = window.scrollY;
    if (scrolled > 0) {
        navbar.classList.remove('bg-black');
        navbar.classList.add('bg-yellow');
        collapse.classList.remove('bg-black');
        collapse.classList.add('bg-yellow');
        navbar.style.height = '70px';
        links.forEach((link)=>{
            link.style.color = 'var(--black)';
        });
        logoNavbar.src = "http://127.0.0.1:5500/media/logo-b.png"
        spadaLaser.src = "http://127.0.0.1:5500/media/spadablack.png"
    }else{
        navbar.classList.add('bg-black');
        navbar.classList.add('bg-yellow');
        collapse.classList.add('bg-black');
        collapse.classList.add('bg-yellow');
        navbar.style.height = '140px';
        links.forEach((link)=>{
            link.style.color = 'var(--yellow)';
        }) ;
        logoNavbar.src = "http://127.0.0.1:5500/media/logo-y.png"
        spadaLaser.src = "http://127.0.0.1:5500/media/spadayellow.png"
    }
});

   spadaLaser.addEventListener('click', ()=>{
    if (check == false) {
    spadaLaser.style.transform = 'rotate(-180deg)';
    check = true;
    }else{
        spadaLaser.style.transform = 'rotate(0deg)';
        check = false;   
    }
     
   })


    // Chiamate Asincrone

    // setInterval(): crea un loop infinito in cui possiamo gestire la durata delle singole iterazioni.
    // il setInterval è una funzione che vuole 2 parametri e viene inserito in una variabile. il primo 
    // parametro è la CALLBACK()=>
    // il secondo parametro è l'intervallo di tempo che deve passare tra un iterazione e l'altra.
    // clearInterval(): pulisce l'intervallo e interrompe il loop.
    // setTimeout(): fa partire un blocco di istruzioni dopo tot secondi. 


    let firstNumber = document.querySelector('#firstNumber');
    let secondNumber = document.querySelector('#secondNumber');
    let thirdNumber = document.querySelector('#thirdNumber');    
        
    function createInterval(n, element, time){
            let counter = 0;

            let interval = setInterval( ()=>{
            if(counter < n){
                counter++
                element.innerHTML = counter;
            }else{
               
            clearInterval(interval);
            }
    
        }, time);

        setTimeout( () => {
            confirm = true;
        }, 8000);
      
    }



    // intersectionObserver: è una Classe del BROWSER (non del linguaggio) che si occupa di far scattare
    // una funzione nel momento in cui nel browser gli elementi HTML che gli indichiamo sono visibili.
    // new: è una Keyword che mi PERMETTE DI GENERARE UN OGGETTO partendo da una Classe.
    // nella variabile (observer) stiamo creando un OGGETTO di Classe intersectionObserver. 
    // in questo OGGETTO scatta una CALLBACK la quale accetta un qualsiasi numero di parametri salvandoli nel 
    // parametro formale ENTRIES (che è un Array ( entries = [] ), quindi si utilizzerà il forEach).
    let observer = new IntersectionObserver((entries)=>{
        entries.forEach( (entry)=> {

            if(entry.isIntersecting && confirm){
            createInterval(100, firstNumber, 100);
            createInterval(200, secondNumber, 50);
            createInterval(300, thirdNumber, 20);
            confirm = false;
            }
        });
    } );
    
    observer.observe(firstNumber);


let reviews = [
    {user : 'Paolo', description : `Il più bel sito del mondo`, rank : 5},
    {user : 'Claudio', description : `Il peggio in assoluto`, rank : 1},
    {user : 'Marco', description : `Non male ma si può fare meglio`, rank : 3},
    {user : 'Giulio', description : `Top senza eguali`, rank : 5}

]

let swiperWrapper = document.querySelector('.swiper-wrapper');

reviews.forEach((recensione)=>{
    let div = document.createElement('div');
    div.classList.add('swiper-slide');
    div.innerHTML = `
                <div class="card-review">
                    <p class="lead text-center">${recensione.description}</p>
                    <p class="h4 text-center">${recensione.user}</p>
                    <div class="d-flex justify-content-center star">
    
                    </div>
                </div>`
                swiperWrapper.appendChild(div);

});

let stars = document.querySelectorAll('.star');
stars.forEach((star, index)=>{
    for(let i = 1; i<= reviews[index].rank; i++ ){
        let icon = document.createElement('i');
        icon.classList.add('fa-solid', 'fa-star');
        star.appendChild(icon);
    }

    let difference = 5 - reviews[index].rank;
    for(let i = 1; i<= difference; i++ ){
        let icon = document.createElement('i');
        icon.classList.add('fa-regular', 'fa-star');
        star.appendChild(icon);
    }
})

    const swiper = new Swiper('.swiper', {
        // Optional parameters
        effect: 'flip',
        grabCursor : true,
        loop: true,
      
        // Navigation arrows
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
        
        autoplay: {
          delay: 2500,
          disableOnInteraction: false,
        },
      
      });


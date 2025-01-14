let opener = document.querySelector('.opener');
let circle = document.querySelector('.circle');
let teachers = [
    {name : 'Matteo', description : 'Docente frontend di Hackademy 69', url : './media/Matteo.jpg'},
    {name : 'Marco', description : 'Docente frontend e responsabile di Hackademy', url : './media/Marco.jpg'},
    {name : 'Nicola', description : 'Docente frontend e noto Sex-symbol', url : './media/Nicola.webp'},
    {name : 'Davide', description : 'Docente backend e giocatore di ruolo', url : './media/Davide.png'}

];

teachers.forEach((docente)=>{
    let div = document.createElement('div');
    div.classList.add('moved');
    div.style.backgroundImage =`url(${docente.url})`;
    circle.appendChild(div);
});

let movedDivs = document.querySelectorAll('.moved');

let check = false;

let flipCard = document.querySelector('.flip-card');

opener.addEventListener('click', ()=>{
    if (check == false) {
        opener.style.transform = `rotate(45deg)`;
        movedDivs.forEach((moved, i)=>{
            let angle = (360 * i) / movedDivs.length;
            moved.style.transform = `rotate(${angle}deg) translate(100px) rotate(-${angle}deg)`;
        });
        check = true;
    }else{
        check = false;
        opener.style.transform = `rotate(0deg)`;
        movedDivs.forEach((moved, i)=>{
        moved.style.transform = `rotate(0deg) translate(0px)`;
    });
        flipCard.classList.add('d-none');
    }
        
    });

    let innerFace = document.querySelector('.inner-face');
    let cardName = document.querySelector('#cardName');
    let cardDescription = document.querySelector('#cardDescription');
    

    movedDivs.forEach((moved , i)=>{
        moved.addEventListener('click', ()=>{
         flipCard.classList.remove('d-none');   
        let docente = teachers[i];
        innerFace.style.backgroundImage = `url(${docente.url})`;
        cardName.innerHTML = docente.name;
        cardDescription.innerHTML = docente.description;  
        });
    });




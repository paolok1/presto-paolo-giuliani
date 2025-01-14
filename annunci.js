// .json: javascript object notification.

// API: sono delle chiavi che ci permettono di raggiungere un .json online.

// .fetch():è una chiamata asincrona che ci permette
// di collegare il nostro foglio JS ad un link esterno(JSON).
// ci restituisce i dati prelevati sotto forma di PROMISE(PROMESSA) ossia
// promette che ci restituirà questi dati.
// .then(): questo metodo ci permette di convertire la PROMISE nel dato strutturale e di
//  poterlo utilizzare come tale su javascript.

// 1. Fetch(): collego al json e ottengo una Promise;
// 2. .Then(): converto la Promise in un dato strutturale JS;
// 3. .Then(): utilizzare il dato ottenuto.

// .json(): metodo della promise che mi permette di convertirla in OGGETTO JS.

fetch('./annunci.json').then((response) => response.json()).then( (data)=>{

    data.sort((a,b)=> a.price - b.price);

let radioWrapper = document.querySelector('#radioWrapper');
let cardWrapper = document.querySelector('#cardWrapper');


function radioCreate () {
    let categories = data.map( (annuncio) => annuncio.category );

//     let uniqueCategories = [];

//     categories.forEach( (category) => {
//             if (!uniqueCategories.includes(category )) {
//                 uniqueCategories.push(category);
//             }
//     });

// Set: Classe che mi restituisce, partendo da un Array, un nuovo oggetto di tipo Set il quale 
// contiene solo valori univoci.
// Array.from() : mi permette di convertire un Array-like in un Array.
// esempio con Set : let uniqueCategories = new Set (categories);
// esempio con Array.from:
let uniqueCategories = Array.from (new Set(categories));
uniqueCategories.forEach((category)=>{
    let div = document.createElement('div');
    div.classList.add('form-check');
    div.innerHTML = `
            <input class="form-check-input" type="radio" name="flexRadioDefault" id="${category}">
                <label class="form-check-label" for="${category}">
                    ${category}
                </label>
    `;
    radioWrapper.appendChild(div);
})
console.log(uniqueCategories);

}   

radioCreate();


function truncateWord(string) {
   if (string.length > 15) {
        return string.split(' ')[0] + ('...');
   }else{
    return string;
   }
}



function showCards(array) {
    cardWrapper.innerHTML = '';
    array.forEach( (annuncio, i)=>{
        let div = document.createElement('div');
        div.classList.add('card-custom');
        div.innerHTML = `
            <img src ="https://picsum.photos/${300 + i}" alt = "immagine casuale" class ="img-fluid img-card"> 
            <p class="h2" title = "${annuncio.name}">${truncateWord(annuncio.name)}</p>
            <p class="h4">${annuncio.category}</p>
            <p class="lead">${annuncio.price} €</p>
        `;
        cardWrapper.appendChild(div);
    })
}

showCards(data);


let radioButtons = document.querySelectorAll('.form-check-input');
function filterByCategories(array){
    // in questa funzione ho bisogno di ottenere un nuovo Array partendo da data e gli elementi
    // del nuovo Array dovranno soddisfare la condizione per la quale la loro category sia uguale 
    // alla categoria che stiamo passando alla funzione.

    // la categoria voglio trovarla partendo dalla lista di tutti i bottoni (buttons) e usare
    // il metodo degli array .find() su questa lista. La condizione da utilzzare è il bottone con l'attributo "checked".

    let categoria = Array.from(radioButtons).find((bottone)=> bottone.checked ).id;
    // let arrayFromNodeList = Array.from(radioButtons);
    // let button = arrayFromNodeList.find((bottone)=>bottone.checked);
    // let categoria = button.id;
    // Questa sintassi è la stessa di: let categoria = Array.from(radioButtons).find((bottone)=>bottone.checked)
    // scritta passo per passo.
    if (categoria != 'all') {
        
        let filtered = array.filter((annuncio)=> annuncio.category == categoria )
        return filtered;
    }else{
        return array ;
    }
}


radioButtons.forEach((button) =>{
    button.addEventListener('click', ()=>{
                setPriceInput();

                globalFilter();
            })
        })

        let priceInput = document.querySelector('#priceInput');
        let priceValue = document.querySelector('#priceValue');

    function setPriceInput() {
        // dopo aver catturato l'INPUT (tag INPUT) voglio settare come proprietà MAX dello stesso
        // il valore più alto tra i price di ogni prodotto. Per farlo avrò bisogno, quindi, di un Array 
        // che contenga solo i prezzi, a quel punto lo ordino in maniera crescente o decrescente e 
        //  prendermi l'elemento con il valore più alto.

        let prices = filterByCategories(data).map((annuncio)=> +annuncio.price);
        prices.sort((a, b)=> a - b );
        let maxPrice = Math.ceil(prices.pop());
        priceInput.max = maxPrice;
        priceInput.value = maxPrice;
        priceValue.innerHTML = maxPrice;

        
        
    }

        setPriceInput();


    function filterByPrice(array) {
        let filtered = array.filter((annuncio)=> +annuncio.price <= priceInput.value);
        return filtered;
    }
    
        priceInput.addEventListener('input', ()=>{
            priceValue.innerHTML = priceInput.value;
            globalFilter();
        })


        let wordInput= document.querySelector('#wordInput');


        function filterByWord(array) {
            let filtered = array.filter( (annuncio)=> annuncio.name.toLowerCase().includes(wordInput.value.toLowerCase() ) );
            
            console.log(filtered);
            return filtered;
            
        }

        wordInput.addEventListener('input', ()=>{
           globalFilter();
        })

        function globalFilter() {
            let filteredByCategories = filterByCategories(data); 
            let filteredByPrice = filterByPrice(filteredByCategories);
            let filteredByWord = filterByWord(filteredByPrice);

            showCards(filteredByWord);
        }
    
} );  

// quello di cui abbiamo bisogno è che ad ogni evento scattino tutte e tre le funzioni ma
// non siano applicate tutte e tre sull'array data, bensì siano concatenate ed ognuna filtri
// il risultato della funzione di filtro precedente.



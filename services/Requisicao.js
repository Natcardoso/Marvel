const timeStamp = '1630347955';
const apiKey = '778f3f8d98f1717c4608ec5ac324bb2a';
const hash = 'f67a7733dda53cf60f4ac4a93e6c614f'
const url = 'https://gateway.marvel.com:443/v1/public/characters'

const state = {
    timeStamp,
    apiKey,
    hash,
    page: 1,
    limit: 20,
    offset: 0,
    url,
    total: 0,
}

const html = {
    get(element){
        return document.querySelector(element)
    }
}

const controles = {
    next(){
        state.page++
        state.offset = (state.page - 1) * state.limit;

        requisicao(`limit=${state.limit}&offset=${state.offset}`)

        const number = html.get('#number')
        number.textContent++
    },

    prev(){
        state.page--
        state.offset = (state.page - 1) * state.limit;

        if(state.page < 1){
            state.page++
        }else {
            requisicao(`limit=${state.limit}&offset=${state.offset}`)

            const number = html.get('#number')
            const n = number.textContent;
            if(!n < 1){
                number.textContent--
            }
        }
    },

    goTo(page){
        state.page = page
        if(page < 1){
            page = 1
         }

        state.offset = (state.page - 1) * state.limit;
        requisicao(`limit=${state.limit}&offset=${state.offset}`)
        const number = html.get('#number')
        number.textContent = 1
        
        
        if(page == 77){
            requisicao(`limit=${state.limit}&offset=${state.offset}`)
            number.textContent = parseInt(state.total / state.limit);
        } 
    },

    escutandoEventos(){
        html.get('#anterior').addEventListener('click', () => {
            controles.prev();
        })

        html.get('#proximo').addEventListener('click', () => {
            controles.next()
        })

        html.get('#primeiro').addEventListener('click', () => {
            if(state.page == 1){
                return;
            }
            controles.goTo(1);
        })
            
        html.get('#ultimo').addEventListener('click', () => {
            controles.goTo(77)
        })
    }
}

init()
update()

function requisicao(characterDataContainer) {
    fetch(`${url}?ts=${timeStamp}&apikey=${apiKey}&hash=${hash}&${characterDataContainer}`)
    .then((response) => {
        return response.json();
    }).then((dados) => {
        const divPai = document.querySelector('.listaDePersonagens')
        divPai.innerHTML = "";
        
        state.total = dados.data.total;
        dados.data.results.forEach(element => {
            const idPerson = element.id;
            const SrcImagem = element.thumbnail.path + '.' + element.thumbnail.extension;
            const NomePerson = element.name;

            const divCard = document.createElement('div');
            divCard.setAttribute("id", idPerson);
            divCard.classList.add('personagem_card');
            divCard.onclick = () => pegandoPersonagem(idPerson);
        
            const divCardFront = document.createElement('div');
            divCardFront.classList.add('front');
         
            const divCardBack = document.createElement('div');
            divCardBack.classList.add('back');

            if (SrcImagem == "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg") {
                imagemFront = "../assets/img/404MARVEL.png"
                imagemBack = "../assets/img/404MARVEL.png"
                classeFront = 'imgNotFound'
                classeBack = 'imgNotFound2'
                
            } else {
                imagemFront = SrcImagem
                imagemBack = SrcImagem
                classeFront = 'imagemPersonagem'
                classeBack = 'img2'
            }

            const img = document.createElement('img');
            img.classList.add(classeFront)
            const img2 = document.createElement('img');
            img2.classList.add(classeBack)

            img.src = imagemFront;
            img2.src = imagemBack;

            divCardFront.appendChild(img);
            divCardBack.appendChild(img2);

            const nome = document.createElement('span');
            nome.classList.add('nome');
            nome.textContent = NomePerson;

            divCardBack.appendChild(nome);
            divCard.appendChild(divCardFront);
            divCard.appendChild(divCardBack);
            divPai.appendChild(divCard);  
        })
        return dados.data.total;
    })

    function pegandoPersonagem(id) {
        window.location = `http://127.0.0.1:5500/pages/CharacterIndiv.html?idPerson=${id}`;
    }
}

function update(search=''){
    html.get('.listaDePersonagens').innerHTML = ""  
    let newSearch = search == '' ? '' : `&nameStartsWith=${search}` 
    state.page - 1;
    requisicao(`limit=${state.limit}&offset=${state.offset}${newSearch}`)
}

function init(){
    controles.escutandoEventos()
}

function requisicaoId(endpoint, retorno){
    fetch(`${url}/${endpoint}?ts=${timeStamp}&apikey=${apiKey}&hash=${hash}`)
    .then((response) => {
        return response.json()
    }).then((dados) => {
        retorno(dados)
    })
}
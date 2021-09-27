window.onload = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('idPerson');

requisicaoId(`${id}`, function descricoesIniciais(dados){  
    dados.data.results.forEach(element => {
        const nome = element.name;
        const imgPerson = element.thumbnail.path + '.' + element.thumbnail.extension;
        const descricao = element.description;

        const descricaoPerson = document.createElement('span')
        if(descricao == ""){
            descricaoPerson.classList.add('descricao')
            descricaoPerson.textContent = "Sem descrição! :(";
        }else{
            descricaoPerson.classList.add('descricao')
            descricaoPerson.textContent = descricao;
        }

        const imgPersonagem = document.createElement('img')
        if(imgPerson == "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg"){
            imgPersonagem.classList.add('imgBanner')
            imgPersonagem.src = "../assets/img/404MARVEL.png";
        }else{
            imgPersonagem.classList.add('imgBanner')
            imgPersonagem.src = imgPerson;
        }

        const div = document.querySelector('.banner');
        const divImg = document.createElement('div')
        const divNome = document.createElement('div')
        const divContainer = document.createElement('div')
        const divDescricao = document.createElement('div')
        const spanNome = document.createElement('span');

        divImg.classList.add('divContainer_img')
        divContainer.classList.add('divContainer_nome')
        divNome.classList.add('divNome')
        divDescricao.classList.add('divDescricao')
        spanNome.classList.add('nome')

        spanNome.textContent = nome;
        
        divImg.appendChild(imgPersonagem)
        divNome.appendChild(spanNome)
        divDescricao.appendChild(descricaoPerson)
        divContainer.appendChild(divNome)
        divContainer.appendChild(divDescricao)
        div.appendChild(divImg)
        div.appendChild(divContainer)
        })  
    })

    requisicaoId(`${id}/comics`, function comics(dados){
        dados.data.results.forEach(element => {
            const tituloComics = element.title;
            // const descricaoComics = element.description;
            const imgComics = element.thumbnail.path + '.' + element.thumbnail.extension;
        
            const TituloComics = document.createElement('span')
            // const DescricaoComics = document.createElement('span')
            const ImgComics = document.createElement('img')
            const divComics = document.createElement('div')
            const divAnimacao = document.createElement('div')
            const divContainerComics = document.querySelector('.comics');
           
            TituloComics.classList.add('tituloComics')
            // DescricaoComics.classList.add('descricaoComics')
            divAnimacao.classList.add('divAnimacao')
            
            TituloComics.textContent = tituloComics;
            // DescricaoComics.textContent = descricaoComics;


            divComics.classList.add('div_comics')

            if(imgComics == "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg"){
                ImgComics.classList.add('imgComics')
                ImgComics.src = "../assets/img/404MARVEL.png";
            }else{
                ImgComics.classList.add('imgComics')
                ImgComics.src = imgComics;
            }
            
            divComics.appendChild(ImgComics)
            divComics.appendChild(TituloComics)
            // divComics.appendChild(DescricaoComics)
            divContainerComics.appendChild(divComics);  
        })
        console.log(dados);
    })

    requisicaoId(`${id}/series`, function Series(dados){
        dados.data.results.forEach(element => {
            const tituloSerie = element.title;
            const descricaoSerie = element.description;
            const imgSerie = element.thumbnail.path + '.' + element.thumbnail.extension;

            const TituloSerie = document.createElement('span')
            const ImgSerie = document.createElement('img')
            const divSerie = document.createElement('div')
            const divContainerSerie = document.querySelector('.series');

            if(imgSerie == "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg"){
                ImgSerie.classList.add('imgSerie')
                ImgSerie.src = "../assets/img/404MARVEL.png";
            }else {
                ImgSerie.classList.add('imgSerie')
                ImgSerie.src = imgSerie;
            }
            
            TituloSerie.classList.add('tituloSeries')
            divSerie.classList.add('div_serie')

            TituloSerie.textContent = tituloSerie;

            divSerie.appendChild(ImgSerie)
            divSerie.appendChild(TituloSerie)
            divContainerSerie.appendChild(divSerie)
        })  
    })
}














var filtro = document.querySelector('#filtro');

filtro.addEventListener("input", function() {

    if(this.value.length > 0){
        update(this.value)
    }else{
        update()
    }
    
});
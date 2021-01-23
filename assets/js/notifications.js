{
    /* Alterar ID com as respesctivas transformações */
var id = document.querySelector(".popup")
id.innerHTML = `<a href="#" class="buttonpopup" onclick="javascript:newPopup(id)">Explicação</a>`

}


function newPopup(id) {
    if (id === 1) {
        // ID para rotação (cima/baixo)
        let Window = window.open(
            '../rotate.html',
            'pagina',
            "width=350, height=255, top=100, left=110, scrollbars=no ");
    }

}

/* Agora vai abrir um popUp caso clicar no botão

function PopUp(type) {
    // Caso seja Rotation();
    if (type == "1") {
        id.innerHTML = `<p><b>O personagem rotacionou!</b></p>`
    } else if (type == "2") {
        // Caso seja Reduce();
        id.innerHTML = `<b>REDUZIU!</b>`
    }else if (type == "3") {
        // Caso seja Increase();
        id.innerHTML = `<b>AUMENTOU!</b>`
    }
}
*/
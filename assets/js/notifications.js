// Função que define qual página PopUp será aberto

function whatPage(move) {
  /* Alterar ID com as respesctivas transformações */
  var id = document.querySelector("#button");
  id.outerHTML = `<div class="button" style="margin: 0 auto; width: 50%;"><a class="buttonpopup" onclick="javascript:newPopup(${move})">Explicação</a></div>`;
  //   id.innerHTML = `<a class="buttonpopup" onclick="javascript:newPopup(${move})">Explicação</a>`;
}

// Função que abre PopUp's

function newPopup(id) {
  if (id === 0) {
    // ID para rotação (cima/baixo)
    let Window = window.open(
      "./translate.html",
      "pagina",
      "width=450, height=255, top=100, left=110, scrollbars=no"
    );
  }
  if (id === 1) {
    // ID para rotação (cima/baixo)
    let Window = window.open(
      "./rotate.html",
      "pagina",
      "width=450, height=255, top=100, left=110, scrollbars=no"
    );
  }
  if (id === 2) {
    // ID para aumentar/diminuir (cima/baixo)
    let Window = window.open(
      "./incdrease.html",
      "pagina",
      "width=450, height=255, top=100, left=110, scrollbars=no"
    );
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

var id = document.querySelector(".popup")

function PopUp(type) {
    // Caso seja Rotation();
    if (type == "1") {
        id.innerHTML = "<b>ROTACIONOU!</b>"
    } else if (type == "2") {
        // Caso seja Reduce();
        id.innerHTML = "<b>REDUZIU!</b>"
    }else if (type == "3") {
        // Caso seja Increase();
        id.innerHTML = "<b>AUMENTOU!</b>"
    }
}
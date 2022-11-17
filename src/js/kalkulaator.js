// Autor: Gregor, kogu fail, va millel on muu viitamine.

window.onload = function () {
    let data = {
        "in": {}
    }

    // NB lisa kõik kuulajad, või tee automaatseks sisendi kuulamine
    Array.from(document.getElementById("user-input").getElementsByTagName("input")).forEach(element => {
        if (element.type == "number") {
            element.addEventListener('change', (evt) => {
                updateAndRender(parseFloat(evt.target.value), evt.target.id)});
            data.in[element.id] = parseFloat(element.value)
        }
    });

    const updateAndRender = (value, id) => {
        data.in[id] = value
        render()
    }

    const render = () => {
        console.log(data)
    }
}  

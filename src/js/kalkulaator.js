// Autor: Gregor, kogu fail, va millel on muu viitamine.
// Märkus, ma vahel panen rea lõppu semikooloni, vahel mitte.

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
        var graphRoot = document.getElementById("user-graph");
        const max = 100;
        Array.from(graphRoot.getElementsByTagName("div")).forEach(element => {
            if (element.classList.contains("bar")) {
                elData = element.id.split(" ");
                h = data.in[elData[0]] * 10;
                m = max - h;
                // Nii on minu meelsest ainus võimalus, lisaks see pole HTML failis hetkel seega see pole halb komme.
                element.innerHTML = `<div style=\"padding: ${m}px 20px\"></div>` +
                                    `<div style=\"border-radius: 10px; background-color: ${elData[1]}; padding: ${h}px 20px\"></div>`;
            }
        });
        console.log(data)
    }
    render()
}  

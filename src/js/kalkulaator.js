// Autor: Gregor, kogu fail, va millel on muu viitamine.
// Märkus, ma vahel panen rea lõppu semikooloni, vahel mitte.

window.onload = function () {
    let data = {
        "in": {},
        "out": {}
    }

    // NB lisa kõik kuulajad, või tee automaatseks sisendi kuulamine
    Array.from(document.getElementById("user-input").getElementsByTagName("input")).forEach(element => {
        if (element.type == "number") {
            element.addEventListener('change', (evt) => {
                updateAndRender(parseFloat(evt.target.value), evt.target.id)});
            data.in[element.id] = parseFloat(element.value);
        }
    });

    // Koosta legend 
    Array.from(document.getElementById("user-graph").getElementsByTagName("div")).forEach(element => {
        const rootLegend = document.getElementById("legend");
        if (element.classList.contains("bar")) {
            let elData = element.id.split(" ");
            rootLegend.innerHTML += `<div style="margin: 2px; padding: 2px; border-radius: 5px; background-color: ${elData[1]}; float: left;" >${elData[2].replaceAll("_", " ")}</div>`
        }
    });

    const updateAndRender = (value, id) => {
        data.in[id] = value
        render()
    }

    const render = () => {
        const graphRoot = document.getElementById("user-graph");
        calc()
        const max = 100;
        Array.from(graphRoot.getElementsByTagName("div")).forEach(element => {
            if (element.classList.contains("bar")) {
                let elData = element.id.split(" ");
                let h = data.out[elData[0]];
                let m = max - h;
                // Nii on minu meelsest ainus võimalus, lisaks see pole HTML failis hetkel seega see pole halb komme.
                element.innerHTML = `<div style=\"padding: ${m}px 20px\"></div>` +
                                    `<div style=\"border-radius: 10px; background-color: ${elData[1]}; padding: ${h}px 20px\"></div>`;
            }
        });
    }

    const calc = () => {
        let maxArr = [];
        for (const key in data.in) {
            if (Object.hasOwnProperty.call(data.in, key)) {
                maxArr.push(data.in[key]);
            }
        }
        data.out.max = Math.max.apply(null, maxArr);
        for (const key in data.in) {
            if (Object.hasOwnProperty.call(data.in, key)) {
                if (data.out.max == 0) {
                    data.out[key] = 0;
                } else {
                    data.out[key] = Math.max((data.in[key] / (data.out.max)) * 100, 0);
                }
            }
        }
        data.out["out-exp-food"] = data.out["in-bal"] * 0.165;
        data.out["out-exp-needs"] = data.out["in-bal"] * 0.335;
        data.out["out-exp-want"] = data.out["in-bal"] * 0.3;
        data.out["in-save"] = Math.max(data.out["in-bal"] - 
                    data.out["in-exp-food"] - data.out["in-exp-needs"] - 
                    data.out["in-exp-want"], 0);
        data.out["out-save"] = data.out["in-bal"] * 0.2;
    }

    render()
}  

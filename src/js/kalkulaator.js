// Autor: Gregor
// Märkus, ma vahel panen rea lõppu semikooloni, vahel mitte.

window.onload = function () {
    // Andmed
    let data = {
        "in": {},
        "out": {}
    }

    // NB lisa kõik kuulajad, või tee automaatseks sisendi kuulamine
    // Leiab vajalikud elemendid
    Array.from(document.getElementById("user-input").getElementsByTagName("input")).forEach(element => {
        // Kui element on numbri sisend, siis lisab eventi kuulamise ja paneb andmetesse default
        //väärtuse
        if (element.type == "number") {
            element.addEventListener('change', (evt) => {
                // saadab muudatuse edasi
                updateAndRender(parseFloat(evt.target.value), evt.target.id)});
            data.in[element.id] = parseFloat(element.value);
        }
    });

    // Koosta legend, väljundis automatselt
    // Leiab elemenid millele peaks legendi tegema
    Array.from(document.getElementById("user-graph").getElementsByTagName("div")).forEach(element => {
        // Lengendi root
        const rootLegend = document.getElementById("legend");
        // Vaatab elemendi sobivust
        if (element.classList.contains("bar")) {
            // V]tab id väljast vajaliku info
            let elData = element.id.split(" ");
            // Teeb uue HTML asja sinna divi, ainus viis mida oskasin teha
            rootLegend.innerHTML += `<div style="margin: 2px; padding: 2px; border-radius: 5px; background-color: ${elData[1]}; float: left;" >${elData[2].replaceAll("_", " ")}</div>`
        }
    });

    // Uuendab andmed ja kutsub peale seda render meetodi
    const updateAndRender = (value, id) => {
        data.in[id] = value
        render()
    }

    const render = () => {
        // Leiab graafiku root divi
        const graphRoot = document.getElementById("user-graph");
        calc() // Arvutab
        // leaib mis andmed data.out osast peab kuvama
        Array.from(graphRoot.getElementsByTagName("div")).forEach(element => {
            // Vaatab sobivust
            if (element.classList.contains("bar")) {
                // Võtab elemendi id-st info
                let elData = element.id.split(" ");
                // h, on kõrgus, m kõrgus täiend et joondada alla, lihtsam kui jännata CCSi paigutusega :)
                let h = data.out[elData[0]];
                let m = 100 - h;
                // Nii on minu meelsest ainus võimalus, lisaks see pole HTML failis hetkel, seega see pole halb komme.
                element.innerHTML = `<div style=\"padding: ${m}px 20px\"></div>` +
                                    `<div style=\"border-radius: 10px; background-color: ${elData[1]}; padding: ${h}px 20px\"></div>`;
            }
        });
    }

    // Arvutamine
    const calc = () => {
        let maxArr = []; // tmp muutuja
        // Loeb kõik data.in väärtused sisse ja paneb maxArr muutujasse
        for (const key in data.in) {
            if (Object.hasOwnProperty.call(data.in, key)) {
                maxArr.push(data.in[key]);
            }
        }
        // Leiab eelneva põhjas suurima elemendi, mille jäärgi teha skaala
        data.out.max = Math.max.apply(null, maxArr);
        // Paneb data.in väärtused data.out-i korrekse skaalaga, et max oleks 100, aga korrekse skaalaga ikka.
        for (const key in data.in) {
            if (Object.hasOwnProperty.call(data.in, key)) {
                if (data.out.max == 0) {
                    // Nulliga jagamise vältija
                    data.out[key] = 0;
                } else {
                    // Skaala säilitaja
                    data.out[key] = Math.max((data.in[key] / (data.out.max)) * 100, 0);
                }
            }
        }
        // Arvutused.
        data.out["out-exp-food"] = data.out["in-bal"] * 0.165;
        data.out["out-exp-needs"] = data.out["in-bal"] * 0.335;
        data.out["out-exp-want"] = data.out["in-bal"] * 0.3;
        data.out["in-save"] = Math.max(data.out["in-bal"] - 
                    data.out["in-exp-food"] - data.out["in-exp-needs"] - 
                    data.out["in-exp-want"], 0);
        data.out["out-save"] = data.out["in-bal"] * 0.2;
    }

    render() // rederi kutsumine
}  

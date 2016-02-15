function createOptionDay() {
    var value = 1;
    while (value < 32) {
        var select = document.getElementById("cmbGiorno");
        var option = document.createElement("option");
        option.setAttribute("value",value);
        option.innerHTML = value;
        select.appendChild(option);
        value = value + 1;
    }
}

function createOptionMonth() {
    var value = 0;
    var mesi = ["gennaio", "febbraio", "marzo", "aprile", "maggio", "giugno", "luglio", "agosto", "settembre", "ottobre", "novembre", "dicembre"];
    while (value < 12) {
        var select = document.getElementById("cmbMese");
        var option = document.createElement("option");
        option.setAttribute("value", value);
        option.innerHTML = mesi[value];
        select.appendChild(option);
        value = value + 1;
    }
}

function createOptionYear() {
    var annoAttuale = new Date().getFullYear();
    var value = annoAttuale;
    var anno = 50;
    while (anno > 0) {
        var select = document.getElementById("cmbAnno");
        var option = document.createElement("option");
        option.setAttribute("value", value);
        option.innerHTML = value;
        select.appendChild(option);
        value = value - 1;
        anno = anno - 1;
    }
}

function loadJson(file, callback) {
    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open('GET', file, true);
    xobj.onreadystatechange = function () {
        if (xobj.readyState == 4 && xobj.status == "200") {
            callback(xobj.responseText);
        }
    };
    xobj.send(null);  
}

function createProv() {
    data = "italia.json";
    loadJson(data, function (response) {
        var Provincia = JSON.parse(response);
        var arrayProvince = new Array();
        var i;
        for (i=0; i<Provincia.regioni.length; i++){
            for (l = 0; l < Provincia.regioni[i].capoluoghi.length; l++){
                var capoluogo = Provincia.regioni[i].capoluoghi[l];
                var provincia = Provincia.regioni[i].province[l];
                arrayProvince.push([provincia, capoluogo]);
            }
        }
        arrayProvince = arrayProvince.sort();
        for (i = 0; i < arrayProvince.length; i++) {
            var select = document.getElementById("provincia");
            var option = document.createElement("option");
            option.setAttribute("value", arrayProvince[i][0]);
            option.innerHTML = arrayProvince[i][1];
            select.appendChild(option);
        }
    });
}

function createCity() {
    data = "italia_comuni.json";
    loadJson(data, function (response) {
        var Comuni = JSON.parse(response);
        var prov = document.getElementById("provincia").value;
        var citta = document.getElementById("citta");
        var i, y, h;
        for (i = 0; i < Comuni.regioni.length; i++) {
            for (y = 0; y < Comuni.regioni[i].province.length; y++) {
                var cit = Comuni.regioni[i].province[y].code;
                if (cit == prov) {
                    while (citta.length > 0) {
                        citta.remove(citta.length - 1);
                    }
                    var x = document.getElementById("mySelect");
                    for (h = 0; h < Comuni.regioni[i].province[y].comuni.length; h++) {
                        var option = document.createElement("option");
                        option.setAttribute("value", Comuni.regioni[i].province[y].comuni[h].cap);
                        option.setAttribute("name", Comuni.regioni[i].province[y].comuni[h].code);
                        option.innerHTML = Comuni.regioni[i].province[y].comuni[h].nome;
                        citta.appendChild(option);
                    }
                }
            }
        }
    });
}

function optionAttr(giorno, i, attr, val) {
    var giornoDis = giorno[i];
    giornoDis.setAttribute(attr, val);
}

function disable() {
    var mese = parseInt(document.getElementById("cmbMese").value);
    var anno = parseInt(document.getElementById("cmbAnno").value);
    var thirty = new Array(3, 5, 8, 10);
    var giorno = document.getElementsByTagName("option");
    var i;
    if (thirty.indexOf(mese) != -1) {
        var giorno31 = optionAttr(giorno, 30, "disabled", "disabled");
    }
    else if (mese == 1){
        if (anno % 4 == 0) {
            for (i=29; i<31; i++){
                var giornoDis = optionAttr(giorno, i, "disabled", "disabled");
            }
        }
        else {
            for (i=28; i<31; i++){
                var giornoDis = optionAttr(giorno, i, "disabled", "disabled");
            }
        }
    }
    else {
        for (i=28; i<31; i++){
                var giornoDis = giorno[i];
                giornoDis.removeAttribute("disabled");
        }
    }
}

function control(string) {
    var myregexp = /^[a-zA-Z\u0020àèìòù]+$/;
    if (string.charAt(0) != " " && string.charAt(string.length - 1) != " " && myregexp.test(string) == true) {
        return true;
    }
    else {
        return false;
    }
}

function anagaf() {
    var txtNome = document.getElementById("txtNome").value;
    var txtCognome = document.getElementById("txtCognome").value;
    var Giorno = document.getElementById("cmbGiorno").value;
    var Mese = document.getElementById("cmbMese").value;
    var Anno = document.getElementById("cmbAnno").value;
    var via = document.getElementById("via").value;
    var provincia = document.getElementById("provincia").value;
    var citta = document.getElementById("citta").value;
    if (txtNome == "" && txtCognome == "" ) {
        alert("Non hai digitato nulla");
    }
    else if(txtNome == ""){
        alert("Non hai digitato il Nome");
    }
    else if(txtCognome == ""){
        alert("Non hai digitato il Cognome");
    }
    else if (via == "") {
        alert("Non hai digitato la via");
    }
    else if (control(txtNome) == false) {
        alert("Hai digitato caratteri non consentiti nel nome.")
    }
    else if (control(txtCognome) == false) {
        alert("Hai digitato caratteri non consentiti nel cognome.")
    }
    else if (control(via) == false) {
        alert("Hai digitato caratteri non consentiti nella via.")
    }
    else if (control(provincia) == false) {
        alert("Hai digitato caratteri non consentiti nella provincia.")
    }
    else if (control(citta) == false) {
        alert("Hai digitato caratteri non consentiti nella città")
    }
    else {
        alert("Ciao " + txtNome + " " + txtCognome);
    }
}

function eta() {
    var Giorno = document.getElementById("cmbGiorno").value;
    var Mese = document.getElementById("cmbMese").value;
    var Anno = document.getElementById("cmbAnno").value;
    var data = new Date(Anno, Mese, Giorno);
    var dataAttuale = new Date();
    var diffDays = dataAttuale.getTime() - data.getTime();
    var timeDif = (diffDays / (1000 * 3600 * 24));
    if (timeDif > 6570.0) {
        alert("Sei maggiorenne.");
        console.log(timeDif);
    }
    else {
        alert("Non sei maggiorenne!");
        console.log(timeDif);
    }
}

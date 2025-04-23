class Produs {
    constructor(nume, cantitate){
        this.nume = nume;
        this.cantitate = cantitate;
    }
}
const myWorker = new Worker('worker.js');  
function adaugaProdus() {
    let nume = document.getElementById("numeProdus").value;
    let cant = document.getElementById("cantitateProdus").value;
    
    if (!nume || !cant) {
        window.alert("Completati casutele prezentate!");
        return;
    }
    if(!parseInt(cant)){
        window.alert("Cantitatea trebuie sa fie un numar intreg!");
        return;
    }

    if(window.Worker){
        myWorker.postMessage(nume);
        console.log("Mesaj trimis catre worker.js!");
    }
    let numar_produse = localStorage.getItem('numar_produse');
    if(numar_produse == null){
        numar_produse = 0;
        localStorage.setItem('numar_produse', numar_produse);
    } else {
        numar_produse++;
        localStorage.setItem('numar_produse', numar_produse);
    }    
    let id_numeProdus = 'nume' + numar_produse;
    let id_cantProdus = 'cant' + numar_produse;
    localStorage.setItem(id_numeProdus, nume);
    localStorage.setItem(id_cantProdus, cant);
    myWorker.onmessage = (e) =>{
        afisareTabel();
        console.log(e);
    }
}

function afisareTabel() {
    let tabel = document.getElementById("shop_table");
    tabel.innerHTML = "<tr><th>Nr.</th><th>Nume</th><th>Cantitate</th></tr>";
    let numar_produse = localStorage.getItem('numar_produse');
    if(numar_produse == null) {
        return;
    }
    for (let i=0; i <= numar_produse; i++) {
        let nume = localStorage.getItem('nume'+i);
        let cant = localStorage.getItem('cant'+i);
        let produs = new Produs(nume, cant);
        tabel.innerHTML += "<tr>" +
            "<td>" + (i+1) + "</td> " + 
            "<td>" + produs.nume +  "</td> " +
            "<td>" + produs.cantitate +  "</td> " +
            "</tr>";
    }   
}
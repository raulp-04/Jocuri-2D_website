onmessage = (e) => {
    postMessage(`Worker: Am receptionat numele ${e}, il poti adauga in tabel`);
    console.log('Mesaj trimis catre cumparaturi.js!');
}
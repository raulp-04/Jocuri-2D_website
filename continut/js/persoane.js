function incarcaPersoane() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      generatorTabel(this);
    }
  };
  xhttp.open("GET", "persoane.xml", true);
  xhttp.send();
}
function generatorTabel(xml) {
  var i;
  var xmlDoc = xml.responseXML;
  var table='<table class="tabel_xml"><tr><th>Nume</th><th>Prenume</th><th>Varsta</th><th>Adresa</th><th>Email</th><th>Telefon</th></tr>';
  var x = xmlDoc.getElementsByTagName("persoana");
  for (i = 0; i <x.length; i++) { 

    var adresaTag = x[i].getElementsByTagName("adresa")[0];
      var adresa = adresaTag.getElementsByTagName("strada")[0].textContent + " " +
                   adresaTag.getElementsByTagName("numar")[0].textContent + ", " +
                   adresaTag.getElementsByTagName("localitate")[0].textContent + ", " +
                   adresaTag.getElementsByTagName("judet")[0].textContent + ", " +
                   adresaTag.getElementsByTagName("tara")[0].textContent;

    table += "<tr><td>" +
    x[i].getElementsByTagName("nume")[0].childNodes[0].nodeValue +
    "</td><td>" +
    x[i].getElementsByTagName("prenume")[0].childNodes[0].nodeValue +
    "</td><td>" +
    x[i].getElementsByTagName("varsta")[0].childNodes[0].nodeValue +
    "</td><td>" + 
    adresa      +
    "</td><td>" + 
    x[i].getElementsByTagName("email")[0].childNodes[0].nodeValue +
    "</td><td>" + 
    x[i].getElementsByTagName("nrTelefon")[0].childNodes[0].nodeValue +
    "</td></tr>"; 
  }
  document.getElementById("xml_p").innerHTML = table + "</table>";
}
function Sign_Up() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            const json = JSON.parse(this.responseText);
            let user = document.getElementById("u_name").value;
            let pass = document.getElementById("pwd").value;
            if(user == '' || pass == ''){
                return;
            }
            json.log_id.push({ "utilizator": `${user}`, "parola": `${pass}`});
            const http = new XMLHttpRequest()
            http.open('POST', 'utilizatori.json')
            http.setRequestHeader('Content-type', 'application/json')
            http.send(JSON.stringify(json)) // Make sure to stringify
            http.onload = function() {
                // Do whatever with response
                alert(http.responseText)
            }  
        }
    };
    xhttp.open("GET", "utilizatori.json", true);
    xhttp.send();
  }
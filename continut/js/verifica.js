function Login() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            const json = JSON.parse(this.responseText);
            let user = document.getElementById("username").value;
            let pass = document.getElementById("password").value;
            for(let i=0; i<json.log_id.length; i++){
                if(json.log_id[i].utilizator == user && json.log_id[i].parola == pass){
                    document.getElementById("login_box").style.backgroundColor = 'green';
                    return;
                }
            }
            document.getElementById("login_box").style.backgroundColor = 'red';
        }
    };
    xhttp.open("GET", "utilizatori.json", true);
    xhttp.send();
  }
// HELPFUL FUNCTIONS
function getDate() {
    var date ="Date : " +  new Date();
    document.getElementById("pid_date").innerHTML = date;
}
function getBrowserInfo() {
    var browser = navigator.userAgent;
    var browser_name;
    var browser_version;
    if(browser.indexOf("Chrome") > -1 && browser.indexOf("Chromium") === -1 && browser.indexOf("Edg") === -1){
        browser_name = "Google Chrome";
        browser_version = browser.match(/Chrome\/(\d+\.\d+)/)[1];
    } else if(browser.indexOf("Firefox") > -1 && browser.indexOf("Seamonkey") === -1){
        browser_name = "Mozilla Firefox";
        browser_version = browser.match(/Firefox\/(\d+\.\d+)/)[1];
    } else if(browser.indexOf("Safari") && browser.indexOf("Chromium") === -1 && browser.indexOf("Chrome") === -1){
        browser_name = "Safari";
        browser_version = browser.match(/Version\/(\d+\.\d+)/)[1];       
    }
    document.getElementById("pid_browser").innerHTML = "Browser : " + browser_name + " " + browser_version;
}
function getOSInfo() {
    var os = navigator.userAgent;
    var os_name;
    if(os.indexOf("Linux") > -1){
        os_name = "Linux"
    } else if(os.indexOf("Windows") > -1) {
        os_name = "Windows";
    }
    document.getElementById("pid_os").innerHTML = "OS : " + os_name;
}

// SECTION 1
function section_1() { // Sectiunea 1
    
    // DATE
    getDate();
    setInterval(getDate, 1000); 

    // URL
    var url = "URL : " + window.location.href;
    document.getElementById("pid_url").innerHTML = url;

    // LOCATION
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            var location = "Location : &emsp;&emsp;Latitude : " + position.coords.latitude + "&emsp;&emsp;Longitude : " + position.coords.longitude;
            document.getElementById("pid_location").innerHTML = location;
        }, (err) => {
            console.warn(`ERROR(${err.code}): ${err.message}`);
            var location = "Location : " + err.message;
            document.getElementById("pid_location").innerHTML = location;
        });
    } else { 
        document.getElementById("pid_location").innerHTML = "Location : Geolocation is not supported by this browser.";
    }

    // BROWSER
    getBrowserInfo();
    // OS
    getOSInfo();
 }

 // SECTION 2
function section_2() { // Sectiunea 2
    const canvasid = document.getElementById('canvasid');
    const canvasBound = canvasid.getBoundingClientRect();
    const ctx = canvasid.getContext("2d");

    class Item {
        constructor(x, y) {
            this.x = x;
            this.y = y;
        }
    }
    
    var firstCoords = null;
    var secondCoords = null;
    
    function drawRect(first, second) {
        const width = Math.abs(first.x - second.x);
        const height = Math.abs(first.y - second.y);
        const startX = Math.min(first.x, second.x);
        const startY = Math.min(first.y, second.y);

        ctx.fillStyle = document.getElementById("fillid").value;
        ctx.strokeStyle = document.getElementById("strokeid").value;
        ctx.lineWidth = 2;

        ctx.fillRect(startX, startY, width, height);
        ctx.strokeRect(startX, startY, width, height);
    }

    canvasid.addEventListener("click", (event) => {
        var mouseX = event.clientX;
        var mouseY = event.clientY;
        var canvasX = mouseX - canvasBound.left;
        var canvasY = mouseY - canvasBound.top;

        if(firstCoords == null) {
            firstCoords = new Item(canvasX, canvasY);
        } else {
            secondCoords = new Item(canvasX, canvasY);
            drawRect(firstCoords, secondCoords);
            firstCoords = null;
        }
    });
 }
 
 // SECTION 3

 function insertRow() {
    const table = document.getElementById('dynamicTable');
    const rowPosition = document.getElementById('rowPosition').value;
    const color = document.getElementById('colorPicker').value;
    const rowContent = document.getElementById('rowContent').value.split(',');

    if (rowPosition && color && rowContent.length) {
        const rowIndex = parseInt(rowPosition) - 1; // Ajustăm pentru că indexarea începe de la 0
        const newRow = table.insertRow(rowIndex);

        // Asigurăm că există cel puțin atâtea celule câte sunt coloane
        for (let i = 0; i < table.rows[0].cells.length; i++) {
            const newCell = newRow.insertCell(i);
            newCell.textContent = rowContent[i] || `Celulă ${i + 1}`; // Folosim valoarea specificată sau o valoare default
        }

        // Aplicăm culoarea de fundal
        newRow.style.backgroundColor = color;
    } else {
        alert("Vă rugăm să completați toate câmpurile necesare.");
    }
}

// Funție pentru inserarea unei coloane
function insertColumn() {
    const table = document.getElementById('dynamicTable');
    const colPosition = document.getElementById('rowPosition').value;
    const color = document.getElementById('colorPicker').value;
    const colContent = document.getElementById('colContent').value.split(',');

    if (colPosition && color && colContent.length) {
        const columnIndex = parseInt(colPosition) - 1; // Ajustăm pentru indexare de la 0

        // Iterăm prin fiecare rând și adăugăm o celulă nouă
        for (let i = 0; i < table.rows.length; i++) {
            const row = table.rows[i];
            const newCell = row.insertCell(columnIndex);

            if (i === 0) { // La header adăugăm un nume de coloană
                newCell.textContent = colContent[i] || `Coloana ${columnIndex + 1}`;
            } else { // La celelalte rânduri adăugăm text
                newCell.textContent = colContent[i] || `Celulă ${i + 1}`;
            }

            // Aplicăm culoarea de fundal
            newCell.style.backgroundColor = color;
        }
    } else {
        alert("Vă rugăm să completați toate câmpurile necesare.");
    }
}
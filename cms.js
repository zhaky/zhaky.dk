function changePage(id, file) {

    var elm, xhttp;
    
    elm = document.getElementById(id);
    console.log(elm);
    
    xhttp = new XMLHttpRequest();
    
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4) {
            if (this.status == 200) {elm.innerHTML = this.responseText;}
            if (this.status == 400) {elm.innerHTML = "The page was not found";}
        }
    }
    
    xhttp.open("GET", file, true);
    xhttp.send();
    
}

function setTitle(title) {
    document.getElementById("pageTitle").innerHTML = title;
}
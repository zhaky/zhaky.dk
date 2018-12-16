var setPageProperties = {
    
    previous: "main",
    
    main: function() {
        removeActive();
        document.getElementById("menu_main").classList.add("active");
        setTitle('Zhaky\'s page UNDER CONSTRUCTION');
        setPageProperties.previous = "main";
    },
    
    aboutMe: function() {
        removeActive();
        document.getElementById("menu_about_me").classList.add("active");
        setTitle('About the guy they called Zhaky');
        setPageProperties.previous = "about_me";
    },
    
    blog: function() {
        removeActive();
        document.getElementById("menu_blog").classList.add("active");
        setTitle('Things that occupy my head, space and time');
        setPageProperties.previous = "blog";
    },
    
    projects: function() {
        removeActive();
        document.getElementById("menu_projects").classList.add("active");
        setTitle('Zhaky\'s mad inventions and activites');
        setPageProperties.previous = "projects";
    }
    
};

function removeActive() {
    var activeElm, elmId, classStr;
    elmId = "menu_" + setPageProperties.previous;
    activeElm = document.getElementById(elmId);
    classStr = activeElm.className;
    classStr = classStr.replace("active", "");
    activeElm.className = classStr;
}

function changePage(id, file) {

    var elm, xhttp, pageName, rmStr;
    
    pageName = file;
    rmStr = pageName.slice(pageName.indexOf("."));
    pageName = pageName.replace(rmStr, "");
    setPageProperties[pageName]();
    
    elm = document.getElementById(id);
    
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
    document.getElementById("page_title").innerHTML = title;
}
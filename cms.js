var setPageProperties = { // This object keeps track of the menu buttons and ensures that the right pageTitle is displayed.
    
    previous: "main", // Keeps track of the page currently being displayed. Probably should be called current, but.. oh well
    
    main: function() {
        removeActive();
        document.getElementById("menu_main").classList.add("active"); // Sets the button to "active", so BS displays it correctly.
        setTitle('Zhaky\'s page UNDER CONSTRUCTION'); // Sets the TitlePage of the page being visited
        setPageProperties.previous = "main"; // Changes the "previous" value to the name of the current page
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

function removeActive() { // Removes the "active" class from the previous menu button
    var activeElm, elmId, classStr; // The active button; The ID of the active button elm; The class of the active elm.
    elmId = "menu_" + setPageProperties.previous; // Adds "menu_" to the elmID as this is only used for menu buttons anyway
    activeElm = document.getElementById(elmId); // Get the elm of the active button
    classStr = activeElm.className; // Get the entire string of the active button's class
    classStr = classStr.replace("active", ""); // Replace the "active" part of the elm's class with nothing - remove "active"
    activeElm.className = classStr; // Replace the current class of the elm with the new class, where "active" is removed
}

function changePage(id, file) { // Places a HTML file (file is the file dir and name) in the elm with "id"

    var elm, xhttp, pageName, rmStr; // The elm that needs content; XMLHttpRequest; dir and name of the .htm file; dir of the file.
    
    pageName = file; // Name of the file. At first it includes the dir
    rmStr = pageName.slice(pageName.indexOf(".")); // Get the dir to the file
    pageName = pageName.replace(rmStr, ""); // Remove the dir from the "file" string so only the name is left
    setPageProperties[pageName](); // Calls a function in the setPageProperties object corresponding to the file name
    
    elm = document.getElementById(id); // Get the elm that needs the content of the file
    
    xhttp = new XMLHttpRequest(); // Initiate a XMLHttpRequest to get the file from the server
    
    xhttp.onreadystatechange = function() { // Ensures the DOM is ready to obtain content from the file
        if (this.readyState == 4) {
            if (this.status == 200) {elm.innerHTML = this.responseText;}
            if (this.status == 400) {elm.innerHTML = "The page was not found";}
        }
    }
    
    xhttp.open("GET", file, true); // Get the content of the file
    xhttp.send(); // Send the content to the DOM
    
}

function setTitle(title) { // Does just that: sets the title of the page
    document.getElementById("page_title").innerHTML = title; // Replace the value of the page_title elm with the "title" param
}
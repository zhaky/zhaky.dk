// CONTENT MANAGER

function addFileToElement(idOfElement, pathToFile) { // Places a HTML file (file is the file dir and name) in the elm with "id"

    var elm = document.getElementById(idOfElement); // Get the elm that needs the content of the file
    
    var xhttp = new XMLHttpRequest(); // Initiate a XMLHttpRequest to get the file from the server
    
    xhttp.onreadystatechange = function() { // Ensures the DOM is ready to obtain content from the file
        if (this.readyState == 4) {
            if (this.status == 200) {elm.innerHTML = this.responseText;}
            if (this.status == 400) {elm.innerHTML = "The page was not found";}
        }
    }
    
    xhttp.open("GET", pathToFile, true); // Get the content of the file
    xhttp.send(); // Send the content to the DOM
    
}

function getFileNameFromPath(pathToFile) { // Gets and returns the name of a file from the entire path to a file
    var stringToRemove = pathToFile.slice(pathToFile.indexOf(".")); // Get the dir to the file
    var fileName = pathToFile.replace(stringToRemove, ""); // Remove the dir from the "pathToFile" string so only the fileName is left
    return fileName;
}

function getProjects() {
    var projectContentArea = document.getElementById("projects_content");
    console.log(projectContentArea);
}

// PAGE MANAGER

function removeActive(activeElementID) { // Removes the "active" class from the currentPage menu button
    var activeElement = document.getElementById(activeElementID); // Get the elm of the active button
    var classString = activeElement.className; // Get the entire string of the active button's class
    classString = classString.replace("active", ""); // Replace the "active" part of the elm's class with nothing - remove "active"
    activeElement.className = classString; // Replace the current class of the elm with the new class, where "active" is removed
}

function setTitle(title) { // Does just that: sets the title of the page
    document.getElementById("page_title").innerHTML = title; // Replace the value of the page_title elm with the "title" param
}

function setActive(pageName) { // Changes which menu button should be displayed as active
    document.getElementById(pageName).classList.add("active"); // Sets the button to "active", so BS displays it correctly.
}

var pages = { // This object keeps track of the menu buttons and ensures that the right pageTitle is displayed.
    
    currentPage: "main", // Keeps track of the page currently being displayed
    activeMenuID: "menu_main", // Keeps track of which menu-button is "active"
    
    changeActiveMenu: function(newMenuToBeActive) { // Removes "active" of one menu button and adds it to another
        removeActive(pages.activeMenuID); // Remove "active" from the previously active menu button
        setActive(newMenuToBeActive); // Add "active" to the newly pressed menu-button
        pages.activeMenuID = newMenuToBeActive; // Note the new menu that is "active"
        pages.currentPage = newMenuToBeActive.replace("menu_", ""); // Note the new page as being the current
    },
    
    main: function() {
        pages.changeActiveMenu("menu_main"); // Change the page to the page related to the pressed menu-button
        setTitle('Zhaky\'s page UNDER CONSTRUCTION'); // Sets the TitlePage of the page being visited
    },
    
    aboutMe: function() {
        pages.changeActiveMenu("menu_aboutMe");
        setTitle('About the guy they called Zhaky');
    },
    
    blog: function() {
        pages.changeActiveMenu("menu_blog");
        setTitle('Things that occupy my head, space and time');
    },
    
    projects: function() {
        pages.changeActiveMenu("menu_projects");
        setTitle('Zhaky\'s mad inventions and activites');
        getProjects(); // Get files from projects
    }
    
};

function changePage(pathToPageFile) { // Changes the page in the main_content area element of the index file
    var pageName = getFileNameFromPath(pathToPageFile); // Gets the fileName from the path string
    addFileToElement('main_content', pathToPageFile); // Add content of the file to the element, which should be the page to the main_content area
    pages[pageName](); // Calls a function in the pages object corresponding to the file name
}
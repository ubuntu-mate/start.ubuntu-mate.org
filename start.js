/* Code for storing/processing settings for this page */

/* Defaults */
if ( localStorage.getItem("search") == null ) {
    localStorage.setItem("search", "ggl");
}

function hide(div) {
    document.getElementsByClassName(div)[0].style.display = 'none';
}

function show(div) {
    document.getElementsByClassName(div)[0].style.display = 'initial';
}

/* Change preferred search engine */
function setSearch(engine) {
    localStorage.setItem("search", engine);
    getSearch();
}

/* Show/hide search engines when requested */
function getSearch() {
    engine = localStorage.getItem("search");
    hide("ggl");
    hide("ddg");
    if ( engine == "ddg" ) {
        show("ddg");
        document.getElementById("ddg").checked = true;
    } else {
        show("ggl");
        document.getElementById("ggl").checked = true;
    }
}

/* On page entrance */
getSearch();

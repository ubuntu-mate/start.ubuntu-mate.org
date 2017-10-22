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

function setText(div, text) {
    document.getElementById(div).innerHTML = text;
}

function appendText(div, text) {
    document.getElementById(div).append(text);
}

/* Locales / translations */
function setLocale() {
    var locale = navigator.language;
    if (! locales.hasOwnProperty(locale)) {
        var locale = locale.substring(0,2);
        if (! locales.hasOwnProperty(locale)) {
            locale = "en";
        }
    }
    appendText("link-about", locales[locale]["discover"]);
    appendText("link-community", locales[locale]["community"]);
    appendText("link-shop", locales[locale]["shop"]);
    appendText("link-chat", locales[locale]["chat"]);
    appendText("link-donate", locales[locale]["donate"]);
    document.getElementById("ggl-searchbox").placeholder = locales[locale]["searchbox"];
    document.getElementById("ddg-searchbox").placeholder = locales[locale]["searchbox"];
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
        document.getElementById("ddg-searchbox").focus();
    } else {
        show("ggl");
        document.getElementById("ggl").checked = true;
        document.getElementById("ggl-searchbox").focus();
    }
}

/* On page entrance */
getSearch();
setLocale();

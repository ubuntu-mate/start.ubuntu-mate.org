/******************************************************
 * Code for storing/processing settings for this page
******************************************************/
/* Defaults */
if (localStorage.getItem("search") === null) {
    localStorage.setItem("search", "google");
}

/* Common */
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

/*********************
 * Locales
*********************/
function setLocale() {
    var locale = navigator.language;
    if (! locales.hasOwnProperty(locale)) {
        locale = locale.substring(0,2);
        if (! locales.hasOwnProperty(locale)) {
            locale = "en";
        }
    }
    var localeDict = locales[locale];
    appendText("link-about", localeDict.discover);
    appendText("link-community", localeDict.community);
    appendText("link-shop", localeDict.shop);
    appendText("link-chat", localeDict.chat);
    appendText("link-donate", localeDict.donate);
    document.getElementById("google-searchbox").placeholder = localeDict.searchbox;
    document.getElementById("duckduckgo-searchbox").placeholder = localeDict.searchbox;
    document.getElementById("darkmode").title = localeDict.darkmode;
}

/***************************
 * Preferred Search Engine
**************************/
function setSearch(engine) {
    localStorage.setItem("search", engine);
    getSearch();
}

function getSearch() {
    engine = localStorage.getItem("search");
    hide("google");
    hide("duckduckgo");
    if ( engine == "duckduckgo" ) {
        show("duckduckgo");
        document.getElementById("duckduckgo").style = "";
        document.getElementById("duckduckgo-searchbox").focus();
    } else {
        show("google");
        document.getElementById("google").style = "";
        document.getElementById("google-searchbox").focus();
    }
}

/*********************
 * On page load
*********************/
getSearch();
setLocale();

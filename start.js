/* Code for storing/processing settings for this page */

/* Defaults */
if ( localStorage.getItem("search") === null ) {
    localStorage.setItem("search", "ggl");
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

/* Locales / translations */
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
    document.getElementById("ggl-searchbox").placeholder = localeDict.searchbox;
    document.getElementById("ddg-searchbox").placeholder = localeDict.searchbox;
    document.getElementById("darkmode").title = localeDict.darkmode;
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

/* Dark mode */
function setDarkMode(state) {
    if (state === true) {
        document.body.className = "dark";
    } else {
        document.body.className = "";
    }
}

function toggleDarkMode() {
    if ( localStorage.getItem("darkmode") === "true" ) {
        localStorage.setItem("darkmode", "false");
        setDarkMode(false);
    } else {
        localStorage.setItem("darkmode", "true");
        setDarkMode(true);
    }
}

setTimeout(function() {
    /* Smooth fade toggle, except Firefox */
    document.body.setAttribute("style", "transition: background-color 0.2s linear; -moz-transition: none;");
}, 500);

/* On page entrance */
if ( localStorage.getItem("darkmode") === "true" ) {
    setDarkMode(true);
}

getSearch();
setLocale();

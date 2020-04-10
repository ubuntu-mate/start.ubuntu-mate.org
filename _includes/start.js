/*********************
 * Common
*********************/
function hide(class_name) {
    var items = document.getElementsByClassName(class_name);
    for (i = 0; i < items.length; i++) {
        items[i].style.display = "none";
    }
}

function show(class_name) {
    var items = document.getElementsByClassName(class_name);
    for (i = 0; i < items.length; i++) {
        items[i].style.display = "initial";
    }
}

function removeClass(class_name, class_to_remove) {
    var items = document.getElementsByClassName(class_name);
    for (i = 0; i < items.length; i++) {
        items[i].classList.remove(class_to_remove);
    }
}

function addClass(id, class_to_add) {
    document.getElementById(id).classList.add(class_to_add);
}

function setText(id, text) {
    document.getElementById(id).innerHTML = text;
}

function setTitle(id, text) {
    document.getElementById(id).title = text;
}

function setTitles(class_name, text) {
    var items = document.getElementsByClassName(class_name);
    for (i = 0; i < items.length; i++) {
        items[i].title = text;
    }
}

function setPlaceholders(class_name, text) {
    var items = document.getElementsByClassName(class_name);
    for (i = 0; i < items.length; i++) {
        items[i].placeholder = text;
    }
}

/*********************
 * Locales
*********************/
var STRINGS = {};
function setup_locales() {
    var locale = navigator.language;

    // Try full locale (e.g. fr_CA)
    if (LOCALES.hasOwnProperty(locale)) {
        STRINGS = LOCALES[locale];
    } else {
        // Try the language only (e.g. fr)
        locale = locale.substring(0,2);
        if (LOCALES.hasOwnProperty(locale)) {
            STRINGS = LOCALES[locale];
        } else {
            locale = "en";
            STRINGS = LOCALES["default"];
        }
    }

    // Enforce RTL if locale requires this.
    var rtl_langs = ["ar", "arc", "dv", "fa", "ha", "he", "khw", "ks", "ku", "ps", "ur", "yi"];
    for (i = 0; i < rtl_langs.length; i++) {
        if (locale.substring(0,2) == rtl_langs[i]) {
            console.log("RTL");
            document.dir = "rtl";
            document.body.classList.add("rtl");
        }
    }

    document.documentElement.lang = locale;
    document.title = STRINGS.start_page;
    setText("str-discover", STRINGS.discover);
    setText("str-community", STRINGS.community);
    setText("str-shop", STRINGS.shop);
    setText("str-funding", STRINGS.funding);
    setText("str-prefer-engine", STRINGS.prefer_engine);
    setText("str-powered-by", STRINGS.powered_by);
    setTitle("pref-menu-icon", STRINGS.settings);
    setTitles("search-button", STRINGS.search);
    setPlaceholders("search-input", STRINGS["placeholder_" + PLACEHOLDERS[engine]]);
    setText("str-appearance", STRINGS.appearance);
    setText("str-dark-mode", STRINGS.dark_mode);
}

/***************************
 * Preferred Search Engine
**************************/
function set_default(engine) {
    localStorage.setItem("preferredEngine", engine);
    setup_search();
    removeClass("engine-choice", "active")
    addClass("option-" + engine, "active");
    setPlaceholders("search-input", STRINGS["placeholder_" + PLACEHOLDERS[engine]]);
    document.getElementById("pref-menu-toggle").checked = false;
    document.getElementById(engine + "-search-input").focus();
}

function setup_search() {
    engine = localStorage.getItem("preferredEngine");
    if (engine == null) {
        engine = "google";
        localStorage.setItem("preferredEngine", engine);
    }
    hide("search-form");
    hide("search-logo");
    show(engine);
    addClass("option-" + engine, "active");
    document.getElementById(engine + "-search-input").focus();
}

/***************************
 * Force dark mode (for browsers that can't set it automatically)
**************************/
document.addEventListener("change", function(e) {
    if (document.getElementById("dark-mode").checked === true) {
        localStorage.setItem("dark", "true")
        document.body.classList.add("dark");
    } else {
        localStorage.setItem("dark", "false")
        document.body.classList.remove("dark");
    }
});

function setup_appearance() {
    if (localStorage.getItem("dark") === "true") {
        document.getElementById("dark-mode").checked = true;
        document.body.classList.add("dark");
    }
}


/*********************
 * On page load
*********************/
/* Migrate from older config (before Apr 2020) */
if (localStorage.getItem("search") != null) {
    if (localStorage.getItem("search") == "ddg") {
        localStorage.setItem("preferredEngine", "duckduckgo");
    }
    localStorage.removeItem("search");
}

setup_search();
setup_locales();
setup_appearance();

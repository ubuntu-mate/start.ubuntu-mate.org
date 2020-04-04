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
function setup_locales() {
    var locale = navigator.language;
    var strings = {};

    // Try full locale (e.g. fr_CA)
    if (LOCALES.hasOwnProperty(locale)) {
        strings = LOCALES[locale];
    } else {
        // Try the language only (e.g. fr)
        locale = locale.substring(0,2);
        if (LOCALES.hasOwnProperty(locale)) {
            strings = LOCALES[locale];
        } else {
            locale = "en";
            strings = LOCALES["default"];
        }
    }

    setText("str-discover", strings.discover);
    setText("str-community", strings.community);
    setText("str-shop", strings.shop);
    setText("str-funding", strings.funding);
    setText("str-prefer-engine", strings.prefer_engine);
    setText("str-powered-by", strings.powered_by);
    setTitle("pref-menu-icon", strings.settings);
    setTitles("search-button", strings.search);
    setPlaceholders("search-input", strings.placeholder);
}

/***************************
 * Preferred Search Engine
**************************/
function set_default(engine) {
    localStorage.setItem("preferredEngine", engine);
    setup_search();
    removeClass("engine-choice", "active")
    addClass("option-" + engine, "active");
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
    document.getElementById(engine + "-search-button").focus();
}

/*********************
 * On page load
*********************/
setup_search();
setup_locales();

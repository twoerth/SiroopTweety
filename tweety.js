// ==UserScript==
// @name         Siroop Tweety
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://siroop.ch/*
// @grant        GM_addStyle
// @require      https://cdnjs.cloudflare.com/ajax/libs/jquery/1.11.3/jquery.min.js
// ==/UserScript==

function getElementByXpath(path) {
    return document.evaluate(path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
}

function handleTweeetyClick( e ) {
    console.log( e );
    $("#gmOverlayDialog").toggleClass("OverlayHidden");
}

function makeTweetyClickable() {
    // We could find the element with jQuery, but I came up with the path before deciding to include jQuery.
    var tweety = getElementByXpath('//html/body/header/div[@class="o-page__navigation-meta"]/div/nav/ul/img');

    $("body").append (
        '<div id="gmOverlayDialog" class="OverlayHidden"></div>'
    );

    GM_addStyle("#gmOverlayDialog {height: 500px; width: 250px; background: #FFFFFF; position: fixed; right: 5px; top: 42px; border: 1px Solid #CCCCCC;  z-index: 5000;}");
    GM_addStyle(".OverlayHidden {display: none;}");

    tweety.addEventListener("click", handleTweeetyClick);
}

(function() {
    'use strict';

    console.log("Tampermonkey running");

    // Tweety is added with JS so we have to wait a bit to give it a chance to appear.
    window.setTimeout( makeTweetyClickable, 1000 );
})();

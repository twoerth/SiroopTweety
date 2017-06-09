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

function handleSubmit( e ) {
    var content = $("#gmTextArea").val();
    var url = document.location.href;

    var post = { content: content, url: url, ts: (new Date()).getTime() };
    console.log( post );

    $.ajax({
        url: "http://127.0.0.1:8000/store",
        type: 'POST',
        crossDomain: true,
        data: JSON.stringify( post ),
        dataType: 'json',
        contentType: "application/json",
        success: function (data) {
            console.log("Data: " + data);
        }
    });
}

function makeTweetyClickable() {
    // We could find the element with jQuery, but I came up with the path before deciding to include jQuery.
    var tweety = getElementByXpath('//html/body/header/div[@class="o-page__navigation-meta"]/div/nav/ul/img');

    if( tweety === null ) {
        console.log("no tweety yet");
        window.setTimeout( makeTweetyClickable, 200 );
    } else {
        $("body").append (
            '<div id="gmOverlayDialog" class="OverlayHidden">' +
            '<textarea id="gmTextArea" rows="6" cols="50"">Type your comment here</textarea>'+
            '<input id="gmSubmit" type="submit" value="Submit"></input>'+
            '</div>'
        );

        GM_addStyle("#gmOverlayDialog {height: 200px; width: 250px; background: #FFFFFF; position: fixed; right: 5px; top: 42px; border: 1px Solid #CCCCCC;  z-index: 5000;}");
        GM_addStyle(".OverlayHidden {display: none;}");

        $("#gmSubmit").on("click", handleSubmit);

        tweety.addEventListener("click", handleTweeetyClick);
    }
}

(function() {
    'use strict';

    console.log("Tampermonkey running");

    // Tweety is added with JS so we have to wait a bit to give it a chance to appear.
    window.setTimeout( makeTweetyClickable, 200 );
})();

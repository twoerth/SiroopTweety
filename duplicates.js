// ==UserScript==
// @name         SiroopDragDrop
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://siroop.ch/search*
// @grant        GM_addStyle
// @require      https://code.jquery.com/jquery-3.2.1.min.js
// ==/UserScript==

(function() {
    'use strict';

    GM_addStyle(".gm_was_dropped {display: none;}");
    GM_addStyle(".gm_received_drop {border: 1px Solid Red; background-color: Red;}");

    $(".c-item-list__item")
    .attr("draggable",true)
    .on("dragstart", function( event ) {
        event.originalEvent.dataTransfer.setData("text/plain", event.currentTarget.getElementsByTagName("a")[0].href);
    })
    .on( "dragover", function( event ) {
        event.preventDefault();
    })
    .on("dragend", function( event ) {
        if( event.originalEvent.dataTransfer.dropEffect == "copy" ) {
            event.currentTarget.className = event.currentTarget.className + " gm_was_dropped";
        }
    })
    .on( "drop", function( event ) {
        var post = {
            to: event.originalEvent.dataTransfer.getData("text/plain"),
            from: event.currentTarget.getElementsByTagName("a")[0].href,
            ts: (new Date()).getTime()
        };
        event.currentTarget.className = event.currentTarget.className + " gm_received_drop";

        $.ajax({
            url: "https://xxxxxxxxx.execute-api.eu-west-1.amazonaws.com/dev/store_duplicates",
            type: 'POST',
            crossDomain: true,
            data: JSON.stringify( post ),
            dataType: 'json',
            contentType: "application/json",
            success: function (data) {
                console.log("Data: " + data);
            },
            error: function( data ) {
                console.log("Data: " + data);
            }
        });
    });
})();

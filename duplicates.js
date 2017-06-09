// ==UserScript==
// @name         SiroopDragDrop
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://siroop.ch/search*
// @grant        none
// @require      https://code.jquery.com/jquery-3.2.1.slim.min.js
// ==/UserScript==

(function() {
    'use strict';

    $("article")
    .attr("draggable",true)
    .on( "dragover", function( event ) {
        event.preventDefault();
    })
    .on( "drop", function( event ) {
        var post = {
            to: event.originalEvent.dataTransfer.getData("text/plain"),
            from: event.currentTarget.getElementsByTagName("a")[0].href,
            ts: (new Date()).getTime()
        };

        $.ajax({
        url: "https://xxxxxxxxxxxx.execute-api.eu-west-1.amazonaws.com/dev/store_duplicates",
        type: 'POST',
        crossDomain: true,
        data: JSON.stringify( post ),
        dataType: 'json',
        contentType: "application/json",
        success: function (data) {
            console.log("Data: " + data);
        }
    });

    });
})();

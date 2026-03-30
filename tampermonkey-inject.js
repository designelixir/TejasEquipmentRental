// ==UserScript==
// @name         Tejas CSS Live Injector
// @namespace    tejas-equipment-rental
// @match        https://tejas-equipment-rental.rentalesign.com/*
// @grant        GM_xmlhttpRequest
// @connect      localhost
// @run-at       document-end
// ==/UserScript==
(function () {
    const CSS_URL = 'http://localhost:8080/custom.css';
    const EVENTS_URL = 'http://localhost:8080/events';

    var styleEl = document.createElement('style');
    styleEl.id = '__local-css-override';
    document.head.appendChild(styleEl);

    function loadCSS() {
        GM_xmlhttpRequest({
            method: 'GET',
            url: CSS_URL + '?t=' + Date.now(),
            onload: function(r) { styleEl.textContent = r.responseText; }
        });
    }

    loadCSS();

    GM_xmlhttpRequest({
        method: 'GET',
        url: EVENTS_URL,
        headers: { 'Accept': 'text/event-stream' },
        onreadystatechange: function(r) {
            if (r.responseText.includes('data: reload')) loadCSS();
        }
    });
})();
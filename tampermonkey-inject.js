// ==UserScript==
// @name         Tejas CSS Live Injector
// @namespace    tejas-equipment-rental
// @match        https://tejas-equipment-rental.rentalesign.com/*
// @grant        GM_xmlhttpRequest
// @connect      localhost
// @run-at       document-end
// ==/UserScript==
(function () {
    const CSS_URL  = 'http://localhost:8080/custom.css';
    const HTML_URL = 'http://localhost:8080/home.html';
    const POLL_MS  = 1000;

    // --- CSS injection (unchanged) ---
    let styleEl = document.createElement('style');
    styleEl.id = '__local-css-override';
    document.head.appendChild(styleEl);

    function loadCSS() {
        GM_xmlhttpRequest({
            method: 'GET',
            url: CSS_URL + '?t=' + Date.now(),
            onload: r => { styleEl.textContent = r.responseText; }
        });
    }
    loadCSS();
    setInterval(loadCSS, POLL_MS);

    // --- HTML injection ---
    function injectHTML(html) {
        const target = document.querySelector('.category-header-content.ng-star-inserted');
        if (target) target.innerHTML = html;
    }

    function loadHTML() {
        GM_xmlhttpRequest({
            method: 'GET',
            url: HTML_URL + '?t=' + Date.now(),
            onload: r => { injectHTML(r.responseText); }
        });
    }

    // Wait for the Angular-rendered div before starting the poll
    const observer = new MutationObserver(() => {
        if (document.querySelector('.category-header-content.ng-star-inserted')) {
            observer.disconnect();
            loadHTML();
            setInterval(loadHTML, POLL_MS);
        }
    });
    observer.observe(document.body, { childList: true, subtree: true });
})();

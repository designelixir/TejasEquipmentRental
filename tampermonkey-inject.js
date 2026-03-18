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
    const HTML_URL = 'http://localhost:8080/home.html';
    const POLL_MS = 1000;

    // --- CSS ---
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

    // --- HTML ---
    function injectHTML(html) {
        if (!window.location.pathname.includes('/content/Home/')) return;
        const target = document.querySelector('.custom-content.ng-star-inserted');
        if (target) target.innerHTML = html;
    }

    function loadHTML() {
        GM_xmlhttpRequest({
            method: 'GET',
            url: HTML_URL + '?t=' + Date.now(),
            onload: r => { injectHTML(r.responseText); }
        });
    }

    const observer = new MutationObserver(() => {
        if (!window.location.pathname.includes('/content/Home/')) return;
        if (document.querySelector('.custom-content.ng-star-inserted')) {
            observer.disconnect();
            loadHTML();
            setInterval(loadHTML, POLL_MS);
        }
    });

    observer.observe(document.body, { childList: true, subtree: true });
})();
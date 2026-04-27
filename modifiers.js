document.getElementById('tejas-footer-year').textContent = new Date().getFullYear();

// About Page
var currentSlide = 0;

function changeSlide(dir) {
    var cards = document.querySelectorAll('.staff-card');
    cards[currentSlide].classList.add('staff-card-hidden');
    currentSlide = (currentSlide + dir + cards.length) % cards.length;
    cards[currentSlide].classList.remove('staff-card-hidden');
    document.getElementById('counter').innerHTML = (currentSlide + 1) + ' / ' + cards.length;
}

// Locations
var locationsMeta = [
    {name: "Default", addressLine1: "6380 Randolph Blvd", addressLine2: "San Antonio, TX 78233", phone: "(210) 590-2445", hours: "", googleReview: "http://bit.ly/2Du4c86"},
    {name: "Tejas Equipment-South Fort Worth", addressLine1: "6745 US-67", addressLine2: "Alvaredo, Tx 76009", phone: "(817) 790-0755", hours: "Monday-Sunday: 8:00 AM-7:00 PM", googleReview: 'https://maps.app.goo.gl/jg8cQV3VHV7gYBrc8'},
    {name: "Tejas Equipment - North Houston", addressLine1: "2610 Spring Cypress Rd", addressLine2: "Spring, Tx 77388", phone: "(346) 351-1666", hours: "Monday-Sunday: 8:00 AM-7:00 PM", googleReview: ""},
    {name: "Tejas Equipment -SMA", addressLine1: "1108 Highway 80", addressLine2: "San Marcos, TX 78666", phone: "(512) 210-8500", hours: "Monday-Sunday: 8:00 AM-7:00 PM", googleReview: ""},
    {name: "Tejas Equipment -NBR", addressLine1: "243 Trade Center Drive", addressLine2: "New Braunfels, TX 78130", phone: "(830) 387-4252", hours: "Monday-Sunday: 8:00 AM-7:00 PM", googleReview: ""},
    {name: "Tejas Equipment- North San Antonio", addressLine1: "6380 Randolph Boulevard", addressLine2: "San Antonio, TX 78233", phone: "(210) 590-2445", hours: "Monday-Sunday: 8:00 AM-7:00 PM", googleReview: ""},
    {name: "Tejas Equipment -San Benito", addressLine1: "2623 West Business 77", addressLine2: "San Benito, TX 78586", phone: "(956) 276-9446", hours: "Monday-Sunday: 8:00 AM-7:00 PM", googleReview: ""},
    {name: "Tejas Equipment- MCA", addressLine1: "1212 North 23rd Street", addressLine2: "McAllen, TX 78501", phone: "(956) 682-1312", hours: "Monday-Sunday: 8:00 AM-7:00 PM", googleReview: ""},
    {name: "Tejas Equipment -BRO", addressLine1: "3320 FM 802", addressLine2: "Brownsville, TX 78521", phone: "(956) 542-3636", hours: "Monday-Sunday: 8:00 AM-7:00 PM", googleReview: ""},
];

function updateFooterContact(locationName) {
    var loc = null;
    for (var i = 0; i < locationsMeta.length; i++) {
        if (locationsMeta[i].name === locationName) { loc = locationsMeta[i]; break; }
    }
    if (!loc) loc = locationsMeta[0];

    var contact = document.querySelector('.tejas-footer-contact');
    if (contact) {
        contact.innerHTML = '<h4 class="tejas-footer-heading">Contact</h4>'
            + '<p class="tejas-footer-contact-item location-name">' + loc.name + '</p>'
            + (loc.hours ? '<p class="tejas-footer-contact-item"><i class="fa-solid fa-clock"></i> ' + loc.hours + '</p>' : '')
            + '<p class="tejas-footer-contact-item"><i class="fa-solid fa-phone"></i><a class="white-text" href="tel:' + loc.phone.replace(/\D/g, '') + '">' + loc.phone + '</a></p>'
            + '<p class="tejas-footer-contact-item"><i class="fa-solid fa-envelope"></i><a class="white-text" href="mailto:info@tejasequipment.com" target="_blank">info@tejasequipment.com</a></p>'
            + '<p class="tejas-footer-contact-item"><i class="fa-solid fa-map-marker-alt"></i><a class="white-text" target="_blank" href="https://maps.google.com/?q=' + encodeURIComponent(loc.addressLine1 + ' ' + loc.addressLine2) + '">' + loc.addressLine1 + ', <br>' + loc.addressLine2 + '</a></p>';
    }

    var footerReviewBtn = document.querySelector('.tejas-footer-social .button');
    if (footerReviewBtn && loc.googleReview) footerReviewBtn.href = loc.googleReview;

    var homepageReviewBtn = document.getElementById('homepageGoogleReviewsButton');
    if (homepageReviewBtn && loc.googleReview) homepageReviewBtn.href = loc.googleReview;
}

var observer = new MutationObserver(function() {
    var logo = document.querySelector('.company-logo');
    if (logo) {
        observer.disconnect();
        updateFooterContact(logo.getAttribute('title'));
    }
});
observer.observe(document.body, { childList: true, subtree: true });

// Reviews
var reviewPage = 1;
var totalPages = 2;

function rotateReviews() {
    var current = document.getElementById('reviewsContainer' + reviewPage);
    reviewPage = reviewPage === totalPages ? 1 : reviewPage + 1;
    var next = document.getElementById('reviewsContainer' + reviewPage);
    if (current) current.style.display = 'none';
    if (next) next.style.display = 'flex';
}

if (document.getElementById('reviewsContainer1')) setInterval(rotateReviews, 6000);

// Search
function tejasSearch() {
    var input = document.getElementById('tejasSearchInput');
    var q = input ? input.value.trim() : '';
    if (q) window.location.href = '/portal/category/Search/0?search=' + encodeURIComponent(q);
}

var searchInput = document.getElementById('tejasSearchInput');
if (searchInput) {
    searchInput.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') tejasSearch();
    });
}
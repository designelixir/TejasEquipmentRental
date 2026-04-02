var current = 0;
var cards = document.querySelectorAll('.staff-card');
var track = document.getElementById('track');
var dotsEl = document.getElementById('dots');
var counter = document.getElementById('counter');
var total = cards.length;

if (cards){
cards.forEach(function(_,i){
  var d = document.createElement('div');
  d.className = 'dot'+(i===0?' active':'');
  d.onclick = function(){ goTo(i); };
  dotsEl.appendChild(d);
});
}

function goTo(n){
  current = (n+total)%total;
  track.style.transform = 'translateX(-'+current+'00%)';
  document.querySelectorAll('.dot').forEach(function(d,i){ d.classList.toggle('active',i===current); });
  counter.textContent = (current+1)+' / '+total;
}

function changeSlide(dir){ goTo(current+dir); }
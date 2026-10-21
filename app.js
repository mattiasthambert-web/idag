/* Idag – tre saker. Ren JavaScript, inga beroenden. */
(function () {
  'use strict';

  var NYCKEL = 'idag.v1';
  var ANTAL = 3;

  var rader = Array.prototype.slice.call(document.querySelectorAll('.rad'));
  var datumEl = document.getElementById('datum');
  var statusEl = document.getElementById('status');
  var nyDagKnapp = document.getElementById('nydag');
  var bekraftaEl = document.getElementById('bekrafta');
  var jaKnapp = document.getElementById('ja-rensa');
  var avbrytKnapp = document.getElementById('avbryt');

  /* ---------- Läge och lagring ---------- */

  function tomtLage() {
    var saker = [];
    for (var i = 0; i < ANTAL; i++) {
      saker.push({ text: '', klar: false });
    }
    return { saker: saker };
  }

  function lasLage() {
    try {
      var raw = localStorage.getItem(NYCKEL);
      if (!raw) { return tomtLage(); }
      var data = JSON.parse(raw);
      if (!data || !Array.isArray(data.saker)) { return tomtLage(); }
      var lage = tomtLage();
      for (var i = 0; i < ANTAL; i++) {
        var s = data.saker[i] || {};
        lage.saker[i].text = typeof s.text === 'string' ? s.text : '';
        lage.saker[i].klar = s.klar === true;
      }
      return lage;
    } catch (e) {
      return tomtLage();
    }
  }

  function sparaLage() {
    try {
      localStorage.setItem(NYCKEL, JSON.stringify(lage));
      return true;
    } catch (e) {
      visaStatus('Kunde inte spara i webbläsaren.');
      return false;
    }
  }

  var lage = lasLage();

  /* ---------- Visning ---------- */

  function visaStatus(text) {
    statusEl.textContent = text || '';
  }

  function visaDatum() {
    try {
      var d = new Date();
      var text = d.toLocaleDateString('sv-SE', { weekday: 'long', day: 'numeric', month: 'long' });
      datumEl.textContent = text.charAt(0).toUpperCase() + text.slice(1);
    } catch (e) {
      datumEl.textContent = '';
    }
  }

  function visaRad(i) {
    var rad = rader[i];
    var sak = lage.saker[i];
    var falt = rad.querySelector('.falt');
    var knapp = rad.querySelector('.knapp-klar');
    var knappText = knapp.querySelector('.knapp-text');

    if (falt.value !== sak.text) { falt.value = sak.text; }
    rad.classList.toggle('klar', sak.klar);
    knapp.setAttribute('aria-pressed', sak.klar ? 'true' : 'false');
    knapp.setAttribute('aria-label', (sak.klar ? 'Ångra, sak ' : 'Bocka av sak ') + (i + 1));
    knappText.textContent = sak.klar ? 'Klart' : 'Klar';
  }

  function visaAllt() {
    for (var i = 0; i < ANTAL; i++) { visaRad(i); }
    uppdateraSammanfattning();
  }

  function uppdateraSammanfattning() {
    var antalKlara = 0;
    var antalMedText = 0;
    for (var i = 0; i < ANTAL; i++) {
      if (lage.saker[i].text.trim()) { antalMedText++; }
      if (lage.saker[i].klar) { antalKlara++; }
    }
    if (antalMedText > 0 && antalKlara === ANTAL) {
      visaStatus('Alla tre är klara. Bra jobbat!');
    } else if (statusEl.textContent === 'Alla tre är klara. Bra jobbat!') {
      visaStatus('');
    }
  }

  /* ---------- Händelser ---------- */

  rader.forEach(function (rad, i) {
    var falt = rad.querySelector('.falt');
    var knapp = rad.querySelector('.knapp-klar');

    falt.addEventListener('input', function () {
      lage.saker[i].text = falt.value;
      sparaLage();
      uppdateraSammanfattning();
    });

    falt.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') {
        e.preventDefault();
        var nasta = rader[i + 1];
        if (nasta) {
          nasta.querySelector('.falt').focus();
        } else {
          falt.blur();
        }
      }
    });

    knapp.addEventListener('click', function () {
      lage.saker[i].klar = !lage.saker[i].klar;
      sparaLage();
      visaRad(i);
      uppdateraSammanfattning();
    });
  });

  nyDagKnapp.addEventListener('click', function () {
    visaStatus('');
    nyDagKnapp.hidden = true;
    bekraftaEl.hidden = false;
    jaKnapp.focus();
  });

  avbrytKnapp.addEventListener('click', function () {
    bekraftaEl.hidden = true;
    nyDagKnapp.hidden = false;
    nyDagKnapp.focus();
  });

  jaKnapp.addEventListener('click', function () {
    lage = tomtLage();
    sparaLage();
    visaAllt();
    bekraftaEl.hidden = true;
    nyDagKnapp.hidden = false;
    visaStatus('Rensat. Ny dag!');
    rader[0].querySelector('.falt').focus();
  });

  /* ---------- Start ---------- */

  visaDatum();
  visaAllt();
})();

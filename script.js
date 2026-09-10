/* ============================================================
   Antiquitäten am Schwabentor — Seitenlogik
   Nur zwei Dinge: das Mobilmenü und die aufklappbaren
   Objektschilder in den Vitrinen. Kein Framework.
   ============================================================ */
(function () {
  'use strict';

  var toggle = document.getElementById('navToggle');
  var nav = document.getElementById('mainNav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      toggle.setAttribute('aria-label', open ? 'Menü schließen' : 'Menü öffnen');
    });
    nav.addEventListener('click', function (e) {
      if (e.target.tagName !== 'A') return;
      nav.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  }

  /* Objektschilder: ein Schild auf einmal offen, wie in einer Vitrine,
     in der man auch nur ein Stück gleichzeitig in die Hand nimmt. */
  var labels = Array.prototype.slice.call(document.querySelectorAll('.vitrine-label'));
  labels.forEach(function (label) {
    var body = label.nextElementSibling;
    if (!body) return;

    label.addEventListener('click', function () {
      var isOpen = label.getAttribute('aria-expanded') === 'true';

      labels.forEach(function (other) {
        other.setAttribute('aria-expanded', 'false');
        if (other.nextElementSibling) other.nextElementSibling.hidden = true;
      });

      if (!isOpen) {
        label.setAttribute('aria-expanded', 'true');
        body.hidden = false;
      }
    });
  });

  var year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();
})();

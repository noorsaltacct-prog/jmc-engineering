/* JMC Engineering & Services — vanilla JS: header state, mobile nav,
   scroll-reveal animations, quote-form mailto composer, footer year. */
(function () {
  'use strict';

  /* Sticky header shadow once scrolled */
  var header = document.getElementById('header');
  function onScroll() {
    if (window.scrollY > 24) header.classList.add('scrolled');
    else header.classList.remove('scrolled');
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* Mobile menu toggle */
  var menuBtn = document.getElementById('menuBtn');
  if (menuBtn) {
    menuBtn.addEventListener('click', function () {
      var open = header.classList.toggle('nav-open');
      menuBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    document.querySelectorAll('.nav a').forEach(function (link) {
      link.addEventListener('click', function () {
        header.classList.remove('nav-open');
        menuBtn.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* Scroll-reveal animations */
  var revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry, i) {
        if (entry.isIntersecting) {
          var el = entry.target;
          /* slight stagger when siblings reveal together */
          el.style.transitionDelay = Math.min(i * 70, 280) + 'ms';
          el.classList.add('in');
          io.unobserve(el);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('in'); });
  }

  /* Quote form -> pre-addressed email (static site, no backend) */
  var form = document.getElementById('quoteForm');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var name = document.getElementById('qName').value.trim();
      var phone = document.getElementById('qPhone').value.trim();
      var service = document.getElementById('qService').value;
      var msg = document.getElementById('qMsg').value.trim();
      var subject = 'Quote Request — ' + service + ' (' + name + ')';
      var body =
        'Name: ' + name + '\n' +
        'Phone: ' + phone + '\n' +
        'Service Needed: ' + service + '\n\n' +
        'About the job:\n' + msg;
      window.location.href =
        'mailto:jmc7548@gmail.com?subject=' + encodeURIComponent(subject) +
        '&body=' + encodeURIComponent(body);
    });
  }

  /* Footer year */
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();

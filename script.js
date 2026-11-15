/* Fills the year bar from the visitor's own date. No dependencies. */
(function () {
  'use strict';

  var MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  var DAY_MS = 86400000;

  var wrap = document.getElementById('track-wrap');
  var list = document.getElementById('months');
  var flag = document.getElementById('flag');
  var flagLabel = document.getElementById('flag-label');
  var line = document.getElementById('year-line');
  if (!wrap || !list || !flag || !flagLabel || !line) return;

  var now = new Date();
  var year = now.getFullYear();
  var month = now.getMonth();
  var date = now.getDate();

  var yearDays = Math.round((Date.UTC(year + 1, 0, 1) - Date.UTC(year, 0, 1)) / DAY_MS);
  var dayOfYear = Math.round((Date.UTC(year, month, date) - Date.UTC(year, 0, 1)) / DAY_MS) + 1;
  var dayFraction = (now.getHours() * 3600 + now.getMinutes() * 60 + now.getSeconds()) / 86400;
  var percent = Math.round(((dayOfYear - 1 + dayFraction) / yearDays) * 100);
  var daysLeft = yearDays - dayOfYear;

  /* Caption */
  var left;
  if (daysLeft === 0) left = 'today is the last day';
  else if (daysLeft === 1) left = '1 day left';
  else left = daysLeft + ' days left';
  line.textContent = daysLeft === 0
    ? year + ' is ' + percent + '% done, and ' + left + '.'
    : year + ' is ' + percent + '% done, with ' + left + '.';

  wrap.setAttribute('role', 'img');
  wrap.setAttribute('aria-label', 'Year progress: ' + percent + ' percent of ' + year + ' has passed.');

  /* Segments: width follows the real length of each month */
  var items = list.children;
  var currentDays = 30;
  for (var i = 0; i < items.length; i++) {
    var days = new Date(year, i + 1, 0).getDate();
    var fill = items[i].querySelector('i');
    var p = i < month ? 1 : i === month ? (date - 1 + dayFraction) / days : 0;
    if (i === month) currentDays = days;
    items[i].style.setProperty('--days', days);
    fill.style.setProperty('--p', p.toFixed(4));
    fill.style.setProperty('--k', i);
    if (i === month) items[i].classList.add('now');
  }

  flagLabel.textContent = 'Today, ' + date + ' ' + MONTHS[month];

  /* Keep the Today marker exactly on the current day, even when the layout changes */
  function placeFlag() {
    var seg = items[month].querySelector('.seg');
    var wrapBox = wrap.getBoundingClientRect();
    var segBox = seg.getBoundingClientRect();
    var x = segBox.left - wrapBox.left + segBox.width * ((date - 1 + dayFraction) / currentDays);
    var half = flagLabel.offsetWidth / 2;
    var labelX = Math.min(Math.max(x, half), wrapBox.width - half);
    flag.style.setProperty('--x', x.toFixed(1) + 'px');
    flag.style.setProperty('--lx', labelX.toFixed(1) + 'px');
  }

  placeFlag();
  window.addEventListener('resize', placeFlag);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(placeFlag);

  /* One reveal on load: the months fill in order */
  requestAnimationFrame(function () {
    requestAnimationFrame(function () {
      list.classList.add('ready');
      wrap.classList.add('ready');
    });
  });
})();

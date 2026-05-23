// Language dropdown toggle
  const langBtn = document.getElementById('langBtn');
  const langDropdown = document.getElementById('langDropdown');

  langBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    const open = langDropdown.classList.toggle('open');
    langBtn.setAttribute('aria-expanded', open);
  });

  document.addEventListener('click', () => {
    langDropdown.classList.remove('open');
    langBtn.setAttribute('aria-expanded', false);
  });

  langDropdown.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', (e) => {
      e.preventDefault();
      langDropdown.querySelectorAll('a').forEach(x => x.classList.remove('active'));
      a.classList.add('active');
      langBtn.querySelector('.flag').textContent = a.dataset.flag;
      langBtn.querySelector('.lang-label').textContent = a.dataset.lang;
      langDropdown.classList.remove('open');
    });
  });

  // Cart count demo (click cart to increment)
  const cartCount = document.getElementById('cartCount');
  document.querySelector('.cart-btn').addEventListener('click', () => {
    cartCount.textContent = parseInt(cartCount.textContent) + 1;
  });

  // ── SLIDER ──
  const slides = document.querySelectorAll('.slide');
  const dots   = document.querySelectorAll('.dot');
  let current  = 0;
  let timer;
 
  function goTo(n) {
    slides[current].classList.remove('active');
    dots[current].classList.remove('active');
    current = (n + slides.length) % slides.length;
    slides[current].classList.add('active');
    dots[current].classList.add('active');
  }
 
  function autoPlay() {
    timer = setInterval(() => goTo(current + 1), 4000);
  }
 
  document.getElementById('prevBtn').addEventListener('click', () => { clearInterval(timer); goTo(current - 1); autoPlay(); });
  document.getElementById('nextBtn').addEventListener('click', () => { clearInterval(timer); goTo(current + 1); autoPlay(); });
  dots.forEach(d => d.addEventListener('click', () => { clearInterval(timer); goTo(+d.dataset.i); autoPlay(); }));
 
  autoPlay();

  // ══ IMAGE SLIDER JS ══
(function () {
  const track     = document.getElementById('imgTrack');
  const prevBtn   = document.querySelector('.img-arrow-left');
  const nextBtn   = document.querySelector('.img-arrow-right');
  const thumb     = document.getElementById('imgScrollbarThumb');
  const scrollWrap= document.getElementById('imgScrollbarWrap');

  if (!track) return;

  const slides      = track.querySelectorAll('.img-slide');
  const totalSlides = slides.length;
  let currentIndex  = 0;

  // Kitni images ek baar dikhen (CSS se match)
  function visibleCount() {
    const w = track.parentElement.offsetWidth;
    if (w <= 600)  return 2.5;
    if (w <= 1024) return 4;
    return 6;
  }

  function slideWidth() {
    return slides[0] ? slides[0].offsetWidth : 0;
  }

  function maxIndex() {
    return Math.max(0, totalSlides - Math.floor(visibleCount()));
  }

  function goTo(i) {
    currentIndex = Math.max(0, Math.min(i, maxIndex()));
    track.style.transform = `translateX(-${currentIndex * slideWidth()}px)`;
    updateScrollbar();
    updateArrows();
  }

  function updateArrows() {
    prevBtn.disabled = currentIndex === 0;
    nextBtn.disabled = currentIndex >= maxIndex();
  }

  function updateScrollbar() {
    const total   = maxIndex() + 1;
    const pct     = total <= 1 ? 100 : (currentIndex / maxIndex()) * 100;
    const wrapW   = scrollWrap.offsetWidth;
    const thumbW  = Math.max(40, wrapW / (totalSlides / Math.floor(visibleCount())));
    const maxLeft = wrapW - thumbW;
    thumb.style.width = thumbW + 'px';
    thumb.style.left  = (maxLeft * currentIndex / Math.max(1, maxIndex())) + 'px';
  }

  prevBtn.addEventListener('click', () => goTo(currentIndex - Math.floor(visibleCount())));
  nextBtn.addEventListener('click', () => goTo(currentIndex + Math.floor(visibleCount())));

  // Scrollbar drag
  let dragging = false, dragStartX = 0, dragStartLeft = 0;
  thumb.addEventListener('mousedown', e => {
    dragging = true;
    dragStartX    = e.clientX;
    dragStartLeft = parseFloat(thumb.style.left) || 0;
    e.preventDefault();
  });
  document.addEventListener('mousemove', e => {
    if (!dragging) return;
    const wrapW  = scrollWrap.offsetWidth;
    const thumbW = thumb.offsetWidth;
    const maxLeft= wrapW - thumbW;
    const newLeft= Math.max(0, Math.min(dragStartLeft + (e.clientX - dragStartX), maxLeft));
    const idx    = Math.round((newLeft / maxLeft) * maxIndex());
    goTo(idx);
  });
  document.addEventListener('mouseup', () => { dragging = false; });

  // Window resize
  window.addEventListener('resize', () => goTo(Math.min(currentIndex, maxIndex())));

  // Init
  goTo(0);
})();

// ══ IMAGE SLIDER JS 2 ══
(function () {
  const track2    = document.getElementById('imgTrack-2');
  const prevBtn   = document.querySelector('.img-arrow-left-2');
  const nextBtn   = document.querySelector('.img-arrow-right-2');
  const thumb2    = document.getElementById('imgScrollbarThumb-2');
  const scrollWrap2= document.getElementById('imgScrollbarWrap-2');

  if (!track2) return;

  const slides      = track2.querySelectorAll('.img-slide');
  const totalSlides = slides.length;
  let currentIndex  = 0;

  // Kitni images ek baar dikhen (CSS se match)
  function visibleCount() {
    const w = track2.parentElement.offsetWidth;
    if (w <= 600)  return 2.5;
    if (w <= 1024) return 4;
    return 6;
  }

  function slideWidth() {
    return slides[0] ? slides[0].offsetWidth : 0;
  }

  function maxIndex() {
    return Math.max(0, totalSlides - Math.floor(visibleCount()));
  }

  function goTo(i) {
    currentIndex = Math.max(0, Math.min(i, maxIndex()));
    track2.style.transform = `translateX(-${currentIndex * slideWidth()}px)`;
    updateScrollbar();
    updateArrows();
  }

  function updateArrows() {
    prevBtn.disabled = currentIndex === 0;
    nextBtn.disabled = currentIndex >= maxIndex();
  }

  function updateScrollbar() {
    const total   = maxIndex() + 1;
    const pct     = total <= 1 ? 100 : (currentIndex / maxIndex()) * 100;
    const wrapW   = scrollWrap2.offsetWidth;
    const thumbW  = Math.max(40, wrapW / (totalSlides / Math.floor(visibleCount())));
    const maxLeft = wrapW - thumbW;
    thumb2.style.width = thumbW + 'px';
    thumb2.style.left  = (maxLeft * currentIndex / Math.max(1, maxIndex())) + 'px';
  }

  prevBtn.addEventListener('click', () => goTo(currentIndex - Math.floor(visibleCount())));
  nextBtn.addEventListener('click', () => goTo(currentIndex + Math.floor(visibleCount())));

  // Scrollbar drag
  let dragging = false, dragStartX = 0, dragStartLeft = 0;
  thumb2.addEventListener('mousedown', e => {
    dragging = true;
    dragStartX    = e.clientX;
    dragStartLeft = parseFloat(thumb2.style.left) || 0;
    e.preventDefault();
  });
  document.addEventListener('mousemove', e => {
    if (!dragging) return;
    const wrapW  = scrollWrap2.offsetWidth;
    const thumbW = thumb2.offsetWidth;
    const maxLeft= wrapW - thumbW;
    const newLeft= Math.max(0, Math.min(dragStartLeft + (e.clientX - dragStartX), maxLeft));
    const idx    = Math.round((newLeft / maxLeft) * maxIndex());
    goTo(idx);
  });
  document.addEventListener('mouseup', () => { dragging = false; });

  // Window resize
  window.addEventListener('resize', () => goTo(Math.min(currentIndex, maxIndex())));

  // Init
  goTo(0);
})();

// ══ IMAGE SLIDER JS 3 ══
(function () {
  const track3    = document.getElementById('imgTrack-3');
  const prevBtn   = document.querySelector('.img-arrow-left-3');
  const nextBtn   = document.querySelector('.img-arrow-right-3');
  const thumb3    = document.getElementById('imgScrollbarThumb-3');
  const scrollWrap3= document.getElementById('imgScrollbarWrap-3');

  if (!track3) return;

  const slides      = track3.querySelectorAll('.img-slide');
  const totalSlides = slides.length;
  let currentIndex  = 0;

  // Kitni images ek baar dikhen (CSS se match)
  function visibleCount() {
    const w = track3.parentElement.offsetWidth;
    if (w <= 600)  return 2.5;
    if (w <= 1024) return 4;
    return 6;
  }

  function slideWidth() {
    return slides[0] ? slides[0].offsetWidth : 0;
  }

  function maxIndex() {
    return Math.max(0, totalSlides - Math.floor(visibleCount()));
  }

  function goTo(i) {
    currentIndex = Math.max(0, Math.min(i, maxIndex()));
    track3.style.transform = `translateX(-${currentIndex * slideWidth()}px)`;
    updateScrollbar();
    updateArrows();
  }

  function updateArrows() {
    prevBtn.disabled = currentIndex === 0;
    nextBtn.disabled = currentIndex >= maxIndex();
  }

  function updateScrollbar() {
    const total   = maxIndex() + 1;
    const pct     = total <= 1 ? 100 : (currentIndex / maxIndex()) * 100;
    const wrapW   = scrollWrap3.offsetWidth;
    const thumbW  = Math.max(40, wrapW / (totalSlides / Math.floor(visibleCount())));
    const maxLeft = wrapW - thumbW;
    thumb3.style.width = thumbW + 'px';
    thumb3.style.left  = (maxLeft * currentIndex / Math.max(1, maxIndex())) + 'px';
  }

  prevBtn.addEventListener('click', () => goTo(currentIndex - Math.floor(visibleCount())));
  nextBtn.addEventListener('click', () => goTo(currentIndex + Math.floor(visibleCount())));

  // Scrollbar drag
  let dragging = false, dragStartX = 0, dragStartLeft = 0;
  thumb3.addEventListener('mousedown', e => {
    dragging = true;
    dragStartX    = e.clientX;
    dragStartLeft = parseFloat(thumb3.style.left) || 0;
    e.preventDefault();
  });
  document.addEventListener('mousemove', e => {
    if (!dragging) return;
    const wrapW  = scrollWrap3.offsetWidth;
    const thumbW = thumb3.offsetWidth;
    const maxLeft= wrapW - thumbW;
    const newLeft= Math.max(0, Math.min(dragStartLeft + (e.clientX - dragStartX), maxLeft));
    const idx    = Math.round((newLeft / maxLeft) * maxIndex());
    goTo(idx);
  });
  document.addEventListener('mouseup', () => { dragging = false; });

  // Window resize
  window.addEventListener('resize', () => goTo(Math.min(currentIndex, maxIndex())));

  // Init
  goTo(0);
})();

// ══ IMAGE SLIDER JS 4 ══
(function () {
  const track4    = document.getElementById('imgTrack-4');
  const prevBtn   = document.querySelector('.img-arrow-left-4');
  const nextBtn   = document.querySelector('.img-arrow-right-4');
  const thumb4    = document.getElementById('imgScrollbarThumb-4');
  const scrollWrap4= document.getElementById('imgScrollbarWrap-4');

  if (!track4) return;

  const slides      = track4.querySelectorAll('.img-slide');
  const totalSlides = slides.length;
  let currentIndex  = 0;

  // Kitni images ek baar dikhen (CSS se match)
  function visibleCount() {
    const w = track4.parentElement.offsetWidth;
    if (w <= 600)  return 2.5;
    if (w <= 1024) return 4;
    return 6;
  }

  function slideWidth() {
    return slides[0] ? slides[0].offsetWidth : 0;
  }

  function maxIndex() {
    return Math.max(0, totalSlides - Math.floor(visibleCount()));
  }

  function goTo(i) {
    currentIndex = Math.max(0, Math.min(i, maxIndex()));
    track4.style.transform = `translateX(-${currentIndex * slideWidth()}px)`;
    updateScrollbar();
    updateArrows();
  }

  function updateArrows() {
    prevBtn.disabled = currentIndex === 0;
    nextBtn.disabled = currentIndex >= maxIndex();
  }

  function updateScrollbar() {
    const total   = maxIndex() + 1;
    const pct     = total <= 1 ? 100 : (currentIndex / maxIndex()) * 100;
    const wrapW   = scrollWrap4.offsetWidth;
    const thumbW  = Math.max(40, wrapW / (totalSlides / Math.floor(visibleCount())));
    const maxLeft = wrapW - thumbW;
    thumb4.style.width = thumbW + 'px';
    thumb4.style.left  = (maxLeft * currentIndex / Math.max(1, maxIndex())) + 'px';
  }

  prevBtn.addEventListener('click', () => goTo(currentIndex - Math.floor(visibleCount())));
  nextBtn.addEventListener('click', () => goTo(currentIndex + Math.floor(visibleCount())));

  // Scrollbar drag
  let dragging = false, dragStartX = 0, dragStartLeft = 0;
  thumb4.addEventListener('mousedown', e => {
    dragging = true;
    dragStartX    = e.clientX;
    dragStartLeft = parseFloat(thumb4.style.left) || 0;
    e.preventDefault();
  });
  document.addEventListener('mousemove', e => {
    if (!dragging) return;
    const wrapW  = scrollWrap4.offsetWidth;
    const thumbW = thumb4.offsetWidth;
    const maxLeft= wrapW - thumbW;
    const newLeft= Math.max(0, Math.min(dragStartLeft + (e.clientX - dragStartX), maxLeft));
    const idx    = Math.round((newLeft / maxLeft) * maxIndex());
    goTo(idx);
  });
  document.addEventListener('mouseup', () => { dragging = false; });

  // Window resize
  window.addEventListener('resize', () => goTo(Math.min(currentIndex, maxIndex())));

  // Init
  goTo(0);
})();
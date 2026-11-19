/* AIAAS TECH — static, dependency-free interactions. */
(() => {
  'use strict';
  const menu = document.querySelector('.menu-toggle');
  const navigation = document.querySelector('#navigation');
  function closeMenu() {
    menu.setAttribute('aria-expanded', 'false');
    menu.setAttribute('aria-label', 'Open navigation');
    navigation.classList.remove('is-open');
  }
  menu.addEventListener('click', () => {
    const open = menu.getAttribute('aria-expanded') !== 'true';
    menu.setAttribute('aria-expanded', String(open));
    menu.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
    navigation.classList.toggle('is-open', open);
  });
  navigation.addEventListener('click', event => {
    if (event.target.closest('a')) closeMenu();
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && menu.getAttribute('aria-expanded') === 'true') {
      closeMenu();
      menu.focus();
    }
  });
  document.addEventListener('click', event => {
    if (!event.target.closest('.site-header')) closeMenu();
  });
  const mobileQuery = window.matchMedia('(max-width: 640px)');
  mobileQuery.addEventListener('change', closeMenu);

  // Open a service when reached from a capability, footer link, or direct URL.
  function openLinkedService() {
    const target = document.getElementById(location.hash.slice(1));
    if (target instanceof HTMLDetailsElement) target.open = true;
  }
  document.querySelectorAll('a[href^="#service-"]').forEach(link => {
    link.addEventListener('click', () => {
      const target = document.getElementById(link.hash.slice(1));
      if (target) target.open = true;
    });
  });
  window.addEventListener('hashchange', openLinkedService);
  openLinkedService();
  document.querySelector('#year').textContent = new Date().getFullYear();

  const form = document.querySelector('#contact-form');
  form.addEventListener('submit', event => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    const fields = new FormData(form);
    const value = key => String(fields.get(key) || '').trim();
    const subject = `Project enquiry — ${value('company') || value('name')}`;
    const body = [
      'Hello AIAAS TECH,', '', value('message'), '',
      `Name: ${value('name')}`, `Email: ${value('email')}`,
      `Company: ${value('company') || 'Not specified'}`,
      `Area of interest: ${value('service') || 'Let’s explore'}`
    ].join('\n');
    window.location.href = `mailto:contact@aiaas-tech.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    document.querySelector('#form-note').textContent = 'Your email draft is ready to open. Please send it from your email app. If no app opens, email contact@aiaas-tech.com directly. Nothing has been submitted here.';
  });

  // A rotating, sculptural point field. Rendered locally without images or libraries.
  const canvas = document.querySelector('#intelligence-canvas');
  const context = canvas.getContext('2d');
  if (!context) return;
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let width = 0, height = 0, frame = null, visible = true, angle = 0;
  let lastTime = 0;
  const points = [];
  const TAU = Math.PI * 2;
  for (let ring = 0; ring < 78; ring++) {
    const v = ring / 77 * TAU;
    for (let segment = 0; segment < 112; segment++) {
      const u = segment / 112 * TAU;
      const wave = Math.cos(3 * u + v) * .105;
      const radius = 1.36 + .49 * Math.cos(v) + wave;
      points.push({
        x: radius * Math.cos(u),
        y: .58 * Math.sin(v) + .14 * Math.sin(3 * u),
        z: radius * Math.sin(u),
        ring, segment
      });
    }
  }
  function resize() {
    const rect = canvas.getBoundingClientRect();
    width = rect.width;
    height = rect.height;
    const ratio = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(width * ratio);
    canvas.height = Math.round(height * ratio);
    context.setTransform(ratio, 0, 0, ratio, 0, 0);
    draw();
  }
  function draw() {
    context.clearRect(0, 0, width, height);
    const scale = Math.min(width / 4.6, height / 4.8);
    const tilt = .81;
    const turn = -.37 + angle;
    const projected = points.map(point => {
      const x1 = point.x * Math.cos(turn) - point.z * Math.sin(turn);
      const z1 = point.x * Math.sin(turn) + point.z * Math.cos(turn);
      const y2 = point.y * Math.cos(tilt) - z1 * Math.sin(tilt);
      const z2 = point.y * Math.sin(tilt) + z1 * Math.cos(tilt);
      const lean = -.48;
      const x3 = x1 * Math.cos(lean) - y2 * Math.sin(lean);
      const y3 = x1 * Math.sin(lean) + y2 * Math.cos(lean);
      const perspective = 6 / (6 - z2);
      return {x: width * .51 + x3 * scale * perspective, y: height * .5 + y3 * scale * perspective, z: z2, ring: point.ring, segment: point.segment};
    }).sort((a, b) => a.z - b.z);
    for (const point of projected) {
      const depth = (point.z + 2) / 4;
      const alpha = .13 + depth * .69;
      const glint = point.segment % 7 === 0;
      context.fillStyle = `rgba(${glint ? '203,183,255' : '160,132,225'},${alpha})`;
      context.beginPath();
      context.arc(point.x, point.y, .35 + depth * .64, 0, TAU);
      context.fill();
    }
  }
  function animate(time) {
    frame = null;
    if (!visible || document.hidden || reducedMotion.matches) return;
    if (time - lastTime >= 40) {
      angle += Math.min((time - lastTime) / 1000, .08) * .075;
      lastTime = time;
      draw();
    }
    frame = requestAnimationFrame(animate);
  }
  function syncAnimation() {
    if (frame !== null) cancelAnimationFrame(frame);
    frame = null;
    lastTime = performance.now();
    if (visible && !document.hidden && !reducedMotion.matches) frame = requestAnimationFrame(animate);
    else draw();
  }
  new ResizeObserver(resize).observe(canvas);
  new IntersectionObserver(entries => {
    visible = entries[0].isIntersecting;
    syncAnimation();
  }).observe(canvas);
  reducedMotion.addEventListener('change', syncAnimation);
  document.addEventListener('visibilitychange', syncAnimation);
  resize();
})();

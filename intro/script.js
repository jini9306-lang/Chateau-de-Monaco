(() => {
  const intro = document.getElementById('siteIntro');
  if (!intro) return;

  const fill = document.getElementById('introBarFill');
  const DURATION = 1400; // ms — 실제 에셋 로드 시간에 맞춰 조정하세요

  document.documentElement.classList.add('intro-lock');

  let finished = false;
  function finish() {
    if (finished) return;
    finished = true;
    intro.classList.add('is-open');
    document.documentElement.classList.remove('intro-lock');
    document.dispatchEvent(new CustomEvent('introComplete'));
  }

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (reduceMotion) {
    fill.style.width = '100%';
    finish();
  } else {
    const start = performance.now();
    function tick(now) {
      const t = Math.min(1, (now - start) / DURATION);
      fill.style.width = (t * 100) + '%';
      if (t < 1) {
        requestAnimationFrame(tick);
      } else {
        finish();
      }
    }
    requestAnimationFrame(tick);
  }
})();
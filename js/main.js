/* =============================================
   GOSPELFIX — main.js
   인터랙션 & 애니메이션 스크립트
   ============================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* ──────────────────────────────────────────
     스크롤 페이드인 애니메이션 (IntersectionObserver)
     ────────────────────────────────────────── */
  const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        // 메트릭 바 애니메이션 트리거
        entry.target.querySelectorAll('.bar-fill').forEach(bar => {
          bar.classList.add('animated');
        });
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.fade-up').forEach(el => fadeObserver.observe(el));


  /* ──────────────────────────────────────────
     네비게이션 — 현재 섹션 하이라이트
     ────────────────────────────────────────── */
  const sections  = document.querySelectorAll('section[id]');
  const navLinks  = document.querySelectorAll('.nav-links a');
  const mobileLinks = document.querySelectorAll('.nav-mobile-menu a:not(.mobile-cta)');

  function updateActiveNav() {
    let current = '';
    sections.forEach(section => {
      if (window.scrollY >= section.offsetTop - 110) {
        current = section.id;
      }
    });

    [...navLinks, ...mobileLinks].forEach(link => {
      const href = link.getAttribute('href');
      link.style.color = href === '#' + current ? 'var(--white)' : '';
    });
  }

  window.addEventListener('scroll', updateActiveNav, { passive: true });


  /* ──────────────────────────────────────────
     스무스 스크롤 (모든 앵커 링크)
     ────────────────────────────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      const targetSelector = link.getAttribute('href');
      if (targetSelector === '#') return;
      const target = document.querySelector(targetSelector);
      if (target) {
        e.preventDefault();
        const navHeight = document.querySelector('nav').offsetHeight;
        const top = target.getBoundingClientRect().top + window.scrollY - navHeight;
        window.scrollTo({ top, behavior: 'smooth' });

        // 모바일 메뉴가 열려 있으면 닫기
        closeMobileMenu();
      }
    });
  });


  /* ──────────────────────────────────────────
     네비게이션 — 스크롤 시 배경 강화
     ────────────────────────────────────────── */
  const nav = document.querySelector('nav');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 60) {
      nav.style.background = 'rgba(7, 7, 13, 0.98)';
    } else {
      nav.style.background = 'rgba(7, 7, 13, 0.92)';
    }
  }, { passive: true });


  /* ──────────────────────────────────────────
     모바일 햄버거 메뉴 토글
     ────────────────────────────────────────── */
  const hamburger   = document.querySelector('.nav-hamburger');
  const mobileMenu  = document.querySelector('.nav-mobile-menu');

  function closeMobileMenu() {
    if (hamburger && mobileMenu) {
      hamburger.classList.remove('open');
      mobileMenu.classList.remove('open');
      document.body.style.overflow = '';
    }
  }

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      const isOpen = hamburger.classList.toggle('open');
      mobileMenu.classList.toggle('open', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });
  }

  // 바깥 클릭 시 메뉴 닫기
  document.addEventListener('click', e => {
    if (mobileMenu && mobileMenu.classList.contains('open')) {
      if (!mobileMenu.contains(e.target) && !hamburger.contains(e.target)) {
        closeMobileMenu();
      }
    }
  });


  /* ──────────────────────────────────────────
     숫자 카운트업 애니메이션 (stat-num)
     ────────────────────────────────────────── */
  function animateCountUp(el, target, suffix, duration = 1400) {
    const start = performance.now();
    const isDecimal = target % 1 !== 0;

    function update(now) {
      const elapsed  = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // ease-out 커브
      const eased    = 1 - Math.pow(1 - progress, 3);
      const current  = isDecimal
        ? (eased * target).toFixed(1)
        : Math.floor(eased * target);

      // suffix 앞의 텍스트만 교체 (내부 span 보존)
      const innerSpan = el.querySelector('span');
      if (innerSpan) {
        el.childNodes[0].textContent = current;
      } else {
        el.textContent = current + suffix;
      }

      if (progress < 1) requestAnimationFrame(update);
    }

    requestAnimationFrame(update);
  }

  const statObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const nums = entry.target.querySelectorAll('.stat-num');
        nums.forEach(numEl => {
          const raw = parseFloat(numEl.childNodes[0]?.textContent ?? numEl.textContent);
          if (!isNaN(raw)) {
            animateCountUp(numEl, raw, '', 1400);
          }
        });
        statObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  document.querySelectorAll('.stats-grid').forEach(grid => statObserver.observe(grid));


  /* ──────────────────────────────────────────
     폼 제출 처리 (토스트 알림)
     ────────────────────────────────────────── */
  const contactForm = document.querySelector('#contact-form');
  const toast       = document.querySelector('.toast');

  function showToast(message) {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3500);
  }

  if (contactForm) {
    contactForm.addEventListener('submit', e => {
      e.preventDefault();

      const name    = contactForm.querySelector('[name="name"]').value.trim();
      const contact = contactForm.querySelector('[name="contact"]').value.trim();
      const industry = contactForm.querySelector('[name="industry"]').value;

      if (!name) {
        showToast('이름을 입력해주세요.');
        return;
      }
      if (!contact) {
        showToast('연락처를 입력해주세요.');
        return;
      }
      if (!industry) {
        showToast('업종을 선택해주세요.');
        return;
      }

      // 실제 서비스 시 API 연동
      showToast('✓ 문의가 접수되었습니다. 빠른 시일 내 연락드리겠습니다!');
      contactForm.reset();
    });
  }


  /* ──────────────────────────────────────────
     포트폴리오 카드 — 마우스 틸트 효과
     ────────────────────────────────────────── */
  document.querySelectorAll('.portfolio-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect  = card.getBoundingClientRect();
      const x     = (e.clientX - rect.left) / rect.width  - 0.5;
      const y     = (e.clientY - rect.top)  / rect.height - 0.5;
      card.style.transform = `perspective(600px) rotateY(${x * 5}deg) rotateX(${-y * 5}deg) translateY(-4px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });


  /* ──────────────────────────────────────────
     서비스 카드 — 호버 글로우 효과
     ────────────────────────────────────────── */
  document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x    = e.clientX - rect.left;
      const y    = e.clientY - rect.top;
      card.style.setProperty('--glow-x', `${x}px`);
      card.style.setProperty('--glow-y', `${y}px`);
    });
  });


  /* ──────────────────────────────────────────
     현재 연도 자동 업데이트 (푸터 저작권)
     ────────────────────────────────────────── */
  const yearEl = document.querySelector('.footer-year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

});

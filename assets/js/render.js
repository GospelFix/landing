/* =============================================
   GOSPELFIX — render.js
   data/ 폴더의 JSON 파일을 읽어 각 섹션을 동적으로 렌더링합니다.
   콘텐츠 수정은 data/*.json 파일만 편집하면 됩니다.
   ============================================= */

async function loadJSON(file) {
  const res = await fetch(`assets/data/${file}`);
  if (!res.ok) throw new Error(`${file} 로드 실패: ${res.status}`);
  return res.json();
}

/* ── 티커 ──────────────────────────────────── */
function renderTicker(items) {
  const track = document.getElementById("ticker-track");
  if (!track) return;
  // 무한 스크롤을 위해 두 번 반복
  const html = [...items, ...items]
    .map(
      (item) =>
        `<span class="ticker-item"><span class="dot"></span>${item}</span>`,
    )
    .join("");
  track.innerHTML = html;
}

/* ── 히어로 통계 ────────────────────────────── */
function renderHeroStats(stats) {
  const el = document.getElementById("hero-stats");
  if (!el) return;
  el.innerHTML = stats.hero
    .map(
      (s) => `
    <div class="hero-stat-item">
      <div class="hero-stat-num">${s.num}<span>${s.suffix}</span></div>
      <div class="hero-stat-txt">${s.label}</div>
    </div>
  `,
    )
    .join("");
}

/* ── Why 섹션 — 통계 카드 ───────────────────── */
function renderStatsGrid(stats) {
  const el = document.getElementById("stats-grid");
  if (!el) return;
  el.innerHTML = stats.cards
    .map(
      (s) => `
    <div class="stat-card">
      <div class="stat-num">${s.num}<span style="${s.suffixStyle}">${s.suffix}</span></div>
      <div class="stat-label">${s.label}</div>
      <div class="stat-desc">${s.desc}</div>
    </div>
  `,
    )
    .join("");
}

/* ── Why 섹션 — 성과 바 & KPI ───────────────── */
function renderMetrics(stats) {
  const barsEl = document.getElementById("metrics-bars");
  if (barsEl) {
    barsEl.innerHTML = stats.bars
      .map(
        (b) => `
      <div class="bar-item">
        <div class="bar-label">
          <span>${b.label}</span><span>${b.value}%</span>
        </div>
        <div class="bar-track">
          <div class="bar-fill" style="width:${b.value}%"></div>
        </div>
      </div>
    `,
      )
      .join("");
  }

  const kpiEl = document.getElementById("kpi-grid");
  if (kpiEl) {
    kpiEl.innerHTML = stats.kpi
      .map(
        (k) => `
      <div class="kpi-item">
        <div class="kpi-val">${k.val}<span${k.suffixStyle ? ` style="${k.suffixStyle}"` : ""}>${k.suffix}</span></div>
        <div class="kpi-txt">${k.txt}</div>
      </div>
    `,
      )
      .join("");
  }
}

/* ── 서비스 ─────────────────────────────────── */
function renderServices(services) {
  const el = document.getElementById("services-grid");
  if (!el) return;
  el.innerHTML = services
    .map(
      (s) => `
    <div class="service-card">
      <div class="service-icon">${s.icon}</div>
      <div class="service-name">${s.name}</div>
      <div class="service-desc">${s.desc}</div>
      <div class="service-tags">
        ${s.tags.map((tag) => `<span class="service-tag">${tag}</span>`).join("")}
      </div>
    </div>
  `,
    )
    .join("");
}

/* ── 포트폴리오 ─────────────────────────────── */
function renderPortfolio(portfolio) {
  const el = document.getElementById("portfolio-grid");
  if (!el) return;
  el.innerHTML = portfolio
    .map(
      (p) => `
    <div class="portfolio-card">
<div class="portfolio-img-wrap">
        ${p.img
          ? `<img class="portfolio-img" src="${p.img}" alt="${p.name}" loading="lazy">`
          : `<div class="portfolio-img-placeholder">${p.emoji}</div>`
        }
      </div>
      <div class="portfolio-info">
        <div class="portfolio-tag">${p.tag}</div>
        <div class="portfolio-name">${p.name}</div>
        <div class="portfolio-desc">${p.desc}</div>
        <div class="portfolio-meta">
          ${p.type ? `<span class="portfolio-type">${p.type}</span>` : ""}
          ${p.company ? `<span class="portfolio-company">${p.company}</span>` : ""}
        </div>
        ${p.link && p.link !== "#" ? `<a href="${p.link}" target="_blank" rel="noopener noreferrer" class="portfolio-link">사이트 보기 →</a>` : ""}
      </div>
    </div>
  `,
    )
    .join("");
}

/* ── 제작 과정 ──────────────────────────────── */
function renderProcess(steps) {
  const el = document.getElementById("process-list");
  if (!el) return;
  el.innerHTML = steps
    .map(
      (s, i) => `
    <div class="process-item">
      <div class="process-num">${String(i + 1).padStart(2, "0")}</div>
      <div class="process-body">
        <div class="process-duration">${s.step}</div>
        <div class="process-title">${s.title}</div>
        <div class="process-desc">${s.desc}</div>
      </div>
    </div>
  `,
    )
    .join("");
}

/* ── 가격 ───────────────────────────────────── */
function renderPricing(plans) {
  const el = document.getElementById("pricing-grid");
  if (!el) return;
  el.innerHTML = plans
    .map((p) => {
      const strikeHtml = p.originalPrice
        ? `<span class="pricing-original">${p.originalPrice}만원</span>`
        : "";
      const priceHtml = p.priceCustom
        ? `<div class="pricing-price" style="font-size:clamp(28px,3vw,40px)">${p.price}</div>`
        : `<div class="pricing-price">${strikeHtml}${p.price}<span style="font-size:0.4em;color:${p.featured ? "rgba(255,255,255,0.7)" : "var(--gray2)"}">  ${p.priceUnit}</span></div>`;

      const featuresHtml = p.features
        .map(
          (f) => `
      <li${f.included ? "" : ' class="dim"'}><span class="check">${f.included ? "✓" : "–"}</span>${f.text}</li>
    `,
        )
        .join("");

      return `
      <div class="pricing-card${p.featured ? " featured" : ""}">
        ${p.badge ? `<div class="pricing-badge">${p.badge}</div>` : ""}
        <div class="pricing-tier">${p.tier}</div>
        ${priceHtml}
        <div class="pricing-unit">${p.desc}</div>
        <div class="pricing-divider"></div>
        <ul class="pricing-features">${featuresHtml}</ul>
        <a href="#contact" class="${p.cta.class}">${p.cta.label}</a>
      </div>
    `;
    })
    .join("");
}

/* ── 고객 후기 ──────────────────────────────── */
function renderReviews(reviews) {
  const el = document.getElementById("reviews-grid");
  if (!el) return;
  el.innerHTML = reviews
    .map(
      (r) => `
    <div class="review-card">
      <div class="review-tag">${r.tag}</div>
      <div class="review-quote">"${r.quote}"</div>
      <div class="review-metric">${r.metric}</div>
      <div class="review-author">
        <div class="review-name">${r.name}</div>
        <div class="review-role">${r.role}</div>
      </div>
    </div>
  `,
    )
    .join("");
}

/* ── 포트폴리오 텍스트 목록 ─────────────────── */
function renderPortfolioMore(items) {
  const el = document.getElementById("portfolio-more");
  if (!el) return;

  // 연도별 그룹핑
  const grouped = items.reduce((acc, item) => {
    (acc[item.year] = acc[item.year] || []).push(item);
    return acc;
  }, {});

  const years = Object.keys(grouped).sort((a, b) => {
    const aStart = parseInt(a), bStart = parseInt(b);
    if (aStart !== bStart) return bStart - aStart;
    const aEnd = parseInt(a.split("-")[1] || a), bEnd = parseInt(b.split("-")[1] || b);
    return bEnd - aEnd;
  });

  el.innerHTML = `
    <div class="pmore-heading">more.more.more.</div>
    <div class="pmore-line"></div>
    <div class="pmore-table">
      ${years.map(year => `
        <div class="pmore-group">
          <div class="pmore-year">${year}</div>
          <div class="pmore-items">
            ${grouped[year].map(item => `
              <div class="pmore-row">
                <span class="pmore-name">
                  ${item.name}
                  ${item.desc ? `<span class="pmore-desc">${item.desc}</span>` : ""}
                </span>
                ${item.company ? `<span class="pmore-company">${item.company}</span>` : ""}
                <span class="pmore-type">${item.type}</span>
              </div>
            `).join("")}
          </div>
        </div>
      `).join("")}
    </div>
  `;
}

/* ── 전체 실행 ──────────────────────────────── */
document.addEventListener("DOMContentLoaded", async () => {
  try {
    const [ticker, stats, services, portfolio, portfolioMore, reviews, pricing] =
      await Promise.all([
        loadJSON("ticker.json"),
        loadJSON("stats.json"),
        loadJSON("services.json"),
        loadJSON("portfolio.json"),
        loadJSON("portfolio-more.json"),
        loadJSON("reviews.json"),
        loadJSON("pricing.json"),
      ]);

    renderTicker(ticker);
    renderHeroStats(stats);
    renderStatsGrid(stats);
    renderMetrics(stats);
    renderServices(services);
    renderPortfolio(portfolio);
    renderPortfolioMore(portfolioMore);
    renderReviews(reviews);
    renderPricing(pricing);

    // 렌더링 완료 후 main.js 초기화 트리거
    document.dispatchEvent(new CustomEvent("siteDataReady"));
  } catch (err) {
    console.error("[GospelFix] 데이터 로드 실패:", err);
  }
});

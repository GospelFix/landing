# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

---

## 개발 환경

빌드 도구 없는 순수 정적 사이트입니다. VS Code Live Server로 로컬 실행합니다.

- **로컬 실행**: VS Code Live Server 확장 사용 (포트 5502)
- **배포**: `main` 브랜치 push 시 GitHub Pages 자동 배포 (`.github/workflows/static.yml`)
- `file://` 프로토콜로 직접 열면 `fetch()` CORS 오류 발생 — 반드시 로컬 서버 필요

---

## 아키텍처

### 데이터 흐름

콘텐츠 수정은 `assets/data/*.json` 파일만 편집하면 됩니다. HTML을 직접 건드리지 않습니다.

```
assets/data/*.json  →  assets/js/render.js (fetch + DOM 렌더링)  →  siteDataReady 이벤트
                                                                              ↓
                                                          assets/js/main.js (애니메이션 & 인터랙션 초기화)
```

---

### 스크립트 로딩 순서 (중요)

`index.html` 하단에서 `render.js`가 `main.js`보다 먼저 로드됩니다.

- `render.js`: `DOMContentLoaded` → 모든 JSON 병렬 fetch(`Promise.all`) → 렌더링 → `siteDataReady` 커스텀 이벤트 발생
- `main.js`: `siteDataReady` 이벤트 수신 후 초기화 (동적으로 생성된 카드 등에 이벤트 바인딩 가능)

---

### 데이터 파일 → 담당 섹션

| 파일                              | 섹션                                                                          |
| --------------------------------- | ----------------------------------------------------------------------------- |
| `assets/data/ticker.json`         | 티커 (문자열 배열, render.js에서 2배 복제해 무한 스크롤 구현)                 |
| `assets/data/stats.json`          | Why 섹션 — `hero`, `cards`, `bars`, `kpi` 4개 키                              |
| `assets/data/services.json`       | 서비스 카드 (6개)                                                             |
| `assets/data/reviews.json`        | 고객 후기 (6개) — `quote`, `name`, `role`, `metric`, `tag` 키                 |
| `assets/data/portfolio.json`      | 포트폴리오 카드 (이미지 포함)                                                 |
| `assets/data/portfolio-more.json` | 포트폴리오 텍스트 목록 (연도별 그룹핑) — `year`, `name`, `company`, `type` 키 |
| `assets/data/process.json`        | 제작 과정 단계 (4단계)                                                        |
| `assets/data/pricing.json`        | 가격 플랜 (`featured`, `badge`, `priceCustom` 플래그 포함)                    |

---

### CSS 디자인 토큰 (style.css `:root`)

포인트 컬러: `--orange: #FF5500`, `--orange2: #FF6B1A`
배경: `--bg: #F7F5F0` (크림)
폰트: 한글 `Pretendard Variable`, 강조 이탤릭 `Playfair Display`, 영어 보조 `DM Sans`
반경: `--radius-sm: 8px`, `--radius-md: 16px`, `--radius-lg: 24px`

커스텀 개발 및 검증 스킬은 `.claude/skills/`에 정의되어 있습니다.

---

## 에이전트 & 스킬

### 에이전트

**단순 수정이라도 해당 에이전트를 먼저 호출한 뒤 작업한다.** 에이전트 파일 위치: `@.claude/agents/<이름>.md`

| 에이전트                 | 사용 시점                                 |
| ------------------------ | ----------------------------------------- |
| `html-template-expert`   | HTML 구조 생성/리뷰, 접근성 개선          |
| `css-responsive-expert`  | CSS 작성/리뷰, 디자인 토큰 시스템         |
| `js-component-architect` | JS 기능 구현, API 연동                    |
| `static-site-reviewer`   | 코드 작성 후 품질 게이트 검토 (proactive) |
| `senior-planner`         | 전체 구조 분석, 기능 추가 계획 수립       |
| `product-planner`        | 제품 기획, 사용자 플로우 및 로드맵 수립   |
| `commit-push-agent`      | Git 커밋 메시지 자동 생성 & push          |

---

### 스킬 (`@.claude/skills/` 명령어)

| 명령어           | 기능                                              |
| ---------------- | ------------------------------------------------- |
| `/commit`        | 변경사항 분석 후 한국어 커밋 메시지 자동 생성     |
| `/review`        | 현재 파일 전체 코드 리뷰 (품질 게이트 판정)       |
| `/deploy-check`  | 배포 전 최종 점검 — HTML/CSS/JS/접근성 체크리스트 |
| `/add-portfolio` | 포트폴리오 항목 추가                              |

---

### 애니메이션 구조 (main.js)

- `.fade-up` 클래스 요소: IntersectionObserver로 `.visible` 클래스 추가
- `.bar-fill`: `.fade-up` 부모가 교차 시 `.animated` 클래스 추가 → CSS transition으로 바 채움
- `.stats-grid` 내 `.stat-num`: 뷰포트 진입 시 카운트업 애니메이션 (ease-out 곡선)
- `.portfolio-card`: mousemove 틸트 효과 (`perspective(600px) rotateY/X`)
- `.service-card`: mousemove 글로우 효과 (`--glow-x`, `--glow-y` CSS 변수)
- `.reviews-swiper`: 모바일에서 Swiper.js (CDN v11) 자동재생 슬라이더 (3.5초 간격)
- nav: 스크롤 10px 이상 시 `backdrop-filter: blur(20px)` 적용

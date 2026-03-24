---
name: GospelFix 코드 패턴 및 컨벤션
description: 이 프로젝트에서 반복적으로 발견된 코드 스타일, 잠재적 이슈 패턴
type: project
---

## CSS 패턴
- CSS 변수 잘 정의됨 (`:root`에 색상, radius, 폰트 토큰)
- 포인트 컬러: `--orange: #FF5500`, `--orange2: #FF6B1A`
- 폰트: 한글 `Pretendard Variable`, 영문 제목 `DM Sans` (CLAUDE.md는 `Bebas Neue`라고 표기하나 실제로는 DM Sans)
- `Bebas Neue`, `Playfair Display`는 hero 타이틀 accent에만 사용
- 인라인 스타일이 render.js의 HTML 템플릿에서 다수 사용됨 (suffixStyle 등) — 반복 이슈
- `::before`/`::after`를 `display: none`으로 재정의하는 패턴 다수 존재 (이전 스타일 잔재)
- `.portfolio-notice`에서 CSS 변수 대신 하드코딩 색상 사용 (`#fff3e0`, `#ffcc80`, `#e65100`)
- 데스크톱 퍼스트 반응형 (미디어 쿼리 max-width 기준)

## JavaScript 패턴
- render.js: 모든 섹션을 innerHTML로 렌더링 — XSS 주의 필요
- main.js: siteDataReady 이벤트 기반으로 초기화
- 카운트업 애니메이션, IntersectionObserver, 틸트 효과 등 구현
- contactForm 폼은 HTML에 존재하지 않음 (버튼 방식으로 대체됨)

## JSON 패턴
- pricing.json: 들여쓰기 불일치 (13번째 줄 미들여쓰기)
- stats.json: suffixStyle을 인라인 스타일 문자열로 전달 — CSS 클래스로 대체 권장
- portfolio.json: link 값이 모두 "#" — 미완성 콘텐츠

**Why:** 초기 개발 단계로 일부 콘텐츠/스타일이 완성되지 않은 상태.

**How to apply:** 리뷰 시 위 패턴들을 반복 이슈로 분류하고, 우선순위 높은 것부터 수정 권고.

---
name: review
description: 최근 변경된 HTML, CSS, JS, JSON 파일을 static-site-reviewer 에이전트로 코드 품질 검토합니다
argument-hint: "[파일명 또는 섹션명 - 생략 시 전체 검토]"
disable-model-invocation: true
context: fork
agent: static-site-reviewer
---

GospelFix 랜딩 페이지의 코드 품질 게이트 리뷰를 수행합니다.

## 리뷰 대상

$ARGUMENTS가 있으면 해당 파일/섹션만 검토합니다.
없으면 아래 파일 전체를 검토합니다:

- `index.html` — 마크업 구조 및 접근성
- `assets/css/style.css` — CSS 품질 및 반응형
- `assets/css/fonts.css` — 폰트 @font-face 정의
- `assets/js/render.js` — 데이터 렌더링 로직
- `assets/js/main.js` — 인터랙션 및 애니메이션
- `assets/data/*.json` — JSON 데이터 유효성 및 구조

## 프로젝트 컨텍스트

- 빌드 도구 없는 순수 정적 사이트
- 에셋 구조: `assets/{css,js,data,fonts,imgs}/` 하위에 모두 위치
- `assets/data/*.json` → `assets/js/render.js` → `siteDataReady` 이벤트 → `assets/js/main.js` 순서로 동작
- 포인트 컬러: `--orange: #FF5500`
- Live Server(포트 5502)로 로컬 실행, GitHub Pages로 배포

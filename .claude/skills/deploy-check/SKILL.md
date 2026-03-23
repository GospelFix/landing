---
name: deploy-check
description: GitHub Pages 배포 전 체크리스트를 실행합니다. 배포하기 전에 반드시 실행하세요.
disable-model-invocation: true
allowed-tools: Read, Grep, Glob, Bash
---

GospelFix 랜딩 페이지를 GitHub Pages에 배포하기 전 아래 항목을 순서대로 점검합니다.

## 체크리스트

### 1. 데이터 파일 유효성
- `data/*.json` 파일 6개가 모두 존재하는지 확인 (ticker, stats, services, portfolio, process, pricing)
- 각 JSON 파일이 올바른 문법인지 확인 (trailing comma, 따옴표 누락 등)
- `pricing.json`의 featured 플랜이 1개인지 확인

### 2. 스크립트 로딩 순서
- `index.html` 하단에 `render.js`가 `main.js`보다 **먼저** 로드되는지 확인
- `main.js`가 `siteDataReady` 이벤트를 리스닝하는지 확인 (DOMContentLoaded 아님)

### 3. 외부 링크
- 카카오톡 오픈채팅 링크가 존재하는지 확인
- 인스타그램 링크가 존재하는지 확인
- 포트폴리오 카드 링크 중 `#`(미완성)이 있으면 경고

### 4. SEO / 메타
- `<title>` 태그 확인
- `<meta name="description">` 확인
- `<meta property="og:title">` 확인

### 5. Git 상태
- 커밋되지 않은 변경사항이 있으면 경고
- 현재 브랜치가 `main`인지 확인

## 결과 형식

```
## 🚀 배포 전 체크리스트 결과

✅ / ❌ 각 항목 결과
...

### 최종 판정
- ✅ 배포 가능
- ❌ 배포 불가 (수정 필요 항목 목록)
```

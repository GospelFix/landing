---
name: add-portfolio
description: 포트폴리오 카드를 data/portfolio.json에 추가합니다
argument-hint: "[프로젝트명]"
disable-model-invocation: true
allowed-tools: Read, Edit
---

`data/portfolio.json`에 새 포트폴리오 항목을 추가합니다.

## 진행 순서

1. `data/portfolio.json` 파일을 읽어 현재 항목 수와 마지막 번호 확인
2. 아래 정보를 사용자에게 물어봅니다:
   - **프로젝트명**: 영문 대문자 (예: `BREW STUDIO`)
   - **카테고리 태그**: 업종 · 유형 (예: `카페 · 랜딩페이지`)
   - **이모지**: 프로젝트를 대표하는 이모지
   - **설명**: 한 줄 프로젝트 설명 (주요 특징 2~3가지)
   - **링크**: 실제 URL 또는 `#` (미완성)

   인수로 `$ARGUMENTS`가 주어졌으면 프로젝트명으로 사용합니다.

3. 수집한 정보로 항목을 만들어 배열 마지막에 추가합니다.

## 항목 형식

```json
{
  "num": "07",
  "emoji": "🎯",
  "tag": "업종 · 랜딩페이지",
  "name": "PROJECT NAME",
  "desc": "한 줄 설명. 주요 특징 A, 특징 B, 특징 C",
  "link": "#"
}
```

## 규칙

- `num`은 기존 마지막 번호 + 1, 항상 2자리 (`"07"`, `"08"`)
- `name`은 영문 대문자
- `desc`는 HTML 없이 순수 텍스트, 마침표로 끝내지 않음
- 추가 후 `data/portfolio.json` 전체 내용을 보여주며 확인 요청

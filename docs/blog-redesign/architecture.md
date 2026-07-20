# ADR-001: 한 저장소 Astro 기술 블로그

> 상태: 제안됨 · 작성일: 2026-07-21 · 적용 대상: `JosuaLaurant/josualaurant.github.io`

## 결정

`josualaurant.github.io` 하나만 블로그의 source of truth로 사용한다.

- 정적 사이트 생성기: **Astro**
- 언어: **TypeScript** (`strict`)
- 글: **Markdown** 기본, 필요한 글에서만 **MDX**
- 스타일: **Astro 컴포넌트 + native CSS + CSS custom properties**
- 콘텐츠 모델: Astro **Content Collections**와 frontmatter schema
- 배포: **GitHub Actions → GitHub Pages artifact**
- 패키지 관리자: **npm**과 커밋된 `package-lock.json`

이 선택은 글을 자주 쓰는 개인 기술 블로그에 필요한 정적 성능, Markdown 작성성, 코드·다이어그램
표현력을 얻되 React runtime, CMS, API 서버를 처음부터 운영하지 않기 위한 것이다.

## 현재 상태와 전환 원칙

현재 `main`은 Hugo가 만든 `index.html`, `posts/`, CSS·JS asset을 직접 배포한다. 과거 `hugoblog`는
별도 Hugo source 저장소였다. 앞으로 두 저장소를 연결해 유지하지 않는다.

새 Astro 사이트는 우선 `blog-redesign`의 `site/`에서 완성·검증한다. 전환 시에만 해당 변경을 `main`에
반영하고, GitHub Pages의 publishing source를 **GitHub Actions**로 바꾼다. 그래서 source와 배포 artifact를
한 저장소에서 관리하면서도, 현재 사이트를 사전 검토 없이 깨지 않게 한다. 기존 root 정적 파일의 제거는
새 사이트가 배포·확인된 다음 별도 변경으로 결정한다.

## 소스 구조

```text
.
├── site/
│   ├── src/
│   │   ├── components/         # Header, Footer, ArticleCard, TableOfContents
│   │   ├── content/
│   │   │   └── blog/           # 공개 글: Markdown 또는 MDX
│   │   └── content.config.ts   # frontmatter schema
│   │   ├── layouts/            # BaseLayout, PostLayout
│   │   ├── pages/              # /, /posts/[...slug], /categories/[category], /tags/[tag], /about, /404
│   │   ├── styles/             # global.css, prose.css
│   │   └── assets/             # 직접 만든 다이어그램·커버 이미지
│   ├── public/                 # favicon, 검증된 정적 파일만
│   ├── astro.config.mjs
│   ├── package.json
│   └── package-lock.json
├── docs/blog-redesign/         # 이 설계·연재 기획
└── .github/workflows/deploy.yml
```

게시물은 `site/src/content/blog/<slug>.md`에 둔다. 기본 frontmatter는 다음처럼 제한한다.

```yaml
title: OCR 서버를 매 페이지 재시작하지 말아야 하는 이유
description: runtime lease로 동일 결과를 유지하며 처리 시간을 줄인 기록
pubDate: 2026-07-21
updatedDate: 2026-07-21 # 선택
draft: true
category: development
writing: ai-authored
summary: ai-generated
tags: [performance, engineering, architecture]
series: building-the-blog # 선택
```

`draft: true`인 글은 production build의 목록·RSS·sitemap에서 제외한다. 그러나 public Git history에서는
계속 보인다. 비공개 초안은 이 저장소에 넣지 않으며, 자세한 경계와 발행 흐름은
[publishing-flow.md](publishing-flow.md)를 따른다. 발행일은 글이 실제로 공개된 날만 적고, 실험일·작업일은
본문에서 구분한다.

## 화면 범위 (v1)

| 경로 | 목적 |
| --- | --- |
| `/` | 최신 글, 태그, 짧은 소개 |
| `/posts/<slug>/` | 본문, 목차, 태그, 이전·다음 글 |
| `/categories/<category>/` | 주제별 글 목록 |
| `/tags/<tag>/` | 태그별 글 목록 |
| `/about/` | 블로그의 범위와 공개 원칙 |
| `/rss.xml` | 구독 피드 |
| `/404/` | 정적 404 |

초기 화면은 읽기·탐색에만 집중한다. 검색, 다크 모드 토글, 댓글, 좋아요, 계정, 데이터베이스는
실제 글이 쌓여 필요가 확인될 때 결정한다.

## 주제와 작성 방식

각 글은 `category` 하나로 독자에게 보이는 큰 주제를 정한다. 현재 값은 `blog-building`,
`development`, `direct`이며 화면에는 각각 `블로그 만들기`, `개발 기록`, `직접 쓴 글`로 표시한다.
`tags`는 여러 글을 가로지르는 세부 탐색에만 쓴다. `writing`은 `ai-authored` 또는 `direct`로 원고의
작성 방식을 보관하는 메타데이터다. 새 글의 작성과 포스팅은 AI가 진행하며, 직접 쓴 글은 별도 source나
별도 블로그로 떼어 내지 않는다. `summary`는 카드·글 머리말의 description 출처다. `ai-generated`이면
화면에 `✦ AI 요약`을 표시하고, 직접 쓴 설명은 `direct`로 둔다.

기존 Hugo의 `/posts/1/`, `/posts/2/`는 Astro 콘텐츠의 같은 ID로 정적 생성한다. 따라서 옛 링크를
redirect하지 않고 유지하면서 `직접 쓴 글`의 첫 기록으로 보여 준다.

## 배포 설계

`main` push와 수동 실행에서 다음 workflow를 사용한다. root workflow는 `site/`를 working directory로
사용한다. pull request는 check·build만 실행하고, `main` push만 Pages artifact를 배포한다.

```text
checkout → npm ci → astro check → astro build
        → upload-pages-artifact → deploy-pages
```

workflow는 최소 `contents: read`, `pages: write`, `id-token: write` 권한만 사용한다. `astro.config.mjs`의
`site`는 `https://josualaurant.github.io`로 두며, 사용자 Pages 저장소이므로 `base`는 설정하지 않는다.
로컬과 CI가 같은 lockfile을 사용해 빌드 결과를 맞춘다.

workflow의 GitHub 공식 Actions는 major 태그가 아니라 검토한 full commit SHA로 고정한다. checkout은
이후 단계에 Git credential을 남기지 않는다. 이 방식은 새 major·보안 업데이트를 자동으로 따라가지는
않으므로, 의존성 갱신과 함께 명시적으로 검토한다.

GitHub Pages는 custom workflow의 build artifact 배포를 지원하며, Astro는 user `github.io` URL과 Actions
배포 구성을 공식 문서로 제공한다. 이 설계는 생성 파일을 `main`에 다시 commit하는 배포보다 원본과
산출물의 책임을 더 명확히 한다.

## 검증 기준

첫 배포 전에는 다음을 통과한다.

1. `npm run check`가 콘텐츠 frontmatter와 TypeScript 오류 없이 끝난다.
2. `npm run build`가 정적 산출물을 만든다.
3. 로컬 preview에서 홈, 글, 태그, 404, RSS 링크가 열린다.
4. 390px와 1440px 뷰포트에서 가로 overflow·콘솔 오류가 없다.
5. Lighthouse 점수만 목표로 삼지 않고, 코드 블록·긴 한글 제목·이미지 없는 글을 실제로 읽어 본다.
6. Actions 배포 후 `https://josualaurant.github.io/`의 페이지·asset·404가 정상 응답한다.

## 공개 경계

성능 수치는 측정 조건, 표본 수, 기존 대비 값, 동일성 검사를 함께 기록한다. 아직 provisional인
품질 판단을 최종 benchmark 결과처럼 쓰지 않는다. 권한 없는 원본 자료, 비공개 사용자 데이터, prompt,
내부 IP·호스트명·파일 경로·토큰·모델 접근 정보는 공개하지 않는다. 필요한 시각 자료는 합성 fixture,
재현한 도식, 허가된 작은 crop으로 대체한다.

## v1에서 제외한 선택지

| 선택지 | 지금 제외하는 이유 | 재검토 조건 |
| --- | --- | --- |
| React/Vue 섬 | 상호작용 요구가 없음 | 검색·테마 등 실제 client 상태가 필요할 때 |
| Tailwind/shadcn | 작은 사이트에 별도 design system 의존이 불필요 | 재사용 패턴이 충분히 늘어날 때 |
| Headless CMS | 글을 Git과 PR로 검토하는 흐름이 더 단순 | 비개발 편집자가 반복 작성할 때 |
| 댓글 | 스팸·개인정보·moderation 부담 | 독자 대화 수요가 확인될 때 |
| 분석 도구 | 독자 추적 없이 시작 가능 | 측정할 질문과 privacy 정책을 먼저 정했을 때 |
| 정적 검색 | 글 수가 적을 때 탐색 비용이 낮음 | 태그·목록으로 찾기 어려워질 때 |

## 참고한 공식 문서

- [Astro: Deploy to GitHub Pages](https://docs.astro.build/en/guides/deploy/github/)
- [Astro: Markdown and content collections](https://docs.astro.build/en/guides/markdown-content/)
- [GitHub Pages: custom workflows](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages)

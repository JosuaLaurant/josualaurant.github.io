# Josua Laurant 기술 기록

Astro와 TypeScript로 만든 공개 기술 블로그입니다.

## 글과 업데이트

- 일반 기술 글: `src/content/blog/<slug>.md`
- 블로그 변경 기록: `src/content/updates/v<major>.<minor>.<patch>.md`

일반 글은 홈·태그·RSS에 표시합니다. 업데이트 entry는 `/updates/`에만 표시합니다. 새 공개 변경은
`v0.1.0`을 기준으로 patch 또는 minor를 올리고, 날짜·짧은 제목·변경 항목을 함께 남깁니다.

`draft: true`는 화면에서만 숨길 뿐 public Git의 비공개 기능이 아닙니다. 비공개 초안은 이 저장소에 두지
않습니다.

## 확인과 배포

```sh
npm run check
npm run build
```

`main`에 병합되면 GitHub Actions가 `dist/`를 GitHub Pages에 배포합니다. 화면 변경은 390px·1440px·1920px에서
가로 overflow와 실제 탐색을 확인합니다. 세부 설계와 공개 경계는 상위 `docs/blog-redesign/` 및 `AGENTS.md`를
따릅니다.

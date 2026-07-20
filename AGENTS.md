# Josua Laurant 기술 블로그 작업 안내

이 저장소는 공개 기술 블로그의 단일 source of truth다. Atelier의 source·작업 로그·`DESIGN.md`와
독립적으로 유지하며, private 정보는 이 저장소에 옮기지 않는다.

## 작업 위치와 구조

- Astro source와 공개 Markdown 원고는 `site/`에 둔다.
- 실제 글은 `site/src/content/blog/`에 둔다.
- `site/DESIGN.md`는 화면 구현이 따라야 할 디자인 계약이다. `docs/blog-redesign/design.md`는 그 선택의
  배경과 변경 기록만 보관한다.
- 블로그 설계·연재 기록은 `docs/blog-redesign/`에 둔다.
- 기존 root 정적 Hugo 결과물은 Astro 전환이 배포·확인되기 전까지 수정하거나 삭제하지 않는다.

## 확인 절차

`site/` 변경 뒤에는 다음을 실행한다.

```bash
cd site && npm run check
cd site && npm run build
```

화면·CSS·콘텐츠 경로 변경은 홈, 글, 태그, 404, RSS를 브라우저에서 확인하고 390px와 1440px에서 가로
overflow가 없는지 점검한다. Astro 라우트·콘텐츠·스타일 변경 시 `site/AGENTS.md`가 가리키는 공식
문서를 먼저 읽는다.

## 공개 경계와 배포

- 수치는 측정 조건, 표본 수, 비교 기준, 동일성 검사가 있는 확인값만 쓴다.
- 권한 없는 원본 자료, 비공개 사용자 데이터, prompt, 내부 호스트명·경로·token·접근 정보는 금지한다.
- 원격 commit, push, GitHub Pages 설정 변경, 기존 root 산출물 삭제는 명시적인 사용자 승인 없이는 하지
  않는다.
- 블로그 발행과 관련된 Atelier 측 인계 원칙은 `atelier/docs/블로그-발행.md`에만 요약되어 있으며,
  블로그 원고의 source는 이 저장소에만 둔다.

# 공개 원고와 비공개 초안의 경계

> 상태: 적용 전 확인 중 · 작성일: 2026-07-21

## 핵심 규칙

`JosuaLaurant/josualaurant.github.io`는 **public repository**다. 따라서 이 저장소에 commit한 Markdown,
이미지, Git history는 `draft: true` 여부와 무관하게 누구나 볼 수 있다.

`draft: true`는 Astro가 글을 목록·RSS·sitemap·정적 페이지에서 제외하는 **공개 전 미리보기 상태**일
뿐이다. 비공개 기능이나 접근 제어가 아니다.

```text
private draft 저장소 또는 Atelier의 private note
  └─ 공개 가능한 내용만 새 public 원고로 정리
       └─ josualaurant.github.io/site/src/content/blog/<slug>.md
            └─ Astro build: site/dist
                 └─ GitHub Actions artifact → https://josualaurant.github.io/
```

## 글 상태별 위치

| 상태 | 저장 위치 | GitHub 공개 여부 | `draft` 사용 |
| --- | --- | --- | --- |
| 비공개 메모·원본 초안 | 별도 private Git repository 권장. 프로젝트 관련 짧은 메모는 Atelier private docs에 둔다. | 공개하지 않음 | 사용하지 않음 |
| 공개 전 원고 | `site/src/content/blog/` | Git history에서 공개됨 | 필요하면 `true` |
| 발행 원고 | `site/src/content/blog/` | 공개됨 | `false` 또는 생략 |
| 배포 결과 | GitHub Pages artifact의 `site/dist` | 사이트에서 공개됨 | 해당 없음 |

## 작업 흐름

1. 민감하거나 미확정인 생각·측정·원본 자료는 private draft 위치에만 쓴다.
2. 공개할 때는 내부 경로, token, 사용자 데이터, 원본 자료, 미확정 수치가 없는 새 원고를 만든다.
3. 이 **공개본**만 `site/src/content/blog/`로 옮긴다. `draft: true`는 링크를 아직 노출하지 않을 때만 쓴다.
4. `main`의 Actions가 `site/dist`를 만들고 GitHub Pages에 배포한다.

비공개 원고를 public repository로 옮겼다가 나중에 삭제하는 방식은 사용하지 않는다. Git history와 fork,
cache에 남을 수 있기 때문이다. public repository 안의 gitignored `drafts/` 폴더도 버전 관리·백업이 되지
않고 실수로 추가할 위험이 있어 사용하지 않는다.

## 현재 전환의 의미

이번 Astro 전환에서 기존 `/posts/1/`, `/posts/2/`와 새 공개 원고는 public 원고로만 다룬다. 별도 private
draft repository는 아직 만들지 않았다. private 글이 생기면 먼저 별도 private repository를 만들고, 공개할
내용만 이 저장소에 새 파일로 작성한다.

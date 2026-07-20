# 개인 기술 블로그 재설계 기록

## 상태

이 문서는 `JosuaLaurant/josualaurant.github.io`를 **하나의 소스·배포 저장소**로 다시 만드는
초기 설계 기록이다. 현재 공개된 `main`은 과거 Hugo가 생성한 정적 파일을 GitHub Pages에서 직접
제공한다. 이 설계는 그 결과물을 수정하는 방식이 아니라, 같은 저장소에 Astro 소스를 두고 GitHub
Actions가 빌드·배포하도록 바꾸는 계획이다.

현재 작업은 로컬 `blog-redesign` 브랜치에서만 진행한다. 새 Astro source는 저장소의 `site/`에 두고,
원격 `main`, Pages 설정, 공개 사이트에는 아직 변경을 적용하지 않는다. 초기 구조는 `npm run check`,
`npm run build`, 데스크톱·모바일 브라우저 확인까지 통과했다. 기존 root 정적 파일은 전환이 검증될 때까지
보존한다. 새 Astro 글은 큰 주제(`블로그 만들기`, `개발 기록`, `직접 쓴 글`)와 보조 태그로 탐색하며,
기존 글도 원래 주소를 유지해 같은 구조에 포함한다.

## 목표

- 개인 개발에서 작업하며 남긴 기록을 모으는 한국어 기술 블로그를 운영한다.
- 글은 Git에서 리뷰 가능한 Markdown으로 작성한다.
- 방문자 요청 때마다 서버가 계산하지 않는 정적 사이트로 유지한다.
- 새 글의 commit이 검증을 거쳐 GitHub Pages 배포까지 이어지게 한다.
- 블로그 제작 과정 자체도 재현 가능한 글감으로 남긴다.

## 이 디렉터리

- [architecture.md](architecture.md): 제품 범위, 기술 스택, 콘텐츠·배포 구조와 채택 이유
- [design.md](design.md): 디자인 선택의 배경과 변경 기록 (`site/DESIGN.md`가 구현 규칙의 기준)
- [publishing-series.md](publishing-series.md): 블로그 제작 과정을 공개 글로 바꾸는 연재 계획
- [publishing-flow.md](publishing-flow.md): public 원고, 비공개 초안, Pages artifact의 경계와 발행 흐름

## 다음 결정 전까지 하지 않는 일

- 현재 `main`의 정적 파일을 삭제하거나 덮어쓰지 않는다.
- GitHub Pages의 배포 원본을 branch 방식에서 Actions 방식으로 바꾸지 않는다.
- 댓글, 분석, 뉴스레터, CMS, 데이터베이스를 도입하지 않는다.
- Atelier의 비공개 이미지·프롬프트·서버 주소·내부 로그를 블로그 원고나 asset으로 옮기지 않는다.

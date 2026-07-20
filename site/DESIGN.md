# Josua Laurant 기술 기록 디자인 계약

> 상태: v1 적용 중 · 적용 범위: `site/`

이 문서는 이 Astro 사이트의 화면 구현 기준이다. 새 색상·서체 크기·spacing·radius·motion 값이 필요하면
먼저 여기에 의미와 값을 추가한 뒤 CSS에 사용한다. 이전 설계의 배경과 결정 기록은
[`../docs/blog-redesign/design.md`](../docs/blog-redesign/design.md)에 둔다.

## 1. 분위기와 서명

따뜻한 종이 위에 남긴 한국어 엔지니어링 노트. 장식보다 실험의 조건·결과·한계를 읽는 데 집중하며,
인디고는 탐색과 참조를 표시하는 잉크처럼만 사용한다. 보라색 glow, 다크 메쉬, 과도한 카드와 CTA는
사용하지 않는다.

## 2. 색상

| 역할 | CSS 변수 | 값 | 용도 |
| --- | --- | --- | --- |
| 캔버스 | `--canvas` | `#f6f5f0` | 페이지 배경 |
| 표면 | `--surface` | `#fffefa` | 글 카드 |
| 기본 잉크 | `--ink` | `#1c2231` | 제목·본문 |
| 보조 잉크 | `--ink-muted` | `#5d6473` | 날짜·설명 |
| 경계 | `--line` | `#d9d9d1` | 구분선·카드 경계 |
| 강조 경계 | `--line-strong` | `#bfc1bc` | 태그 경계 |
| 인디고 | `--accent` | `#5166ad` | focus·hover·강조 |
| 진한 인디고 | `--accent-deep` | `#394e92` | 링크·label |
| 옅은 인디고 | `--accent-soft` | `#e8ebf7` | 목차·인라인 코드 |
| 코드 표면 | `--code-surface` | `#202736` | 코드 블록 |
| 코드 잉크 | `--code-ink` | `#f2f5ff` | 코드 블록 글자 |
| 잉크 위 글자 | `--on-ink` | `#ffffff` | skip link |

`--ink`/`--canvas`는 14.55:1, `--ink-muted`/`--canvas`는 5.44:1 이상의 대비를 확보한다. 색상만으로
링크·현재 상태·의미를 구분하지 않는다.

## 3. 타이포그래피

- 기본 글꼴: `Pretendard`, `Apple SD Gothic Neo`, 시스템 sans-serif. 웹폰트를 별도 내려받지 않는다.
- display 제목: `clamp(2.8rem, 8vw, 5.7rem)` / 800 / 0.98 / `-0.065em`
- 글 제목: `clamp(2.35rem, 7vw, 4.8rem)` / 800 / 1.04 / `-0.065em`
- 섹션 제목: `clamp(1.8rem, 4vw, 2.7rem)` / 700 / 1.2 / `-0.045em`
- 본문: `1.04rem` / 400 / 1.82
- label·eyebrow: `0.72rem` / 800 / 1.0 / `0.13em`
- navigation·메타: `0.8~0.92rem` / 600~700 / 1.4 / `0.01em`
- 코드: 시스템 monospace / 본문 대비 `0.9em`

긴 동적 제목은 자연스럽게 줄바꿈한다. `<br>`은 home·소개·404의 고정 display copy에서만 허용하며,
390px와 1440px에서 두 줄이 읽기 좋다는 확인이 있을 때만 쓴다. 사용자에게 보이는 제목에는 em dash를
쓰지 않는다. 한글 제목은 단어 안에서 끊지 않고 다음 단어 단위로 줄바꿈한다. 단, 화면보다 긴 URL·식별자는
overflow를 막기 위해 예외적으로 줄바꿈할 수 있다. 시스템 글꼴의 optical sizing을 유지하며,
제목·본문·메타에 하나의 자간 값을 기계적으로 공유하지 않는다.

## 4. 레이아웃과 spacing

| 역할 | CSS 변수 | 값 |
| --- | --- | --- |
| 공통 폭 | `--shell-max` | `76rem` |
| 글 폭 | `--article-max` | `56rem` |
| 반응형 좌우 여백 | `--shell-padding` | `clamp(1.15rem, 4vw, 2.5rem)` |
| 작은 간격 | `--space-1` | `0.25rem` |
| 기본 간격 | `--space-4` | `1rem` |
| 섹션 기본 간격 | `--space-10` | `2.5rem` |
| 넓은 섹션 간격 | `--space-16` | `4rem` |

기존 컴포넌트의 광학 보정값은 한 번에 기계적으로 바꾸지 않는다. 컴포넌트를 수정할 때만 해당
margin·padding·gap을 이 scale 또는 문서화한 `clamp()` 값으로 옮긴다.

글·소개·주제 목록처럼 읽기 폭을 제한하는 화면은 넓은 viewport에서 그 폭을 늘리지 않고 공통 shell 안에서
가운데에 놓는다. 32인치 UHD의 화면 반쪽처럼 약 1920px인 viewport에서도 본문은 56rem 읽기 폭을
유지하되, 왼쪽으로 붙어 보이지 않아야 한다. 홈은 목록을 훑는 화면이므로 더 넓은 공통 shell을 유지한다.

## 5. 컴포넌트와 형태

- Header: 사이트명은 홈 링크다. 전용 현재 경로가 있는 탐색만 `aria-current`로 표시한다. `업데이트`는
  블로그 자체의 versioned changelog로 이동하며, 일반 글·RSS 탐색과 섞지 않는다.
- PostCard: 제목이 첫 번째·주요 링크이며 태그는 독립 링크다. 카드 전체를 링크로 감싸지 않는다.
- Summary provenance: `description`이 AI 생성 요약이면 설명 바로 앞에 `✦ AI 요약`을 표시한다. 이 표기는
  장식성 eyebrow가 아니라 요약의 출처를 밝히는 정보다. 직접 쓴 설명에는 표시하지 않는다.
- 탐색 라벨: 이동 대상이나 행동을 직접 말한다. 내부 이동 링크에는 외부 이동으로 읽힐 기호를 쓰지 않는다.
- Category: 각 글은 하나의 주제를 기본 분류로 갖고, 카드·글 머리말·주제 목록에서 같은 이름의
  `/categories/<slug>/`로 연결한다. 태그는 보조 탐색에만 쓴다.
- Updates: `/updates/`는 버전·날짜·변경 항목만을 최신순으로 보여 주는 changelog다. 일반 글 카드나
  태그를 재사용하지 않는다.
- Tag: 분류 기능이 있는 경우에만 쓴다. 장식성 pill을 늘리지 않는다.
- Eyebrow: 기본값은 생략이다. 필요할 때만 한 화면에 하나를 쓰며, home의 섹션 라벨에는 사용하지
  않는다. 글·소개·태그·404에서는 해당 화면의 맥락을 짧게 설명할 때만 사용한다.
- 반지름: `--radius-inline: 0.25rem`, `--radius-panel: 0.75rem`, `--radius-card: 0.9rem`.
- 깊이: 그림자 없이 표면색과 1px 경계만 사용한다.

## 6. 상호작용과 모션

- 공통 focus: `3px` 인디고 outline과 `3px` offset을 유지한다.
- press feedback: 링크·탐색 카드·주요 행동은 pointer down에서 즉시 잉크·표면·경계색으로 반응한다.
  scale, bounce, 지연된 transition은 기본값으로 쓰지 않는다.
- 카드 hover: border-color와 `translateY(-2px)`만 `160ms ease`로 전환한다.
- `prefers-reduced-motion: reduce`에서는 smooth scroll과 카드 transition을 끈다.
- hover는 보조 피드백일 뿐이다. 읽기와 탐색은 터치·키보드만으로 완결돼야 한다.
- skip link, 의미 있는 이미지 alt, 코드 블록의 자체 가로 스크롤을 유지한다.
- 이 사이트는 읽기 중심 정적 블로그다. 드래그 물리, sheet·carousel, glass blur는 실제 사용처가 생기기
  전까지 도입하지 않는다.

## 7. 시각 자료와 새 화면 확인

- 커버 이미지는 선택 사항이다. 성능 글에는 질문 하나에 답하는 표·다이어그램·짧은 코드 중 가장 직접적인
  형식을 고른다.
- 새 글의 작성과 포스팅은 AI가 진행한다. 검증할 수 없는 수치·사실·측정 조건은 글에 넣지 않는다.
- 공개 자료에는 권한 없는 원본 자료, private 데이터, prompt, 내부 경로·호스트·token을 넣지 않는다.
- 새 화면은 `npm run check`, `npm run build` 뒤 390px·768px·1280px에서 긴 한글 제목, 코드, focus,
  가로 overflow를 실제로 확인한다.

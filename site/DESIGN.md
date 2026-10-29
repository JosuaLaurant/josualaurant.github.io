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

### 다크 모드

밤에 켠 스탠드 아래의 같은 종이다. 푸른 검정이 아니라 따뜻한 먹색을 바탕으로 쓰고, 인디고는 밝혀서
같은 역할을 유지한다. 같은 변수 이름을 다시 정의하며, 컴포넌트는 색상 값을 직접 쓰지 않는다.

| CSS 변수 | 다크 값 |
| --- | --- |
| `--canvas` | `#171612` |
| `--surface` | `#201f1a` |
| `--ink` | `#ece9df` |
| `--ink-muted` | `#a8a59a` |
| `--line` | `#34322b` |
| `--line-strong` | `#4a473e` |
| `--accent` | `#8d9ee0` |
| `--accent-deep` | `#a9b7f2` |
| `--accent-soft` | `#262a3b` |
| `--code-surface` | `#10131b` |
| `--code-ink` | `#e6eaf7` |
| `--on-ink` | `#171612` |

기본값은 시스템 설정(`prefers-color-scheme`)을 따른다. 헤더의 테마 버튼으로 바꾸면 `html[data-theme]`과
`localStorage`의 `theme`에 저장하고, `<head>`의 inline script가 첫 paint 전에 복원한다. storage를 쓸 수
없으면 시스템 설정으로 돌아간다. 코드 블록은 두 모드 모두 어두운 표면을 유지한다.

## 3. 타이포그래피

- 기본 글꼴: `Pretendard`, `Apple SD Gothic Neo`, 시스템 sans-serif. 웹폰트를 별도 내려받지 않는다.
- display 제목: `clamp(2.8rem, 8vw, 5.7rem)` / 800 / 0.98 / `-0.065em`
- 글 제목: `clamp(2rem, 5vw, 3.2rem)` / 800 / 1.12 / `-0.055em`. 본문이 첫 화면에서 시작되도록 display보다 한 단계 작게 둔다.
- 목록 페이지 제목(전체 글·주제·태그): `clamp(2.2rem, 6vw, 3.6rem)` / 800 / 1.1 / `-0.055em`
- 섹션 제목: `clamp(1.8rem, 4vw, 2.7rem)` / 700 / 1.2 / `-0.045em`
- 본문: `1.04rem` / 400 / 1.82
- label·eyebrow: `0.72rem` / 800 / 1.0 / `0.04em`. 라벨은 한국어로 쓰며, 한글에 넓은 영문식 자간을 주지 않는다.
- navigation·메타: `0.8~0.92rem` / 600~700 / 1.4 / `0.01em`
- 코드: 시스템 monospace / 본문 대비 `0.9em`

긴 동적 제목은 자연스럽게 줄바꿈한다. `<br>`은 home·소개·404의 고정 display copy에서만 허용하며,
390px와 1440px에서 두 줄이 읽기 좋다는 확인이 있을 때만 쓴다. 사용자에게 보이는 제목에는 em dash를
쓰지 않는다. 한글은 제목·본문·메타 모두 단어 안에서 끊지 않고 다음 단어 단위로 줄바꿈한다(`body`의 `word-break: keep-all`). 단, 화면보다 긴 URL·식별자는
overflow를 막기 위해 예외적으로 줄바꿈할 수 있다. 시스템 글꼴의 optical sizing을 유지하며,
제목·본문·메타에 하나의 자간 값을 기계적으로 공유하지 않는다.

## 4. 레이아웃과 spacing

| 역할 | CSS 변수 | 값 |
| --- | --- | --- |
| 공통 폭 | `--shell-max` | `76rem` |
| 글 폭 | `--article-max` | `42rem` |
| 반응형 좌우 여백 | `--shell-padding` | `clamp(1.15rem, 4vw, 2.5rem)` |
| 작은 간격 | `--space-1` | `0.25rem` |
| 기본 간격 | `--space-4` | `1rem` |
| 섹션 기본 간격 | `--space-10` | `2.5rem` |
| 넓은 섹션 간격 | `--space-16` | `4rem` |

기존 컴포넌트의 광학 보정값은 한 번에 기계적으로 바꾸지 않는다. 컴포넌트를 수정할 때만 해당
margin·padding·gap을 이 scale 또는 문서화한 `clamp()` 값으로 옮긴다.

글·소개·전체 글·주제·태그·업데이트처럼 읽기 폭을 제한하는 화면은 `--article-max`를 쓰고 공통 shell 안에서
가운데에 놓는다. 42rem은 본문 크기에서 한 줄에 한글 약 40자로, 한국어 본문이 편하게 읽히는 35~45자
범위에 든다. viewport가 넓어져도 이 폭을 늘리지 않는다. 홈은 목록을 훑는 화면이므로 더 넓은 공통 shell을
유지한다.

홈은 짧은 소개 뒤 첫 화면 안에서 최근 글이 시작되게 한다. 최근 글은 최대 6개를 카드로 보이고, 주제는
한 줄짜리 링크 묶음과 `/categories/` 링크로만 둔다. 주제 카드·태그 묶음은 `/categories/`에서 보여 준다.

## 5. 컴포넌트와 형태

- Header: 사이트명은 홈 링크이고, 탐색은 `글`(/posts/)·`주제`(/categories/, 태그 포함)·`소개`·`업데이트`다.
  현재 구역은 `aria-current`와 진한 잉크·굵기로 표시한다. RSS와 GitHub는 footer에 둔다. `업데이트`는
  블로그 자체의 versioned changelog로 이동하며, 일반 글 탐색과 섞지 않는다.
- Footer: 사이트명과 `소개 · GitHub · RSS · ©연도`를 한 줄에 둔다.
- Theme toggle: 헤더 탐색 끝의 2rem 원형 아이콘 버튼이다. `aria-label="어두운 화면"`과 `aria-pressed`로
  상태를 알리고, 라이트에서는 달·다크에서는 해 아이콘을 보인다.
- Comments: 글 본문 뒤에 구분선과 `댓글` 섹션 제목, 저장 위치 안내를 두고 giscus를 lazy load한다.
  댓글 창 테마는 `public/giscus/{light,dark}.css`가 이 문서의 토큰으로 덮어쓰며 사이트 테마를 따라간다.
- PostCard: 제목이 첫 번째·주요 링크이며 태그는 독립 링크다. 카드 전체를 링크로 감싸지 않는다. 메타 줄은
  `주제 · 날짜`이고, 본문을 AI가 썼으면 끝에 `✦ AI 작성`을 붙인다.
- Provenance: 출처 표시는 본문 작성자(`writing`)를 우선한다. 목록에는 `✦ AI 작성`만, 글 머리말에는 설명 아래
  한 문장으로 본문과 요약을 각각 누가 썼는지 밝힌다. 장식이 아니라 출처 정보다.
- Post end: 본문 뒤에 이전·다음 글 링크와 `전체 글 목록 · <주제>의 다른 글`을 두고, 그 뒤에 댓글을 둔다.
- Prose 범위: 본문 typography(`.prose`)는 글 본문 컨테이너에만 적용한다. 머리말·목차·글 끝 탐색은 각자의
  스타일을 가진다.
- 탐색 라벨: 이동 대상이나 행동을 직접 말한다. 내부 이동 링크에는 외부 이동으로 읽힐 기호를 쓰지 않는다.
- Category: 각 글은 하나의 주제를 기본 분류로 갖고, 카드·글 머리말·주제 목록에서 같은 이름의
  `/categories/<slug>/`로 연결한다. 태그는 보조 탐색에만 쓴다.
- Updates: `/updates/`는 버전·날짜·변경 항목만을 최신순으로 보여 주는 changelog다. 일반 글 카드나
  태그를 재사용하지 않는다.
- Tag: 분류 기능이 있는 경우에만 쓴다. 장식성 pill을 늘리지 않는다. 텍스트 태그 링크도 터치 영역 높이를
  최소 `1.75rem`으로 둔다.
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

- 코드 블록은 Shiki 토큰 색을 쓰되 배경은 `--code-surface`로 덮어 블로그 팔레트에 맞춘다.
- 커버 이미지는 선택 사항이다. 성능 글에는 질문 하나에 답하는 표·다이어그램·짧은 코드 중 가장 직접적인
  형식을 고른다.
- 새 글의 작성과 포스팅은 AI가 진행한다. 검증할 수 없는 수치·사실·측정 조건은 글에 넣지 않는다.
- 공개 자료에는 권한 없는 원본 자료, private 데이터, prompt, 내부 경로·호스트·token을 넣지 않는다.
- 새 화면은 `npm run check`, `npm run build` 뒤 390px·768px·1280px에서 긴 한글 제목, 코드, focus,
  가로 overflow를 실제로 확인한다.

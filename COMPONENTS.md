# COMPONENTS.md

> 현재 코드에 존재하는 컴포넌트와 공용 모듈의 목록, 책임, 상태 계약. 여기 없는 컴포넌트는 임의로 추가하지 않는다.
> 값(색, 간격, 자간, 모션, 폭)은 전부 `client/src/tokens.js`에서만 가져온다.

---

## 0. 의존 방향

```
tokens.js → (tailwind.config.js, index.css)
  → ui/ (Primitive)
    → about/, work/, intro/ (Domain)
      → pages/ (조립)
```

페이지 파일에는 색, 간격, 상태 규칙을 직접 쓰지 않는다. 반복되면 `ui/`나 `lib/`로 올린다.

---

## 1. 공용 모듈 (`lib/`, `tokens.js`)

| 파일 | 책임 |
|---|---|
| `tokens.js` | `color`(overlay 포함), `inkAlpha`, `font`, `type`(micro 포함), `tracking`, `motion`, `space`, `layout`(touch, infoMax, rule, track, barMax), `shadow`, `carousel` |
| `lib/useLayer.js` | 풀스크린 레이어 공통 훅. 마운트/언마운트 타이밍, 포커스 이동과 복귀, Tab 순환, Escape, body 잠금, reduced-motion. `prefersReducedMotion()` 제공 |
| `lib/contrastText.js` | `contrastText`(배경 위 글자색), `contrastRatio`, `readableAccent`(어두운 배경에서 4.5:1이 되도록 accent를 밝힘) |

---

## 2. Primitive (`components/ui/`)

| 컴포넌트 | 설명 | 상태 |
|---|---|---|
| `SectionLabel` | 아이브로우. accent, 대문자, `type.label` | 없음 |
| `IconButton` | 아이콘 전용 버튼. 44px 터치 영역, `aria-label` 필수 | default, hover(opacity), active, focus-visible(전역 링), disabled |
| `Button` | 링크 또는 버튼 겸용(solid, ghost, text) | hover, focus-visible |
| `PageTransition` | `/work/:id` 진입. opacity만 사용, reduced-motion이면 즉시 | |

포커스 링은 `index.css`의 전역 `:focus-visible`(accent 링)만 쓴다. 컴포넌트에서 `outline`을 직접 지정하지 않는다.

---

## 3. Layout

| 컴포넌트 | 책임 |
|---|---|
| `layout/Layout` | 배경과 F키 전체화면 토글, `<Outlet />` |
| `layout/ScrollToTop` | 라우트 변경 시 스크롤 초기화 |

헤더는 `HomePage` 안의 상단 바(로고, 타이틀)와 하단 트리거 바(WORK, ABOUT, CONTACT)가 맡는다. 별도 Header 컴포넌트는 없다.

---

## 4. Home / Work (`components/work/`, `components/intro/`)

| 컴포넌트 | 책임 |
|---|---|
| `intro/Splash` | 최초 접속 로고 연출 |
| `work/CarouselTabs` | 타입 탭(All, UX, Visual, Vibe Coding). `tablist`, 좌우 화살표 이동 |
| `work/StackCarousel` | 부채꼴 카드 캐러셀. 휠, 화살표, 드래그. 클릭은 pointerup에서 판정 |
| `work/PosterCard` | 캐러셀 카드 한 장. 배경 = 프로젝트 accent 원색, 글자색 = `contrastText` |
| `work/ProjectDetail` | 상세 레이어. 카드 이동(scale 사용 허용 구간), 카드 플립, 우측 정보. 블록: CONTRIBUTION, OBJECTIVE, STRATEGY, OUTCOME, TOOLS, AWARD, LINKS. 글자와 링크 색은 `readableAccent` |
| `work/Lightbox` | 작품 이미지 확대 |
| `work/LiveLinks` | `/work/:id` 페이지의 링크 목록 |

`ProjectDetail` 내부 보조 컴포넌트: `Fade`, `Block`, `BodyText`, `MetaRow`, `ToolChip`, `LinkBtn`, `AwardList`, `WorkContent`(ux, dev), `VisualContent`.

---

## 5. About / Contact (`components/about/`)

| 컴포넌트 | 책임 |
|---|---|
| `AboutLayer` | 레이어 셸. 상단 탭, 하단 이전/다음, 키보드와 스와이프, 큰 화면 확대. `useLayer` 사용 |
| `AboutPages` | `ProfilePage`(3열), `ListPage`(다단 목록). 내부: `Photo`, `Chip`, `Gpa`, `Row`, `Block` |
| `SkillBar` | 숙련도 바와 태그. 바 길이는 컨테이너에 맞춰 줄어든다 |
| `ContactLayer` | 연락처 레이어. `useLayer`, `IconButton` 사용 |

---

## 6. 상태 계약

- 버튼류: default, hover, active, focus-visible, disabled를 갖는다. 이동은 `<a>`, 동작은 `<button>`.
- 레이어: `role="dialog"`, `aria-modal`, 접근 가능한 이름. 열림 시 `data-autofocus` 요소(없으면 컨테이너)로 포커스, 닫히면 트리거로 복귀.
- 탭: `role="tablist"`, `tab`, `tabpanel`과 `aria-selected`, `aria-controls`.
- 모션: `motion` 토큰만 사용. `prefers-reduced-motion`이면 전역 CSS가 transition과 animation을 제거하고, 훅은 즉시 전환한다.
- 터치 타깃: `layout.touch`(44px) 이상.

---

## 7. 삭제된 컴포넌트 (2026-10)

import 그래프에서 도달할 수 없어 삭제했다. 부활시키지 않는다.

`sections/HeroSection`, `sections/AboutSection`, `sections/ContactSection`, `layout/Header`, `work/ProjectCard`, `work/ProjectGrid`, `work/TypeTabs`, `work/Gallery`, `work/PdfViewer`, `about/CharacterChips`, `about/CollapsibleList`, `ui/Stat`, `ui/Tag`, `lib/useReveal`, `lib/useCountUp`

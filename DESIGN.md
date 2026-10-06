# DESIGN.md

> 2026-10 주의: 5절(헤더), 6절(세로 스크롤, 앵커 이동), 7절(Work 그리드)은 초기 계획이며 현재 구현과 다르다. 화면 구조와 컴포넌트는 IA.md, COMPONENTS.md, ROUTES.md가 기준이다. 색, 타이포, 간격, 모션 규칙(2, 3, 4, 8, 9절)은 유효하다.

> 주현호 UX · 바이브 코딩 포트폴리오
> 색·간격·폰트는 전부 `src/tokens.js`에서만 꺼낸다. 이 문서는 그 근거와 규칙.
> 특강 사이트에서 계승: 디자인 시스템 전부. 폐기: 3D 캐러셀, 무헤더 풀페이지.

---

## 0. 정체성

학부 3학년이 한 학기에 14개 사이트를 직접 배포했다. 이 사이트는 그 사실의 증거이자, 교수 검증·채용·대학원에 쓰는 개인 포트폴리오다.

- **메시지** 피그마에서 멈추는 디자이너가 아니다. 문제를 정의하고 구조를 설계해 배포까지 한다. 이 사이트를 React로 직접 만든 것 자체가 증거다.
- **톤** 절제. 미니멀. editorial. 정보 구조의 명확함이 핵심이다. 화려한 모션·과장·다색 금지.

---

## 1. 플랫폼

**B형 반응형 웹.** 320px ~ 2560px 전 구간 대응.

---

## 2. 색 (변경 금지 — 계승)

`color.ink #181818` 배경 / `color.paper #FFFFFF` 텍스트 / `color.accent #E27DA6` = 주현호 시그니처 핑크.

핑크는 아이브로우(SectionLabel), 라인, 강조 텍스트, 포인트, focus 링에만. **큰 배경 면에는 안 쓴다.** 카드 라벨 점은 각 프로젝트 고유색(`projects.js`의 accent) 유지.

- `muted` rgba(255,255,255,0.8) — 보조 텍스트
- `line` rgba(255,255,255,0.12) — 보더 전용
- 대비: paper on ink 약 14:1(AAA). accent on ink 약 6:1.

색 변경은 `tokens.js`의 `color` 한 곳에서만.

---

## 3. 타이포그래피 (Pretendard 단일)

폰트는 Pretendard 하나. CDN(jsdelivr)에서 로드. `font.display = font.body = font.mono` 전부 Pretendard. 특강 사이트의 Space Grotesk / JetBrains Mono는 폐기.

스케일은 `type` 토큰 clamp로 모바일↔데스크탑 연속 보간. 매직넘버 금지.

| 역할 | 토큰 | 용도 |
|---|---|---|
| hero | `type.hero` | 히어로 이름·대형 헤드 |
| h1~h3 | `type.h1/h2/h3` | 섹션 헤드라인 |
| body / bodyLg | `type.body` | 본문 |
| label | `type.label` | 아이브로우(accent, 대문자, 0.16em) |
| caption / small | `type.caption/small` | 메타·기간 |

**아이브로우(SectionLabel) 규칙**: 영문 대문자 + accent 핑크 + 볼드, 헤드라인보다 확실히 작게(14px, letterSpacing 0.16em). 선 장식 없음. 기존 `SectionLabel.jsx` 그대로 사용.

---

## 4. 간격·레이아웃

- 4pt 배수(`space` 토큰).
- **컨테이너 폭 1680px 통일.** `tokens.layout`에 `containerSite: '1680px'` 추가(구현 시). 좌우 패딩 `pagePadX` clamp(모바일 16 / md 40 / xl 64).
- **가로 스크롤 절대 금지.** `html, body { overflow-x: hidden }` 유지.
- radius: UI 4~8px, 이미지 카드 14px(`radius.card`), pill 999px.
- 섹션 리듬: 아이브로우 → 여백 → 헤드라인 → 여백 → 콘텐츠. (PATTERNS.md)

---

## 5. 헤더 (신규 — 특강 무헤더에서 전환)

상단 고정 sticky. 미니멀.

- 좌측: HO 로고(`/logo-ho.svg`) → 클릭 시 홈 top.
- 우측: 앵커 네비 `WORK / ABOUT / CONTACT` → 해당 섹션 스무스 스크롤.
- 스크롤 시 ink 반투명 + `backdrop-blur`. 최상단에선 투명/약하게.
- 모바일: 로고 + 햄버거 또는 축약 앵커. 터치 타깃 44px.
- 헤더는 추가하되 **메인은 세로 스크롤 유지**(Hero→About→Work→Contact 한 페이지).

---

## 6. 인터랙션 모델

특강의 무헤더 풀페이지·휠 트랩·3D 캐러셀 전부 폐기. 표준 세로 스크롤 + sticky 헤더로 단순화.

- **세로 스크롤** 일반 문서 스크롤. scroll-snap 강제 안 함.
- **헤더 앵커** `scrollIntoView({behavior:'smooth'})`로 섹션 이동.
- **Work 카드 → 상세** 카드 클릭 시 `/work/:id`로 라우팅, `PageTransition`(opacity fade, 300ms)으로 진입. bencodes.de의 "카드→상세 부드러운 전환" 흡수.
- **F키 전체화면 토글** `Layout.jsx`의 기존 구현 유지.
- `prefers-reduced-motion` 시 전환·reveal 즉시 표시.

---

## 7. Work 그리드 (핵심)

emmeliestrand.se의 "호버 없이 항상 보이는 그리드" 흡수. 3D 캐러셀의 가독성·접근성·확장성 문제를 전부 해소한다.

- **타입 탭** UX / 시각디자인 / 개발(코딩). 탭 전환 시 해당 타입 카드 그리드 표시.
- **카드 항상 보임.** 호버 의존 금지. 썸네일·제목·타입·기간이 기본 상태에서 다 보인다.
- **열 수** 데스크탑 3열 / 태블릿 2열 / 모바일 1열.
- **호버** opacity·border만. **scale 금지.**
- **접근성** 카드는 `<a>` 또는 `role="link"` + `tabIndex=0` + `onKeyDown(Enter)`. 키보드 진입 필수. (캐러셀이 못 했던 것)

---

## 8. 모션 원칙

- transition 150~300ms, ease `cubic-bezier(0.22,1,0.36,1)`.
- 호버는 opacity·border·color만. **scale 금지** (아래 절대 규칙 예외 참조).
- 진입 reveal은 opacity + translateY(`useReveal` 계승).
- `prefers-reduced-motion: reduce` 시 애니 정지·즉시 표시.

---

## 9. 절대 규칙 (AGENTS.md 상속)

- TypeScript 금지 → JSX만.
- localStorage / sessionStorage 금지.
- 색·간격·폰트 하드코딩 금지 → tokens.js만.
- 이모지 금지 → lucide-react 또는 inline SVG.
- `transform: scale` 사용은 원칙적으로 금지한다.
  hover·focus·일반 상태 전환에는 절대 쓰지 않는다(opacity·border·color·translate만).
- 단 하나의 예외: "프로젝트 상세 진입 warp 연출"(ProjectDetail 진입 시
  포스터가 중앙에서 확대 등장 → 좌측 이동)에서만 `transform: scale + translate`를 허용한다.
  이 예외는 해당 연출 컴포넌트 내부로 한정하며, 다른 어떤 곳에도 scale을 전파하지 않는다.
- 가로 스크롤 금지(전 구간).
- B형 hover/focus 필수, 320~2560 전 구간 깨짐 없음.

---

## 10. 2026-10 추가 규칙

- **토큰 확장**: `tracking`(자간), `motion`(fast 150, base 250, slow 400, reveal 600ms와 ease), `color.overlay`(soft, base, strong), `inkAlpha`, `type.micro`, `layout.touch`, `layout.infoMax`, `layout.rule`, `layout.track`, `layout.barMax`. 컴포넌트에 HEX, rgba, font-family, letter-spacing, 임의 px 문자열을 쓰지 않는다.
- **프로젝트 accent 대비**: 카드 배경은 accent 원색을 쓴다. 어두운 배경 위의 글자, 링크, 테두리는 `readableAccent`로 4.5:1 이상으로 보정한 색을 쓴다.
- **포커스**: 전역 `:focus-visible` 링만 쓴다. 인라인 `outline`와 onFocus, onBlur 핸들러를 쓰지 않는다.
- **reduced-motion**: `index.css`가 모든 animation과 transition을 제거한다.
- **페이지 전환**: opacity만 사용한다. 위치 이동과 radius 애니메이션은 쓰지 않는다.
- **가운데점 금지**: 화면에 보이는 문자열에 `·`를 쓰지 않는다(IA.md 5절).
- **shadow**: 캐러셀 카드의 깊이감용 `shadow.poster`, `shadow.posterActive` 토큰만 허용한다.

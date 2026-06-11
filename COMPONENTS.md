# COMPONENTS.md

> 컴포넌트 전체 목록 + 파일 경로 + 반응형 스펙. 여기 없는 컴포넌트 임의 추가 금지.

---

## 0. 계승 / 신규 / 폐기

### 계승 (그대로 사용)
- `ui/SectionLabel.jsx` — 아이브로우
- `ui/PageTransition.jsx` — opacity fade (reduced-motion 처리됨)
- `ui/Button.jsx` · `ui/Tag.jsx` · `ui/Stat.jsx`
- `layout/ScrollToTop.jsx`
- `lib/useReveal.js` · `lib/useCountUp.js`
- `layout/Layout.jsx` 의 F키 전체화면 로직 (헤더 추가하며 개편)

### 신규
- `layout/Header.jsx`
- `sections/WorkSection.jsx` (+ 타입 탭)
- `work/ProjectCard.jsx`
- `work/ProjectGrid.jsx`
- `work/TypeTabs.jsx`
- `work/PdfViewer.jsx` (ux 상세)
- `work/Gallery.jsx` + `work/Lightbox.jsx` (visual 상세)
- `work/LiveEmbed.jsx` 또는 `work/LiveLinks.jsx` (dev 상세)
- `sections/ContactSection.jsx`
- `about/SkillBar.jsx` · `about/CharacterChips.jsx`
- `about/CollapsibleList.jsx` (더보기/접기)

### 폐기 (삭제)
- `carousel/Carousel3D.jsx` · `carousel/Card3D.jsx` · `lib/useCarousel3D.js`
- `sections/GallerySection.jsx`
- 특강 섹션 전부: Onboarding, AITimeline, Planning, Method, WhyClaudeCode, Toolkit, Survival, DesignerFuture, Manifesto
- `lib/useFullpageNav.js` · `layout/SectionDots.jsx` (무헤더 풀페이지 폐기에 따라)
- 관련 데이터: aiTimeline.js, manifesto.js, onboarding.js, planning.js, survival.js, whyClaudeCode.js, journey.js, toolkit.js

---

## 1. Header `layout/Header.jsx`

| 항목 | 스펙 |
|---|---|
| 위치 | sticky top, z-index 최상위 |
| 배경 | 최상단 투명/약하게 → 스크롤 시 `bg-ink/80` + `backdrop-blur` |
| 좌측 | HO 로고(`/logo-ho.svg`), 클릭 → 홈 top |
| 우측 | 앵커 `WORK · ABOUT · CONTACT`, scrollIntoView smooth |
| 모바일 | 로고 + 축약 앵커 또는 햄버거. 터치 44px |
| 호버 | opacity·color만 |

---

## 2. Hero `sections/HeroSection.jsx` (개편)

좌측정렬. HO 로고 + 이름 + 정체성 내러티브 + 복수전공 + 프로필 사진.

- 아이브로우: `PRODUCT DESIGNER JOURNEY` 류
- 헤드라인: `type.hero`
- 프로필: `/profile.webp`, object-cover, radius.card 또는 원형, alt 필수
- 데스크탑 좌(텍스트)/우(사진), 모바일 세로 적층

---

## 3. About `sections/AboutSection.jsx`

| 블록 | 컴포넌트 | 스펙 |
|---|---|---|
| 내러티브 | (인라인) | 2문장, bodyLg |
| 캐릭터 칩 | CharacterChips | 키워드 칩, border line, accent 1~2개 |
| 성적/장학 | Stat 재사용 | 전공 4.5 / 전체 4.28 / 과 수석 2연속 |
| 진로 목표 | (인라인) | 1줄, muted |
| Tools | SkillBar | 아래 4절 |
| 이력 | CollapsibleList | star 노출 + 더보기/접기 |

---

## 4. Tools `about/SkillBar.jsx`

숙련도 있는 도구는 막대, 나머지는 태그.

**숙련도 바 (값 있음)**
| 도구 | % | 아이콘 |
|---|---|---|
| Illustrator | 90 | (없음 → 원형 플레이스홀더) |
| Antigravity | 85 | `/logos/antigravity.svg` |
| Premiere | 83 | (없음 → 원형) |
| Photoshop | 80 | (없음 → 원형) |
| Figma | 70 | `/logos/figma.svg` |

**태그 (값 없음, 나열)**: Claude Code(`/logos/claudecode.svg`) · React · Vite · Tailwind · Vercel · NeonDB · Render

- 막대: 트랙 `line`, 채움 `accent` 또는 무채색. 라벨 + %.
- **아이콘 없으면 그 자리 원형(`border line`)으로 표시** (사용자 지시). svg는 `/public/logos/`에 추가하면 자동 대체.
- 막대 애니: `useReveal` 진입 시 0→% width transition. reduced-motion 시 즉시.

---

## 5. Work `sections/WorkSection.jsx`

```
SectionLabel(WORK) + 헤드라인
TypeTabs (UX / 시각디자인 / 개발)
ProjectGrid (선택 탭의 카드들)
```

### 5-1. TypeTabs `work/TypeTabs.jsx`
- 탭 3개. 활성 탭 accent 언더라인 또는 accent 텍스트, 비활성 muted.
- `role="tablist"` / `role="tab"` / `aria-selected`. 키보드 좌우 이동.
- 상태는 `useState`(localStorage 금지).

### 5-2. ProjectGrid `work/ProjectGrid.jsx`
- grid 3열(xl) / 2열(md) / 1열(base). gap `space.6`.
- 빈 타입이면 EmptyState 한 줄.

### 5-3. ProjectCard `work/ProjectCard.jsx`
| 항목 | 스펙 |
|---|---|
| 구성 | 썸네일 + 제목 + 타입 라벨 + 기간 (항상 보임, 호버 비의존) |
| 썸네일 | aspect 16/10 (또는 ratio='portrait' 시 세로), object-cover, radius.card |
| 라벨 점 | 프로젝트 accent 색 점 |
| 진입 | `<Link to="/work/:id">` 또는 role=link + tabIndex0 + Enter |
| 호버 | border `transparent→line` + opacity. **scale 금지** |
| focus | focus-visible accent 링 |

---

## 6. Work 상세 `pages/WorkDetailPage.jsx`

공통 헤더: 제목 · 한 줄 설명 · 역할 · 기여도 · 기간 · 결과. 그 아래 타입별 콘텐츠.

| 타입 | 컴포넌트 | 동작 |
|---|---|---|
| dev | LiveLinks / LiveEmbed | 라이브 링크 버튼(들). 강릉페이=3링크, AXIOM=2링크. 새 탭(noopener) 또는 iframe 임베드 |
| ux | PdfViewer | PDF 인라인 뷰어 + 다운로드/새 탭. 웹형 포폴이면 LiveLinks |
| visual | Gallery + Lightbox | 썸네일 그리드 → 클릭 시 라이트박스. 키보드 좌우/Esc |

- 상단 "← Work로" 뒤로가기.
- PageTransition으로 감싼다.

---

## 7. Contact `sections/ContactSection.jsx`

- 이메일(mailto) · GitHub(https://github.com/hyunho2378) · Instagram
- 아이콘 lucide-react. 호버 opacity·color.
- 전화번호·생년월일 노출 안 함.

---

## 8. 데이터 모델 — `data/projects.js` (마이그레이션)

```js
{
  id: 'gangneung-pay',
  title: '강릉페이',
  oneLiner: '지역화폐 결제 경험 UX 개선',   // 한 줄 설명
  type: 'ux',                              // 'ux' | 'dev' | 'visual'
  role: '...',
  period: '2026',
  accent: '#1D4ED8',
  thumbnail: '/thumbs/gangneung-pay-ios.webp',
  ratio: 'landscape',                      // 'portrait' 가능
  contribution: '...',                     // 기여도
  outcome: '...',                          // 결과
  // 타입별 진입 소스 (해당 것만 채움)
  links: [                                 // dev / 멀티링크
    { label: 'iOS 버전', url: '...' },
    { label: 'Android 버전', url: '...' },
    { label: '프로젝트 웹사이트', url: '...' },
  ],
  pdfUrl: null,                            // ux
  gallery: [{ src: '...', alt: '...' }],   // visual
}
```

- 기존 썸네일(webp) 계승. 강릉페이 3썸네일 중 대표 1장 선택.
- 타입 1차 분류 + contribution/outcome/oneLiner 텍스트는 사용자 제공(4단계).
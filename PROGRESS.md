# PROGRESS.md

> 진행 상태 추적. 컨텍스트 85% 도달 시 갱신 후 중단.

---

## 현재 단계: flip 상세 전수 통일 규칙 적용 완료 → STEP 4(데이터 채우기) 대기

---

### flip 상세 전수 점검 — 통일 규칙(잘림·박스·침범 제거)
- [x] 단일 코드 경로 + objectFit:contain + 투명 박스 → 모든 비율이 박스 안에서 자동 맞춤(잘림·검은박스 0)
- [x] 가로(flipWide=flipInfoMode||flipLandscape, 9개): 박스 vw*0.43 × vh*0.72, 중심 vw*0.255 → 우측 끝 47% < 정보 50%(여유). 168%·#0e0e0e·boxShadow 제거
- [x] 세로(flipImageMode·visual, 16개): 기존 2:3 카드 inset:0 contain, 투명, dockedCx vw*0.22 → 우측 끝 39% < 50%
- [x] 컨테이너 dockedScale 상쇄 위해 박스 px를 /dockedScale로 계산(1440·2560 비율 동일 안전)
- [x] 이미지 maxWidth/maxHeight:100% contain + radius(실제 이미지 모서리에 적용), 좌패딩 ≈4%
- [x] infoBox 데스크톱 50%/50%(정보 더 오른쪽), gangwon-ci=flipLandscape로 이미 wide 처리
- [x] 미사용 shadow import 제거, 빌드 통과 (✓ 1.49s)
- [참고] 침범/잘림/박스 부재는 기하학적으로 보장(contain+47% 상한). 브라우저 스크린샷 실측은 미수행

---

### 가로 작품 flip 레이아웃 정밀 조정 (박스 제거·좌패딩·정보 50%)
- [x] flipWide 뒷면: 검은 박스(#0e0e0e)·boxShadow 제거 → 박스 없이 사진만(contain, 살짝 radius)
- [x] 가로 펼침 박스 폭 168%→`vw*0.43`(16:10), `/dockedScale`로 화면 px 상쇄. 좌패딩 4% ~ 우측 끝 47%
- [x] dockedCx: flipWide만 `vw*0.255`(이미지 영역 중앙)로 — 좌패딩 확보·우측 안 겹침
- [x] infoBox 데스크톱 `left 42%/width 58%` → `left 50%/width 50%`(정보 더 오른쪽, 43px 여유)
- [x] 세로 작품(visual·wellow·lucid-link)은 dockedCx vw*0.22 유지 — 영향 없음
- [x] flip 판정 consts를 geometry 위로 hoist(dockedCx에서 flipWide 사용), 미사용 shadow import 제거
- [x] 빌드 통과 (✓ 1.60s)

---

### 가로 작품(flipInfoMode) 2단계 flip 연출
- [x] ProjectDetail: flipWide 뒷면을 168% 즉시 가로 박스 → **2단계 분리**로 교체
- [x] 1단계: 세로 카드 그대로 rotateY(180) — 앞뒤 모두 2:3이라 비율 충돌 0 (transform 640ms cubic-bezier(0.4,0,0.2,1))
- [x] 2단계: flip 완료 +120ms 후 backside를 세로(2:3)→가로(3:2)로 width/height 전이(520ms cubic-bezier(0.16,1,0.3,1)). `expanded` state 추가
- [x] 겹침 안전: 가로 최종 폭 = `vw*0.34`(36% 상한 이하), 카드 중심 vw*0.22 → 우측 끝 39%, 정보 42% (3% 여유). 컨테이너 scale 상쇄 위해 `/dockedScale`로 px 계산
- [x] reduced-motion: 즉시 flipped+expanded 최종(가로) 상태
- [x] 닫기: expanded→false(가로→세로 접기) 후 flipped→false(앞면) 역방향
- [x] 세로 작품(visual·wellow·lucid-link)·우측 정보·hasThumb(flipInfoMode 제외) 영향 없음
- [x] 빌드 통과 (✓ 1.72s)

---

### 이미지 키컬러 추출 → accent 반영
- [x] scripts/extract-accent.mjs 작성(node-vibrant + sharp). sharp로 webp/gif→PNG 버퍼 변환 후 Vibrant 추출. 재실행 가능
- [x] 보정 규칙: Hue 유지, L<0.22→0.36 / S<0.35→0.52 / L>0.85→0.78. 다크·골드(axiom·dalat·gangwon-ci·dah-leaflet)는 과보정 금지(L 하한만)
- [x] 비교표 출력 + scripts/accent-results.json 저장
- [x] 사용자 승인: "안전한 것만 적용" → 브랜드 일치/유사 15개만 accent 교체
- [x] 교체 15: gangneung-pay·numer9·wontong-market·wellow·teapot-418·lucid-link·lucid-instagram·mumble-cardnews·gangwon-design-platform·hotissue·fromis9·memory-perfume·soft-petals·against-the-flow·dah-exhibition
- [x] 유지 10(⚠ 추출 부적합 8 + NO IMAGE 2): axiom·dalat-vibe·gangwon-ci·kdh-poster·dah-character·gangwon-leaflet·glow-in·dorm-eco / oliveyoung-mens·dah-leaflet
- [x] node-vibrant·sharp는 devDependencies(빌드 산출물 영향 없음). 빌드 통과 (✓ 1.56s)

---

### summary 재적용 + 추가 데이터 반영 (사용자 projects.js 교체분 위)
- [x] projects.js: 전체 27개 항목에 `summary` 필드 보장(없던 25개 재삽입, 기존 2개 유지). 강릉/numer9 role 역할만으로 재정리
- [x] PosterCard: 하단 = **번호만**(role·HO 제거 유지) — 사용자 요청대로 번호 복원
- [x] ProjectDetail: oneLiner(muted) 다음 `summary`(paper, lh 1.7) 표시 유지
- [x] 5-1: against-the-flow-poster / dah-leaflet 카드 존재 확인(VISUAL, 중복 아님)
- [x] 5-2: kdh-poster `pdfUrl: /pdf/kdh-poster.pdf`, memory-perfume-typo `pdfUrl: /pdf/memory-perfume-typo.pdf` → 상세 "PDF 보기" 버튼 동작
- [x] 5-4: orbital-poster gallery에 `/thumbs/orbital-poster.gif` 추가(visual=gallery로 우측 표시·자동재생)
- [ ] 5-3: gangwon-design-platform 프로토타입 url — 사용자 URL 제공 대기
- [ ] dah-leaflet: role/strategy/outcome/summary·gallery 이미지 — 사용자 입력 대기(TODO 유지)
- [x] 빌드 통과 (✓ 1.96s)

---

### role 의미 정리 + summary 신규 + 포스터 카드 하단 정리
- [x] projects.js: 전체 24개 항목에 `summary: ''` 필드 추가(oneLiner 다음). 사용자가 100자 소개 채울 예정
- [x] projects.js: role 의미 정리 — 강릉페이 `지역화폐 앱 UX/UI · 단독`→`UX/UI 디자인 · 단독`, numer9 `서비스 디자인 · 후평동 상권 활성화`→`서비스 디자인 · 단독`
- [x] ProjectDetail: 제목 블록 내 oneLiner(muted) 다음에 `summary`(paper, lh 1.7) 표시. 빈 값이면 미렌더
- [x] PosterCard: 하단 블록 전체 삭제 — 번호(01)·role·"HO · 2026 PORTFOLIO" 제거. `numStr`·`role` destructure 정리. 상단 label+period, 중앙 제목만 남김(미니멀)
- [x] PosterCard `index` prop은 시그니처 유지(미사용, 에러 0). StackCarousel의 index 전달도 무해하게 유지
- [x] 빌드 통과 (✓ 1.73s)

### 올리브영 카드 맨 뒤 배치 + 뱃지 제거 [이전]

### 올리브영 카드 맨 뒤 배치 + COMING SOON 뱃지 제거
- [x] projects.js: `oliveyoung-mens`가 UX 마지막(웰로우 다음, DEV 앞)에 위치 확인 — 번호 UX 5번째
- [x] PosterCard: "COMING SOON" 라벨/뱃지 완전 제거 — comingSoon이어도 일반 카드(라임그린+타이포)로 표시
- [x] StackCarousel: 활성 카드 클릭 시 `comingSoon`이면 `onSelect` 차단 유지(상세 안 열림). 휠·드래그·비활성 클릭 이동 정상
- [x] profile.js: EXPERIENCE에 '올리브영' 없음 확인(이미 제거됨)
- [x] 빌드 통과 (✓ 961ms)

### 올리브영 맨즈에딧 카드 추가 (준비 중) + EXPERIENCE 정리 [이전]
- [x] projects.js: UX 섹션 웰로우 다음에 `oliveyoung-mens` 추가 (라임그린 #82DC28, `comingSoon: true`)
- [x] StackCarousel: 활성 카드 클릭 시 `comingSoon`이면 `onSelect` 차단(상세 안 열림)
- [x] profile.js: EXPERIENCE에서 '올리브영 앱 맨즈에딧 UX 개선' 항목 제거(카드로 이전)

### FIX 12 세부 완료 목록 (화살표 삭제 + 상세/About 정합)
- [x] StackCarousel: 좌우 화살표(`<` `>`) 버튼 블록·`arrowStyle`·ChevronLeft/Right import 완전 제거 (이동=휠·드래그·키보드)
- [x] StackCarousel: 미사용된 `color`·`layout` import 정리(`space`·`shadow`만 유지), aria-label "휠·드래그·키보드(←→)"로 갱신
- [x] ProjectDetail: 딤 강화 opacity 0.96→0.98 + `backdropFilter blur(10px)` — 뒤 캐러셀 비침 차단(z-60 유지)
- [x] ProjectDetail: ESC/×/배경클릭 닫힘 + body scroll lock 기존 정상 동작 확인(변경 불필요)
- [x] AboutLayer: 딤 0.97→0.98 + blur 8→10px, max-width `clamp(960px,86vw,1280px)` 중앙 균형, 그리드 gap `clamp(48px,6vw,110px)`
- [x] z-index 정합: About/Contact z-40, ProjectDetail z-60 — 화살표 제거로 캐러셀 요소가 오버레이 위로 비침 0
- [x] 빌드 통과 (✓ 765ms, 번들 235.35→233.49kB)

### FIX 11-B 세부 완료 목록 (순수 드래그 차단 원인 제거)
- [x] StackCarousel 컨테이너: `userSelect:'none'` + `WebkitUserSelect:'none'` — 드래그 시 텍스트 선택이 pointer 흐름 끊는 문제 제거(= shift 없이 순수 드래그 작동, "shift면 됨"의 근본 원인 해결)
- [x] StackCarousel 카드 wrapper: `draggable={false}` + `onDragStart preventDefault` — native drag(고스트) 차단
- [x] PosterCard: `<img>` 없음 확인(현재 추가 조치 불필요)
- [x] touchAction 'pan-y' 유지(1·2번으로 마우스 드래그 해결, 세로 스크롤 안전)
- [x] 빌드 통과 (✓ built in 726ms)

### FIX 11-A 세부 완료 목록 (드래그 정밀 수정 + 인디케이터 삭제)
- [x] StackCarousel: `dragDX` state 삭제 — 드래그 중 React 리렌더 0회
- [x] StackCarousel: 그룹 트랙에 `trackRef` 추가 → onPointerMove에서 `style.transform = translateX(dx)` 직접 조작
- [x] StackCarousel: onPointerDown에서 트랙 transition='none', onPointerUp에서 transition 복원 + transform 초기화
- [x] StackCarousel: 카드 transform에서 dragDX 가산 제거, transition 분기에서 dragging 제거
- [x] StackCarousel: 클릭 vs 드래그 구분 임계 4→6px(`drag.current.moved`)
- [x] StackCarousel: 인디케이터("01/22"+진행바) 블록 완전 삭제, `pad`/`typeToken` 정리
- [x] StackCarousel: `indicatorHidden` prop 제거
- [x] HomePage: `indicatorHidden` 전달 라인 제거
- [x] 휠/화살표/키보드 이동 유지, scale 0
- [x] 빌드 통과 (✓ built in 911ms)

### FIX 10-B 세부 완료 목록
- [x] AboutLayer: 배경 `rgba(18,18,18,0.97)` (딤 강화, 뒤 캐러셀 완전 차단)
- [x] AboutLayer: 컨테이너 max-width 900→1100px, 패딩 `clamp(48px,8vh,96px) clamp(24px,5vw,80px)`
- [x] AboutLayer: 2열 그리드 gap `clamp(40px,6vw,96px)`, 프로필 헤더 gap `clamp(24px,3vw,48px)`
- [x] AboutLayer: Block label→content gap space[4]→space[3](12px, mt-3)
- [x] AboutLayer: GpaBlock 행 padding 10px + hairline `rgba(255,255,255,0.08)`
- [x] CollapsibleList: 행 padding 8→10px + hairline border-bottom
- [x] HomePage(NavButton): opacity hover → accent 언더라인 좌→우 애니메이션(220ms spring)
- [x] StackCarousel: 화살표 hover → border accent + icon accent(opacity 제거)
- [x] StackCarousel: 활성 카드 `shadow.card` 그림자, box-shadow 360ms 전환
- [x] ProjectDetail: 우측 정보 패널 내 max-width 520px 래퍼
- [x] Splash: fade-out easing `ease` → `cubic-bezier(0.22,1,0.36,1)`
- [x] 빌드 통과 (✓ built in 765ms)

### FIX 10-A 세부 완료 목록
- [x] StackCarousel: `indicatorHidden` prop 추가 — 오버레이(About/Contact/상세) 열림 시 인디케이터 미렌더
- [x] HomePage: `indicatorHidden={aboutOpen || contactOpen || !!detail}` 전달
- [x] StackCarousel: 드래그 임계 90px → 60px
- [x] ProjectDetail: h1 → `titleEn || title` (영문 우선), titleKo 보조 단락 추가
- [x] ProjectDetail: `typeLabel` → `project.label` 우선, 폴백 fallback
- [x] ProjectDetail: dialog `aria-label` → `titleKo || titleEn || title`
- [x] ProjectDetail: `centerScale` 계수 0.55/0.78 → 0.62/0.82 (warp 확대감 강화)
- [x] 빌드 통과 (✓ built in 1.01s)

---

## 완료

- [x] 특강 코드베이스 파악 (캐러셀·섹션·데이터·F키·토큰)
- [x] 캐러셀 폐기 결정 (가독성·접근성·확장성·새 IA 충돌)
- [x] 디자인 시스템 계승 확정 (ink/paper/accent, Pretendard 단일, tokens.js)
- [x] DESIGN.md / IA.md / COMPONENTS.md / PATTERNS.md / ROUTES.md 재작성
- [x] About 추가 데이터 수집 (성적·캐릭터·툴·자격증·GitHub·내러티브 초안)
- [x] **STEP 1** 헤더 + Work 타입 탭 + 카드 그리드 골격 (특강 섹션·캐러셀 제거)

### STEP 1 세부 완료 목록
- [x] 삭제: carousel/* · lib/useCarousel3D.js · lib/useFullpageNav.js · layout/SectionDots.jsx
- [x] 삭제: sections/GallerySection 외 특강 섹션 10개
- [x] 삭제: data/ 중 특강 데이터 8개 (aiTimeline, manifesto, onboarding, planning, survival, whyClaudeCode, journey, toolkit)
- [x] tokens.js에 `layout.containerSite: '1680px'` 추가
- [x] `layout/Header.jsx` 신규 (sticky, 스크롤 반응, HO 로고, WORK·ABOUT·CONTACT 앵커)
- [x] `layout/Layout.jsx` 개편 (Header 장착, SectionDots·useFullpageNav 제거, F키 유지)
- [x] `sections/WorkSection.jsx` 신규 (SectionLabel + 헤드라인 + TypeTabs + ProjectGrid)
- [x] `work/TypeTabs.jsx` 신규 (3탭, aria, 키보드 좌우, accent 언더라인)
- [x] `work/ProjectGrid.jsx` 신규 (byType 필터, 3/2/1열 반응형, 빈 상태)
- [x] `work/ProjectCard.jsx` 신규 (Link, 썸네일/폴백, accent 점, 메타, hover border+opacity, focus 링)
- [x] `sections/ContactSection.jsx` 신규 (이메일·GitHub·Instagram 자리)
- [x] `pages/HomePage.jsx` 재구성 (Hero→About→Work→Contact, id 부여)
- [x] `pages/WorkDetailPage.jsx` 플레이스홀더 (제목·oneLiner·역할·기간·결과 + 뒤로가기 + PageTransition)
- [x] 빌드 통과 (✓ built in 806ms)

---

### STEP 2 세부 완료 목록
- [x] `work/LiveLinks.jsx` — dev 타입 링크 버튼(단일/멀티, accent 강조, noopener)
- [x] `work/PdfViewer.jsx` — ux 타입 인라인 iframe + 새 탭/다운로드 보조 링크
- [x] `work/Gallery.jsx` — visual 타입 썸네일 그리드 (빈 상태 안내 포함)
- [x] `work/Lightbox.jsx` — 오버레이, Esc/좌우 키보드, 배경 클릭 닫기, role="dialog", scale 금지
- [x] `pages/WorkDetailPage.jsx` — 공통 헤더(썸네일·제목·메타) + 타입별 TypeContent 분기
  - dev → LiveLinks
  - ux → pdfUrl 있으면 PdfViewer, 없으면 LiveLinks (웹형 포폴)
  - visual → Gallery + Lightbox, 추가 메타(목표·전략·도구)
- [x] 빌드 통과 (✓ built in 4.31s)

### STEP 3 세부 완료 목록
- [x] `data/profile.js` — eyebrow, headline(string), intro, characterChips, statsData, careerGoal, skills, skillTags 필드 추가
- [x] `about/CharacterChips.jsx` — 키워드 칩, border line, accent 1~2개 강조
- [x] `about/SkillBar.jsx` — 숙련도 바(0→% 진입 애니, reduced-motion 대응) + 아이콘/플레이스홀더 + skillTags
- [x] `about/CollapsibleList.jsx` — 연도+텍스트 리스트, tier 색상, collapsible prop으로 +N더보기/접기
- [x] `sections/HeroSection.jsx` — SectionLabel 아이브로우, type.hero 헤드라인, 반응형 2열 그리드, sec 클래스 제거
- [x] `sections/AboutSection.jsx` — 내러티브 2문장, CharacterChips, StatBlock(성적), 진로목표, SkillBar, CollapsibleList×5 반응형 그리드
- [x] 빌드 통과 (✓ built in 1.18s)

### STEP 3 FIX 세부 변경 목록
- [x] `data/profile.js` — `interests`, `character`(plain strings), `gpa` 필드 추가. `roles` 제거하고 `activities` 상단에 병합. `statsData/characterChips/careerGoal` 제거. `contacts` 실주소 반영.
- [x] `about/SkillBar.jsx` — 트랙 `flex:1 → width:240px maxWidth:240px` (화면 끝까지 뻗기 차단)
- [x] `sections/HeroSection.jsx` — 사진 제거. 좌: SectionLabel→이름(hero size)→영문명→tagline→전공. 우: HO 로고 크게(clamp 120~240px). 2열 그리드 유지.
- [x] `sections/AboutSection.jsx` — 완전 재작성. 2단 그리드(md 이상). 좌: SmallPhoto(128px)+이름, INTERESTED IN, CHARACTER(28px 칩), GPA(동일 위계 plain text), EDUCATION, TOOLS. 우: AWARD, LEADERSHIP & ACTIVITIES(roles 병합), EXPERIENCE. GPA 큰 숫자/볼드 없음.
- [x] 빌드 통과 (✓ built in 812ms)

### FIX 2 세부 변경 목록
- [x] `data/projects.js` — gangneung-pay: thumbnail → folio.webp, ratio:portrait 제거
- [x] `work/ProjectGrid.jsx` — 3열 브레이크포인트 제거 → 최대 2열(태블릿+데스크탑)
- [x] `work/ProjectCard.jsx` — portrait ratio 로직 제거, 항상 16/10, objectPosition:top 추가
- [x] `sections/AboutSection.jsx` — 완전 재작성: 상단 2열(좌=개인+툴, 우=어워드) + 하단 2열(좌=활동, 우=경험). 더보기/접기 0개, 전 항목 노출.
  - 프로필 사진: clamp(180px,18vw,240px) width, 3/4 aspect-ratio, object-position:top(얼굴 안 잘림)
  - GPA: ALL 4.28 / 전공 4.5 / 2025-2 4.5(1/92) / 2025-1 4.5(1/102) — 모두 동일 위계
  - LEADERSHIP & ACTIVITIES, EXPERIENCE, AWARD 전 항목 노출(collapsible=false)
- [x] 빌드 통과 (✓ built in 1.18s)

### FIX 3 세부 변경 목록
- [x] `work/ProjectGrid.jsx` — 인라인 `gridTemplateColumns` 제거(specificity 버그). CSS class로만 1fr/2fr 제어. `<style>` 블록을 그리드 div 바깥(Fragment)으로 이동.
- [x] `about/CollapsibleList.jsx` — `forceWhite` prop 추가. true면 tier/accent 무시하고 전 항목 `color.paper`
- [x] `sections/AboutSection.jsx` — 상단 우측 컬럼: EDUCATION → AWARD 순서로 재배치(EDUCATION 좌측에서 이동). 좌측에서 EDUCATION 제거. LEADERSHIP & ACTIVITIES, EXPERIENCE에 `forceWhite={true}` 적용 → 핑크 텍스트 0개.
- [x] 빌드 통과 (✓ built in 729ms)

### FIX 4 세부 변경 목록
- [x] `ui/PageTransition.jsx` — opacity+translateY(7%→0)+borderRadius(24px→0) 진입 전환(480ms, cubic). scale 없음. prefers-reduced-motion → 즉시 노출.
- [x] `work/ProjectCard.jsx` — visual 타입 aspect-ratio 3/4, dev/ux 16/10.
- [x] `sections/AboutSection.jsx` — Introduction 가로 배치: 사진(왼) + INTERESTED IN·CHARACTER(오른) 한 행. CHARACTER 칩 rowGap/columnGap 명시로 간격 보장. 좌열: 사진행 → GPA → TOOLS.
- [x] `pages/WorkDetailPage.jsx` — 2단 재설계: 좌(이미지 contain max-height 70vh, sticky) / 우(제목·메타·타입별 링크). maxWidth containerMax(1280px)로 축소. iframe 제거. navigate(-1) 뒤로가기.
  - dev: 우측에 LiveLinks 버튼
  - ux: 우측에 PDF 열기 버튼 + LiveLinks
  - visual: 우측에 목표·전략·도구 텍스트, 좌측 3/4 포스터
- [x] 빌드 통과 (✓ built in 1.04s)

### FIX 5 세부 변경 목록
- [x] `sections/HeroSection.jsx` — 전면 재설계. 인라인 SVG HO 로고(fill=color.accent, 핑크 고정). 좌: SectionLabel "2026 PORTFOLIO / VOL.01" + h1 "THE STRATEGIC / DESIGN ARCHIVE" + 이름·전공. 우: 로고. DOM 순서 [로고, 텍스트] → 모바일 로고 위·텍스트 아래, 데스크탑 order CSS로 텍스트 좌·로고 우. 높이 calc(100vh - 60px).
- [x] `layout/Header.jsx` — NAV_ITEMS 순서: ABOUT → WORK → CONTACT.
- [x] `layout/Layout.jsx` — `section[id] { scroll-margin-top: 60px }` 글로벌 스타일. 헤더 겹침 완전 제거.
- [x] `work/TypeTabs.jsx` — 탭 라벨: UX / Visual Design / Vibe Coding.
- [x] `data/profile.js` — interests: Data Analysis, Graphic & Package Design 삭제 → 4개.
- [x] `sections/AboutSection.jsx` — 좌열 세로 순서 복원: 사진(독립 블록, w clamp 160-220px) → INTERESTED IN → CHARACTER → GPA → TOOLS. 가로 배치 해소.
- [x] 빌드 통과 (✓ built in 772ms)

### FIX 6 세부 변경 목록
- [x] `work/ProjectGrid.jsx` — `activeType === 'visual'`이면 `.project-grid-visual` 클래스 추가. xl(1280px+) 브레이크포인트에서 4열. UX·Vibe Coding은 기존 2열 유지.
- [x] `work/ProjectCard.jsx` — visual 카드 비율 `3/4` → `2/3` (A2 포스터 기준 2:3).
- [x] 빌드 통과 (✓ built in 665ms)

### FIX 7 세부 변경 목록
- [x] `sections/HeroSection.jsx` — h1 폰트: typeToken.hero(max 120px) → `clamp(48px, 7vw, 96px)`. 로고 fill/stroke: `color.accent` → `"#E27DA6"` 리터럴(예외 허용). 이름·전공 상단 여백 `space[2]→space[6]`.
- [x] `sections/AboutSection.jsx` — 섹션 패딩: `clamp(48px,8vw,80px)` → `clamp(80px,10vw,140px)`. 좌우 컬럼 블록 gap: `space[10]→space[12]` (40→48px).
- [x] `sections/WorkSection.jsx` — 섹션 패딩: `clamp(48px,8vw,80px)` → `clamp(80px,10vw,140px)`.
- [x] `sections/ContactSection.jsx` — 섹션 패딩 동일 적용.
- [x] `about/SkillBar.jsx` — 막대 트랙: `240px→200px`. 도구명 라벨: `96px→80px`.
- [x] 빌드 통과 (✓ built in 1.52s)

### FIX 8-A 세부 변경 목록
- [x] `work/ProjectOverlay.jsx` — 신규. fixed inset-0 z-60, ink 배경. translateY(100%→0)+opacity 480ms cubic 진입/역방향 퇴장. sticky 헤더(title+X), 첫 화면 100vh(category 라벨(project.accent)·h1·oneLiner·accent 48px 라인·역할·기간·SCROLL 힌트), 8-B 자리 주석, 하단 닫기 버튼. ESC·body scroll lock·reduced-motion 대응.
- [x] `work/ProjectCard.jsx` — Link 제거 → div[role=button] + onOpen prop. tabIndex/onKeyDown(Enter·Space) 접근성.
- [x] `work/ProjectGrid.jsx` — onOpen prop 수신 → ProjectCard 전달.
- [x] `sections/WorkSection.jsx` — selected state + ProjectOverlay 조건부 렌더링 연결.
- [x] 빌드 통과 (✓ built in 694ms)

## 다음 (단계별)

- [x] **FIX 8-B** ProjectOverlay 타입별 콘텐츠 (dev 링크 / ux PDF버튼+링크 / visual 갤러리)

### FIX 8-B 세부 변경 목록
- [x] `work/overlay/LinkButton.jsx` — 신규. border(project.accent) + hover bg/text 전환 + ArrowUpRight 아이콘. target=_blank.
- [x] `work/overlay/DevContent.jsx` — 신규. 썸네일+라이브링크버튼+RESULT. 빈 필드 조건부.
- [x] `work/overlay/UxContent.jsx` — 신규. 썸네일+PDF버튼+링크버튼+RESULT/CONTRIBUTION. 빈 필드 조건부.
- [x] `work/overlay/VisualContent.jsx` — 신규. 갤러리(없으면 썸네일 폴백)+OBJECTIVE+STRATEGY+RESULT+도구칩. 빈 필드 조건부.
- [x] `work/overlay/MetaFooter.jsx` — 신규. 역할·기간·기여도 메타행 + "Work로 돌아가기" 닫기 버튼.
- [x] `work/ProjectOverlay.jsx` — role=dialog/aria-modal/aria-label 추가. closeBtnRef 초기포커스. 8-B 자리 주석 → 900px 컨테이너+타입분기+MetaFooter로 교체. 기존 하단 닫기 버튼 제거.
- [x] 빌드 통과 (✓ built in 910ms)

### FIX 9-A 세부 변경 목록
- [x] `components/intro/Splash.jsx` — 신규. fixed inset-0 z-50, HO 로고(/logo-ho.svg) clamp(120px,16vw,200px). 로고 opacity+translateY 600ms 등장, 1400ms 후 전체 opacity 500ms 페이드아웃, 1900ms에 onDone. reduced-motion 800ms 즉시 완료. body 스크롤 잠금.
- [x] `components/about/AboutLayer.jsx` — 신규. fixed inset-0 z-40, ink 딤 0.92 + backdrop-blur. opacity+translateY 400ms 진입/역방향 퇴장. mount/unmount 분리 관리. ESC·×·배경클릭 닫힘. 내부 overflow-y:auto. profile.js 전체 데이터 표시(ProfilePhoto+intro, INTERESTED IN, CHARACTER, GPA, TOOLS, EDUCATION, AWARD, LEADERSHIP&ACTIVITIES, EXPERIENCE). SkillBar·CollapsibleList 재사용.
- [x] `components/about/ContactLayer.jsx` — 신규. 중앙 패널 팝업(maxWidth 440px). 동일 애니 패턴. 이메일·GitHub·Instagram 3항목.
- [x] `pages/HomePage.jsx` — 완전 재작성. 단일 뷰포트 구조. 상단(HO 로고 좌+타이틀 우), 중앙(flex-1, "WORKS CAROUSEL — 9-B" 플레이스홀더), 하단(WORK·ABOUT·CONTACT 텍스트 트리거 바). HeroSection·AboutSection·WorkSection·ContactSection 제거.
- [x] `components/layout/Layout.jsx` — Header 제거, scroll-margin-top CSS 제거. F키 계승.
- [x] 빌드 통과 (✓ built in 602ms)

### FIX 9-B 세부 변경 목록
- [x] `work/CarouselTabs.jsx` — 신규. All/UX/Visual/Vibe Coding 탭. 활성: accent 텍스트+하단 2px 바. role=tablist/tab, aria-selected. 좌우 화살표 이동+자동 활성화.
- [x] `work/CarouselCard.jsx` — 신규. visual=2/3, dev·ux=16/10. 썸네일 없으면 ink+border 폴백. accent 점+제목+타입·기간. hover border+opacity. scale 없음. role=button tabIndex=0 키보드.
- [x] `work/Carousel.jsx` — 신규. overflow-x:auto, scroll-snap-x mandatory. 좌우 ChevronLeft/Right 화살표(position:absolute 양 끝). 마우스 pointer drag(5px 이상이면 wasDrag=true → 클릭 차단). 터치는 네이티브 스크롤. 트랙 키보드 화살표. scrollbar 숨김. cc-img-devux/cc-img-visual CSS 클래스. 카드 클릭=console.log(9-C 예정).
- [x] `pages/HomePage.jsx` — activeTab 상태, filteredProjects, carouselRef. 플레이스홀더 → CarouselTabs+Carousel로 교체. key={activeTab}으로 탭 전환 시 스크롤 리셋. WORK+로고 클릭=carouselRef.focus(). 가로 패딩 main에서 각 섹션으로 이동(캐러셀 전폭 확보).
- [x] 빌드 통과 (✓ built in 653ms)

### FIX 9-C 세부 변경 목록
- [x] `work/ProjectDetail.jsx` — 신규. fixed inset-0 z-60. warp 3단계 페이즈 머신(enter→center→docked). 포스터: originRect 기준 absolute 위치, transform translate+scale(허용된 유일 예외). center 520ms(cubic-bezier 0.22,1,0.36,1), docked 380ms. 정보 패널: desktop=right 50% / mobile=bottom 55%, 페이즈 docked 후 opacity 300ms 등장. 타입별 콘텐츠 분기(DevContent·UxContent·VisualContent 인라인). 닫기: ESC·×·배경클릭→closing 페이즈→480ms 후 onClose. reduced-motion: 즉시 docked+정보 패널 표시. body 스크롤 잠금. close 버튼 opacity=isInfoVisible.
- [x] `work/CarouselCard.jsx` — onClick/onKeyDown: `onClick(e.currentTarget.getBoundingClientRect())` 전달
- [x] `work/Carousel.jsx` — onClick 콜백 시그니처 `(rect) => ...`로 변경, `onSelect(p, rect)` 전달
- [x] `pages/HomePage.jsx` — `selected` 상태 추가, ProjectDetail import·렌더링, onSelect 핸들러 연결
- [x] 삭제: `work/ProjectOverlay.jsx`, `work/overlay/DevContent.jsx`, `work/overlay/UxContent.jsx`, `work/overlay/VisualContent.jsx`, `work/overlay/MetaFooter.jsx`, `work/overlay/LinkButton.jsx`, `sections/WorkSection.jsx`
- [x] 빌드 통과 (✓ built in 762ms)

### FIX 9B-1 세부 변경 목록
- [x] `lib/contrastText.js` — 신규. YIQ 공식: `(R*299 + G*587 + B*114) / 1000 >= 128` → ink(#181818) 텍스트, 미만 → paper(#FFFFFF). hex 6자리 파싱, 폴백 paper.
- [x] `work/PosterCard.jsx` — 신규. 세로 2:3, accent 단색 배경. 내부 3구역(상단 종류/기간 우측정렬 · 중앙 제목+영문보조 세로중앙 · 하단 번호+메타+브랜딩). 제목 clamp(28px,2.4vw,44px) 700 -0.02em, 번호 clamp(40px,4vw,72px), 소자 clamp(10px,0.8vw,12px). Latin 보조: 한글 포함 타이틀에서 Latin 2자+단어 추출 uppercase. YIQ로 모든 텍스트 fg 결정 → scale·이모지·하드코딩 0. active prop 준비(border 색 분기, scale 없음).
- [x] `pages/HomePage.jsx` — 중앙 섹션: CarouselTabs+Carousel → 임시 4열 grid(pg-grid, @media 900px→2열). TEMP_GRID 모듈 상수(ux→dev→visual 순, 타입내 1-based 번호). CarouselTabs·Carousel·byType·activeTab·filteredProjects 제거. PosterCard import 추가.
- [x] 번호 분포: UX 01~03 / Vibe Coding 01~06 / Visual 01~13 (총 22장)
- [x] 빌드 통과 (✓ built in 766ms)

### FIX 9B-2 세부 변경 목록
- [x] `work/StackCarousel.jsx` — 신규(기존 Carousel 대체). fff식 하단 스택 캐러셀. position:absolute 겹침 배치, offset=i-activeIndex. transform translate(STEP_X*offset)+translateY(STEP_Y*absO)+rotate(TILT*offset), zIndex 100-absO, opacity(active 1 / 양옆 max(0.35, 1-absO*0.18)). **scale 0** — 깊이감은 translateY+rotate+opacity+겹침. abs>4 숨김. 카드폭 clamp(180,16vw,260), bottom:-18%(하단 잘림). transition transform 520ms cubic + opacity. 측정 ref로 STEP_X·드래그 임계 계산.
  - 이동: 좌우 화살표(go±1, lock 220ms), pointer 드래그(임계 카드폭*0.4, 실시간 따라옴+미세 rotate, 놓으면 스냅), 휠(deltaX/shift+deltaY ±1), 키보드 ←/→. forwardRef로 focus() 노출.
  - 마이크로: 활성 hover translateY(-6px, 내부 div 220ms), 비활성 hover opacity 0.35→0.6, 드래그 grabbing 커서+rotate 가산, 화살표 press translateX(±2px), 최초/탭전환 stagger(가운데→바깥 30ms) opacity+translateY(24) 등장, 인디케이터(NN/NN accent + 진행바).
  - 클릭: 활성 카드 → onSelect(project, rect=getBoundingClientRect). 비활성 → setActiveIndex(가운데로). wasDrag(moved>4px) 시 클릭 무시.
  - reduced-motion: 즉시 배치·transition none·hover 띄움 없음·stagger 없음.
- [x] `pages/HomePage.jsx` — 임시 grid 제거. activeTab 상태 + CarouselTabs 복귀. 모듈 상수 numberMap(타입내 1-based)·ordered(ux→dev→visual). filtered=useMemo(activeTab). 중앙: CarouselTabs + StackCarousel(ref=carouselRef, projects=filtered, numberMap, onSelect=console.log). PosterCard 직접 import 제거.
- [x] onSelect는 명세대로 console.log만. ProjectDetail 연결(selected state·import·렌더) 제거 → 9C에서 재연결 예정. **`work/ProjectDetail.jsx` 파일은 보존**(삭제 안 함).
- [x] 삭제: `work/Carousel.jsx`, `work/CarouselCard.jsx` (StackCarousel·PosterCard로 대체, 미사용 orphan).
- [x] 빌드 통과 (✓ built in 699ms)

### FIX 9C-NEW 세부 변경 목록
- [x] `work/ProjectDetail.jsx` — 전면 재작성(9B-2 console.log → 실제 warp 상세). PosterCard 복제를 시작점 rect에 fixed 배치. phase 머신 from→center→docked. center: translate(중앙)+scale(centerScale=min(0.55vw,0.78vh)) 520ms cubic + 딤 ink 0→0.96. docked(+640ms): 좌측(데스크탑 cx=21%, 모바일 상단 cx=50%/cy=26%)으로 translate+scale(dockedScale=min(0.3vw,0.7vh)) 420ms + 우측 정보 stagger fade in. **scale은 warp 구간 한정**(거버넌스 예외).
  - 크로스페이드: dev/ux=thumbnail(object-contain, maxH 78vh, 안 짤림) / visual=gallery 세로 스크롤. mediaVisible 시 포스터 opacity→0 + 미디어 opacity→1(280ms, scale 없음). 썸네일·갤러리 없으면 포스터 유지(visual 다수 해당).
  - 좌측 미디어 left 42%(모바일 상단 46%), 우측 정보 left 42%/width 58%(모바일 하단 54%). 우측: 종류·기간(accent)→제목(h1)→oneLiner(muted)→accent 48px 라인→타입별 콘텐츠→메타·도구. 각 60ms stagger(0/60/120/180/240).
  - 타입별: dev=CONTRIBUTION/OUTCOME/LINKS(url 있는 것만), ux=+PDF 보기, visual=OBJECTIVE/STRATEGY/RESULT/TOOLS. 빈 값 블록 생략, 빈 url 링크 필터.
  - LinkBtn: border accent → hover 시 bg accent + 텍스트 contrastText(accent) + ArrowUpRight translate(2,-2). 전부 target=_blank noopener. × 버튼 hover opacity 0.7.
  - 닫기(×/ESC/배경클릭): info·media fade out → 포스터 docked→center→from 복귀 + 딤 fade → 언마운트. closingRef로 연타 방지. body 스크롤 잠금/복구.
  - reduced-motion: warp·transition 전부 생략, 즉시 2단(포스터/미디어 + 정보) 표시.
- [x] `pages/HomePage.jsx` — `detail` 상태({project,rect,number}) 추가. onSelect → setDetail(number=numberMap[id]). ProjectDetail import·조건부 렌더. (9B-2의 console.log 대체)
- [x] `/work/:id`(WorkDetailPage) fallback 라우트 유지(미수정).
- [x] 빌드 통과 (✓ built in 651ms)

### FIX 9B-2-DEBUG 세부 변경 목록
- **원인**: 카드 opacity가 `visible` 진입 플래그(초기 false)에 묶여 있었고, 그 플래그가 false에 스턱 → 카드만 투명(인디케이터는 비게이팅이라 보임). 추가로 좌측 카드 `translate(calc(-50% + ${음수}px))`가 `calc(-50% + -130px)`로 잘못 생성될 수 있는 잠재 버그.
- [x] `work/StackCarousel.jsx` — 재작성. `visible`/`entering` 플래그 제거 → 카드 opacity는 항상 offset 기반(스턱 위험 원천 제거). 진입·탭전환 페이드는 CSS `@keyframes stackFade`(선언적, 스턱 불가) + `groupKey` 증가로 재실행. prefers-reduced-motion 시 animation none.
  - STEP_X/STEP_Y/TILT/DRAG_THRESHOLD **고정 상수**(측정 의존·cardW=0/NaN 제거). cardRef·offsetWidth 측정 로직 삭제.
  - `txExpr()` sign-safe: 음수 tx는 `calc(-50% - Npx)`로 생성(잘못된 `+ -` 식 방지).
  - 컨테이너 **명시 높이** `clamp(340px,52vh,520px)` + position relative + 카드 absolute(% 높이 체인 비의존). 카드 `bottom:-4%`(보수적 정착).
  - activeIndex useState(0) + 모든 변경 `clampIdx(0~total-1)`. 인디케이터 `pad(activeIndex+1)` → "01 / 22" 정상.
  - 이동·드래그·휠·키보드·hover 띄움·인디케이터는 9B-2 명세 유지.
- [x] `pages/HomePage.jsx` — 캐러셀 래퍼 `justifyContent:flex-end`(고정높이 캐러셀 하단 정착, 상단 여백 fff식).
- [x] 빌드 통과 (✓ built in 713ms)

### FIX 9B-3 세부 변경 목록
- [x] `data/projects.js` — 22개 전 항목에 `titleEn`/`label`/`titleKo` 추가(매핑 그대로). 기존 `title`은 유지(ProjectDetail h1·aria 용). 빌드/파싱 검증(22/22/22, 누락 0).
- [x] `work/PosterCard.jsx` — 타이포 전면 수정(짜침 제거). 상단우측 label(대문자 ls0.12)+period. 중앙 titleEn 메인(weight 600, clamp(20,1.7vw,32), ls-0.01, lh1.1, 2줄 line-clamp) + titleKo 보조(clamp(11,0.9vw,14), opacity0.7, 1줄 ellipsis). 하단 번호(clamp(28,3vw,52) ↓, opacity0.85) + role 1줄 ellipsis 우측. 최하단 "HO · 2026 PORTFOLIO" opacity0.55. 패딩 clamp(14,1.4vw,22). 전 텍스트 overflow 차단(옆 카드 침범 0). getLatinSub 제거. contrastText 유지.
- [x] `work/StackCarousel.jsx` — 대비 강화: STEP_Y 14→24, TILT 4→5, opacity `max(0.25, 1-|offset|*0.28)`(비활성 hover 0.65). 활성 카드는 offset 0 → left:50%+translateX(-50%)로 항상 화면 중앙(기존 유지 확인). 하단 잘림 수정: 카드 `bottom:-4%`→`space[4]`(전체 노출), 컨테이너 `marginBottom space[6]`(하단 트리거와 ≥24px 간격), 높이 clamp(360,54vh,540). 인디케이터 하단→상단 중앙(top space[2])로 이동(활성 카드 번호·HO와 겹침 제거). 휠: React onWheel 제거 → `addEventListener('wheel', …, {passive:false})` + 가로/shift+휠 시 preventDefault, totalRef로 stale-closure 방지, throttle 220ms. 드래그 실시간 추적·스냅은 기존 유지.
- [x] 빌드 통과 (✓ built in 1.56s)

- [ ] **STEP 4** projects.js 마이그레이션 + 데이터 채우기 (PDF·PNG·텍스트 사용자 제공)

---

### FIX — 신규 프로젝트 5개 + 올리브영 PDF·이미지 (2026-09-07)
- [x] `data/projects.js` — UX 4개(eum, volume-up, gts, maero) 올리브영 앞에 추가, dev 1개(vortex) dalat-vibe 뒤 추가. 링크 URL 전부 반영. summary·contribution·period는 TODO 주석으로 비움.
- [x] 올리브영 `comingSoon` 제거, `thumbnail: /thumbs/oliveyoung-mens.webp`, `pdfUrl: /pdf/oliveyoung-mens.pdf`, `flipInfoMode: true`.
- [x] 썸네일 6개 webp 변환(cwebp -q 90, 원본 전부 3840x2160 가로 → flipInfoMode).
- [x] 빌드 통과 (✓ built in 2.61s), 50MB 초과 파일 없음.
- [ ] `client/public/pdf/oliveyoung-mens.pdf` 미배치 — 넣어야 상세 PDF 뷰어 동작.
- [ ] 신규 5개 summary(100자)·contribution·period, eum outcome 미기입.

---

### FIX — 신규 6개 상세 실측 점검 (2026-09-07, Chrome 1440x900 헤드리스)
- [x] 7개 상세(eum·volume-up·gts·maero·oliveyoung-mens·vortex·dalat-vibe) 실제 클릭·플립 후 좌표 실측: 이미지 l=58(4%) r=677(47%), 정보 패널 left=720(50%) → 겹침 0, 좌측 잘림 0, 높이 348 < vh*0.72. objectFit contain, 뒷면 배경 rgba(0,0,0,0)·boxShadow none(검은 박스 없음). 기존 wideBox 규칙이 명세와 이미 일치 → 값 변경 없음.
- [x] `ProjectDetail.jsx` — dev 상세에 PDF 버튼이 없던 문제 수정. 동일했던 DevContent/UxContent를 `WorkContent` 하나로 합치고 dev·ux 공용. vortex·dalat-vibe PDF 버튼 노출 확인.
- [x] 세로 작품 회귀 없음: wellow(flipImageMode)·glow-in-poster(visual) 480x679, 좌측 77 유지.
- [x] `oliveyoung-mens.pdf` 배치 확인(200, application/pdf, 16.7MB), 카드 클릭 → 상세 정상.
- [x] 빌드 통과 (✓ built in 1.73s), 콘솔 에러 0.
- [ ] PDF 용량 압축 권장: 올리브영 16.7M, maero 25M, volume-up 18M, vortex 14M, eum 11M.
- 참고: UX 탭이 9장이 되며 아크 양 끝 카드(eum·volume-up)는 중앙 부근이 다른 카드/컨테이너에 가려 가장자리 일부만 클릭됨(휠·드래그로 중앙 이동 후 클릭이 정상 동선).

---

## 미정 (사용자 확인 필요)

1. 배포: 기존 레포 덮기 vs 새 레포·새 URL
2. Work 타입 분류: 강릉페이·numer9를 ux/dev 중 어디로
3. AXIOM + axiom-folio 병합 동의 여부
4. dev 상세: 임베드 vs "라이브 열기" 새 탭 기본값
5. Instagram 핸들, 이메일 실주소

---

## 계승 자산 (보존)

tokens.js · projects.js · PageTransition · SectionLabel · Button/Tag/Stat · ScrollToTop · useReveal · useCountUp · Layout F키 · /public(logo-ho, profile, thumbs, logos)

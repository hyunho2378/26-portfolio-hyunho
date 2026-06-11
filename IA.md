# IA.md

> 정보 구조. 페이지·섹션 목록, 네비게이션 플로우, Work 타입 분류, 상세 진입 분기.

---

## 1. 페이지 (라우트)

| path | 페이지 | 설명 |
|---|---|---|
| `/` | HomePage | 세로 스크롤. Hero → About → Work → Contact |
| `/work/:id` | WorkDetailPage | 프로젝트 상세. 타입별 콘텐츠 분기 |
| `*` | NotFoundPage | 404 |

---

## 2. 홈 섹션 순서 (세로 스크롤)

```
[Header] sticky — HO 로고 / WORK · ABOUT · CONTACT
  │
  ▼
1. Hero      — HO 로고 + 이름 + 정체성 내러티브 + 복수전공 + 프로필 사진
2. About     — 내러티브 2문장 · 캐릭터 칩 · 성적/장학 · 진로목표 · Tools · 이력 리스트
3. Work      — 타입 탭(UX/시각/개발) + 카드 그리드(항상 보임)
4. Contact   — 이메일 · GitHub · Instagram
[Footer]
```

특강 섹션(Onboarding, AITimeline, Planning, Method, WhyClaudeCode, Toolkit, Survival, DesignerFuture, Manifesto, Gallery)은 **전부 폐기**.

---

## 3. About 내부 구조

화면 위계는 tier(star/normal/faint)로. 핵심만 전면, 나머지 접기.

1. **상단 내러티브** 2문장 (profile.headline + intro)
2. **캐릭터 칩** 창의적 · 끈기 · 기발 · 열정 · 꼼꼼 (키워드 칩, 문장 아님)
3. **성적·장학** 전공평점 4.5/4.5 · 전체평점 4.28/4.5 · 2025-1·2 과 수석(2연속)
4. **진로 목표** 한 줄
5. **Tools** 숙련도 바 + 태그 (4번 항목)
6. **이력 리스트** EDUCATION / ROLES / AWARDS / ACTIVITIES / EXPERIENCE
   - AWARDS·ACTIVITIES·EXPERIENCE는 star 3~4개만 노출 + "더보기/접기"
   - 자격증: GTQ 포토샵 1급 · ITQ 파워포인트 · 워드프로세서 한글 B

---

## 4. Work 타입 분류

탭 3개. 같은 프로젝트라도 대표 타입 하나로 분류한다.

| 타입 탭 | type 값 | 상세 콘텐츠 방식 |
|---|---|---|
| 개발(코딩) | `dev` | 라이브 사이트. 상세 안 링크 버튼 또는 임베드 → 새 탭 |
| UX | `ux` | PDF 포트폴리오. 상세 안 PDF 뷰어. (웹형 포폴이면 dev처럼 링크) |
| 시각디자인 | `visual` | 목업 이미지(PNG). 상세 안 갤러리/라이트박스 |

### 상세 진입 분기 (확인 필요 — 아래 5절)

```
카드 클릭 → /work/:id (PageTransition fade)
  ├─ dev    → 상세에서 "라이브 열기" 버튼/임베드 → 새 탭
  ├─ ux     → 상세에서 PDF 뷰어 (웹형이면 링크)
  └─ visual → 상세에서 이미지 갤러리 (외부 진입 없음, 갤러리가 콘텐츠)
```

"시각 제외 모든 작품은 상세 거친 뒤 외부로 들어감"이라는 결정 반영: dev·ux는 상세 → 외부(라이브/PDF), visual은 상세 자체가 종착(갤러리).

---

## 5. 프로젝트 병합 (결정 반영)

### 강릉페이 (3카드 → 1프로젝트)
기존 `gangneung-pay-ios` · `gangneung-pay-and` · `gangneung-pay-folio` 카드 **삭제**. 하나의 `gangneung-pay` 카드로 통합. 상세 안에 3개 진입 링크:
- iOS 버전 (라이브)
- Android 버전 (라이브)
- 프로젝트 웹사이트 / UX 포트폴리오 (라이브)

→ 데이터 모델에 `links: [{label, url}]` 필요(COMPONENTS.md 참조).

### AXIOM (제안 — 동일 패턴)
`axiom`(라이브 제품) + `axiom-folio`(포트폴리오 웹)도 같은 논리로 하나의 `axiom` 카드 + 상세 안 2링크(라이브 / 포트폴리오)로 병합 제안. **확인 필요.**

---

## 6. 현재 라이브 프로젝트 (병합 후, 타입 미확정)

projects.js 마이그레이션은 4단계. 아래는 현재 보유 라이브 자산(타입은 네가 확정):

| id | 제목 | 잠정 타입 | 비고 |
|---|---|---|---|
| gangneung-pay | 강릉페이 | ux 또는 dev | iOS+Android+포폴 3링크 병합 |
| numer9 | 디지털 소외 시니어 AI 무간섭 서비스 | ux 또는 dev | 라이브 보유 |
| axiom | AXIOM | dev | folio 병합 제안 |
| dah-exhibition | Against the Flow 전시 | dev | |
| teapot-418 | 418: I'M A TEAPOT 포스터 공모전 | dev | |
| dah-character | 디인예 캐릭터 공모전 | dev | |
| lucid-link | LUCID 링크페이지 | dev | |
| dalat-vibe | Dalat Vibe | dev | |

UX(PDF)·시각(PNG) 프로젝트는 네가 자료 주면 4단계에서 추가.

---

## 7. Contact

- 이메일 (mailto)
- GitHub: https://github.com/hyunho2378
- Instagram (핸들 미정)
- 전화번호·풀 생년월일은 **공개 안 함**(개인정보 노출 방지).
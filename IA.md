# IA.md

> 정보 구조. 2026-10 기준 구현을 그대로 기록한다. 구조를 바꾸면 이 문서를 먼저 고친다.

---

## 1. 화면 구성

단일 화면 앱이다. 세로 스크롤 섹션이 없다. 홈 한 장에서 레이어(모달)가 열리고 닫힌다.

| 화면 | 진입 | 구성 |
|---|---|---|
| Splash | 최초 접속 | 로고 페이드. 약 1.9초 뒤 종료(reduced-motion은 0.8초) |
| Home | `/` | 상단 로고와 타이틀, 타입 탭, 부채꼴 캐러셀, 하단 WORK / ABOUT / CONTACT |
| Project Detail 레이어 | 캐러셀 카드 클릭 | 카드가 중앙에서 좌측으로 이동, 우측에 정보. 카드 플립(이미지, 정보) |
| About 레이어 | 하단 ABOUT | 한 화면에 한 섹션, 4장을 넘겨 본다 |
| Contact 레이어 | 하단 CONTACT | 이메일, GitHub, Instagram |
| `/work/:id` | 직접 URL | 상세 페이지. 앱 안에서 링크로 이동하지는 않는다(공유용 URL) |
| `*` | 없는 경로 | 404 |

```
[Splash] → [Home]
              ├─ 탭(All / UX / Visual / Vibe Coding) → 캐러셀 필터
              ├─ 카드 클릭 → [Project Detail 레이어] → 닫기 → [Home]
              ├─ ABOUT → [About 레이어: PROFILE / AWARD / ACTIVITIES / EXPERIENCE]
              └─ CONTACT → [Contact 레이어]
```

레이어 공통 동작은 `lib/useLayer.js`가 맡는다. 열림 시 포커스 이동, Tab 순환, Escape 닫기, 닫힌 뒤 트리거로 포커스 복귀, body 스크롤 잠금.

---

## 2. About 레이어 (페이지형)

한 화면을 꽉 채우고 넘겨 본다. 한 장에는 한 종류의 정보만 둔다.

| 장 | id | 내용 | 데이터 |
|---|---|---|---|
| 01 | profile | 사진, ABOUT, INTERESTED IN, CHARACTER, EDUCATION, GPA, TOOLS | `profile.intro/interests/character/education/gpa/skills/skillTags` |
| 02 | award | 수상 목록만 | `profile.awards` |
| 03 | activities | LEADERSHIP & ACTIVITIES 목록만 | `profile.activities` |
| 04 | experience | EXPERIENCE 목록만 | `profile.experience` |

- 이동: 상단 탭, 하단 이전/다음 버튼, 키보드 좌우 화살표, 모바일 좌우 스와이프.
- 목록 장은 다단(CSS columns)으로 채운다. 열 수: 768px 이상 2열, EXPERIENCE는 1280px 이상 3열. 768px 미만은 1열이며 장 내부에서 세로 스크롤한다.
- 1440x900 기준으로 설계했고, 그보다 큰 화면은 레이어 전체를 비율대로 확대한다(최대 2.5배).
- 전화번호와 생년월일은 데이터에는 있지만 화면에 노출하지 않는다.

---

## 3. Work 분류

캐러셀은 키보드로도 쓴다. 좌우 화살표로 회전, Enter 또는 Space로 중앙 카드의 상세를 연다.

탭은 4개다. 같은 프로젝트는 대표 타입 하나로만 분류한다.

| 탭 | type | 개수(2026-10) | 상세 구성 |
|---|---|---:|---|
| All | 전체 | 32 | UX, Vibe Coding, Visual 순으로 번호를 매긴다 |
| UX | `ux` | 9 | CONTRIBUTION, OUTCOME, AWARD, LINKS |
| Visual | `visual` | 15 | OBJECTIVE, STRATEGY, OUTCOME, TOOLS, AWARD, LINKS |
| Vibe Coding | `dev` | 8 | CONTRIBUTION, OUTCOME, AWARD, LINKS |

번호는 `HomePage`의 `numberMap`이 타입 순서(ux, dev, visual)로 부여한다.

---

## 4. 프로젝트 데이터 (`data/projects.js`)

### 필드

| 필드 | 용도 | 비고 |
|---|---|---|
| `id` | 식별자 | 유일해야 한다. 수상 연결 키 |
| `titleEn`, `titleKo`, `title` | 카드 제목, 상세 제목, 접근성 이름 | 상세 h1은 `titleEn` |
| `label` | 카드 상단 분류 문구 | |
| `oneLiner` | 한 줄 소개 | |
| `summary` | 소개 문단 | 선택 |
| `type`, `category` | 탭 분류, 시각 작품 하위 분류 | |
| `period` | 기간 | |
| `accent` | 프로젝트 고유색 | 카드 배경은 원색. 글자와 테두리는 `readableAccent`로 보정 |
| `thumbnail`, `gallery`, `pdfUrl`, `links` | 미디어와 링크 | |
| `role`, `contribution` | 역할, 기여도 | |
| `objective`, `strategy`, `outcome`, `tools` | 시각 작품 본문 | `outcome`에는 수상을 쓰지 않는다 |
| `flipInfoMode`, `flipImageMode`, `flipLandscape` | 카드 플립 방식 | |

### 수상 연결 (단일 출처)

수상은 `data/profile.js`의 `awards`에만 쓴다. 프로젝트와 관련된 수상은 항목에 `project: '<프로젝트 id>'`를 붙인다. 상세 레이어가 이 값을 읽어 AWARD 블록을 자동으로 만든다.

- About의 AWARD와 상세의 AWARD가 어긋날 수 없다.
- 연결하려면 수상명이나 기존 `outcome`에 프로젝트 근거가 있어야 한다. 근거가 없으면 연결하지 않는다.
- `outcome`에는 수상 이외의 성과만 쓴다(정량 지표, 협업, 후속 계획).

### 상세 공통 순서

타입 라벨 → 제목 → 한 줄 소개 → summary → 썸네일(UX, Vibe Coding) → 타입별 블록 → ROLE, PERIOD → TOOLS 칩(시각 외).

---

## 5. 표기 규칙

- 가운데점(`·`)은 쓰지 않는다. 역할이나 병렬 명사는 `/`(기획/디자인), 문장 속 병렬은 "와/과", 구분용 점은 제거하거나 쉼표로 쓴다. 코드 주석은 제외한다.
- 수상명은 Figma 프로파일의 전체 문구를 따르고 따옴표는 뺀다.
- 한다체와 명사형 소제목, 과장 금지.

---

## 6. Contact

- 이메일: mailto
- GitHub: `github.com/hyunho2378`
- Instagram: `@hyunhoj479`

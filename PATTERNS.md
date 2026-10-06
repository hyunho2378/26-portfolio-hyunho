# PATTERNS.md

> 2026-10 주의: 2절(Work 그리드 카드)과 3절(타입 탭의 그리드 전제)은 초기 계획이다. 현재 홈은 부채꼴 캐러셀이며 구조는 IA.md, COMPONENTS.md가 기준이다.

> 반복 UI 패턴. 임의 변형 금지. 새 패턴 필요 시 이 문서에 먼저 추가.

---

## 1. 섹션 리듬

```
SectionLabel (아이브로우, accent, 대문자)
  ↓ space.4
헤드라인 (type.h2)
  ↓ space.8
콘텐츠
```

섹션 상하 패딩 `space.20`(md 이상), 모바일 `space.12`. 컨테이너 1680px 중앙, `pagePadX` clamp.

---

## 2. 프로젝트 카드 (Work 그리드)

- 항상 보임. 호버에 정보 의존 금지.
- 구조: 썸네일(16/10) → 메타 바(제목 + accent 점 / 타입·기간).
- 기본: `border-line/0` 또는 투명. 호버: `border-line` + opacity 미세 변화. **scale 금지.**
- focus-visible: accent 2px 링.
- 전체가 링크. `<Link>` 우선, 불가 시 role=link + tabIndex0 + onKeyDown(Enter/Space).

```
[ 썸네일                    ]
[ ● 제목                    ]
[ UX · 2026                 ]
```

---

## 3. 타입 탭

- 가로 나열. 활성 = accent 텍스트 + 하단 2px accent 바. 비활성 = muted, 호버 시 paper.
- `role="tablist"`, 각 탭 `role="tab"` + `aria-selected`. 좌우 화살표로 이동, Enter/Space 선택.
- 탭 전환은 즉시(필터). 진입 reveal만 opacity.

---

## 4. 이력 리스트 (year + text)

```
[year]  [text]                tier: star=accent강조 / normal=기본 / faint=muted
```

- 좌측 연도(고정폭, mono 톤), 우측 항목. 행 구분 `line` 보더.
- AWARDS/ACTIVITIES/EXPERIENCE: star 3~4개 노출 후 `CollapsibleList`로 "+N개 더보기 / 접기".
- 더보기 토글은 `useState`. 펼침 높이 transition(또는 즉시). reduced-motion 즉시.

---

## 5. 스킬 바

```
[아이콘 24px] 도구명            [============------]  90%
```

- 트랙 `line`, 채움 `accent`(또는 무채색 paper/40). 라벨 + 우측 %.
- 진입 시 width 0→% transition 600ms. reduced-motion 즉시 %.
- 아이콘 없으면 24px 원형(`border-line`)으로 자리 표시.
- % 없는 도구는 막대 대신 Tag로.

---

## 6. 라이트박스 (visual 상세)

- 썸네일 그리드 클릭 → 전체화면 오버레이(`bg-ink/90`).
- 좌/우 이동, Esc 닫기, 배경 클릭 닫기. `role="dialog"` + `aria-modal`.
- 이미지 `object-contain`, max 90vw/90vh. 캡션(alt) 하단.
- 전환 opacity만. scale 금지.

---

## 7. PDF 뷰어 (ux 상세)

- `<iframe>` 또는 `<object>`로 인라인 표시. 높이 `min(80vh, ...)`.
- 상단 "새 탭에서 열기" + "다운로드" 링크 보조 제공(모바일 인라인 실패 대비).

---

## 8. 라이브 링크/임베드 (dev 상세)

- 단일 링크: 큰 "라이브 사이트 열기" 버튼(새 탭, noopener).
- 멀티 링크(강릉페이/AXIOM): 링크 버튼 리스트.
- 임베드 옵션: `<iframe>` 미리보기 + "새 탭 열기". 임베드는 보조, 새 탭이 기본.

---

## 9. 빈 상태 / 404

- 빈 타입 탭: 한 줄 안내(muted). 일러스트 남발 금지.
- 404: 미니멀. "페이지 없음" + 홈 링크.

---

## 10. 버튼 / 링크

- 기본: 텍스트 + 보더(line) 또는 텍스트만. 호버 opacity·border·color.
- accent 버튼은 강조 1개 한정(라이브 열기 등).
- 외부 링크 전부 `rel="noopener noreferrer"` + `target="_blank"`.
- 모든 인터랙티브 요소 focus-visible 스타일 필수.
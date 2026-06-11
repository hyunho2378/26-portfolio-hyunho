# ROUTES.md

> React Router v6. SPA. Vercel 배포 시 `vercel.json` rewrite fallback.

---

## 1. 라우트 테이블

| path | 컴포넌트 | 설명 |
|---|---|---|
| `/` | `HomePage` | 세로 스크롤: Hero · About · Work · Contact |
| `/work/:id` | `WorkDetailPage` | `:id` = projects.js id. 없으면 NotFound |
| `*` | `NotFoundPage` | 404 |

---

## 2. 구조

```jsx
// App.jsx (계승, 변경 없음)
<BrowserRouter>
  <ScrollToTop />
  <Routes>
    <Route element={<Layout />}>
      <Route path="/" element={<HomePage />} />
      <Route path="/work/:id" element={<WorkDetailPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Route>
  </Routes>
</BrowserRouter>
```

- `Layout` = Header + `<Outlet />` + Footer + F키 전체화면. (특강의 SectionDots·useFullpageNav 제거)
- `ScrollToTop`: 라우트 변경 시 스크롤 최상단.

---

## 3. 헤더 앵커 (라우트 아님)

홈 내 섹션 이동. 헤더 `WORK·ABOUT·CONTACT` → 섹션 id로 `scrollIntoView({behavior:'smooth'})`.

- 섹션 id: `hero · about · work · contact`
- 상세(`/work/:id`)에서 앵커 클릭 시: `navigate('/')` 후 해당 섹션으로(`location.state` 또는 hash). localStorage 금지.

---

## 4. 카드 클릭 분기

```
ProjectCard 클릭 → navigate(`/work/${id}`)  (항상 상세 경유)
  WorkDetailPage 에서 타입별:
   ├─ dev    → 라이브 링크 버튼(들) → 새 탭 (강릉페이 3 / AXIOM 2 / 그 외 1)
   ├─ ux     → PDF 뷰어 (웹형이면 라이브 링크)
   └─ visual → 갤러리/라이트박스 (외부 진입 없음)
```

특강의 "정면 카드만 새 탭 직행" 모델 폐기. 모든 카드 = 상세 경유(visual 포함, 상세가 갤러리).

---

## 5. WorkDetailPage 로직

```
const { id } = useParams()
const project = projects.find(p => p.id === id)
if (!project) → <NotFoundPage />
PageTransition 으로 감싸고 type 분기 렌더
```

---

## 6. vercel.json (계승)

```json
{ "rewrites": [{ "source": "/(.*)", "destination": "/" }] }
```

- Root Directory `client`. Build `npm run build`, Output `dist`.
- 배포: **기존 레포 이어가기 vs 새 레포** — STEP 0에서 확정(미정).
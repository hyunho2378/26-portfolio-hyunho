# ROUTES.md

> React Router v6. SPA. Vercel 배포 시 `vercel.json` rewrite fallback.

---

## 1. 라우트 테이블

| path | 컴포넌트 | 설명 |
|---|---|---|
| `/` | `HomePage` | 캐러셀 홈. About, Contact, Project Detail은 이 화면 위의 레이어 |
| `/work/:id` | `WorkDetailPage` | `:id` = projects.js id. 없으면 NotFound. 앱 안에서는 링크하지 않고 직접 URL로만 진입 |
| `*` | `NotFoundPage` | 404 |

```jsx
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

---

## 2. 레이어 (라우트 아님)

About, Contact, Project Detail은 URL이 바뀌지 않는다. 상태는 `HomePage`의 `useState`가 가진다(`aboutOpen`, `contactOpen`, `detail`). localStorage, sessionStorage는 쓰지 않는다.

---

## 3. 카드 클릭

```
StackCarousel pointerup → onSelect(project, rect) → HomePage.detail 설정 → ProjectDetail 레이어
```

- 클릭 판정은 6px 이하 이동일 때만 한다. 그 이상은 드래그로 본다.
- `comingSoon` 프로젝트는 상세를 열지 않는다.

---

## 4. vercel.json

```json
{ "rewrites": [{ "source": "/(.*)", "destination": "/" }] }
```

Root Directory `client`. Build `npm run build`, Output `dist`.

// tokens.js
// 주현호 인터랙티브 포트폴리오 / 디지털인문예술입문 특강 사이트
// 단일 진실 공급원(SSOT). 컴포넌트에서 색·간격·폰트 하드코딩 금지. 전부 여기서만.

export const color = {
    // 배경 계열
    ink: '#181818',

    // 텍스트 계열
    paper: '#FFFFFF',
    muted: 'rgba(255,255,255,0.8)',

    // 라인·구분 (보더 전용)
    line: 'rgba(255,255,255,0.12)',

    // 액센트 — 주현호 시그니처 핑크. 강조 텍스트·focus 링에만.
    accent: '#E27DA6',

    // 상태
    focus: 'rgba(226,125,166,0.55)',
    accentSoft: 'rgba(226,125,166,0.09)', // accent 호버 틴트

    // 레이어 배경(ink 기반 반투명). 컴포넌트에서 rgba를 직접 쓰지 않는다.
    overlay: {
        soft: 'rgba(24,24,24,0.80)',
        base: 'rgba(24,24,24,0.92)',
        strong: 'rgba(24,24,24,0.97)',
    },
}

// ink 위에 덮는 어둠 막. 깊이감처럼 값이 동적으로 변하는 곳에서만 사용.
export const inkAlpha = (a) => `rgba(24,24,24,${a})`

export const font = {
    display: "'Pretendard', sans-serif",
    body: "'Pretendard', sans-serif",
    mono: "'Pretendard', sans-serif",
}

// B형 반응형 타이포 (모바일 → 데스크탑). clamp로 연속 보간.
export const type = {
    hero: { size: 'clamp(40px, 9vw, 120px)', weight: 700, lh: 0.98, ls: '-0.02em', family: 'display' },
    h1: { size: 'clamp(28px, 3.6vw, 46px)', weight: 700, lh: 1.12, ls: '-0.01em', family: 'display' },
    h2: { size: 'clamp(24px, 2.8vw, 38px)', weight: 700, lh: 1.14, ls: '-0.01em', family: 'display' },
    h3: { size: 'clamp(20px, 2.2vw, 28px)', weight: 600, lh: 1.2, ls: '0', family: 'body' },
    bodyLg: { size: 'clamp(16px, 1.4vw, 18px)', weight: 400, lh: 1.6, ls: '0', family: 'body' },
    body: { size: 'clamp(15px, 1.2vw, 16px)', weight: 400, lh: 1.65, ls: '0', family: 'body' },
    small: { size: 'clamp(13px, 1vw, 14px)', weight: 400, lh: 1.5, ls: '0', family: 'body' },
    label: { size: '14px', weight: 700, lh: 1.3, ls: '0.16em', family: 'body' }, // 아이브로우(accent)
    caption: { size: '12px', weight: 400, lh: 1.4, ls: '0', family: 'body' },
    micro: { size: '11px', weight: 400, lh: 1.4, ls: '0', family: 'body' },
}

// 자간 토큰. 컴포넌트에서 letterSpacing 문자열을 직접 쓰지 않는다.
export const tracking = {
    tight: '-0.02em', snug: '-0.01em', none: '0',
    sm: '0.02em', md: '0.04em', lg: '0.06em', xl: '0.12em', label: '0.16em',
}

// 모션 토큰. 150/250/400/600ms 4단계 + 공통 감속 곡선.
export const motion = {
    fast: '150ms', base: '250ms', slow: '400ms', reveal: '600ms',
    ease: 'cubic-bezier(0.22,1,0.36,1)',
}

// 4pt 배수 간격
export const space = {
    1: '4px', 2: '8px', 3: '12px', 4: '16px', 5: '20px', 6: '24px',
    8: '32px', 10: '40px', 12: '48px', 16: '64px', 20: '80px', 24: '96px', 32: '128px',
}

export const layout = {
    breakpoints: { xs: 320, sm: 390, md: 768, lg: 1024, xl: 1280, '2xl': 1440, '3xl': 1920, '4xl': 2560 },
    containerMax: '1280px',     // 텍스트 섹션 최대 너비
    containerWide: '1440px',    // 와이드 섹션
    containerSite: '1680px',    // 포트폴리오 기본 컨테이너
    pagePadX: { base: '16px', md: '40px', xl: '64px' },
    radius: { sm: '4px', md: '8px', card: '12px', pill: '999px' }, // card=이미지 카드 전용
    touch: '44px', // 터치 타깃 최소
    infoMax: '520px', // 상세 우측 정보 열 최대 폭(읽기 폭)
    rule: '2px', // 밑줄, 구분선 두께
    track: '3px', // 숙련도 바 트랙 두께
    barMax: '200px', // 숙련도 바 최대 길이
}

export const shadow = {
    card: '0 18px 50px rgba(0,0,0,0.45)',
    soft: '0 8px 24px rgba(0,0,0,0.35)',
    // 실제 카드 느낌의 다층 그림자(가까운 면 + 멀리 퍼지는 면)
    poster: '0 2px 4px rgba(0,0,0,0.20), 0 8px 16px rgba(0,0,0,0.28), 0 20px 48px rgba(0,0,0,0.40)',
    posterActive: '0 4px 8px rgba(0,0,0,0.24), 0 16px 32px rgba(0,0,0,0.34), 0 36px 80px rgba(0,0,0,0.50)',
}

// 3D 코버플로우 캐러셀 튜닝값 (원본 gradientslider script.js 상수 이식, scale 계열 제외)
export const carousel = {
    perspective: 1800,  // .stage perspective(px)
    maxRotation: 28,    // 카드 최대 rotateY(deg)
    maxDepth: 180,   // 카드 최대 translateZ 후퇴(px). scale 제거분 보정해 원본 140→180 상향
    gap: 28,    // 카드 간 간격(px)
    friction: 0.9,   // 속도 감쇠 (낮을수록 마찰 큼)
    wheelSens: 0.6,   // 휠 민감도
    dragSens: 1.0,   // 드래그 민감도
    cardWidth: 'min(36vw, 500px)', // 가로형 카드
    cardAspect: '16 / 10',
    cardWidthPortrait: 'min(20vw, 264px)', // 세로형(모바일) 카드 폭
    cardAspectPortrait: '9 / 16',          // 세로형 비율
    flipPerspective: '1400px', // 상세 카드 플립 원근
    autoRotate: 0.15,  // idle 자동 회전 속도(px/frame). 0이면 비활성
}

export default { color, font, type, tracking, motion, space, layout, shadow, carousel }
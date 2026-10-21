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
    labelLg: { size: 'clamp(14px, 0.75vw, 20px)', weight: 700, lh: 1.3, ls: '0.16em', family: 'body' }, // 홈 상단(큰 화면에서 커짐)
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

// iOS 26 키트(Figma qjJ2EH6y1qJOEJAf95bZCv) 값 이식. 페이지 Tab Bars, Materials.
// Tab Bar - iPhone (Minimized=False, Tabs=3, Type=Default): 높이 95, 패딩 위16 좌우68 아래25, 탭 54 높이, 반경 1000.
// _Tab Bar Button - iPhone: 아이콘 18/28, 라벨 10/12 weight 590, 아이콘과 라벨 간격 1, 탭 패딩 6 8 7 8.
// Liquid Glass - Regular Mode=Dark: Fill rgba(26,26,26,.7), 그림자 0 8 48 rgba(0,0,0,.45), 림 0.5px #A6A6A6.
// Glass Button Dark(Active=False): rgba(118,118,128,.12) + 0.5px 림.
export const ios = {
    margin: '20px',          // 화면 좌우 기본 여백(HIG layout margin)
    tabBar: {
        padTop: '16px',
        padBottom: '25px',
        padX: '68px',
        height: '54px',      // 캡슐 높이(=탭 높이)
        tabMinW: '72px',
        radius: '1000px',
        tabRadius: '100px',
        tabPad: '6px 8px 7px',
        iconBox: '28px',
        icon: 18,
        label: '10px',
        labelLh: '12px',
        labelWeight: 590,
        gap: '1px',
        // 화면 하단에서 탭바가 차지하는 높이(캡슐 54 + 위 16 + 아래 max(25, 세이프에어리어))
        space: 'calc(54px + 16px + max(25px, env(safe-area-inset-bottom)))',
    },
    glass: {
        fill: 'rgba(26,26,26,0.70)',
        blur: 'blur(24px) saturate(180%)',
        shadow: '0 8px 48px rgba(0,0,0,0.45), 0 0 0 0.5px rgba(166,166,166,0.55), inset 1.25px 0 0 -0.75px rgba(166,166,166,0.6), inset -1.25px 0 0 -0.75px rgba(166,166,166,0.6)',
        selected: 'rgba(118,118,128,0.24)',
        selectedRim: '0 0 0 0.5px rgba(230,230,230,0.18)',
        label: '#F5F5F5',
    },
    sheetEase: 'cubic-bezier(0.32,0.72,0,1)', // iOS 시트 감속 곡선
}

export default { color, font, type, tracking, motion, space, layout, shadow, carousel, ios }
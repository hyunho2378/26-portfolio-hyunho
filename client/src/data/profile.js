// profile.js — Hero / About / Footer (화면용)
// tier: 'star'=accent 텍스트 강조(크기 동일), 'normal'=기본, 'faint'=muted

export const profile = {
  name: '주현호',
  nameEn: 'JU HYUNHO',
  eyebrow: 'PRODUCT DESIGNER',
  headline: '기술의 흐름 위에서, 사람의 방향으로',
  intro: '피그마에서 멈추지 않습니다.\n문제를 정의하고 구조를 설계해 직접 배포합니다.',
  majors: '디지털인문예술전공 / 스타트업비즈니스전공',
  photo: '/profile.jpg',
  logo: '/logo-ho.svg',

  // About — 관심 분야
  interests: ['UX·UI', 'BX', 'Product Design', 'Vibe Coding'],

  // About — 성격 (plain strings)
  character: ['창의적인', '끈기있는', '기발한', '열정적인', '꼼꼼한'],

  // About — GPA
  gpa: {
    all: '4.28',
    major: '4.5',
    max: '4.5',
    ranks: [
      { term: '2025-2', score: '4.5', rank: '1/92' },
      { term: '2025-1', score: '4.5', rank: '1/102' },
    ],
  },

  // About — Tools (숙련도 바)
  skills: [
    { name: 'Illustrator', pct: 90, icon: null },
    { name: 'Antigravity', pct: 85, icon: '/logos/antigravity.svg' },
    { name: 'Premiere', pct: 83, icon: null },
    { name: 'Photoshop', pct: 80, icon: null },
    { name: 'Figma', pct: 70, icon: '/logos/figma.svg' },
  ],

  // About — Tools (태그)
  skillTags: [
    { label: 'Claude Code', icon: '/logos/claudecode.svg' },
    { label: 'React', icon: null },
    { label: 'Vite', icon: null },
    { label: 'Tailwind', icon: null },
    { label: 'Vercel', icon: null },
    { label: 'NeonDB', icon: null },
    { label: 'Render', icon: null },
  ],

  // About — LEADERSHIP & ACTIVITIES (roles 병합됨)
  activities: [
    // roles 항목 (star, 상단 배치)
    { year: '2026', text: '제1대 디지털인문예술전공 운영위원회 LUCID 위원장', tier: 'star', accent: true },
    { year: '2026', text: '디지털인문예술전공 전공 대표', tier: 'star', accent: true },
    { year: '2026', text: '26-1 디지털인문예술입문 교과목 멘토', tier: 'star' },
    // activities 항목
    { year: '2026', text: 'Korea Design Membership Plus (KDM+) 7기', tier: 'star', accent: true },
    { year: '2026', text: '창업동아리 Glow Wellness 콘텐츠 제작팀장', tier: 'normal' },
    { year: '2026', text: '한림대학교 Station C 제작 서포터즈', tier: 'normal' },
    { year: '2026', text: 'UX Study with 김성우 교수', tier: 'normal' },
    { year: '2025', text: '제7대 디지털인문예술전공 학생회 CUBE 임원', tier: 'normal' },
    { year: '2025', text: '시각디자인 동아리 I-SO 부회장', tier: 'normal' },
    { year: '2025', text: 'UX·UI 동아리 더 인스튜디오 부원', tier: 'normal' },
    { year: '2025', text: '창업동아리 GLOW IN 디자이너', tier: 'normal' },
    { year: '2025', text: '제41대 사생위원회 이음 편집기획국 부장', tier: 'normal' },
    { year: '2022', text: '제21회 미디어스쿨 비상제 Share 드라마팀', tier: 'faint' },
    { year: '2022', text: '미디어스쿨 영상 동아리 Time Project+ 부원', tier: 'faint' },
  ],

  awards: [
    { year: '2026', text: "26-1 지역사회 문제해결 PBL 경진대회 'N9 HAIR SALON 예약 시스템' 최우수상", tier: 'star' },
    { year: '2026', text: '제18회 디지털인문예술전공 프로젝트 전시회 포스터 공모전 최우수상', tier: 'star' },
    { year: '2025', text: "제17회 디지털인문예술전공 프로젝트 전시회 '디자인씽킹기초' 최우수상", tier: 'star' },
    { year: '2025', text: '제4회 강원디자인전람회 강원디자인랩 플랫폼 리디자인 협회장상', tier: 'star' },
    { year: '2026', text: "제18회 디지털인문예술전공 프로젝트 전시회 'UX디자인' 우수상", tier: 'normal' },
    { year: '2026', text: "제18회 디지털인문예술전공 프로젝트 전시회 '디인예 전공 동아리' 우수상", tier: 'normal' },
    { year: '2026', text: "26-1 지역사회 문제해결 PBL 경진대회 '강릉 로컬 결제 경험 개선' 우수상", tier: 'normal' },
    { year: '2025', text: '제4회 강원디자인전람회 강원디자인랩 CI 디자인 입선', tier: 'normal' },
    { year: '2025', text: '제4회 강원디자인전람회 강원디자인랩 리플렛 디자인 입선', tier: 'normal' },
    { year: '2025', text: '제3회 디지털인문예술전공 프로젝트 전시회 포스터 공모전 우수상', tier: 'normal' },
    { year: '2025', text: '춘천시 춘천여행 SNS 공모전 우수상', tier: 'normal' },
    { year: '2025', text: "제16회 디지털인문예술전공 프로젝트 전시회 '디지털디자인1' 우수상", tier: 'normal' },
    { year: '2025', text: "제16회 디지털인문예술전공 프로젝트 전시회 '문화콘텐츠기초' 우수상", tier: 'normal' },
  ],

  experience: [
    { year: '2026', text: '디지털인문예술전공 AX 전환', tier: 'star', accent: true },
    { year: '2026', text: '제18회 디지털인문예술전공 프로젝트 전시회 웹사이트 제작', tier: 'star', accent: true },
    { year: '2026', text: '제4회 포스터 공모전 웹사이트 제작', tier: 'star', accent: true },
    { year: '2026', text: '제1회 신규 캐릭터 공모전 웹사이트 제작', tier: 'star', accent: true },
    { year: '2026', text: '동해시 AX 전환 연구 과제 with 김성우 교수', tier: 'normal' },
    { year: '2026', text: '디지털인문예술전공 전공박람회 부스 운영', tier: 'normal' },
    { year: '2026', text: '디지털인문예술전공 프로젝트 전시회 총괄 운영', tier: 'normal' },
    { year: '2025', text: '한림대-달랏대 국제협력 AI 워크숍 HIVE PROJECT 수료', tier: 'normal' },
    { year: '2025', text: '디지털인문예술전공 공식 웹사이트 리뉴얼', tier: 'normal' },
    { year: '2025', text: '미래내일 일경험 프로젝트 수료', tier: 'normal' },
    { year: '2025', text: '멈블 앰버서더 1기 수료', tier: 'normal' },
  ],

  education: [
    { year: '2026', text: '스타트업비즈니스 복수전공', tier: 'normal' },
    { year: '2026', text: '디지털인문예술전공 전과', tier: 'normal' },
    { year: '2024', text: '제60보병사단 정보통신대대 병장 만기 전역', tier: 'normal' },
    { year: '2023', text: '디지털인문예술 복수전공', tier: 'normal' },
    { year: '2022', text: '한림대학교 미디어스쿨 입학', tier: 'normal' },
    { year: '2021', text: '강릉고등학교 졸업', tier: 'normal' },
  ],

  contacts: {
    email: 'ekjjodia@naver.com',
    github: 'https://github.com/hyunho2378',
    instagram: '',
  },
}

export default profile
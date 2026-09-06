// profile.js — Hero / About / Footer (화면용)
// tier: 'star'=accent 텍스트 강조(크기 동일), 'normal'=기본, 'faint'=muted

export const profile = {
  name: '주현호',
  nameEn: 'JU HYUNHO',
  eyebrow: 'PRODUCT DESIGNER',
  headline: '기술의 흐름 위에서, 사람의 방향으로',
  intro: '피그마에서 멈추지 않습니다. 문제를 정의하고 구조를 설계해, 직접 배포합니다.',
  majors: '디지털인문예술전공 / 스타트업비즈니스전공',
  photo: '/profile.jpg',
  logo: '/logo-ho.svg',
  birth: '2003. 11. 26',

  // About — 관심 분야
  interests: ['UX·UI', 'BX', 'Product Design', 'Vibe Coding', 'Data Analysis', 'Graphic & Package Design'],

  // About — 성격 (plain strings)
  character: ['창의적인', '끈기있는', '기발한', '열정적인', '꼼꼼한'],

  // About — GPA
  gpa: {
    all: '4.33',
    major: '4.5',
    max: '4.5',
    ranks: [
      { term: '2026-1', score: '4.5', rank: '1/13' },
      { term: '2025-2', score: '4.5', rank: '1/102' },
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

  // About — LEADERSHIP & ACTIVITIES
  activities: [
    { year: '2026', text: '제1대 디지털인문예술전공 운영위원회 LUCID 위원장', tier: 'star', accent: true },
    { year: '2026', text: '디지털인문예술전공 전공 대표', tier: 'star', accent: true },
    { year: '2026', text: 'University Impact Alliance (UIA) 1기 한림대학교 대표', tier: 'star', accent: true },
    { year: '2026', text: 'Korea Design Membership Plus (KDM+) 7기', tier: 'star', accent: true },
    { year: '2026', text: '한림대학교 Station C 제작 서포터즈', tier: 'normal' },
    { year: '2026', text: '26-1 디지털인문예술입문 교과목 멘토', tier: 'normal' },
    { year: '2026', text: '동해시 AX 연구 with 김성우 교수', tier: 'normal' },
    { year: '2026', text: 'UX Study with 김성우 교수', tier: 'normal' },
    { year: '2026', text: '창업동아리 Glow Wellness 콘텐츠 제작팀장', tier: 'normal' },
    { year: '2025', text: '제7대 디지털인문예술전공 학생회 CUBE 임원', tier: 'normal' },
    { year: '2025', text: '시각디자인 동아리 I-SO 부회장', tier: 'normal' },
    { year: '2025', text: 'UX·UI 동아리 더 인스튜디오 부원', tier: 'normal' },
    { year: '2025', text: '창업동아리 GLOW IN 디자이너', tier: 'normal' },
    { year: '2025', text: '제41대 사생위원회 이음 편집기획국 부장', tier: 'normal' },
    { year: '2022', text: '제21회 미디어스쿨 비상제 Share 드라마팀', tier: 'faint' },
    { year: '2022', text: '미디어스쿨 연합 동아리 학술제 ALT 예고편팀', tier: 'faint' },
    { year: '2022', text: '미디어스쿨 영상 동아리 Time Project+ 부원', tier: 'faint' },
  ],

  awards: [
    { year: '2026', text: '앵커 AI-Solution AI 활용 지역문제 현안 해결 경진대회 강릉페이 UX 개선 프로젝트 우수상(한국연구재단 이사장상)', tier: 'star' },
    { year: '2026', text: '동해시 AI 지역 문제 해결 아이디어톤 동해시 디지털/AI 전환 부작용 해소 대상(동해시장상)', tier: 'star' },
    { year: '2026', text: '2026-1 지역사회 문제해결 PBL 경진대회 N9 HAIR SALON 예약 시스템 최우수상(총장상)', tier: 'star' },
    { year: '2026', text: '2026-1 지역사회 문제해결 PBL 경진대회 강릉 시민을 위한 로컬 결제 경험 개선 프로젝트 우수상(총장상)', tier: 'star' },
    { year: '2026', text: 'AI 활용 대학생 로컬임팩트 포럼 N9 HAIR SALON 예약 시스템 최우수상', tier: 'star' },
    { year: '2025', text: '제4회 강원디자인전람회 강원디자인랩 플랫폼 리디자인 강원디자인협회장상', tier: 'star' },
    { year: '2026', text: 'Korea Design Membership Plus(KDM+) 강원지부 생성형 AI 워크숍 몰입형 펜싱 XR 우수상', tier: 'normal' },
    { year: '2026', text: 'Station C 글로컬 솔버톤 @춘천 스마트 모빌리티 플랫폼 우수상', tier: 'normal' },
    { year: '2026', text: 'University Impact Alliance(UIA) 임팩톤 @춘천 청소년 도서관 활성화 우수상', tier: 'normal' },
    { year: '2026', text: '제18회 디지털인문예술전공 프로젝트 전시회 강릉페이 UX 개선 프로젝트 우수상', tier: 'normal' },
    { year: '2026', text: '제18회 디지털인문예술전공 프로젝트 전시회 춘천 계절 연구소 2D/3D 디자인 우수상', tier: 'normal' },
    { year: '2026', text: '2026-1 디지털인문예술전공 프로젝트 전시회 포스터 공모전 최우수상', tier: 'normal' },
    { year: '2025', text: '제4회 강원디자인전람회 강원디자인랩 CI 디자인 입선', tier: 'normal' },
    { year: '2025', text: '제4회 강원디자인전람회 강원디자인랩 리플렛 디자인 입선', tier: 'normal' },
    { year: '2025', text: '제17회 디지털인문예술전공 프로젝트 전시회 인제 원통시장 활성화 프로젝트 최우수상(총장상)', tier: 'normal' },
    { year: '2025', text: '제3회 디지털인문예술전공 프로젝트 전시회 포스터 공모전 우수상', tier: 'normal' },
    { year: '2025', text: '춘천여행 SNS 공모전 물과 불이 하나되는 마임축제 우수상', tier: 'normal' },
    { year: '2025', text: '제16회 디지털인문예술전공 프로젝트 전시회 음악 앨범 리디자인 우수상', tier: 'normal' },
    { year: '2025', text: '제16회 디지털인문예술전공 프로젝트 전시회 밈 분석 포스터 우수상', tier: 'normal' },
  ],

  experience: [
    { year: '2026', text: '디지털인문예술전공 AX 전환', tier: 'star', accent: true },
    { year: '2026', text: '2026-1 디지털인문예술전공 프로젝트 전시회 웹사이트 제작', tier: 'star', accent: true },
    { year: '2026', text: '디지털인문예술전공 신규 캐릭터 공모전 웹사이트 제작', tier: 'star', accent: true },
    { year: '2026', text: '2026-1 디지털인문예술전공 프로젝트 전시회 포스터 공모전 웹사이트 제작', tier: 'star', accent: true },
    { year: '2026', text: '디지털인문예술전공 운영위원회 링크트리 웹사이트 제작', tier: 'star', accent: true },
    { year: '2026', text: 'Google Sheet 연동 Apps Script 전시회 자동 접수·수정 폼 제작', tier: 'normal' },
    { year: '2026', text: '비수도권 2030 대상 웰니스 서비스 디자인', tier: 'normal' },
    { year: '2026', text: '올리브영 앱 맨즈에딧 UX 개선', tier: 'normal' },
    { year: '2026', text: '강릉페이 UX 개선', tier: 'normal' },
    { year: '2026', text: 'N9 1인 미용실 무간섭 서비스 디자인', tier: 'normal' },
    { year: '2026', text: 'AI 기반 판매자 정산 누락 자동 탐지 및 클레임 대행 서비스 디자인', tier: 'normal' },
    { year: '2026', text: '20대 한국인/외국인 혼밥러를 위한 로컬 식당 탐색 및 공간 서비스 CX 디자인', tier: 'normal' },
    { year: '2026', text: 'KDM+ 통합 산학 프로젝트: 1020세대 유입 및 체류시간 증대를 위한 네이버 신규 서비스 기획', tier: 'normal' },
    { year: '2026', text: '디지털인문예술전공 전공박람회 부스 운영', tier: 'normal' },
    { year: '2026', text: '동해시 AX 전환 연구 과제 with 김성우 교수', tier: 'normal' },
    { year: '2026', text: '디지털인문예술전공 동아리 전시회 운영', tier: 'normal' },
    { year: '2026', text: '디지털인문예술전공 개강/종강 총회 총괄 운영', tier: 'normal' },
    { year: '2026', text: '디지털인문예술전공 프로젝트 전시회 총괄 운영', tier: 'normal' },
    { year: '2026', text: '디지털인문예술전공 신규 캐릭터 공모전 기획/운영', tier: 'normal' },
    { year: '2025', text: '기상 데이터 기반 실시간 달랏 여행 큐레이션 웹 서비스 개발', tier: 'normal' },
    { year: '2025', text: '달랏대학교 한국어 학습자를 위한 AI 활용 발음 분석 스피치 앱 개발', tier: 'normal' },
    { year: '2025', text: '한림대학교-달랏대학교 국제협력 AI 워크숍(HIVE PROJECT) 수료', tier: 'normal' },
    { year: '2025', text: '디지털인문예술전공 공식 웹사이트 리뉴얼', tier: 'normal' },
    { year: '2025', text: '디지털인문예술전공 공식 리플렛 리뉴얼', tier: 'normal' },
    { year: '2025', text: '디지털인문예술 프로젝트 전시회 배너 디자인', tier: 'normal' },
    { year: '2025', text: '제17회 디지털인문예술 프로젝트 전시회 웹사이트 제작', tier: 'normal' },
    { year: '2025', text: '제3회 디지털인문예술전공 프로젝트 전시회 포스터 공모전 웹사이트 제작', tier: 'normal' },
    { year: '2025', text: '강원디자인진흥원 온라인 역량 강화 플랫폼 강원디자인랩 CI 디자인', tier: 'normal' },
    { year: '2025', text: '미래내일 일경험 프로젝트(프로젝트형) 수료', tier: 'normal' },
    { year: '2025', text: '강원콘텐츠페스타 디지털인문예술전공 부스 운영', tier: 'normal' },
    { year: '2025', text: '멈블 앰버서더 1기 수료', tier: 'normal' },
  ],

  education: [
    { year: '2026', text: '스타트업비즈니스 복수전공', tier: 'normal' },
    { year: '2026', text: '디지털인문예술전공 전과', tier: 'normal' },
    { year: '2024', text: '제60보병사단 정보통신대대 병장 만기 전역', tier: 'normal' },
    { year: '2023', text: '디지털인문예술 복수전공', tier: 'normal' },
    { year: '2023', text: '디지털미디어콘텐츠전공 선택', tier: 'normal' },
    { year: '2022', text: '한림대학교 미디어스쿨 입학', tier: 'normal' },
    { year: '2021', text: '강릉고등학교 졸업', tier: 'normal' },
  ],

  contacts: {
    email: 'ekjjodia@naver.com',
    github: 'https://github.com/hyunho2378',
    instagram: 'hyunhoj479',
    phone: '+82-10-7262-2378',
  },
}

export default profile
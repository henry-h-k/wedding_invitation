const CONFIG = {
  // ──────────────────────────────────────────────
  // 신랑 & 신부 정보
  // ──────────────────────────────────────────────
  groom: {
    lastName: "오",
    firstName: "세영",
    engName: "Seyeong Oh",
    fatherName: "오일권",
    motherName: "최순옥",
    fatherSuffix: "의 아들",
    motherSuffix: "",
    phone: "912-633-8642",
    account: {
      bank: "Zelle",
      number: "9126338642",
      holder: "Seyeong Oh",
    },
  },

  bride: {
    lastName: "김",
    firstName: "현화",
    engName: "Hyunhwa Kim",
    fatherName: "김종호",
    motherName: "장효정",
    fatherSuffix: "의 딸",
    motherSuffix: "",
    phone: "765-760-4050",
    account: {
      bank: "Zelle",
      number: "7657604050",
      holder: "Hyunhwa Kim",
    },
  },

  // ──────────────────────────────────────────────
  // 예식 정보 (미국 / 한국 두 곳)
  // ──────────────────────────────────────────────
  weddings: [
    {
      label: "한국",
      date: "2026-07-13",       // YYYY-MM-DD
      time: "14:00",            // HH:MM (24시간)
      dayOfWeek: "월요일",
      locationName: "수원 화성",
      locationHall: "화성 행궁",
      locationAddress: "경기 수원시 팔달구 정조로 825",
      locationTel: "02-1004-1004",
      lat: 37.5200,
      lng: 127.0474,
      mapLinks: [
        { name: "Google Maps", url: "https://maps.google.com/?q=수원+화성&center=37.2886,127.0151&zoom=15" },
      ],
    },
    {
      label: "미국",
      date: "2026-07-30",       // YYYY-MM-DD
      time: "15:00",            // HH:MM (24시간)
      dayOfWeek: "목요일",
      locationName: "Alabama",
      locationHall: "NorthRiver Yacht Club",
      locationAddress: "3100 Yacht Club Way Northeast • Tuscaloosa • AL 35406",
      locationTel: "1004-1004",
      lat: 41.0115,
      lng: -74.0125,
      mapLinks: [
        { name: "Google Maps", url: "https://maps.google.com/?q=The+Estate+at+Florentine+Gardens" },
      ],
    },
  ],

  // ──────────────────────────────────────────────
  // 인사말
  // ──────────────────────────────────────────────
  greeting: {
    title: "소중한 분들을 초대합니다",
    message: `서로 다른 길을 걸어온 두 사람이
마주 보며 같은 길을 걷고자 합니다.

귀한 걸음 하시어
따뜻한 축복으로 함께해 주시면
더없는 기쁨이 되겠습니다.`,
  },

  // ──────────────────────────────────────────────
  // 이미지 설정
  // config/images/ 폴더에 이미지를 넣고 파일명을 지정하세요
  // ──────────────────────────────────────────────
  images: {
    main: "config/images/main.jpeg",             // 메인 커버 이미지
    gallery: [
      "config/images/gallery-1.jpg",
      "config/images/gallery-2.jpg",
      "config/images/gallery-3.jpg",
      "config/images/gallery-4.jpg",
      "config/images/gallery-5.jpg",
      "config/images/gallery-6.jpg",
      "config/images/gallery-7.jpg",
      "config/images/gallery-8.jpg",
      "config/images/gallery-9.jpg",
      "config/images/gallery-10.jpg",
    ],
  },

  // ──────────────────────────────────────────────
  // 디자인 테마
  // ──────────────────────────────────────────────
  theme: {
    primaryColor: "#b08968",        // 메인 포인트 색상
    backgroundColor: "#faf9f6",     // 배경색
    textColor: "#3a3a3a",           // 본문 텍스트 색상
    lightTextColor: "#8a8a8a",      // 보조 텍스트 색상
    accentColor: "#ddb892",         // 강조 색상
    fontFamily: "'Noto Serif KR', 'Georgia', serif",
  },

  // ──────────────────────────────────────────────
  // 카카오 API (카카오맵 & 공유에 필요)
  // https://developers.kakao.com 에서 발급
  // ──────────────────────────────────────────────
  kakaoApiKey: "",

  // ──────────────────────────────────────────────
  // 기타 설정
  // ──────────────────────────────────────────────
  meta: {
    title: "세영 ♥ 현화 결혼합니다",
    description: "2026년 7월 13일 월요일, 경기도 수원",
    ogImage: "config/images/main.jpeg",
  },
};

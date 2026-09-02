# 모바일 청첩장 템플릿

GitHub Pages로 호스팅 가능한 모바일 청첩장 템플릿입니다.

## 프로젝트 구조

```
wedding_invitation/
├── index.html              # 메인 페이지
├── css/style.css           # 스타일시트
├── js/main.js              # 인터랙션 로직
├── config/
│   ├── config.js           # ⭐ 설정 파일 (여기만 수정하면 됩니다)
│   └── images/             # 이미지 폴더
│       ├── main.jpg        # 메인 커버 사진
│       ├── gallery-1.jpg   # 갤러리 사진 1
│       ├── gallery-2.jpg   # 갤러리 사진 2
│       └── ...
└── README.md
```

## 사용 방법

### 1. 이미지 준비

`config/images/` 폴더에 이미지를 넣으세요:

| 파일명 | 용도 | 권장 사이즈 |
|--------|------|-------------|
| `main.jpg` | 메인 커버 사진 | 세로형 (3:4 비율) |
| `gallery-1.jpg` ~ `gallery-6.jpg` | 갤러리 사진 | 세로형 (3:4 비율) |

갤러리 사진 개수는 자유롭게 조절 가능합니다. `config.js`의 `images.gallery` 배열을 수정하세요.

### 2. 설정 파일 수정

`config/config.js` 파일을 열어서 내용을 수정합니다:

- **신랑/신부 정보**: 이름, 부모님 성함, 연락처, 계좌번호
- **예식 정보**: 날짜, 시간, 장소, 주소, 지도 좌표
- **인사말**: 제목과 본문
- **이미지 경로**: 사용할 이미지 파일명
- **디자인 테마**: 색상, 폰트
- **카카오 API 키**: 카카오맵, 카카오톡 공유용

### 3. 카카오 API 설정 (선택)

카카오맵과 카카오톡 공유 기능을 사용하려면:

1. [Kakao Developers](https://developers.kakao.com)에서 앱을 생성
2. JavaScript 키를 `config.js`의 `kakaoApiKey`에 입력
3. 앱 설정에서 사이트 도메인을 등록 (예: `https://username.github.io`)

### 4. GitHub Pages 배포

1. GitHub에 새 레포지토리를 생성합니다
2. 이 프로젝트 파일들을 push합니다
3. 레포지토리 Settings → Pages → Source를 `main` 브랜치로 설정
4. `https://username.github.io/repo-name/` 으로 접속 가능

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/username/repo-name.git
git push -u origin main
```

## 섹션 구성

1. **커버** - 메인 사진, 신랑/신부 이름, 예식 일시
2. **인사말** - 초대 메시지, 양가 부모님 소개
3. **갤러리** - 사진 슬라이더 (스와이프 지원)
4. **캘린더** - 달력 + D-day 카운트
5. **오시는 길** - 카카오맵 + 네이버지도/카카오맵/주소복사 버튼
6. **마음 전하실 곳** - 양가 계좌번호 (접기/펼치기)
7. **공유하기** - 카카오톡 공유, 링크 복사
8. **하단** - 신랑/신부 전화 연결

## 커스터마이징 예시

### 색상 변경

```js
theme: {
  primaryColor: "#7b6b5d",     // 포인트 색상
  backgroundColor: "#f8f6f3",  // 배경색
  accentColor: "#c4a882",      // 강조 색상
}
```

### 갤러리 사진 수 조절

```js
images: {
  gallery: [
    "config/images/gallery-1.jpg",
    "config/images/gallery-2.jpg",
    "config/images/gallery-3.jpg",
    // 원하는 만큼 추가/삭제
  ],
}
```

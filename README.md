# MBTI 성격유형 테스트 서비스

## 🚀 소개

이번 프로젝트에서는 MBTI 성격 유형 테스트 서비스를 제작해보겠습니다! 이 애플리케이션은 다음과 같이 웹 개발에서 자주 접하는 핵심 기능을 구현하는 데 중점을 둡니다.

- **JWT 기반 인증**을 사용하여 가입/로그인합니다.
- **프로필 관리**를 통해 사용자 정보를 업데이트합니다.
- 공개 여부 설정 및 결과 기록을 통해 **테스트 결과 저장 및 관리**
- **Zustand 및 tanstack Query와 같은 도구를 사용한 효율적인 상태 관리.**
- 로컬 API 서버 API 통신 테스트를 위해 **json-server**를 사용합니다.

## 🧰 사용 스택

<div style="display:flex">
  <img alt="React" src="https://img.shields.io/badge/React-61DAFB.svg?&style=for-the-badge&logo=React&logoColor=black"/>
  <img alt="reactquery" src="https://img.shields.io/badge/tanstackquery-FF4154.svg?&style=for-the-badge&logo=reactquery&logoColor=black"/>
  <img alt="TailwindCSS" src="https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white"/>
  <img alt="reacthookform" src="https://img.shields.io/badge/reacthookform-EC5990.svg?&style=for-the-badge&logo=reacthookform&logoColor=black"/>
 <img alt="zustand" src="https://img.shields.io/badge/zustand-black?style=for-the-badge&logo=zustand&logoColor=white"/>
</div>

<br>

**프론트엔드**: React, Zustand, Tailwind CSS

**백엔드**: JSON 서버(로컬 테스트용)

**데이터 관리**: React 쿼리

**인증**: JWT

<br>
<br>

## ✨ 특징

### 1. 인증

가입: 사용자는 고유한 ID와 닉네임을 사용하여 계정을 만들 수 있습니다.
로그인: JWT 기반 인증은 애플리케이션에 대한 안전한 액세스를 보장합니다.
로그아웃: 사용자는 로그아웃하여 세션을 지울 수 있습니다.

### 2. 프로필 관리

사용자 정보(예: 닉네임)를 업데이트합니다.
useTokenExpire를 사용하여 토큰 만료를 적절하게 처리합니다.

### 3. MBTI 테스트

MBTI 성격검사를 진행해보세요.
MBTI 결과를 계산하고 표시합니다.
사용자 정보 및 타임스탬프와 함께 테스트 결과를 저장합니다.

### 4. 테스트 결과 관리

저장된 모든 테스트 결과를 봅니다.
테스트 결과를 공개 또는 비공개로 설정하세요.
테스트 결과를 삭제합니다.

### 5. 로컬 API 서버

json-server는 테스트 목적으로 모의 백엔드를 생성하는 데 사용됩니다.
사용자 인증, 테스트 제출 및 결과 검색을 위한 RESTful API 엔드포인트를 시뮬레이션합니다.

<br>
<br>

## 🛠️ 프로젝트 구조

```
src/
├── api/
│   ├── auth.js                # 로그인, 회원가입, 프로필 업데이트와 관련된 API 함수
│   ├── axiosInstance.js       # Axios 공통 인스턴스와 인터셉터 설정
│   ├── testAxiosInstance.js   # 테스트 결과와 관련된 Axios 인스턴스
│   └── testResults.js         # 테스트 결과를 가져오거나 추가, 삭제하는 API 함수
│
├── components/
│   ├── AuthForm.jsx           # 로그인/회원가입 폼 컴포넌트
│   ├── AuthFormFooter.jsx     # AuthForm 하단 네비게이션 링크를 포함하는 푸터 컴포넌트
│   ├── Header.jsx             # 네비게이션 헤더 컴포넌트
│   ├── Layout.jsx             # 앱의 스타일 및 구조를 감싸는 레이아웃 컴포넌트
│   ├── ProtectedRoute.jsx     # 인증된 사용자만 접근할 수 있는 라우트를 보호하는 컴포넌트
│   ├── TestForm.jsx           # MBTI 테스트를 입력받는 폼 컴포넌트
│   ├── TestResultItem.jsx     # 개별 테스트 결과를 보여주는 컴포넌트
│   └── TestResultList.jsx     # 테스트 결과 목록을 렌더링하는 컴포넌트
│
├── data/                      # 애플리케이션에서 사용하는 정적 데이터
│   └── questions.js           # MBTI 테스트 질문 데이터
│
├── hooks/                     # 재사용 가능한 커스텀 React 훅
│   ├── useTestActions.jsx     # 테스트 결과 추가, 수정, 삭제를 처리하는 훅
│   └── useTokenExpire.js      # 토큰 만료 및 로그아웃 처리를 처리하는 훅
│
├── store/                     # 전역 상태 관리를 위한 Zustand 스토어
│   └── useUserStore.js        # 사용자 인증 및 프로필 데이터를 관리하는 Zustand 스토어
│
├── utils/                     # 재사용 가능한 유틸리티 함수와 헬퍼
│   ├── dateUtils.js           # 날짜 포맷팅 및 날짜 관련 유틸리티 함수
│   ├── mbtiCalculator.js      # 테스트 답변을 기반으로 MBTI 유형을 계산하는 함수
│   └── showAlert.js           # 사용자에게 알림 메시지를 표시하는 유틸리티
│
└── App.js                     # 애플리케이션의 메인 엔트리 포인트
```

<br>
<br>

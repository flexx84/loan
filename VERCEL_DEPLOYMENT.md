# Vercel 배포 가이드

## 🚀 배포 완료

### 배포된 URL

- **프로덕션**: https://loan-5gu48mr4n-kim-jins-projects.vercel.app
- **프리뷰**: https://loan-fo4yk4h75-kim-jins-projects.vercel.app

### Vercel 대시보드

- **프로젝트 관리**: https://vercel.com/kim-jins-projects/loan

## ⚙️ 환경변수 설정 (중요!)

Telegram 봇이 작동하려면 Vercel 대시보드에서 환경변수를 설정해야 합니다:

### 1. Vercel 대시보드 접속

1. https://vercel.com/kim-jins-projects/loan 접속
2. **Settings** 탭 클릭
3. **Environment Variables** 섹션으로 이동

### 2. 환경변수 추가

다음 환경변수를 추가하세요:

```
TELEGRAM_BOT_TOKEN = 8345127006:AAHB8KYflkYKePDyh11yya6xIgPbtOgBocA
TELEGRAM_CHAT_ID = 7914742399
```

### 3. 환경변수 적용

- **Environment**: Production, Preview, Development 모두 선택
- **Save** 버튼 클릭
- **Redeploy** 버튼으로 재배포

## 🔄 자동 배포 설정

### GitHub 연동

1. Vercel 대시보드 → **Settings** → **Git**
2. **Connect Git Repository** 클릭
3. GitHub 저장소 연결: `https://github.com/flexx84/loan.git`
4. **main** 브랜치 선택

### 자동 배포 활성화

- `main` 브랜치에 푸시할 때마다 자동 배포
- Pull Request 생성 시 프리뷰 배포

## 📱 도메인 설정

### 커스텀 도메인 추가

1. Vercel 대시보드 → **Settings** → **Domains**
2. **Add Domain** 클릭
3. 원하는 도메인 입력 (예: `loan.yourdomain.com`)
4. DNS 설정 안내에 따라 도메인 설정

## 🛠️ 유용한 명령어

### 로컬 개발

```bash
npm run dev
```

### 배포

```bash
# 프리뷰 배포
npx vercel

# 프로덕션 배포
npx vercel --prod
```

### 로그 확인

```bash
npx vercel logs
```

### 프로젝트 정보 확인

```bash
npx vercel inspect
```

## 🔧 문제 해결

### 환경변수 문제

- Vercel 대시보드에서 환경변수 설정 확인
- 재배포 후 테스트

### 빌드 오류

- 로컬에서 `npm run build` 테스트
- Vercel 대시보드의 **Functions** 탭에서 로그 확인

### Telegram 봇 오류

- Chat ID와 Bot Token 확인
- Vercel 환경변수 설정 확인
- 네트워크 연결 상태 확인

## 📊 성능 최적화

### Next.js 최적화

- 이미지 최적화: `next/image` 사용
- 코드 분할: 동적 import 활용
- 캐싱: Vercel Edge Network 활용

### 모니터링

- Vercel Analytics 활성화
- 실시간 로그 모니터링
- 성능 메트릭 추적

## 🎯 다음 단계

1. **환경변수 설정** (필수)
2. **도메인 연결** (선택)
3. **Google Analytics 추가** (선택)
4. **SEO 최적화** (선택)
5. **성능 모니터링 설정** (선택)



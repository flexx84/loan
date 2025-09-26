# Telegram Bot 설정 가이드

## 1. 환경변수 설정

프로젝트 루트에 `.env.local` 파일을 생성하고 다음 내용을 추가하세요:

```env
# Telegram Bot Configuration
TELEGRAM_BOT_TOKEN=8345127006:AAHB8KYflkYKePDyh11yya6xIgPbtOgBocA
TELEGRAM_CHAT_ID=YOUR_CHAT_ID_HERE

# Next.js Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## 2. Chat ID 확인 방법

### 방법 1: 봇과 대화하기

1. Telegram에서 `@shfinancial_bot`을 검색하여 봇과 대화를 시작하세요
2. `/start` 명령어를 보내세요
3. 봇이 응답하면 Chat ID를 확인할 수 있습니다

### 방법 2: API를 통한 확인

```bash
curl "https://api.telegram.org/bot8345127006:AAHB8KYflkYKePDyh11yya6xIgPbtOgBocA/getUpdates"
```

응답에서 `chat.id` 값을 찾아서 `TELEGRAM_CHAT_ID`에 설정하세요.

## 3. 테스트 방법

### 3.1 봇 정보 확인

```bash
curl "http://localhost:3000/api/telegram"
```

### 3.2 알림 테스트

웹사이트의 상담 폼을 제출하면 Telegram으로 알림이 전송됩니다.

## 4. 알림 메시지 형식

```
🏦 *새로운 대출 상담 신청*

👤 *이름:* 홍길동
📞 *연락처:* 010-1234-5678
💰 *희망 대출 금액:* 3천만원이상
🎯 *대출 목적:* 가입
💬 *추가 메시지:* 급하게 필요합니다

⏰ *신청 시간:* 2025-01-27 15:30:45
```

## 5. 문제 해결

### 5.1 봇이 응답하지 않는 경우

- 봇 토큰이 올바른지 확인
- 봇이 활성화되어 있는지 확인
- Chat ID가 올바른지 확인

### 5.2 알림이 전송되지 않는 경우

- 환경변수 `TELEGRAM_CHAT_ID`가 설정되어 있는지 확인
- 네트워크 연결 상태 확인
- 브라우저 개발자 도구에서 오류 메시지 확인

## 6. 보안 주의사항

- `.env.local` 파일은 절대 Git에 커밋하지 마세요
- 봇 토큰을 공개하지 마세요
- 프로덕션 환경에서는 환경변수를 안전하게 관리하세요

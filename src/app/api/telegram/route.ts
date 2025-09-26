import { NextRequest, NextResponse } from "next/server";

const TELEGRAM_BOT_TOKEN = "8345127006:AAHB8KYflkYKePDyh11yya6xIgPbtOgBocA";
const TELEGRAM_CHAT_ID = "7914742399"; // @flexx1107의 Chat ID

interface TelegramMessage {
  name: string;
  phone: string;
  amount: string;
  purpose: string;
  message?: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: TelegramMessage = await request.json();
    const { name, phone, amount, purpose, message } = body;

    // Chat ID 확인
    if (!TELEGRAM_CHAT_ID) {
      console.error("❌ TELEGRAM_CHAT_ID가 설정되지 않았습니다.");
      return NextResponse.json(
        { error: "Telegram 설정이 완료되지 않았습니다." },
        { status: 500 }
      );
    }

    // 필수 필드 검증
    if (!name || !phone || !amount || !purpose) {
      return NextResponse.json(
        { error: "필수 필드가 누락되었습니다." },
        { status: 400 }
      );
    }

    // Telegram 메시지 포맷팅
    const telegramMessage = `
🏦 *새로운 대출 상담 신청*

👤 *이름:* ${name}
📞 *연락처:* ${phone}
💰 *희망 대출 금액:* ${amount}만원
🎯 *대출 목적:* ${purpose}
${message ? `💬 *추가 메시지:* ${message}` : ""}

⏰ *신청 시간:* ${new Date().toLocaleString("ko-KR", {
      timeZone: "Asia/Seoul",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    })}
    `.trim();

    // Telegram API 호출 (타임아웃 설정)
    const telegramResponse = await fetch(
      `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chat_id: TELEGRAM_CHAT_ID,
          text: telegramMessage,
          parse_mode: "Markdown",
        }),
        // 타임아웃 설정 (30초)
        signal: AbortSignal.timeout(30000),
      }
    );

    if (!telegramResponse.ok) {
      const errorData = await telegramResponse.json();
      console.error("Telegram API Error:", errorData);
      return NextResponse.json(
        { error: "Telegram 알림 전송에 실패했습니다." },
        { status: 500 }
      );
    }

    const telegramData = await telegramResponse.json();
    console.log("✅ Telegram 알림 전송 성공:", telegramData);
    console.log("📱 Chat ID:", TELEGRAM_CHAT_ID);

    return NextResponse.json({
      success: true,
      message: "상담 신청이 완료되었습니다. 빠른 시일 내에 연락드리겠습니다.",
      telegramMessageId: telegramData.result?.message_id,
    });
  } catch (error) {
    console.error("❌ Telegram 알림 전송 오류:", error);
    return NextResponse.json(
      { error: "서버 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}

// GET 요청으로 봇 정보 확인
export async function GET() {
  try {
    const response = await fetch(
      `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/getMe`
    );

    if (!response.ok) {
      throw new Error("Telegram 봇 정보를 가져올 수 없습니다.");
    }

    const botInfo = await response.json();
    return NextResponse.json({
      success: true,
      bot: botInfo.result,
    });
  } catch (error) {
    console.error("❌ Telegram 봇 정보 조회 오류:", error);
    return NextResponse.json(
      { error: "Telegram 봇 정보를 가져올 수 없습니다." },
      { status: 500 }
    );
  }
}

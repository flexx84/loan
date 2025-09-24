import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, phone, loanAmount, message, timestamp } = body;

    // Google Sheets Integration (추후 구현)
    // 현재는 로그만 기록
    console.log('New consultation request:', {
      name,
      phone,
      loanAmount,
      message,
      timestamp
    });

    // TODO: Google Sheets API 연동
    // TODO: 이메일 알림 발송
    // TODO: 카카오 알림톡 발송

    return NextResponse.json({ 
      success: true, 
      message: '상담신청이 성공적으로 접수되었습니다.' 
    });
    
  } catch (error) {
    console.error('Consultation API error:', error);
    return NextResponse.json(
      { success: false, message: '상담신청 처리 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}
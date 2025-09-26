'use client';

import React, { useState, useEffect } from 'react';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';

const Footer = () => {
  const [adminClickCount, setAdminClickCount] = useState(0);
  const [isAdminMode, setIsAdminMode] = useState(false);

  // localStorage에서 admin 모드 상태 확인
  useEffect(() => {
    const adminMode = localStorage.getItem("admin-mode") === "true";
    setIsAdminMode(adminMode);
  }, []);

  // AOS 텍스트 클릭 처리
  const handleAOSClick = () => {
    const newCount = adminClickCount + 1;
    setAdminClickCount(newCount);
    
    if (newCount >= 5) {
      const newAdminMode = !isAdminMode;
      setIsAdminMode(newAdminMode);
      localStorage.setItem("admin-mode", newAdminMode.toString());
      setAdminClickCount(0);
      
      // admin 모드 변경 이벤트 발송
      window.dispatchEvent(new CustomEvent('adminModeChanged', { 
        detail: { isAdmin: newAdminMode } 
      }));
      
      alert(newAdminMode ? "🔧 관리자 모드가 활성화되었습니다!" : "🔒 관리자 모드가 비활성화되었습니다!");
    }
    
    // 5초 후 카운트 리셋
    setTimeout(() => {
      if (adminClickCount === newCount) {
        setAdminClickCount(0);
      }
    }, 5000);
  };

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          
          {/* Company Info */}
          <div className="md:col-span-2">
            <div className="text-2xl font-bold mb-4">
              SH<span className="text-blue-400">파이낸셜</span>
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed">
              전국 300여 금융기관과 협력하여 고객에게 가장 유리한 
              대출 조건을 찾아드리는 대부중개 전문업체입니다.
            </p>
            <div className="space-y-3">
              <div className="flex items-center">
                <Phone className="w-4 h-4 mr-3 text-blue-400" />
                <span>1588-0000 (평일 09:00 ~ 18:00)</span>
              </div>
              <div className="flex items-center">
                <Mail className="w-4 h-4 mr-3 text-blue-400" />
                <span>info@shfinancial.co.kr</span>
              </div>
              <div className="flex items-center">
                <MapPin className="w-4 h-4 mr-3 text-blue-400" />
                <span>서울시 강남구 테헤란로 123</span>
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4">대출 서비스</h3>
            <ul className="space-y-2 text-gray-300">
              <li><a href="#services" className="hover:text-blue-400 transition-colors">신용대출</a></li>
              <li><a href="#services" className="hover:text-blue-400 transition-colors">주택담보대출</a></li>
              <li><a href="#services" className="hover:text-blue-400 transition-colors">사업자대출</a></li>
              <li><a href="#services" className="hover:text-blue-400 transition-colors">부동산담보대출</a></li>
              <li><a href="#services" className="hover:text-blue-400 transition-colors">대환대출</a></li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">바로가기</h3>
            <ul className="space-y-2 text-gray-300">
              <li><a href="#home" className="hover:text-blue-400 transition-colors">홈</a></li>
              <li><a href="#services" className="hover:text-blue-400 transition-colors">서비스 소개</a></li>
              <li><a href="#consultation" className="hover:text-blue-400 transition-colors">상담신청</a></li>
              <li><a href="#faq" className="hover:text-blue-400 transition-colors">자주묻는질문</a></li>
              <li>
                <button 
                  onClick={() => window.open('tel:1588-0000')}
                  className="hover:text-blue-400 transition-colors"
                >
                  전화상담
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Business Hours */}
        <div className="border-t border-gray-700 mt-8 pt-8">
          <div className="flex items-center justify-center md:justify-start mb-4">
            <Clock className="w-5 h-5 mr-2 text-blue-400" />
            <span className="text-lg font-semibold">상담 가능 시간</span>
          </div>
          <div className="text-center md:text-left text-gray-300 space-y-1">
            <p>평일: 오전 9시 ~ 오후 6시</p>
            <p>토요일: 오전 10시 ~ 오후 3시</p>
            <p>일요일 및 공휴일: 휴무</p>
            <p className="text-blue-400 font-semibold">📞 급하신 경우 24시간 상담 가능</p>
          </div>
        </div>

        {/* Legal Info */}
        <div className="border-t border-gray-700 mt-8 pt-8">
          <div className="text-center md:text-left space-y-2 text-sm text-gray-400">
            <p>SH파이낸셜 대부중개업 | 사업자등록번호: 123-45-67890</p>
            <p>통신판매업신고번호: 2024-서울강남-1234 | 대부중개업등록번호: 제2024-01호</p>
            <p>대표: 홍길동 | 개인정보보호책임자: 김철수</p>
            <div className="flex flex-col md:flex-row md:space-x-6 space-y-2 md:space-y-0 mt-4">
              <a href="#" className="hover:text-blue-400 transition-colors">이용약관</a>
              <a href="#" className="hover:text-blue-400 transition-colors">개인정보처리방침</a>
              <a href="#" className="hover:text-blue-400 transition-colors">대부중개업 안내</a>
              <a href="#" className="hover:text-blue-400 transition-colors">신용정보활용체제</a>
              <span 
                className={`cursor-pointer transition-colors select-none ${
                  adminClickCount > 0 ? 'text-blue-300' : 'text-gray-500'
                }`}
                onClick={handleAOSClick}
                title={`${adminClickCount > 0 ? `${5 - adminClickCount}번 더 클릭` : '관리자 기능'}`}
              >
                AOS
              </span>
              {isAdminMode && (
                <span className="text-green-400 text-xs">● 관리자</span>
              )}
            </div>
          </div>
        </div>

        {/* Warning Notice */}
        <div className="bg-red-900 bg-opacity-50 border border-red-700 rounded-lg p-4 mt-8">
          <p className="text-sm text-red-200 leading-relaxed">
            ⚠️ <strong>대출 관련 주의사항:</strong> 대출을 받기 전에 신중하게 검토하시기 바랍니다. 
            과도한 대출은 개인신용평점 하락의 원인이 될 수 있습니다. 
            대출금리 및 한도는 개인 신용평점, 소득 등에 따라 차등 적용됩니다.
          </p>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-400">
          <p>&copy; 2024 SH파이낸셜. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
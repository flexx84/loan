'use client';

import React, { useState, useEffect } from 'react';
import { CheckCircle, Clock, DollarSign, Shield, ArrowRight, Settings } from 'lucide-react';
import ResponsiveImage from './ResponsiveImage';
import ImageUpload from './ImageUpload';

const HeroSection = () => {
  const [backgroundImage, setBackgroundImage] = useState<string>('');
  const [showImageUpload, setShowImageUpload] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  // 배경 이미지 로딩
  useEffect(() => {
    const savedBg = localStorage.getItem('hero-background');
    if (savedBg) {
      setBackgroundImage(savedBg);
    }
    
    // 관리자 모드 체크 (실제로는 더 안전한 인증 시스템 필요)
    const adminMode = localStorage.getItem('admin-mode') === 'true';
    setIsAdmin(adminMode);
  }, []);

  const handleImageUpload = (files: any[]) => {
    if (files.length > 0) {
      const uploadedImage = files.find(f => f.size === 'original');
      if (uploadedImage) {
        setBackgroundImage(uploadedImage.path);
        localStorage.setItem('hero-background', uploadedImage.path);
        setShowImageUpload(false);
      }
    }
  };

  const toggleAdminMode = () => {
    const newAdminMode = !isAdmin;
    setIsAdmin(newAdminMode);
    localStorage.setItem('admin-mode', newAdminMode.toString());
  };

  // 배경 스타일 생성
  const getBackgroundStyle = () => {
    if (backgroundImage) {
      return {
        backgroundImage: `linear-gradient(rgba(59, 130, 246, 0.8), rgba(99, 102, 241, 0.8)), url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      };
    }
    return {};
  };

  return (
    <section 
      id="home" 
      className={`pt-16 min-h-screen flex items-center relative ${
        backgroundImage 
          ? 'text-white' 
          : 'bg-gradient-to-br from-blue-50 to-indigo-100'
      }`}
      style={getBackgroundStyle()}
    >
      {/* 관리자 버튼 */}
      {isAdmin && (
        <button
          onClick={() => setShowImageUpload(!showImageUpload)}
          className="fixed top-20 right-4 z-50 bg-gray-800 text-white p-3 rounded-full shadow-lg hover:bg-gray-700 transition-colors"
          title="배경 이미지 설정"
        >
          <Settings className="w-5 h-5" />
        </button>
      )}

      {/* 이미지 업로드 패널 */}
      {showImageUpload && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <h3 className="text-xl font-bold mb-4 text-gray-900">히어로 섹션 배경 이미지 설정</h3>
            <ImageUpload
              category="hero"
              onUploadSuccess={handleImageUpload}
              maxFiles={1}
              className="mb-4"
            />
            <div className="flex gap-3">
              <button
                onClick={() => setShowImageUpload(false)}
                className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
              >
                닫기
              </button>
              {backgroundImage && (
                <button
                  onClick={() => {
                    setBackgroundImage('');
                    localStorage.removeItem('hero-background');
                  }}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                >
                  배경 제거
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left">
            <h1 className={`text-4xl lg:text-6xl font-bold mb-6 leading-tight ${
              backgroundImage ? 'text-white drop-shadow-lg' : 'text-gray-900'
            }`}>
              <span className={backgroundImage ? 'text-yellow-300' : 'text-blue-600'}>
                최저금리
              </span> 맞춤형<br />
              대출서비스
            </h1>
            <p className={`text-xl mb-8 leading-relaxed ${
              backgroundImage ? 'text-gray-100 drop-shadow' : 'text-gray-600'
            }`}>
              신용대출부터 담보대출까지 전국 어디서나<br />
              <strong className={backgroundImage ? 'text-yellow-300' : 'text-blue-600'}>
                무료상담
              </strong>으로 최적의 대출상품을 찾아드립니다
            </p>

            {/* Key Benefits */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-8">
              <div className={`p-4 sm:p-6 rounded-xl shadow-md backdrop-blur-sm ${
                backgroundImage 
                  ? 'bg-white bg-opacity-95 border border-white border-opacity-30' 
                  : 'bg-white'
              }`}>
                <div className="text-blue-600 mb-3">
                  <DollarSign className="w-6 h-6 sm:w-8 sm:h-8 mx-auto lg:mx-0" />
                </div>
                <div className="text-xl sm:text-2xl font-bold text-gray-900 mb-1">연 3.5%</div>
                <div className="text-xs sm:text-sm text-gray-600">최저금리</div>
              </div>
              <div className={`p-4 sm:p-6 rounded-xl shadow-md backdrop-blur-sm ${
                backgroundImage 
                  ? 'bg-white bg-opacity-95 border border-white border-opacity-30' 
                  : 'bg-white'
              }`}>
                <div className="text-blue-600 mb-3">
                  <DollarSign className="w-6 h-6 sm:w-8 sm:h-8 mx-auto lg:mx-0" />
                </div>
                <div className="text-xl sm:text-2xl font-bold text-gray-900 mb-1">최대 5억</div>
                <div className="text-xs sm:text-sm text-gray-600">대출한도</div>
              </div>
              <div className={`p-4 sm:p-6 rounded-xl shadow-md backdrop-blur-sm ${
                backgroundImage 
                  ? 'bg-white bg-opacity-95 border border-white border-opacity-30' 
                  : 'bg-white'
              }`}>
                <div className="text-blue-600 mb-3">
                  <Clock className="w-6 h-6 sm:w-8 sm:h-8 mx-auto lg:mx-0" />
                </div>
                <div className="text-xl sm:text-2xl font-bold text-gray-900 mb-1">24시간</div>
                <div className="text-xs sm:text-sm text-gray-600">빠른승인</div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button 
                onClick={() => document.getElementById('consultation')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-blue-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center"
              >
                지금 바로 상담신청
                <ArrowRight className="w-5 h-5 ml-2" />
              </button>
              <button 
                onClick={() => window.open('https://open.kakao.com/me/shfinancial', '_blank')}
                className="bg-yellow-400 text-gray-900 px-8 py-4 rounded-xl text-lg font-semibold hover:bg-yellow-500 transition-colors"
              >
                카카오톡 상담
              </button>
            </div>
          </div>

          {/* Right Content - Key Features */}
          <div className={`p-6 sm:p-8 rounded-2xl shadow-xl backdrop-blur-sm ${
            backgroundImage 
              ? 'bg-white bg-opacity-95 border border-white border-opacity-30' 
              : 'bg-white'
          }`}>
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6 text-center">
              왜 SH파이낸셜을 선택해야 할까요?
            </h3>
            
            <div className="space-y-4">
              <div className="flex items-start space-x-4">
                <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-green-500 flex-shrink-0 mt-1" />
                <div>
                  <div className="font-semibold text-gray-900 text-sm sm:text-base">전국 300+ 금융사 비교</div>
                  <div className="text-gray-600 text-xs sm:text-sm">당신에게 가장 유리한 조건을 찾아드립니다</div>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <Shield className="w-5 h-5 sm:w-6 sm:h-6 text-blue-500 flex-shrink-0 mt-1" />
                <div>
                  <div className="font-semibold text-gray-900 text-sm sm:text-base">100% 무료 상담</div>
                  <div className="text-gray-600 text-xs sm:text-sm">상담부터 승인까지 수수료 없음</div>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-purple-500 flex-shrink-0 mt-1" />
                <div>
                  <div className="font-semibold text-gray-900 text-sm sm:text-base">신속한 처리</div>
                  <div className="text-gray-600 text-xs sm:text-sm">평균 24시간 내 승인 결과 안내</div>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-orange-500 flex-shrink-0 mt-1" />
                <div>
                  <div className="font-semibold text-gray-900 text-sm sm:text-base">맞춤형 솔루션</div>
                  <div className="text-gray-600 text-xs sm:text-sm">개인 신용상태에 최적화된 상품 추천</div>
                </div>
              </div>
            </div>

            {/* Trust Indicators */}
            <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-gray-200">
              <div className="text-center">
                <div className="text-xs sm:text-sm text-gray-500 mb-2">신뢰할 수 있는 파트너</div>
                <div className="flex flex-wrap justify-center items-center gap-2 sm:gap-4 text-xs text-gray-400">
                  <span>KB국민은행</span>
                  <span className="hidden sm:inline">•</span>
                  <span>신한은행</span>
                  <span className="hidden sm:inline">•</span>
                  <span>우리은행</span>
                  <span className="hidden sm:inline">•</span>
                  <span>하나은행</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating CTA Button (Mobile) */}
      <div className="fixed bottom-0 left-0 right-0 p-3 sm:p-4 bg-white border-t border-gray-200 z-40 lg:hidden backdrop-blur-sm bg-opacity-95">
        <button 
          onClick={() => document.getElementById('consultation')?.scrollIntoView({ behavior: 'smooth' })}
          className="w-full bg-blue-600 text-white py-3 sm:py-4 rounded-xl text-base sm:text-lg font-semibold hover:bg-blue-700 transition-colors shadow-lg"
        >
          지금 바로 상담신청
        </button>
      </div>

      {/* 관리자 모드 토글 (개발용 - 화면 하단 우측) */}
      <button
        onClick={toggleAdminMode}
        className={`fixed bottom-20 right-4 z-40 p-2 rounded-full shadow-lg transition-all duration-300 ${
          isAdmin ? 'bg-red-500 text-white' : 'bg-gray-200 text-gray-700'
        }`}
        title={isAdmin ? '관리자 모드 비활성화' : '관리자 모드 활성화'}
      >
        <Settings className="w-4 h-4" />
      </button>
    </section>
  );
};

export default HeroSection;
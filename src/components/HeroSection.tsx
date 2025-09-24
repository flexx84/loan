'use client';

import React, { useState, useEffect } from 'react';
import { CheckCircle, Clock, DollarSign, Shield, ArrowRight, Settings } from 'lucide-react';
import ResponsiveImage from './ResponsiveImage';
import ImageUpload from './ImageUpload';

const HeroSection = () => {
  const [backgroundImage, setBackgroundImage] = useState<string>('');
  const [showImageUpload, setShowImageUpload] = useState(false);
  const [showStylePanel, setShowStylePanel] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  
  // 오버레이 스타일 상태
  const [overlaySettings, setOverlaySettings] = useState({
    opacity: 0.8,
    color1: '#3b82f6', // blue-500
    color2: '#6366f1', // indigo-500
    gradientDirection: 'to-br', // to-bottom-right
  });

  // 배경 이미지 및 설정 로딩
  useEffect(() => {
    const savedBg = localStorage.getItem('hero-background');
    const savedOverlay = localStorage.getItem('hero-overlay-settings');
    
    if (savedBg) {
      setBackgroundImage(savedBg);
    }
    
    if (savedOverlay) {
      try {
        const parsed = JSON.parse(savedOverlay);
        setOverlaySettings(prev => ({ ...prev, ...parsed }));
      } catch (error) {
        console.error('Failed to parse overlay settings:', error);
      }
    }
    
    // 관리자 모드 체크
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

  // 오버레이 설정 업데이트
  const updateOverlaySettings = (newSettings: Partial<typeof overlaySettings>) => {
    const updated = { ...overlaySettings, ...newSettings };
    setOverlaySettings(updated);
    localStorage.setItem('hero-overlay-settings', JSON.stringify(updated));
  };

  const toggleAdminMode = () => {
    const newAdminMode = !isAdmin;
    setIsAdmin(newAdminMode);
    localStorage.setItem('admin-mode', newAdminMode.toString());
  };

  // hex to rgba 변환 함수
  const hexToRgba = (hex: string, alpha: number) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  };

  // 배경 스타일 생성
  const getBackgroundStyle = () => {
    if (backgroundImage) {
      const gradient = `linear-gradient(${overlaySettings.gradientDirection}, ${hexToRgba(overlaySettings.color1, overlaySettings.opacity)}, ${hexToRgba(overlaySettings.color2, overlaySettings.opacity)})`;
      
      return {
        backgroundImage: `${gradient}, url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      };
    }
    return {};
  };

  // 그라디언트 방향 옵션
  const gradientDirections = [
    { value: 'to-r', label: '→ 오른쪽' },
    { value: 'to-l', label: '← 왼쪽' },
    { value: 'to-b', label: '↓ 아래' },
    { value: 'to-t', label: '↑ 위' },
    { value: 'to-br', label: '↘ 오른쪽 아래' },
    { value: 'to-bl', label: '↙ 왼쪽 아래' },
    { value: 'to-tr', label: '↗ 오른쪽 위' },
    { value: 'to-tl', label: '↖ 왼쪽 위' },
  ];

  // 색상 프리셋
  const colorPresets = [
    { name: '블루', color1: '#3b82f6', color2: '#6366f1' },
    { name: '퍼플', color1: '#8b5cf6', color2: '#a855f7' },
    { name: '그린', color1: '#10b981', color2: '#059669' },
    { name: '레드', color1: '#ef4444', color2: '#dc2626' },
    { name: '오렌지', color1: '#f97316', color2: '#ea580c' },
    { name: '핑크', color1: '#ec4899', color2: '#db2777' },
    { name: '다크', color1: '#1f2937', color2: '#111827' },
    { name: '클래식', color1: '#000000', color2: '#374151' },
  ];

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
      {/* 관리자 버튼들 */}
      {isAdmin && (
        <div className="fixed top-20 right-4 z-50 flex flex-col gap-2">
          <button
            onClick={() => setShowImageUpload(!showImageUpload)}
            className={`bg-gray-800 text-white p-3 rounded-full shadow-lg hover:bg-gray-700 transition-colors ${showImageUpload ? 'bg-blue-600' : ''}`}
            title="배경 이미지 설정"
          >
            <Settings className="w-5 h-5" />
          </button>
          <button
            onClick={() => setShowStylePanel(!showStylePanel)}
            className={`bg-gray-800 text-white p-3 rounded-full shadow-lg hover:bg-gray-700 transition-colors ${showStylePanel ? 'bg-purple-600' : ''}`}
            title="색상 및 투명도 설정"
          >
            <div className="w-5 h-5 rounded-full bg-gradient-to-r from-blue-500 to-purple-500"></div>
          </button>
        </div>
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

      {/* 스타일 설정 패널 */}
      {showStylePanel && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 max-w-lg w-full max-h-[80vh] overflow-y-auto">
            <h3 className="text-xl font-bold mb-4 text-gray-900">오버레이 스타일 설정</h3>
            
            {/* 투명도 설정 */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                투명도: {Math.round(overlaySettings.opacity * 100)}%
              </label>
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={overlaySettings.opacity}
                onChange={(e) => updateOverlaySettings({ opacity: parseFloat(e.target.value) })}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>투명</span>
                <span>불투명</span>
              </div>
            </div>

            {/* 색상 프리셋 */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-3">색상 프리셋</label>
              <div className="grid grid-cols-4 gap-2">
                {colorPresets.map((preset) => (
                  <button
                    key={preset.name}
                    onClick={() => updateOverlaySettings({ 
                      color1: preset.color1, 
                      color2: preset.color2 
                    })}
                    className={`p-2 rounded-lg border-2 transition-all ${
                      overlaySettings.color1 === preset.color1 && overlaySettings.color2 === preset.color2
                        ? 'border-blue-500 ring-2 ring-blue-200'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    title={preset.name}
                  >
                    <div 
                      className="w-full h-8 rounded"
                      style={{
                        background: `linear-gradient(to right, ${preset.color1}, ${preset.color2})`
                      }}
                    />
                    <div className="text-xs mt-1 text-gray-600">{preset.name}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* 커스텀 색상 */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-3">커스텀 색상</label>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-gray-600 mb-2">시작 색상</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={overlaySettings.color1}
                      onChange={(e) => updateOverlaySettings({ color1: e.target.value })}
                      className="w-12 h-10 rounded border border-gray-300 cursor-pointer"
                    />
                    <input
                      type="text"
                      value={overlaySettings.color1}
                      onChange={(e) => updateOverlaySettings({ color1: e.target.value })}
                      className="flex-1 px-2 py-1 text-xs border border-gray-300 rounded"
                      placeholder="#3b82f6"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs text-gray-600 mb-2">끝 색상</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={overlaySettings.color2}
                      onChange={(e) => updateOverlaySettings({ color2: e.target.value })}
                      className="w-12 h-10 rounded border border-gray-300 cursor-pointer"
                    />
                    <input
                      type="text"
                      value={overlaySettings.color2}
                      onChange={(e) => updateOverlaySettings({ color2: e.target.value })}
                      className="flex-1 px-2 py-1 text-xs border border-gray-300 rounded"
                      placeholder="#6366f1"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* 그라디언트 방향 */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-3">그라디언트 방향</label>
              <div className="grid grid-cols-4 gap-2">
                {gradientDirections.map((direction) => (
                  <button
                    key={direction.value}
                    onClick={() => updateOverlaySettings({ gradientDirection: direction.value })}
                    className={`p-2 text-xs rounded-lg border transition-all ${
                      overlaySettings.gradientDirection === direction.value
                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    {direction.label}
                  </button>
                ))}
              </div>
            </div>

            {/* 미리보기 */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">미리보기</label>
              <div 
                className="w-full h-20 rounded-lg"
                style={{
                  background: `linear-gradient(${overlaySettings.gradientDirection}, ${hexToRgba(overlaySettings.color1, overlaySettings.opacity)}, ${hexToRgba(overlaySettings.color2, overlaySettings.opacity)})`
                }}
              />
            </div>

            {/* 버튼들 */}
            <div className="flex gap-3">
              <button
                onClick={() => setShowStylePanel(false)}
                className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
              >
                닫기
              </button>
              <button
                onClick={() => {
                  const defaultSettings = {
                    opacity: 0.8,
                    color1: '#3b82f6',
                    color2: '#6366f1',
                    gradientDirection: 'to-br',
                  };
                  setOverlaySettings(defaultSettings);
                  localStorage.setItem('hero-overlay-settings', JSON.stringify(defaultSettings));
                }}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                기본값으로 리셋
              </button>
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
'use client';

import React from 'react';
import { CheckCircle, Clock, DollarSign, Shield, ArrowRight } from 'lucide-react';

const HeroSection = () => {
  return (
    <section id="home" className="pt-16 bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen flex items-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left">
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              <span className="text-blue-600">최저금리</span> 맞춤형<br />
              대출서비스
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              신용대출부터 담보대출까지 전국 어디서나<br />
              <strong className="text-blue-600">무료상담</strong>으로 최적의 대출상품을 찾아드립니다
            </p>

            {/* Key Benefits */}
            <div className="grid sm:grid-cols-3 gap-6 mb-8">
              <div className="bg-white p-6 rounded-xl shadow-md">
                <div className="text-blue-600 mb-3">
                  <DollarSign className="w-8 h-8 mx-auto lg:mx-0" />
                </div>
                <div className="text-2xl font-bold text-gray-900 mb-1">연 3.5%</div>
                <div className="text-sm text-gray-600">최저금리</div>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-md">
                <div className="text-blue-600 mb-3">
                  <DollarSign className="w-8 h-8 mx-auto lg:mx-0" />
                </div>
                <div className="text-2xl font-bold text-gray-900 mb-1">최대 5억</div>
                <div className="text-sm text-gray-600">대출한도</div>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-md">
                <div className="text-blue-600 mb-3">
                  <Clock className="w-8 h-8 mx-auto lg:mx-0" />
                </div>
                <div className="text-2xl font-bold text-gray-900 mb-1">24시간</div>
                <div className="text-sm text-gray-600">빠른승인</div>
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
          <div className="bg-white p-8 rounded-2xl shadow-xl">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              왜 SH파이낸셜을 선택해야 할까요?
            </h3>
            
            <div className="space-y-4">
              <div className="flex items-start space-x-4">
                <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                <div>
                  <div className="font-semibold text-gray-900">전국 300+ 금융사 비교</div>
                  <div className="text-gray-600">당신에게 가장 유리한 조건을 찾아드립니다</div>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <Shield className="w-6 h-6 text-blue-500 flex-shrink-0 mt-1" />
                <div>
                  <div className="font-semibold text-gray-900">100% 무료 상담</div>
                  <div className="text-gray-600">상담부터 승인까지 수수료 없음</div>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <Clock className="w-6 h-6 text-purple-500 flex-shrink-0 mt-1" />
                <div>
                  <div className="font-semibold text-gray-900">신속한 처리</div>
                  <div className="text-gray-600">평균 24시간 내 승인 결과 안내</div>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <CheckCircle className="w-6 h-6 text-orange-500 flex-shrink-0 mt-1" />
                <div>
                  <div className="font-semibold text-gray-900">맞춤형 솔루션</div>
                  <div className="text-gray-600">개인 신용상태에 최적화된 상품 추천</div>
                </div>
              </div>
            </div>

            {/* Trust Indicators */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <div className="text-center">
                <div className="text-sm text-gray-500 mb-2">신뢰할 수 있는 파트너</div>
                <div className="flex justify-center items-center space-x-4 text-xs text-gray-400">
                  <span>KB국민은행</span>
                  <span>•</span>
                  <span>신한은행</span>
                  <span>•</span>
                  <span>우리은행</span>
                  <span>•</span>
                  <span>하나은행</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating CTA Button (Mobile) */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200 z-40 lg:hidden">
        <button 
          onClick={() => document.getElementById('consultation')?.scrollIntoView({ behavior: 'smooth' })}
          className="w-full bg-blue-600 text-white py-4 rounded-xl text-lg font-semibold hover:bg-blue-700 transition-colors"
        >
          지금 바로 상담신청
        </button>
      </div>
    </section>
  );
};

export default HeroSection;
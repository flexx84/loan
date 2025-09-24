'use client';

import React, { useState, useEffect } from 'react';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import ImageCarousel from './ImageCarousel';

interface Testimonial {
  id: number;
  name: string;
  age: string;
  location: string;
  rating: number;
  comment: string;
  loanType: string;
  amount: string;
}

const TestimonialSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: '김○○',
      age: '30대',
      location: '서울시',
      rating: 5,
      comment: '다른 곳에서는 거절당했는데, 여기서는 친절하게 상담해주시고 좋은 조건으로 대출받을 수 있었어요. 정말 감사합니다!',
      loanType: '신용대출',
      amount: '3,000만원'
    },
    {
      id: 2,
      name: '이○○',
      age: '40대',
      location: '경기도',
      rating: 5,
      comment: '사업자금이 급하게 필요했는데 24시간 만에 승인받았어요. 빠른 처리와 낮은 금리에 매우 만족합니다.',
      loanType: '사업자대출',
      amount: '5,000만원'
    },
    {
      id: 3,
      name: '박○○',
      age: '50대',
      location: '부산시',
      rating: 5,
      comment: '주택담보대출로 기존 대출을 갈아탔는데, 이자가 월 30만원 정도 줄었어요. 진작 상담받을걸 그랬네요.',
      loanType: '주택담보대출',
      amount: '2억원'
    },
    {
      id: 4,
      name: '정○○',
      age: '20대',
      location: '인천시',
      rating: 5,
      comment: '첫 대출이라 막막했는데, 차근차근 설명해주시고 꼼꼼히 비교해서 추천해주셨어요. 신뢰할 수 있어요.',
      loanType: '신용대출',
      amount: '2,000만원'
    },
    {
      id: 5,
      name: '최○○',
      age: '40대',
      location: '대구시',
      rating: 5,
      comment: '수수료 없이 정말 무료로 상담받고 대출까지 받았어요. 다른 중개업체와는 확실히 다르네요. 추천합니다!',
      loanType: '담보대출',
      amount: '1억 2천만원'
    },
    {
      id: 6,
      name: '장○○',
      age: '30대',
      location: '광주시',
      rating: 5,
      comment: '신용점수가 낮아서 걱정했는데, 여러 금융사를 비교해서 승인 가능한 곳을 찾아주셨어요. 정말 고마워요.',
      loanType: '신용대출',
      amount: '1,500만원'
    }
  ];

  const stats = [
    { number: '98%', label: '고객 만족도', desc: '실제 이용 고객 평가' },
    { number: '24시간', label: '평균 승인 시간', desc: '빠른 심사 처리' },
    { number: '10,000+', label: '누적 상담 건수', desc: '풍부한 경험과 노하우' },
    { number: '300+', label: '제휴 금융사', desc: '다양한 선택권 제공' }
  ];

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, testimonials.length]);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    setIsAutoPlaying(false);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    setIsAutoPlaying(false);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            고객들이 직접 전하는 이야기
          </h2>
          <p className="text-xl text-gray-600">
            실제 이용 고객들의 생생한 후기를 확인해보세요
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white p-6 rounded-2xl shadow-sm text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">{stat.number}</div>
              <div className="text-lg font-semibold text-gray-900 mb-1">{stat.label}</div>
              <div className="text-sm text-gray-600">{stat.desc}</div>
            </div>
          ))}
        </div>

        {/* Testimonial Carousel */}
        <div className="relative">
          <div className="bg-white rounded-3xl p-8 lg:p-12 shadow-xl mx-auto max-w-4xl">
            <div className="flex items-center justify-between mb-8">
              <button
                onClick={prevTestimonial}
                className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
              >
                <ChevronLeft className="w-6 h-6 text-gray-600" />
              </button>
              
              <div className="text-center">
                <Quote className="w-8 h-8 text-blue-600 mx-auto mb-4" />
                <div className="flex justify-center mb-2">
                  {renderStars(currentTestimonial.rating)}
                </div>
              </div>
              
              <button
                onClick={nextTestimonial}
                className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
              >
                <ChevronRight className="w-6 h-6 text-gray-600" />
              </button>
            </div>

            <div className="text-center mb-8">
              <p className="text-xl leading-relaxed text-gray-800 mb-6 font-medium">
                "{currentTestimonial.comment}"
              </p>
              
              <div className="flex items-center justify-center space-x-6 text-sm text-gray-600">
                <div className="bg-blue-50 px-4 py-2 rounded-full">
                  <span className="text-blue-800 font-semibold">{currentTestimonial.loanType}</span>
                </div>
                <div className="bg-green-50 px-4 py-2 rounded-full">
                  <span className="text-green-800 font-semibold">{currentTestimonial.amount}</span>
                </div>
              </div>
            </div>

            <div className="text-center border-t pt-6">
              <div className="text-lg font-semibold text-gray-900">
                {currentTestimonial.name} ({currentTestimonial.age})
              </div>
              <div className="text-gray-600">{currentTestimonial.location}</div>
            </div>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentIndex ? 'bg-blue-600' : 'bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Trust Badges */}
        <div className="mt-16 text-center">
          <p className="text-sm text-gray-500 mb-6">신뢰할 수 있는 파트너 금융기관</p>
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
            <div className="text-lg font-semibold text-gray-600">KB국민은행</div>
            <div className="text-lg font-semibold text-gray-600">신한은행</div>
            <div className="text-lg font-semibold text-gray-600">우리은행</div>
            <div className="text-lg font-semibold text-gray-600">하나은행</div>
            <div className="text-lg font-semibold text-gray-600">IBK기업은행</div>
            <div className="text-lg font-semibold text-gray-600">NH농협은행</div>
          </div>
        </div>

        {/* 고객 사진 캐러셀 (선택사항) */}
        <div className="mt-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            고객 만족의 순간들
          </h3>
          <ImageCarousel
            className="max-w-4xl mx-auto"
            height="h-48 sm:h-64 lg:h-80"
            autoPlay={true}
            interval={4000}
            showControls={true}
            showIndicators={true}
          />
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            당신도 이런 경험을 해보세요
          </h3>
          <p className="text-lg text-gray-600 mb-8">
            지금 바로 무료 상담을 신청하고 최적의 대출 조건을 확인해보세요
          </p>
          <button 
            onClick={() => document.getElementById('consultation')?.scrollIntoView({ behavior: 'smooth' })}
            className="bg-blue-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-blue-700 transition-colors inline-flex items-center"
          >
            무료 상담 신청하기
            <ChevronRight className="w-5 h-5 ml-2" />
          </button>
        </div>

      </div>
    </section>
  );
};

export default TestimonialSection;
"use client";

import React from "react";
import {
  Building2,
  CreditCard,
  Briefcase,
  Home,
  CheckCircle,
  ArrowRight,
} from "lucide-react";

const ServiceSection = () => {
  const loanTypes = [
    {
      icon: CreditCard,
      title: "신용대출",
      description: "담보 없이 신용도만으로 대출",
      features: ["최대 1억원", "연 3.5%~", "24시간 승인"],
      color: "blue",
    },
    {
      icon: Home,
      title: "주택담보대출",
      description: "내 집을 담보로 저금리 대출",
      features: ["최대 20억원", "연 2.5%~", "LTV 80%"],
      color: "green",
    },
    {
      icon: Briefcase,
      title: "사업자대출",
      description: "사업자등록증으로 사업자금 조달",
      features: ["최대 10억원", "연 4.0%~", "서류간소화"],
      color: "purple",
    },
    {
      icon: Building2,
      title: "부동산담보대출",
      description: "부동산을 담보로 한 대출",
      features: ["최대 50억원", "연 3.0%~", "높은 한도"],
      color: "orange",
    },
  ];

  const advantages = [
    {
      title: "전국 300+ 금융사 비교",
      description:
        "은행, 저축은행, 캐피탈 등 모든 금융기관의 상품을 한 번에 비교분석",
      icon: "🏦",
    },
    {
      title: "개인 맞춤형 추천",
      description:
        "고객의 신용점수, 소득, 재직기간 등을 종합 분석하여 최적 상품 추천",
      icon: "🎯",
    },
    {
      title: "24시간 신속 처리",
      description: "온라인 사전심사부터 대출실행까지 평균 24시간 이내 처리",
      icon: "⚡",
    },
    {
      title: "100% 무료 서비스",
      description: "상담부터 대출실행까지 모든 과정이 무료, 숨겨진 수수료 없음",
      icon: "💯",
    },
  ];

  const process = [
    { step: 1, title: "상담신청", desc: "온라인으로 간편 신청" },
    { step: 2, title: "맞춤 추천", desc: "최적 상품 선별 추천" },
    { step: 3, title: "서류 준비", desc: "필요 서류 안내" },
    { step: 4, title: "대출 실행", desc: "승인 후 즉시 입금" },
  ];

  const getColorClasses = (color: string) => {
    const colorMap = {
      blue: "border-blue-200 bg-blue-50 text-blue-600",
      green: "border-green-200 bg-green-50 text-green-600",
      purple: "border-purple-200 bg-purple-50 text-purple-600",
      orange: "border-orange-200 bg-orange-50 text-orange-600",
    };
    return colorMap[color as keyof typeof colorMap] || colorMap.blue;
  };

  return (
    <section id="services" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div
          className="text-center mb-16"
          data-aos="fade-up"
          data-aos-duration="800"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            모든 대출, 한 곳에서 해결
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            신용대출부터 부동산담보대출까지 당신에게 가장 유리한 조건을
            찾아드립니다
          </p>
        </div>

        {/* Loan Types */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {loanTypes.map((loan, index) => {
            const Icon = loan.icon;
            return (
              <div
                key={index}
                className="bg-white border-2 border-gray-100 rounded-2xl p-6 hover:border-blue-200 hover:shadow-lg transition-all duration-300"
                data-aos="fade-up"
                data-aos-duration="800"
                data-aos-delay={index * 100}
              >
                <div
                  className={`w-12 h-12 rounded-xl ${getColorClasses(
                    loan.color
                  )} flex items-center justify-center mb-4`}
                >
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {loan.title}
                </h3>
                <p className="text-gray-600 mb-4">{loan.description}</p>
                <ul className="space-y-2">
                  {loan.features.map((feature, idx) => (
                    <li
                      key={idx}
                      className="flex items-center text-sm text-gray-700"
                    >
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        {/* Why Choose Us */}
        <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-3xl p-8 lg:p-12 mb-20">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              왜 SH파이낸셜을 선택해야 할까요?
            </h3>
            <p className="text-lg text-gray-600">
              10년 이상의 경험과 노하우로 고객 만족도 98%를 달성했습니다
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {advantages.map((advantage, index) => (
              <div key={index} className="flex items-start space-x-4">
                <div className="text-3xl">{advantage.icon}</div>
                <div>
                  <h4 className="text-xl font-semibold text-gray-900 mb-2">
                    {advantage.title}
                  </h4>
                  <p className="text-gray-600 leading-relaxed">
                    {advantage.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Process Steps */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              간단한 4단계로 대출 완료
            </h3>
            <p className="text-lg text-gray-600">
              복잡한 절차 없이 빠르고 간편하게 대출을 받으세요
            </p>
          </div>

          <ul className="ul-type1">
            <li>
              <div className="ult1-div">
                <div>
                  <span>금리</span>
                  <strong>연 3.9%~</strong>
                  <p>부터</p>
                </div>
              </div>
            </li>
            <li>
              <div className="ult1-div">
                <div>
                  <span>한도</span>
                  <strong>최대 1억원</strong>
                  <p></p>
                </div>
              </div>
            </li>
            <li>
              <div className="ult1-div">
                <div>
                  <span>상환기간</span>
                  <strong>최장 10년</strong>
                  <p></p>
                </div>
              </div>
            </li>
            <li>
              <div className="ult1-div">
                <div>
                  <span>승인시간</span>
                  <strong>24시간</strong>
                  <p>이내</p>
                </div>
              </div>
            </li>
          </ul>
        </div>

        {/* CTA Section */}
        <div className="bg-blue-600 rounded-3xl p-8 text-center text-white">
          <h3 className="text-2xl lg:text-3xl font-bold mb-4">
            지금 바로 무료상담 받아보세요
          </h3>
          <p className="text-lg mb-8 opacity-90">
            전문 상담사가 당신에게 가장 유리한 대출 조건을 찾아드립니다
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() =>
                document
                  .getElementById("consultation")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-colors"
            >
              무료 상담신청
            </button>
            <button
              onClick={() => window.open("tel:1588-0000")}
              className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-blue-600 transition-colors"
            >
              📞 1588-0000
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceSection;

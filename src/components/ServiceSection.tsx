"use client";

import React, { useState, useEffect } from "react";
import {
  Building2,
  CreditCard,
  Briefcase,
  Home,
  CheckCircle,
  Settings,
} from "lucide-react";
import { useBackground } from "@/contexts/BackgroundContext";
import LoanCardManager from "./LoanCardManager";
import BackgroundManager from "./BackgroundManager";

const ServiceSection = () => {
  const { 
    loanCardSettings, 
    updateLoanCardSettings, 
    serviceSettings, 
    updateServiceSettings, 
    customBackgrounds,
    addCustomBackground,
    isClient 
  } = useBackground();
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [showLoanCardManager, setShowLoanCardManager] = useState(false);
  const [showServiceBackgroundManager, setShowServiceBackgroundManager] = useState(false);

  // localStorage에서 admin 모드 상태 로딩
  useEffect(() => {
    if (isClient) {
      const adminMode = localStorage.getItem("admin-mode") === "true";
      setIsAdminMode(adminMode);
    }

    // admin 모드 변경 이벤트 리스너
    const handleAdminModeChange = (event: CustomEvent) => {
      setIsAdminMode(event.detail.isAdmin);
    };

    window.addEventListener(
      "adminModeChanged",
      handleAdminModeChange as EventListener
    );

    return () => {
      window.removeEventListener(
        "adminModeChanged",
        handleAdminModeChange as EventListener
      );
    };
  }, [isClient]);

  const getIconComponent = (iconName: string) => {
    const iconMap = {
      CreditCard,
      Home,
      Briefcase,
      Building2,
    };
    return iconMap[iconName as keyof typeof iconMap] || CreditCard;
  };

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
    <section 
      id="services" 
      className="py-20 relative"
      style={{
        backgroundColor: serviceSettings.image ? 'transparent' : '#ffffff'
      }}
    >
      {/* 배경 이미지 */}
      {isClient && serviceSettings?.image && (
        <div
          className="absolute inset-0"
          style={{
            opacity: serviceSettings.opacity / 100,
            position: serviceSettings.attachment === "fixed" ? "fixed" : "absolute",
          }}
        >
          <div
            className="w-full h-full"
            style={{
              backgroundImage: `url(${serviceSettings.image})`,
              backgroundSize: serviceSettings.size === "stretch" ? "100% 100%" : serviceSettings.size,
              backgroundPosition: serviceSettings.position === "center" ? "center" : serviceSettings.position.replace("-", " "),
              backgroundRepeat: "no-repeat",
            }}
          />

          {/* 오버레이 */}
          {serviceSettings.overlay.enabled && (
            <div
              className="absolute inset-0"
              style={{
                backgroundColor: serviceSettings.overlay.color,
                opacity: serviceSettings.overlay.opacity / 100,
              }}
            />
          )}
        </div>
      )}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
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
        {(() => {
          const visibleCards = loanCardSettings.filter((card) => card.visible);
          const gridClass = 
            visibleCards.length === 1 ? "grid-cols-1" :
            visibleCards.length === 2 ? "grid-cols-1 md:grid-cols-2" :
            visibleCards.length === 3 ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" :
            "grid-cols-1 md:grid-cols-2 lg:grid-cols-4";
          
          return (
            <div className={`grid gap-6 mb-20 ${gridClass}`}>
              {visibleCards.map((card, index) => {
              const Icon = getIconComponent(card.icon);
              
              // 기본값 설정 (기존 데이터 호환성)
              const textColor = {
                title: card.textColor?.title ?? "#1f2937",
                description: card.textColor?.description ?? "#6b7280", 
                features: card.textColor?.features ?? "#374151",
              };
              
              // 카드 배경 스타일 생성
              const getCardBackgroundStyle = () => {
                // 기본값 설정 (기존 데이터 호환성)
                const background = {
                  enabled: card.background?.enabled ?? false,
                  type: card.background?.type ?? "color",
                  color: card.background?.color ?? "#ffffff",
                  gradient: {
                    from: card.background?.gradient?.from ?? "#3b82f6",
                    to: card.background?.gradient?.to ?? "#1d4ed8",
                    direction: card.background?.gradient?.direction ?? "to-br",
                  },
                  image: card.background?.image ?? "",
                  opacity: card.background?.opacity ?? 100,
                };

                if (!background.enabled) {
                  return { backgroundColor: '#ffffff' };
                }

                const opacity = (typeof background.opacity === 'number' && !isNaN(background.opacity)) 
                  ? background.opacity / 100 
                  : 1;

                switch (background.type) {
                  case 'color':
                    return {
                      backgroundColor: background.color,
                      opacity: opacity,
                    };
                  case 'gradient':
                    return {
                      background: `linear-gradient(${background.gradient.direction.replace('to-', '')}, ${background.gradient.from}, ${background.gradient.to})`,
                      opacity: opacity,
                    };
                  case 'image':
                    return {
                      backgroundImage: background.image ? `url(${background.image})` : 'none',
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      backgroundRepeat: 'no-repeat',
                      opacity: opacity,
                    };
                  default:
                    return { backgroundColor: '#ffffff' };
                }
              };

              return (
                <div
                  key={card.id}
                  className="border-2 border-gray-100 rounded-2xl hover:border-blue-200 hover:shadow-lg transition-all duration-300 text-center relative overflow-hidden"
                  data-aos="fade-up"
                  data-aos-duration="800"
                  data-aos-delay={index * 100}
                >
                  {/* 배경 레이어 */}
                  <div
                    className="absolute inset-0 rounded-2xl"
                    style={getCardBackgroundStyle()}
                  />
                  
                  {/* 콘텐츠 레이어 */}
                  <div className="relative z-10 p-6">
                  <div
                    className={`w-12 h-12 rounded-xl ${getColorClasses(
                      card.color
                    )} flex items-center justify-center mb-4 mx-auto`}
                  >
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 
                    className="text-xl font-bold mb-2"
                    style={{ color: textColor.title }}
                  >
                    {card.title}
                  </h3>
                  <p 
                    className="mb-4"
                    style={{ color: textColor.description }}
                  >
                    {card.description}
                  </p>
                  <ul className="space-y-2">
                    {card.features.map((feature, idx) => (
                      <li
                        key={idx}
                        className="flex items-center justify-center text-sm"
                        style={{ color: textColor.features }}
                      >
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  </div>
                </div>
              );
            })}
            </div>
          );
        })()}

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

      {/* 관리자 모드 버튼 */}
      {isAdminMode && (
        <div className="fixed top-20 left-4 z-[100] flex flex-col gap-4">
          <button
            onClick={() => setShowServiceBackgroundManager(true)}
            className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-3 rounded-full shadow-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-110"
            title="서비스 섹션 배경 설정"
          >
            <Settings className="w-5 h-5" />
          </button>
          <button
            onClick={() => setShowLoanCardManager(true)}
            className="bg-gradient-to-r from-yellow-600 to-orange-600 text-white p-3 rounded-full shadow-lg hover:from-yellow-700 hover:to-orange-700 transition-all duration-300 transform hover:scale-110"
            title="대출 카드 설정"
          >
            <Settings className="w-5 h-5" />
          </button>
        </div>
      )}

      {/* 서비스 섹션 배경 관리자 */}
      {isClient && (
        <BackgroundManager
          sectionName="service"
          currentSettings={serviceSettings}
          onSettingsChange={updateServiceSettings}
          isVisible={showServiceBackgroundManager}
          onClose={() => setShowServiceBackgroundManager(false)}
          customBackgrounds={customBackgrounds.service}
          onCustomBackgroundAdd={(path) => addCustomBackground("service", path)}
        />
      )}

      {/* 대출 카드 관리자 */}
      {isClient && (
        <LoanCardManager
          currentSettings={loanCardSettings}
          onSettingsChange={updateLoanCardSettings}
          isVisible={showLoanCardManager}
          onClose={() => setShowLoanCardManager(false)}
        />
      )}
    </section>
  );
};

export default ServiceSection;

"use client";

import React, { useState, useEffect } from "react";
import { Settings } from "lucide-react";
import Image from "next/image";
import BackgroundManager from "./BackgroundManager";
import HeroImageManager from "./HeroImageManager";
import HeroTextManager from "./HeroTextManager";
import PaymentCardManager from "./PaymentCardManager";
import PaymentCard2Manager from "./PaymentCard2Manager";
import { useBackground } from "@/contexts/BackgroundContext";

const HeroSection = () => {
  const {
    heroSettings,
    updateHeroSettings,
    heroImageSettings,
    heroTextSettings,
    paymentCardSettings,
    paymentCard2Settings,
    userBlockSettings,
    updateHeroImageSettings,
    updateHeroTextSettings,
    updatePaymentCardSettings,
    updatePaymentCard2Settings,
    updateUserBlockSettings,
    customBackgrounds,
    addCustomBackground,
    isClient,
  } = useBackground();

  const [showBackgroundManager, setShowBackgroundManager] = useState(false);
  const [showHeroImageManager, setShowHeroImageManager] = useState(false);
  const [showHeroTextManager, setShowHeroTextManager] = useState(false);
  const [showPaymentCardManager, setShowPaymentCardManager] = useState(false);
  const [showPaymentCard2Manager, setShowPaymentCard2Manager] = useState(false);
  const [showUserBlockManager, setShowUserBlockManager] = useState(false);
  const [isAdminMode, setIsAdminMode] = useState(false);

  // 현재 디바이스 타입 감지
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

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

  return (
    <section id="visual">
      <h2 className="blind">visual</h2>
      <div className="visual-area">
        <div className="va-box">
          {/* Framer 스타일 장식 요소들 */}
          <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full animate-pulse"></div>
          <div className="absolute top-32 right-20 w-16 h-16 bg-blue-400/20 rounded-full animate-bounce"></div>
          <div className="absolute bottom-20 left-32 w-12 h-12 bg-yellow-400/30 rounded-full"></div>
          <div className="absolute bottom-32 right-10 w-24 h-24 bg-white/10 rounded-full"></div>

          {/* 배경 이미지 */}
          {isClient && (
            <div
              className="hero-bg-img"
              style={{
                opacity: heroSettings.opacity / 100,
                position:
                  heroSettings.attachment === "fixed" ? "fixed" : "absolute",
              }}
            >
              {heroSettings.image && heroSettings.image !== "gradient-blue" ? (
                <Image
                  src={heroSettings.image}
                  alt=""
                  fill
                  priority
                  className={`hero-background object-${
                    heroSettings.size === "stretch" ? "fill" : heroSettings.size
                  }`}
                  style={{
                    objectPosition:
                      heroSettings.position === "center"
                        ? "center"
                        : heroSettings.position.replace("-", " "),
                  }}
                />
              ) : (
                <div
                  className="hero-background w-full h-full"
                  style={{
                    background:
                      heroSettings.image === "gradient-blue"
                        ? "linear-gradient(135deg, #1e3a8a 0%, #3b82f6 50%, #06b6d4 100%)"
                        : "linear-gradient(135deg, #eff6ff 0%, #dbeafe 50%, #e0e7ff 100%)",
                  }}
                />
              )}

              {/* 오버레이 */}
              {heroSettings.overlay.enabled && (
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundColor: heroSettings.overlay.color,
                    opacity: heroSettings.overlay.opacity / 100,
                  }}
                />
              )}
            </div>
          )}

          {/* Main Hero Image (AVIF) - 전체 섹션 기준 위치 */}
          {isClient &&
            heroImageSettings?.image &&
            heroImageSettings?.position &&
            heroImageSettings?.size && (
              <div
                className={`hero-main-image ${
                  heroImageSettings.attachment === "fixed"
                    ? "fixed"
                    : "absolute"
                } z-10`}
                style={{
                  ...(heroImageSettings.bottomFixed
                    ? {
                        left: `${
                          heroImageSettings.position[
                            isMobile ? "mobile" : "desktop"
                          ]?.x || 50
                        }%`,
                        bottom: "0px",
                        transform: "translate(-50%, 0%)",
                      }
                    : {
                        left: `${
                          heroImageSettings.position[
                            isMobile ? "mobile" : "desktop"
                          ]?.x || 50
                        }%`,
                        top: `${
                          heroImageSettings.position[
                            isMobile ? "mobile" : "desktop"
                          ]?.y || 50
                        }%`,
                        transform: "translate(-50%, -50%)",
                      }),
                  opacity: (heroImageSettings.opacity || 100) / 100,
                }}
                data-aos="fade-up"
                data-aos-duration="500"
                data-aos-offset="50"
                data-aos-delay="400"
              >
                <Image
                  src={heroImageSettings.image}
                  alt="Hero Image"
                  width={
                    heroImageSettings.size[isMobile ? "mobile" : "desktop"]
                      ?.width || 400
                  }
                  height={
                    heroImageSettings.size[isMobile ? "mobile" : "desktop"]
                      ?.height || 300
                  }
                  className="object-cover rounded-lg shadow-lg"
                  priority
                />
              </div>
            )}

          {/* Hero Description Block - 왼쪽 콘텐츠 */}
          {isClient && heroTextSettings?.position && (
            <div
              className={`hero-description-block ${
                heroTextSettings.attachment === "fixed" ? "fixed" : "absolute"
              }`}
              style={{
                left: `${
                  heroTextSettings.position[isMobile ? "mobile" : "desktop"]
                    ?.x || 25
                }%`,
                top: `${
                  heroTextSettings.position[isMobile ? "mobile" : "desktop"]
                    ?.y || 50
                }%`,
                transform: "translate(-50%, -50%)",
                textAlign: heroTextSettings.alignment || "left",
                zIndex: 20,
              }}
            >
              <div className="hero-text-block">
                {/* 상단 파란색 텍스트 */}
                <div
                  className="hero-subtitle"
                  data-aos="fade-up"
                  data-aos-duration="600"
                  data-aos-offset="-1000"
                  data-aos-delay="0"
                  data-aos-once="false"
                >
                  <p
                    className="font-bold"
                    style={{
                      color: heroTextSettings.subtitleColor || "#2563eb",
                    }}
                  >
                    *소득확인만 되면 높은 승인률!!*
                  </p>
                </div>

                {/* 메인 타이틀 */}
                <div
                  className="hero-title-wrap"
                  data-aos="fade-up"
                  data-aos-duration="600"
                  data-aos-offset="-1000"
                  data-aos-delay="0"
                  data-aos-once="false"
                >
                  {/* 라인 장식 */}
                  <div className="title-line">
                    <Image
                      src="/OzadTRg10DxVn9SMCDhL71EoKOE.svg"
                      alt="Line"
                      width={490}
                      height={12}
                      className="title-decoration"
                    />
                  </div>
                  <h1
                    className={`hero-main-title ${
                      heroTextSettings.titleSize === "small"
                        ? "text-2xl"
                        : heroTextSettings.titleSize === "medium"
                        ? "text-3xl"
                        : heroTextSettings.titleSize === "large"
                        ? "text-4xl"
                        : "text-5xl"
                    }`}
                    style={{ color: heroTextSettings.titleColor || "#1f2937" }}
                  >
                    <span
                      style={{
                        color: heroTextSettings.subtitleColor || "#2563eb",
                      }}
                      className="font-bold"
                    >
                      안전하고 빠른 대출,
                    </span>
                    <br />
                    가장 현명한 선택!
                  </h1>
                </div>

                {/* 설명 텍스트 */}
                <div
                  className="hero-description"
                  data-aos="fade-up"
                  data-aos-duration="600"
                  data-aos-offset="-1000"
                  data-aos-delay="0"
                  data-aos-once="false"
                >
                  <p
                    style={{
                      color: heroTextSettings.descriptionColor || "#6b7280",
                    }}
                  >
                    4대보험 직장인 빠른승인 가능
                    <br />
                    주부·프리랜서·개인사업자도 가능
                    <br />
                    소득만 확인되면 간편하게 신청 OK
                  </p>
                  <p
                    className="font-bold mt-4"
                    style={{ color: heroTextSettings.titleColor || "#1f2937" }}
                  >
                    ※ 연체자 · 회생자 · 파산자 · 외국인 신청불가 ※
                  </p>
                </div>
              </div>

              {/* Rating and Features Block */}
              <div className="rating-features-block">
                <a
                  href="#consultation"
                  onClick={(e) => {
                    e.preventDefault();
                    document
                      .getElementById("consultation")
                      ?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="hero-cta-button"
                  data-aos="fade-up"
                  data-aos-duration="600"
                  data-aos-offset="-1000"
                  data-aos-delay="400"
                >
                  <div className="cta-button-content">
                    내 예상 한도 조회하기
                  </div>
                </a>
              </div>
            </div>
          )}

          {/* Hero Image Block - 오른쪽 이미지 영역 */}
          <div className="hero-image-block">
            {/* User Block */}
            <div
              className="user-block"
              data-aos="fade-up"
              data-aos-duration="600"
              data-aos-delay="700"
            >
              <div className="stats-block">
                <div className="stats-text">
                  <p className="text-blue-600 font-bold">
                    <strong>조회</strong>
                    <span className="text-gray-700">부터</span>{" "}
                    <strong>신청, 승인</strong>{" "}
                    <span className="text-gray-700">까지</span>{" "}
                    <strong>한번에!</strong>
                  </p>
                </div>
                <div className="user-text">
                  <p className="text-gray-600">당일진행 간편하고 빠르게</p>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Card 1 - 위치 조절 가능 */}
          {isClient &&
            paymentCardSettings?.visible &&
            paymentCardSettings?.position && (
              <div
                className={`payment-card ${
                  paymentCardSettings.attachment === "fixed"
                    ? "fixed"
                    : "absolute"
                } z-15 ${
                  paymentCardSettings.size === "small"
                    ? "transform scale-75"
                    : paymentCardSettings.size === "large"
                    ? "transform scale-125"
                    : ""
                }`}
                style={{
                  left: `${
                    paymentCardSettings.position[
                      isMobile ? "mobile" : "desktop"
                    ]?.x || 65
                  }%`,
                  top: `${
                    paymentCardSettings.position[
                      isMobile ? "mobile" : "desktop"
                    ]?.y || 35
                  }%`,
                  transform: `translate(-50%, -50%) ${
                    paymentCardSettings.size === "small"
                      ? "scale(0.75)"
                      : paymentCardSettings.size === "large"
                      ? "scale(1.25)"
                      : "scale(1)"
                  }`,
                  opacity: (paymentCardSettings.opacity || 100) / 100,
                }}
                data-aos="fade-up"
                data-aos-duration="600"
                data-aos-delay="600"
              >
                <div className="title-block">
                  <div className="card-title">
                    <p className="font-bold text-gray-900">급할 때, 딱 맞게!</p>
                    <p className="text-gray-900">
                      한도는 높고{" "}
                      <strong className="text-blue-600">금리는 낮게</strong>
                    </p>
                  </div>
                  <div className="card-number">
                    <p className="text-blue-600 font-bold">
                      낮은 금리로 이자부담 다운!
                    </p>
                  </div>
                </div>
              </div>
            )}

          {/* Payment Card 2 - 위치 조절 가능 */}
          {isClient &&
            paymentCard2Settings?.visible &&
            paymentCard2Settings?.position && (
              <div
                className={`payment-card ${
                  paymentCard2Settings.attachment === "fixed"
                    ? "fixed"
                    : "absolute"
                } z-15 ${
                  paymentCard2Settings.size === "small"
                    ? "transform scale-75"
                    : paymentCard2Settings.size === "large"
                    ? "transform scale-125"
                    : ""
                }`}
                style={{
                  left: `${
                    paymentCard2Settings.position[
                      isMobile ? "mobile" : "desktop"
                    ]?.x || 75
                  }%`,
                  top: `${
                    paymentCard2Settings.position[
                      isMobile ? "mobile" : "desktop"
                    ]?.y || 60
                  }%`,
                  transform: `translate(-50%, -50%) ${
                    paymentCard2Settings.size === "small"
                      ? "scale(0.75)"
                      : paymentCard2Settings.size === "large"
                      ? "scale(1.25)"
                      : "scale(1)"
                  }`,
                  opacity: (paymentCard2Settings.opacity || 90) / 100,
                }}
                data-aos="fade-up"
                data-aos-duration="600"
                data-aos-delay="800"
              >
                <div className="title-block">
                  <div className="card-title">
                    <p
                      className="font-bold text-gray-900"
                      style={{
                        color: paymentCard2Settings.titleColor || "#1f2937",
                      }}
                    >
                      {paymentCard2Settings.title || "빠른 승인!"}
                    </p>
                    <p
                      className="text-gray-900"
                      style={{
                        color: paymentCard2Settings.subtitleColor || "#059669",
                      }}
                    >
                      <strong>
                        {paymentCard2Settings.subtitle || "당일 처리"}
                      </strong>{" "}
                      가능
                    </p>
                  </div>
                  <div className="card-number">
                    <p
                      className="font-bold"
                      style={{
                        color:
                          paymentCard2Settings.descriptionColor || "#059669",
                      }}
                    >
                      {paymentCard2Settings.description ||
                        "신속한 대출 서비스!"}
                    </p>
                  </div>
                </div>
              </div>
            )}
        </div>
      </div>

      {/* 관리자 모드 버튼들 */}
      {isAdminMode && (
        <div className="fixed top-20 right-4 z-[100] flex flex-col gap-6">
          {/* 배경 설정 버튼 */}
          <button
            onClick={() => setShowBackgroundManager(true)}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-3 rounded-full shadow-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 transform hover:scale-110"
            title="히어로 섹션 배경 설정"
          >
            <Settings className="w-5 h-5" />
          </button>

          {/* 히어로 이미지 설정 버튼 */}
          <button
            onClick={() => setShowHeroImageManager(true)}
            className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-3 rounded-full shadow-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-110"
            title="히어로 이미지 설정"
          >
            🖼️
          </button>

          {/* 텍스트 설정 버튼 */}
          <button
            onClick={() => setShowHeroTextManager(true)}
            className="bg-gradient-to-r from-green-600 to-teal-600 text-white p-3 rounded-full shadow-lg hover:from-green-700 hover:to-teal-700 transition-all duration-300 transform hover:scale-110"
            title="텍스트 설정"
          >
            📝
          </button>

          {/* Payment Card 설정 버튼 */}
          <button
            onClick={() => setShowPaymentCardManager(true)}
            className="bg-gradient-to-r from-orange-600 to-red-600 text-white p-3 rounded-full shadow-lg hover:from-orange-700 hover:to-red-700 transition-all duration-300 transform hover:scale-110"
            title="Payment Card 1 설정"
          >
            💳
          </button>

          {/* Payment Card 2 설정 버튼 */}
          <button
            onClick={() => setShowPaymentCard2Manager(true)}
            className="bg-gradient-to-r from-red-600 to-pink-600 text-white p-3 rounded-full shadow-lg hover:from-red-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-110"
            title="Payment Card 2 설정"
          >
            💳
          </button>

          {/* 대출현황 배경 설정 버튼 */}
          <button
            onClick={() => {
              // 대출현황 섹션의 배경 설정을 위한 이벤트 발송
              window.dispatchEvent(
                new CustomEvent("openLoanBackgroundManager")
              );
            }}
            className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-3 rounded-full shadow-lg hover:from-purple-700 hover:to-indigo-700 transition-all duration-300 transform hover:scale-110"
            title="대출현황 배경 설정"
          >
            <Settings className="w-5 h-5" />
          </button>
        </div>
      )}

      {/* 통합 배경 관리자 */}
      {isClient && (
        <BackgroundManager
          sectionName="hero"
          currentSettings={heroSettings}
          onSettingsChange={updateHeroSettings}
          isVisible={showBackgroundManager}
          onClose={() => setShowBackgroundManager(false)}
          customBackgrounds={customBackgrounds.hero}
          onCustomBackgroundAdd={(path) => addCustomBackground("hero", path)}
        />
      )}

      {/* 히어로 이미지 관리자 */}
      {isClient && (
        <HeroImageManager
          currentSettings={heroImageSettings}
          onSettingsChange={updateHeroImageSettings}
          isVisible={showHeroImageManager}
          onClose={() => setShowHeroImageManager(false)}
        />
      )}

      {/* 텍스트 설정 관리자 */}
      {isClient && (
        <HeroTextManager
          currentSettings={heroTextSettings}
          onSettingsChange={updateHeroTextSettings}
          isVisible={showHeroTextManager}
          onClose={() => setShowHeroTextManager(false)}
        />
      )}

      {/* Payment Card 설정 관리자 */}
      {isClient && (
        <PaymentCardManager
          currentSettings={paymentCardSettings}
          onSettingsChange={updatePaymentCardSettings}
          isVisible={showPaymentCardManager}
          onClose={() => setShowPaymentCardManager(false)}
        />
      )}

      {/* Payment Card 2 설정 관리자 */}
      {isClient && (
        <PaymentCard2Manager
          currentSettings={paymentCard2Settings}
          onSettingsChange={updatePaymentCard2Settings}
          isVisible={showPaymentCard2Manager}
          onClose={() => setShowPaymentCard2Manager(false)}
        />
      )}
    </section>
  );
};

export default HeroSection;

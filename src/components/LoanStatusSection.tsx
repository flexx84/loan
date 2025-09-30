"use client";

import React, { useState, useEffect } from "react";
import {
  TrendingUp,
} from "lucide-react";
import Image from "next/image";
import BackgroundManager from "./BackgroundManager";
import { useBackground } from "@/contexts/BackgroundContext";

interface LoanApplication {
  id: number;
  status: "승인완료" | "심사중" | "대기중";
  age: string;
  company: string;
  creditScore: number;
  amount: number;
}

const LoanStatusSection = () => {
  const {
    loanSettings,
    updateLoanSettings,
    customBackgrounds,
    addCustomBackground,
    isClient,
  } = useBackground();

  const [counters, setCounters] = useState({
    totalAmount: 0,
    totalInquiries: 0,
    approvalRate: 0,
  });

  const [showBackgroundManager, setShowBackgroundManager] = useState(false);
  const [isAdminMode, setIsAdminMode] = useState(false);

  // 실제 신청 데이터
  const applications: LoanApplication[] = [
    {
      id: 1,
      status: "승인완료",
      age: "50대",
      company: "소기업 직장인",
      creditScore: 710,
      amount: 5645,
    },
    {
      id: 2,
      status: "승인완료",
      age: "40대",
      company: "중소기업 직장인",
      creditScore: 675,
      amount: 5930,
    },
    {
      id: 3,
      status: "심사중",
      age: "40대",
      company: "중견기업 직장인",
      creditScore: 792,
      amount: 3885,
    },
    {
      id: 4,
      status: "대기중",
      age: "50대",
      company: "중견기업 직장인",
      creditScore: 695,
      amount: 4512,
    },
    {
      id: 5,
      status: "심사중",
      age: "20대",
      company: "소기업 직장인",
      creditScore: 767,
      amount: 4523,
    },
    {
      id: 6,
      status: "승인완료",
      age: "30대",
      company: "중견기업 직장인",
      creditScore: 782,
      amount: 3679,
    },
    {
      id: 7,
      status: "대기중",
      age: "30대",
      company: "중견기업 직장인",
      creditScore: 827,
      amount: 5508,
    },
    {
      id: 8,
      status: "심사중",
      age: "40대",
      company: "중견기업 직장인",
      creditScore: 688,
      amount: 5256,
    },
    {
      id: 9,
      status: "심사중",
      age: "20대",
      company: "중견기업 직장인",
      creditScore: 663,
      amount: 3253,
    },
    {
      id: 10,
      status: "승인완료",
      age: "40대",
      company: "중소기업 직장인",
      creditScore: 705,
      amount: 4184,
    },
    {
      id: 11,
      status: "승인완료",
      age: "30대",
      company: "소기업 직장인",
      creditScore: 934,
      amount: 3769,
    },
    {
      id: 12,
      status: "대기중",
      age: "40대",
      company: "소기업 직장인",
      creditScore: 870,
      amount: 4450,
    },
    {
      id: 13,
      status: "대기중",
      age: "30대",
      company: "소기업 직장인",
      creditScore: 731,
      amount: 3518,
    },
    {
      id: 14,
      status: "승인완료",
      age: "40대",
      company: "중견기업 직장인",
      creditScore: 894,
      amount: 5730,
    },
    {
      id: 15,
      status: "대기중",
      age: "40대",
      company: "중소기업 직장인",
      creditScore: 947,
      amount: 3810,
    },
    {
      id: 16,
      status: "승인완료",
      age: "20대",
      company: "소기업 직장인",
      creditScore: 629,
      amount: 4775,
    },
    {
      id: 17,
      status: "대기중",
      age: "30대",
      company: "중소기업 직장인",
      creditScore: 782,
      amount: 3026,
    },
    {
      id: 18,
      status: "대기중",
      age: "30대",
      company: "중견기업 직장인",
      creditScore: 965,
      amount: 4839,
    },
    {
      id: 19,
      status: "대기중",
      age: "30대",
      company: "중견기업 직장인",
      creditScore: 947,
      amount: 3599,
    },
    {
      id: 20,
      status: "대기중",
      age: "30대",
      company: "중소기업 직장인",
      creditScore: 915,
      amount: 3879,
    },
    {
      id: 21,
      status: "심사중",
      age: "50대",
      company: "소기업 직장인",
      creditScore: 896,
      amount: 4977,
    },
    {
      id: 22,
      status: "승인완료",
      age: "50대",
      company: "중견기업 직장인",
      creditScore: 674,
      amount: 4740,
    },
    {
      id: 23,
      status: "승인완료",
      age: "30대",
      company: "중견기업 직장인",
      creditScore: 676,
      amount: 5376,
    },
    {
      id: 24,
      status: "심사중",
      age: "40대",
      company: "소기업 직장인",
      creditScore: 939,
      amount: 3782,
    },
    {
      id: 25,
      status: "승인완료",
      age: "40대",
      company: "소기업 직장인",
      creditScore: 704,
      amount: 5950,
    },
    {
      id: 26,
      status: "대기중",
      age: "50대",
      company: "중견기업 직장인",
      creditScore: 753,
      amount: 3135,
    },
    {
      id: 27,
      status: "승인완료",
      age: "30대",
      company: "중소기업 직장인",
      creditScore: 825,
      amount: 5005,
    },
    {
      id: 28,
      status: "대기중",
      age: "40대",
      company: "중견기업 직장인",
      creditScore: 943,
      amount: 3607,
    },
    {
      id: 29,
      status: "대기중",
      age: "20대",
      company: "중견기업 직장인",
      creditScore: 631,
      amount: 4068,
    },
    {
      id: 30,
      status: "승인완료",
      age: "30대",
      company: "중견기업 직장인",
      creditScore: 782,
      amount: 3679,
    },
    {
      id: 31,
      status: "대기중",
      age: "30대",
      company: "중견기업 직장인",
      creditScore: 827,
      amount: 5508,
    },
    {
      id: 32,
      status: "심사중",
      age: "40대",
      company: "중견기업 직장인",
      creditScore: 688,
      amount: 5256,
    },
    {
      id: 33,
      status: "심사중",
      age: "20대",
      company: "중견기업 직장인",
      creditScore: 663,
      amount: 3253,
    },
    {
      id: 34,
      status: "승인완료",
      age: "40대",
      company: "중소기업 직장인",
      creditScore: 705,
      amount: 4184,
    },
    {
      id: 35,
      status: "승인완료",
      age: "30대",
      company: "소기업 직장인",
      creditScore: 934,
      amount: 3769,
    },
    {
      id: 36,
      status: "대기중",
      age: "40대",
      company: "소기업 직장인",
      creditScore: 870,
      amount: 4450,
    },
    {
      id: 37,
      status: "대기중",
      age: "30대",
      company: "소기업 직장인",
      creditScore: 731,
      amount: 3518,
    },
    {
      id: 38,
      status: "승인완료",
      age: "40대",
      company: "중견기업 직장인",
      creditScore: 894,
      amount: 5730,
    },
    {
      id: 39,
      status: "대기중",
      age: "40대",
      company: "중소기업 직장인",
      creditScore: 947,
      amount: 3810,
    },
    {
      id: 40,
      status: "승인완료",
      age: "20대",
      company: "소기업 직장인",
      creditScore: 629,
      amount: 4775,
    },
    {
      id: 41,
      status: "대기중",
      age: "30대",
      company: "중소기업 직장인",
      creditScore: 782,
      amount: 3026,
    },
    {
      id: 42,
      status: "대기중",
      age: "30대",
      company: "중견기업 직장인",
      creditScore: 965,
      amount: 4839,
    },
    {
      id: 43,
      status: "대기중",
      age: "30대",
      company: "중견기업 직장인",
      creditScore: 947,
      amount: 3599,
    },
    {
      id: 44,
      status: "대기중",
      age: "30대",
      company: "중소기업 직장인",
      creditScore: 915,
      amount: 3879,
    },
    {
      id: 45,
      status: "심사중",
      age: "50대",
      company: "소기업 직장인",
      creditScore: 896,
      amount: 4977,
    },
    {
      id: 46,
      status: "승인완료",
      age: "50대",
      company: "중견기업 직장인",
      creditScore: 674,
      amount: 4740,
    },
    {
      id: 47,
      status: "승인완료",
      age: "30대",
      company: "중견기업 직장인",
      creditScore: 676,
      amount: 5376,
    },
    {
      id: 48,
      status: "심사중",
      age: "40대",
      company: "소기업 직장인",
      creditScore: 939,
      amount: 3782,
    },
    {
      id: 49,
      status: "승인완료",
      age: "40대",
      company: "소기업 직장인",
      creditScore: 704,
      amount: 5950,
    },
    {
      id: 50,
      status: "대기중",
      age: "50대",
      company: "중견기업 직장인",
      creditScore: 753,
      amount: 3135,
    },
    {
      id: 51,
      status: "승인완료",
      age: "30대",
      company: "중소기업 직장인",
      creditScore: 825,
      amount: 5005,
    },
    {
      id: 52,
      status: "대기중",
      age: "40대",
      company: "중견기업 직장인",
      creditScore: 943,
      amount: 3607,
    },
    {
      id: 53,
      status: "대기중",
      age: "20대",
      company: "중견기업 직장인",
      creditScore: 631,
      amount: 4068,
    },
    {
      id: 54,
      status: "승인완료",
      age: "50대",
      company: "소기업 직장인",
      creditScore: 710,
      amount: 5645,
    },
  ];


  // localStorage에서 admin 모드 상태 로딩
  useEffect(() => {
    if (isClient) {
      const adminMode = localStorage.getItem("admin-mode") === "true";
      setIsAdminMode(adminMode);
    }
  }, [isClient]);

  // Separate useEffect for admin mode changes
  useEffect(() => {
    const handleAdminModeChange = (event: CustomEvent) => {
      console.log("Admin mode changed:", event.detail.isAdmin);
      setIsAdminMode(event.detail.isAdmin);
    };

    const handleOpenLoanBackgroundManager = () => {
      setShowBackgroundManager(true);
    };

    window.addEventListener(
      "adminModeChanged",
      handleAdminModeChange as EventListener
    );

    window.addEventListener(
      "openLoanBackgroundManager",
      handleOpenLoanBackgroundManager
    );

    return () => {
      window.removeEventListener(
        "adminModeChanged",
        handleAdminModeChange as EventListener
      );
      window.removeEventListener(
        "openLoanBackgroundManager",
        handleOpenLoanBackgroundManager
      );
    };
  }, []);

  // 카운터 애니메이션
  useEffect(() => {
    const animateCounters = () => {
      const targets = {
        totalAmount: 4768,
        totalInquiries: 32267987,
        approvalRate: 95.21,
      };

      const duration = 2000;
      const steps = 60;
      const stepDuration = duration / steps;

      let currentStep = 0;

      const interval = setInterval(() => {
        currentStep++;
        const progress = currentStep / steps;

        setCounters({
          totalAmount: Math.floor(targets.totalAmount * progress),
          totalInquiries: Math.floor(targets.totalInquiries * progress),
          approvalRate: parseFloat(
            (targets.approvalRate * progress).toFixed(2)
          ),
        });

        if (currentStep >= steps) {
          clearInterval(interval);
          setCounters(targets);
        }
      }, stepDuration);
    };

    const timer = setTimeout(animateCounters, 500);
    return () => {
      clearTimeout(timer);
    };
  }, []);

  // Slick 스타일 무한 루프 슬라이더
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const visibleItems = 6; // 화면에 보이는 아이템 수

  // 화면 크기 감지
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // 무한 루프를 위한 확장된 배열 생성 (앞뒤로 복제)
  const getInfiniteItems = () => {
    const cloneCount = visibleItems;
    const clonedStart = applications.slice(-cloneCount);
    const clonedEnd = applications.slice(0, cloneCount);
    return [...clonedStart, ...applications, ...clonedEnd];
  };

  const infiniteItems = getInfiniteItems();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => {
        const nextIndex = prev + 1;

        // 실제 데이터 끝에 도달하면 무한 루프 처리
        if (nextIndex >= applications.length + visibleItems) {
          // 트랜지션을 잠시 끄고 처음 위치로 이동
          setTimeout(() => {
            setIsTransitioning(false);
            setCurrentIndex(visibleItems);
            // 다음 프레임에서 트랜지션 다시 활성화
            requestAnimationFrame(() => {
              setIsTransitioning(true);
            });
          }, 1000); // 트랜지션 완료 후

          return nextIndex;
        }

        return nextIndex;
      });
    }, 2000);

    return () => clearInterval(interval);
  }, [applications.length, visibleItems]);

  // 초기 위치 설정 (복제된 시작 부분 건너뛰고 실제 데이터 시작)
  useEffect(() => {
    setCurrentIndex(visibleItems);
  }, [visibleItems]);

  // SSR 시 로딩 상태 표시
  if (!isClient) {
    return (
      <section
        className="py-20 relative overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, #eff6ff 0%, #dbeafe 50%, #e0e7ff 100%)",
        }}
      >
        {/* 로딩 중 표시 */}
        <div className="absolute inset-0 bg-black bg-opacity-30"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <div className="animate-pulse">
              <div className="h-8 bg-white bg-opacity-30 rounded-lg mb-4 mx-auto w-64"></div>
              <div className="h-12 bg-white bg-opacity-30 rounded-lg mb-8 mx-auto w-96"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      key={`loan-bg-${loanSettings.image}`}
      className="py-20 relative overflow-hidden"
    >
      {/* 통합 배경 관리 시스템 */}
      {isClient && (
        <div
          className="absolute inset-0 z-0"
          style={{
            opacity: loanSettings.opacity / 100,
            position:
              loanSettings.attachment === "fixed" ? "fixed" : "absolute",
          }}
        >
          {loanSettings.image && loanSettings.image !== "gradient-blue" ? (
            <Image
              src={loanSettings.image}
              alt="Loan section background"
              fill
              priority
              className={`object-${
                loanSettings.size === "stretch" ? "fill" : loanSettings.size
              }`}
              style={{
                objectPosition:
                  loanSettings.position === "center"
                    ? "center"
                    : loanSettings.position.replace("-", " "),
              }}
              sizes="100vw"
            />
          ) : (
            <div
              className="w-full h-full"
              style={{
                background:
                  loanSettings.image === "gradient-blue"
                    ? "linear-gradient(135deg, #1e3a8a 0%, #3b82f6 50%, #06b6d4 100%)"
                    : "linear-gradient(135deg, #eff6ff 0%, #dbeafe 50%, #e0e7ff 100%)",
              }}
            />
          )}

          {/* 오버레이 */}
          {loanSettings.overlay.enabled && (
            <div
              className="absolute inset-0"
              style={{
                backgroundColor: loanSettings.overlay.color,
                opacity: loanSettings.overlay.opacity / 100,
              }}
            />
          )}
        </div>
      )}

      {/* 배경 패턴 */}
      <div className="absolute inset-0 opacity-10 z-2">
        <div className="absolute top-10 left-10 w-20 h-20 bg-white rounded-full"></div>
        <div className="absolute top-32 right-20 w-16 h-16 bg-white rounded-full"></div>
        <div className="absolute bottom-20 left-32 w-12 h-12 bg-white rounded-full"></div>
        <div className="absolute bottom-32 right-10 w-24 h-24 bg-white rounded-full"></div>
      </div>

      {/* 배경 변경 버튼 - 관리자 모드에서만 표시 (이벤트 리스너로 처리) */}
      {isAdminMode && <div>{/* 이벤트 리스너는 useEffect에서 처리 */}</div>}

      {/* 통합 배경 관리자 */}
      {isClient && (
        <BackgroundManager
          sectionName="loan"
          currentSettings={loanSettings}
          onSettingsChange={updateLoanSettings}
          isVisible={showBackgroundManager}
          onClose={() => setShowBackgroundManager(false)}
          customBackgrounds={customBackgrounds.loan}
          onCustomBackgroundAdd={(path) => addCustomBackground("loan", path)}
        />
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* 제목 섹션 */}
        <div className="box-area">
          <div className="title">
            <p 
              data-aos="fade-up" 
              data-aos-duration="500" 
              className="aos-init aos-animate text-center mb-16"
            >
              <em className="text-yellow-300 font-semibold">2025년 09월 29일 기준</em>
              <br className="block md:hidden" />
              <span className="text-white text-2xl md:text-4xl lg:text-5xl font-bold drop-shadow-lg">
                근로자 신용지키미 실시간 신청현황
              </span>
            </p>
          </div>

          {/* 실시간 신청 현황 테이블 */}
          <div 
            className="box3-list aos-init aos-animate" 
            data-aos="fade-up" 
            data-aos-delay="100" 
            data-aos-duration="500"
          >
            <div className="b3l-top bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-4 rounded-t-lg">
              <div className="grid grid-cols-3 gap-4 font-semibold text-sm md:text-base">
                <p className="text-center">진행상황</p>
                <p className="text-center">신청자 조건</p>
                <p className="text-center">대출금액</p>
              </div>
            </div>
            <div className="b3l-ul bg-white rounded-b-lg shadow-xl border border-gray-100">
              <div className="h-80 md:h-96 overflow-hidden relative slide-container">
                <div
                  className={`${
                    isTransitioning
                      ? "transition-transform duration-1000 ease-in-out"
                      : ""
                  }`}
                  style={{
                    transform: `translateY(-${currentIndex * (isMobile ? 80 : 65)}px)`,
                  }}
                >
                  {infiniteItems.map((app, index) => (
                    <div
                      key={`${app.id}-${index}`}
                      className={`grid grid-cols-3 gap-2 md:gap-4 p-3 md:p-4 border-b border-gray-100 hover:bg-gray-50 transition-all duration-300 ${
                        index % 2 === 0 ? "bg-white" : "bg-gray-50"
                      }`}
                      style={{
                        height: isMobile ? "80px" : "65px",
                        opacity: Math.abs(index - currentIndex - 3) > 2 ? 0.5 : 1,
                      }}
                    >
                      <div className="flex items-center justify-center">
                        <span 
                          className={`px-2 py-1 rounded-full text-xs md:text-sm font-semibold border ${
                            app.status === "승인완료" ? "bu-span2 bg-green-100 text-green-800 border-green-200" :
                            app.status === "심사중" ? "bu-span1 bg-blue-100 text-blue-800 border-blue-200" :
                            "bu-span3 bg-gray-100 text-gray-800 border-gray-200"
                          }`}
                        >
                          {app.status}
                        </span>
                      </div>
                      <div className="text-xs md:text-sm text-gray-700 text-center">
                        <div className="font-semibold">{app.age}</div>
                        <div className="text-xs text-gray-600">{app.company}</div>
                        <div className="text-blue-600 font-semibold text-xs">
                          개인신용점수 {app.creditScore}점
                        </div>
                      </div>
                      <div className="font-bold text-gray-900 text-sm md:text-base text-center">
                        {app.amount.toLocaleString()}만원
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* 통계 카운터 */}
          <div className="box-counter mt-8">
            <ul className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              <li className="bg-white rounded-2xl p-6 md:p-8 shadow-xl border border-gray-100 text-center">
                <span className="text-green-500 text-sm font-semibold bg-green-50 px-3 py-1 rounded-full inline-block mb-4">
                  누적대출금액
                </span>
                <p className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                  <em className="counter not-italic">{counters.totalAmount.toLocaleString()}</em>억
                </p>
              </li>
              <li className="bg-white rounded-2xl p-6 md:p-8 shadow-xl border border-gray-100 text-center">
                <span className="text-blue-500 text-sm font-semibold bg-blue-50 px-3 py-1 rounded-full inline-block mb-4">
                  누적대출조회
                </span>
                <p className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                  <em className="counter not-italic">{counters.totalInquiries.toLocaleString()}</em>회
                </p>
              </li>
              <li className="bg-white rounded-2xl p-6 md:p-8 shadow-xl border border-gray-100 text-center">
                <span className="text-purple-500 text-sm font-semibold bg-purple-50 px-3 py-1 rounded-full inline-block mb-4">
                  평균 대출 승인비율
                </span>
                <p className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                  <em className="counter not-italic">{counters.approvalRate}</em>%
                </p>
              </li>
            </ul>
          </div>
        </div>

        {/* CTA 섹션 */}
        <div
          className="text-center mt-16"
          data-aos="fade-up"
          data-aos-duration="800"
          data-aos-delay="600"
        >
          <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100 max-w-4xl mx-auto">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              지금 바로 <span className="text-blue-600">무료 상담</span>을
              받아보세요!
            </h3>
            <p className="text-lg text-gray-600 mb-8">
              95.21%의 높은 승인률로 많은 분들이 만족하고 계십니다
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                className="btn-animated bg-blue-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center"
                onClick={() =>
                  document
                    .getElementById("consultation")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
              >
                지금 바로 신청하기
                <TrendingUp className="w-5 h-5 ml-2" />
              </button>
              <button
                className="btn-animated bg-gradient-to-r from-green-500 to-green-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:from-green-600 hover:to-green-700 transition-all"
                onClick={() =>
                  window.open("https://open.kakao.com/me/shfinancial", "_blank")
                }
              >
                카카오톡 상담
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 통합 배경 관리자 */}
      {isClient && (
        <BackgroundManager
          sectionName="loan"
          currentSettings={loanSettings}
          onSettingsChange={updateLoanSettings}
          isVisible={showBackgroundManager}
          onClose={() => setShowBackgroundManager(false)}
          customBackgrounds={customBackgrounds.loan}
          onCustomBackgroundAdd={(path) => addCustomBackground("loan", path)}
        />
      )}

      <style jsx>{`
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(100px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideUpFade {
          0% {
            transform: translateY(0);
            opacity: 1;
          }
          50% {
            transform: translateY(-30px);
            opacity: 0.8;
          }
          100% {
            transform: translateY(-60px);
            opacity: 0;
          }
        }

        .counter {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        /* 자동 슬라이드 효과 */
        .slide-container {
          mask-image: linear-gradient(
            to bottom,
            transparent 0%,
            black 10%,
            black 90%,
            transparent 100%
          );
          -webkit-mask-image: linear-gradient(
            to bottom,
            transparent 0%,
            black 10%,
            black 90%,
            transparent 100%
          );
        }

        /* bu-span 스타일 */
        .bu-span1 {
          background-color: #dbeafe;
          color: #1e40af;
          border-color: #93c5fd;
        }
        
        .bu-span2 {
          background-color: #dcfce7;
          color: #166534;
          border-color: #86efac;
        }
        
        .bu-span3 {
          background-color: #f3f4f6;
          color: #374151;
          border-color: #d1d5db;
        }
      `}</style>
    </section>
  );
};

export default LoanStatusSection;

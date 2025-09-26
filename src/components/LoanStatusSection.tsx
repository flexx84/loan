"use client";

import React, { useState, useEffect } from "react";
import {
  TrendingUp,
  Users,
  CheckCircle,
  Clock,
  Eye,
  Settings,
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

  // 상태별 색상 및 아이콘
  const getStatusStyle = (status: string) => {
    switch (status) {
      case "승인완료":
        return "bg-green-100 text-green-800 border-green-200";
      case "심사중":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "대기중":
        return "bg-gray-100 text-gray-800 border-gray-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

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
  const visibleItems = 6; // 화면에 보이는 아이템 수

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
        <div
          className="text-center mb-16"
          data-aos="fade-up"
          data-aos-duration="800"
        >
          <div className="inline-flex items-center px-4 py-2 bg-white bg-opacity-90 rounded-full shadow-sm mb-6">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
            <span className="text-sm font-semibold text-gray-700">
              실시간 업데이트
            </span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6 drop-shadow-lg">
            <span className="text-yellow-300">2025년 09월 24일</span> 기준
            <br />
            근로자 신용지키미{" "}
            <span className="text-cyan-200">실시간 신청현황</span>
          </h2>
          <p className="text-xl text-white text-opacity-90 max-w-3xl mx-auto drop-shadow-md">
            지금 이 순간에도 많은 분들이 신청하고 승인받고 계십니다
          </p>
        </div>

        {/* 통계 카운터 */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div
            className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100"
            data-aos="zoom-in-up"
            data-aos-duration="600"
            data-aos-delay="100"
          >
            <div className="flex items-center justify-between mb-4">
              <TrendingUp className="w-12 h-12 text-green-500" />
              <span className="text-green-500 text-sm font-semibold bg-green-50 px-3 py-1 rounded-full">
                누적 대출금액
              </span>
            </div>
            <div className="counter text-4xl font-bold text-gray-900 mb-2">
              {counters.totalAmount.toLocaleString()}억
            </div>
            <p className="text-gray-600">총 대출 승인 금액</p>
          </div>

          <div
            className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100"
            data-aos="zoom-in-up"
            data-aos-duration="600"
            data-aos-delay="200"
          >
            <div className="flex items-center justify-between mb-4">
              <Eye className="w-12 h-12 text-blue-500" />
              <span className="text-blue-500 text-sm font-semibold bg-blue-50 px-3 py-1 rounded-full">
                누적 대출조회
              </span>
            </div>
            <div className="counter text-4xl font-bold text-gray-900 mb-2">
              {counters.totalInquiries.toLocaleString()}회
            </div>
            <p className="text-gray-600">총 대출 조회 횟수</p>
          </div>

          <div
            className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100"
            data-aos="zoom-in-up"
            data-aos-duration="600"
            data-aos-delay="300"
          >
            <div className="flex items-center justify-between mb-4">
              <CheckCircle className="w-12 h-12 text-purple-500" />
              <span className="text-purple-500 text-sm font-semibold bg-purple-50 px-3 py-1 rounded-full">
                평균 승인비율
              </span>
            </div>
            <div className="counter text-4xl font-bold text-gray-900 mb-2">
              {counters.approvalRate}%
            </div>
            <p className="text-gray-600">대출 승인 성공률</p>
          </div>
        </div>

        {/* 실시간 신청 현황 테이블 */}
        <div
          className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100"
          data-aos="fade-up"
          data-aos-duration="800"
          data-aos-delay="400"
        >
          {/* 테이블 헤더 */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6">
            <div className="grid grid-cols-4 gap-4 font-semibold text-lg">
              <div className="flex items-center">
                <Users className="w-5 h-5 mr-2" />
                진행상황
              </div>
              <div>신청자 조건</div>
              <div>대출금액</div>
              <div className="text-center">상태</div>
            </div>
          </div>

          {/* 테이블 바디 - Slick 스타일 무한 루프 슬라이더 */}
          <div className="h-96 overflow-hidden relative slide-container">
            <div
              className={`${
                isTransitioning
                  ? "transition-transform duration-1000 ease-in-out"
                  : ""
              }`}
              style={{
                transform: `translateY(-${currentIndex * 60}px)`,
              }}
            >
              {infiniteItems.map((app, index) => (
                <div
                  key={`${app.id}-${index}`}
                  className={`grid grid-cols-4 gap-4 p-4 border-b border-gray-100 hover:bg-gray-50 transition-all duration-300 ${
                    index % 2 === 0 ? "bg-white" : "bg-gray-50"
                  }`}
                  style={{
                    height: "60px",
                    // 페이드 효과: 상단과 하단의 아이템들은 약간 투명하게
                    opacity: Math.abs(index - currentIndex - 3) > 2 ? 0.5 : 1,
                  }}
                >
                  <div className="flex items-center">
                    <div
                      className={`px-3 py-1 rounded-full text-sm font-semibold border ${getStatusStyle(
                        app.status
                      )}`}
                    >
                      {app.status}
                    </div>
                  </div>
                  <div className="text-sm text-gray-700">
                    <span className="font-semibold">{app.age}</span> /{" "}
                    {app.company} /
                    <span className="text-blue-600 font-semibold">
                      {" "}
                      개인신용점수 {app.creditScore}점
                    </span>
                  </div>
                  <div className="font-bold text-gray-900 text-lg">
                    {app.amount.toLocaleString()}만원
                  </div>
                  <div className="text-center">
                    {app.status === "승인완료" && (
                      <CheckCircle className="w-5 h-5 text-green-500 mx-auto" />
                    )}
                    {app.status === "심사중" && (
                      <Clock className="w-5 h-5 text-blue-500 mx-auto animate-spin" />
                    )}
                    {app.status === "대기중" && (
                      <Clock className="w-5 h-5 text-gray-500 mx-auto" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 실시간 업데이트 인디케이터 */}
          <div className="p-4 text-center bg-gradient-to-r from-blue-50 to-indigo-50">
            <div className="flex items-center justify-center space-x-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
              <div
                className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse"
                style={{ animationDelay: "0.2s" }}
              ></div>
              <div
                className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"
                style={{ animationDelay: "0.4s" }}
              ></div>
              <span className="ml-2 text-gray-600 font-semibold">
                실시간 업데이트 중...
              </span>
            </div>
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
      `}</style>
    </section>
  );
};

export default LoanStatusSection;

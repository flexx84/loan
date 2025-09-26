"use client";

import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const AOSInit = () => {
  useEffect(() => {
    // PRD 5.1 기본 초기화 설정
    const isMobile = window.innerWidth <= 768;

    AOS.init({
      offset: -1000, // 즉시 실행을 위해 음수 값으로 설정
      delay: 0,
      duration: isMobile ? 300 : 400,
      easing: "ease",
      once: false,
      mirror: false,
      anchorPlacement: "top-bottom",
      disable: false, // 모든 디바이스에서 활성화
    });

    // 페이지 로드 시 즉시 모든 애니메이션 실행
    setTimeout(() => {
      AOS.refresh();
    }, 100);

    // PRD 8.3 배터리 절약 대응
    if ("getBattery" in navigator) {
      (navigator as { getBattery(): Promise<{ level: number }> })
        .getBattery()
        .then((battery: { level: number }) => {
          if (battery.level < 0.2) {
            AOS.init({ disable: true });
          }
        });
    }

    // 스크롤 시 새로고침 (동적 콘텐츠 대응)
    const handleScroll = () => {
      AOS.refresh();
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return null;
};

export default AOSInit;

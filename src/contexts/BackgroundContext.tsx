"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import type { BackgroundSettings } from "@/components/BackgroundManager";

export interface ResponsivePosition {
  desktop: {
    x: number; // 0-100 (percentage)
    y: number; // 0-100 (percentage)
  };
  mobile: {
    x: number; // 0-100 (percentage)
    y: number; // 0-100 (percentage)
  };
}

export interface ResponsiveSize {
  desktop: {
    width: number; // pixels
    height: number; // pixels
  };
  mobile: {
    width: number; // pixels
    height: number; // pixels
  };
}

export interface HeroImageSettings {
  image: string;
  position: ResponsivePosition;
  size: ResponsiveSize;
  opacity: number; // 0-100
  attachment: "fixed" | "scroll"; // 스크롤 시 고정 여부
  bottomFixed: boolean; // 섹션 하단에 고정 여부
}

export interface HeroTextSettings {
  alignment: "left" | "center" | "right";
  titleColor: string;
  subtitleColor: string;
  descriptionColor: string;
  titleSize: "small" | "medium" | "large" | "xl";
  position: ResponsivePosition;
  attachment: "fixed" | "scroll";
}

export interface PaymentCardSettings {
  position: ResponsivePosition;
  size: "small" | "medium" | "large";
  opacity: number; // 0-100
  visible: boolean;
  attachment: "fixed" | "scroll";
}

export interface PaymentCard2Settings {
  position: ResponsivePosition;
  size: "small" | "medium" | "large";
  opacity: number; // 0-100
  visible: boolean;
  attachment: "fixed" | "scroll";
  title: string;
  subtitle: string;
  description: string;
  titleColor: string;
  subtitleColor: string;
  descriptionColor: string;
}

export interface UserBlockSettings {
  position: ResponsivePosition;
  size: "small" | "medium" | "large";
  opacity: number; // 0-100
  visible: boolean;
  attachment: "fixed" | "scroll";
}

interface BackgroundContextType {
  heroSettings: BackgroundSettings;
  loanSettings: BackgroundSettings;
  heroImageSettings: HeroImageSettings;
  heroTextSettings: HeroTextSettings;
  paymentCardSettings: PaymentCardSettings;
  paymentCard2Settings: PaymentCard2Settings;
  userBlockSettings: UserBlockSettings;
  updateHeroSettings: (settings: BackgroundSettings) => void;
  updateLoanSettings: (settings: BackgroundSettings) => void;
  updateHeroImageSettings: (settings: HeroImageSettings) => void;
  updateHeroTextSettings: (settings: HeroTextSettings) => void;
  updatePaymentCardSettings: (settings: PaymentCardSettings) => void;
  updatePaymentCard2Settings: (settings: PaymentCard2Settings) => void;
  updateUserBlockSettings: (settings: UserBlockSettings) => void;
  customBackgrounds: {
    hero: string[];
    loan: string[];
  };
  addCustomBackground: (section: "hero" | "loan", path: string) => void;
  removeCustomBackground: (section: "hero" | "loan", path: string) => void;
  isClient: boolean;
}

const BackgroundContext = createContext<BackgroundContextType | undefined>(
  undefined
);

const defaultHeroSettings: BackgroundSettings = {
  image: "/images/hero/CK_td01830000604_l_1758789035114_mobile.webp",
  opacity: 100,
  size: "cover",
  position: "center",
  attachment: "scroll",
  overlay: {
    enabled: true,
    color: "#ffffff",
    opacity: 68,
  },
};

const defaultHeroImageSettings: HeroImageSettings = {
  image: "/ZLGyUnGMg6GvctEx8LUCBP9Fwo.avif",
  position: {
    desktop: {
      x: 63, // 데스크톱: 위치 (63%)
      y: 50, // 데스크톱: 중앙 위치 (50%)
    },
    mobile: {
      x: 50, // 모바일: 중앙 위치 (50%)
      y: 25, // 모바일: 위쪽 위치 (25%)
    },
  },
  size: {
    desktop: {
      width: 800,
      height: 300,
    },
    mobile: {
      width: 300,
      height: 112,
    },
  },
  opacity: 100,
  attachment: "scroll",
  bottomFixed: true,
};

const defaultHeroTextSettings: HeroTextSettings = {
  alignment: "left",
  titleColor: "#1f2937",
  subtitleColor: "#2563eb",
  descriptionColor: "#6b7280",
  titleSize: "large",
  position: {
    desktop: {
      x: 22, // 데스크톱: 왼쪽 위치 (22%)
      y: 45, // 데스크톱: 수직 위치 (45%)
    },
    mobile: {
      x: 50, // 모바일: 중앙 위치 (50%)
      y: 70, // 모바일: 아래쪽 위치 (70%)
    },
  },
  attachment: "scroll",
};

const defaultPaymentCardSettings: PaymentCardSettings = {
  position: {
    desktop: {
      x: 67, // 데스크톱: 위치 (67%)
      y: 32, // 데스크톱: 위치 (32%)
    },
    mobile: {
      x: 50, // 모바일: 중앙 위치 (50%)
      y: 15, // 모바일: 위쪽 위치 (15%)
    },
  },
  size: "medium",
  opacity: 95,
  visible: true,
  attachment: "scroll",
};

const defaultPaymentCard2Settings: PaymentCard2Settings = {
  position: {
    desktop: {
      x: 81, // 데스크톱: 위치 (81%)
      y: 66, // 데스크톱: 위치 (66%)
    },
    mobile: {
      x: 50, // 모바일: 중앙 위치 (50%)
      y: 65, // 모바일: 아래쪽 위치 (65%)
    },
  },
  size: "medium",
  opacity: 95,
  visible: true,
  attachment: "scroll",
  title: "빠른 승인!",
  subtitle: "당일 처리",
  description: "신속한 대출 서비스!",
  titleColor: "#1f2937",
  subtitleColor: "#2563eb",
  descriptionColor: "#059669",
};

const defaultUserBlockSettings: UserBlockSettings = {
  position: {
    desktop: {
      x: 70, // 데스크톱: 오른쪽 위치 (70%)
      y: 65, // 데스크톱: 아래쪽 위치 (65%)
    },
    mobile: {
      x: 50, // 모바일: 중앙 위치 (50%)
      y: 50, // 모바일: 중앙 위치 (50%)
    },
  },
  size: "medium",
  opacity: 100,
  visible: true,
  attachment: "scroll",
};

const defaultLoanSettings: BackgroundSettings = {
  image: "/images/loan/CK_tica114m19040525_l_1758789070676.webp",
  opacity: 100,
  size: "cover",
  position: "center",
  attachment: "scroll",
  overlay: {
    enabled: true,
    color: "#000000",
    opacity: 30,
  },
};

export const BackgroundProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isClient, setIsClient] = useState(false);
  const [heroSettings, setHeroSettings] =
    useState<BackgroundSettings>(defaultHeroSettings);
  const [loanSettings, setLoanSettings] =
    useState<BackgroundSettings>(defaultLoanSettings);
  const [heroImageSettings, setHeroImageSettings] = useState<HeroImageSettings>(
    defaultHeroImageSettings
  );
  const [heroTextSettings, setHeroTextSettings] = useState<HeroTextSettings>(
    defaultHeroTextSettings
  );
  const [paymentCardSettings, setPaymentCardSettings] =
    useState<PaymentCardSettings>(defaultPaymentCardSettings);
  const [paymentCard2Settings, setPaymentCard2Settings] =
    useState<PaymentCard2Settings>(defaultPaymentCard2Settings);
  const [userBlockSettings, setUserBlockSettings] = useState<UserBlockSettings>(
    defaultUserBlockSettings
  );
  const [customBackgrounds, setCustomBackgrounds] = useState<{
    hero: string[];
    loan: string[];
  }>({
    hero: [],
    loan: [],
  });

  // 클라이언트 사이드에서만 실행
  useEffect(() => {
    setIsClient(true);

    // localStorage에서 설정 로딩
    const loadSettings = () => {
      try {
        // 히어로 섹션 설정 로딩
        const savedHeroSettings = localStorage.getItem(
          "hero-background-settings"
        );
        if (savedHeroSettings) {
          const parsed = JSON.parse(savedHeroSettings);
          setHeroSettings(parsed);
        }

        // 대출 섹션 설정 로딩
        const savedLoanSettings = localStorage.getItem(
          "loan-background-settings"
        );
        if (savedLoanSettings) {
          const parsed = JSON.parse(savedLoanSettings);
          setLoanSettings(parsed);
        }

        // 히어로 이미지 설정 로딩
        const savedHeroImageSettings = localStorage.getItem(
          "hero-image-settings"
        );
        if (savedHeroImageSettings) {
          const parsed = JSON.parse(savedHeroImageSettings);
          setHeroImageSettings(parsed);
        }

        // 히어로 텍스트 설정 로딩
        const savedHeroTextSettings =
          localStorage.getItem("hero-text-settings");
        if (savedHeroTextSettings) {
          const parsed = JSON.parse(savedHeroTextSettings);
          setHeroTextSettings(parsed);
        }

        // Payment Card 설정 로딩
        const savedPaymentCardSettings = localStorage.getItem(
          "payment-card-settings"
        );
        if (savedPaymentCardSettings) {
          const parsed = JSON.parse(savedPaymentCardSettings);
          setPaymentCardSettings(parsed);
        }

        // Payment Card 2 설정 로딩
        const savedPaymentCard2Settings = localStorage.getItem(
          "payment-card-2-settings"
        );
        if (savedPaymentCard2Settings) {
          const parsed = JSON.parse(savedPaymentCard2Settings);
          setPaymentCard2Settings(parsed);
        }

        // User Block 설정 로딩
        const savedUserBlockSettings = localStorage.getItem(
          "user-block-settings"
        );
        if (savedUserBlockSettings) {
          const parsed = JSON.parse(savedUserBlockSettings);
          setUserBlockSettings(parsed);
        }

        // 커스텀 배경 이미지 로딩
        const savedHeroCustomBgs = localStorage.getItem(
          "hero-custom-backgrounds"
        );
        const savedLoanCustomBgs = localStorage.getItem(
          "loan-custom-backgrounds"
        );

        setCustomBackgrounds({
          hero: savedHeroCustomBgs ? JSON.parse(savedHeroCustomBgs) : [],
          loan: savedLoanCustomBgs ? JSON.parse(savedLoanCustomBgs) : [],
        });

        console.log("✅ Background settings loaded from localStorage");
      } catch (error) {
        console.error("❌ Failed to load background settings:", error);
      }
    };

    loadSettings();
  }, []);

  const updateHeroSettings = (settings: BackgroundSettings) => {
    setHeroSettings(settings);
    if (isClient) {
      localStorage.setItem(
        "hero-background-settings",
        JSON.stringify(settings)
      );

      // 기존 호환성을 위해 이미지 경로도 별도 저장
      localStorage.setItem("hero-section-bg", settings.image);

      console.log("✅ Hero background settings saved:", settings);
    }
  };

  const updateLoanSettings = (settings: BackgroundSettings) => {
    setLoanSettings(settings);
    if (isClient) {
      localStorage.setItem(
        "loan-background-settings",
        JSON.stringify(settings)
      );

      // 기존 호환성을 위해 이미지 경로도 별도 저장
      localStorage.setItem("loan-section-bg", settings.image);

      console.log("✅ Loan background settings saved:", settings);
    }
  };

  const updateHeroImageSettings = (settings: HeroImageSettings) => {
    setHeroImageSettings(settings);
    if (isClient) {
      localStorage.setItem("hero-image-settings", JSON.stringify(settings));
      console.log("✅ Hero image settings saved:", settings);
    }
  };

  const updateHeroTextSettings = (settings: HeroTextSettings) => {
    setHeroTextSettings(settings);
    if (isClient) {
      localStorage.setItem("hero-text-settings", JSON.stringify(settings));
      console.log("✅ Hero text settings saved:", settings);
    }
  };

  const updatePaymentCardSettings = (settings: PaymentCardSettings) => {
    setPaymentCardSettings(settings);
    if (isClient) {
      localStorage.setItem("payment-card-settings", JSON.stringify(settings));
      console.log("✅ Payment card settings saved:", settings);
    }
  };

  const updatePaymentCard2Settings = (settings: PaymentCard2Settings) => {
    setPaymentCard2Settings(settings);
    if (isClient) {
      localStorage.setItem("payment-card-2-settings", JSON.stringify(settings));
      console.log("✅ Payment card 2 settings saved:", settings);
    }
  };

  const updateUserBlockSettings = (settings: UserBlockSettings) => {
    setUserBlockSettings(settings);
    if (isClient) {
      localStorage.setItem("user-block-settings", JSON.stringify(settings));
      console.log("✅ User block settings saved:", settings);
    }
  };

  const addCustomBackground = (section: "hero" | "loan", path: string) => {
    setCustomBackgrounds((prev) => {
      const updated = {
        ...prev,
        [section]: [...prev[section], path],
      };

      if (isClient) {
        localStorage.setItem(
          `${section}-custom-backgrounds`,
          JSON.stringify(updated[section])
        );
      }

      return updated;
    });
  };

  const removeCustomBackground = (section: "hero" | "loan", path: string) => {
    setCustomBackgrounds((prev) => {
      const updated = {
        ...prev,
        [section]: prev[section].filter((bg) => bg !== path),
      };

      if (isClient) {
        localStorage.setItem(
          `${section}-custom-backgrounds`,
          JSON.stringify(updated[section])
        );
      }

      return updated;
    });
  };

  const value: BackgroundContextType = {
    heroSettings,
    loanSettings,
    heroImageSettings,
    heroTextSettings,
    paymentCardSettings,
    paymentCard2Settings,
    userBlockSettings,
    updateHeroSettings,
    updateLoanSettings,
    updateHeroImageSettings,
    updateHeroTextSettings,
    updatePaymentCardSettings,
    updatePaymentCard2Settings,
    updateUserBlockSettings,
    customBackgrounds,
    addCustomBackground,
    removeCustomBackground,
    isClient,
  };

  return (
    <BackgroundContext.Provider value={value}>
      {children}
    </BackgroundContext.Provider>
  );
};

export const useBackground = () => {
  const context = useContext(BackgroundContext);
  if (context === undefined) {
    throw new Error("useBackground must be used within a BackgroundProvider");
  }
  return context;
};

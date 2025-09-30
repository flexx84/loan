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

export interface LoanCardSettings {
  id: string;
  visible: boolean;
  title: string;
  description: string;
  features: string[];
  color: "blue" | "green" | "purple" | "orange";
  icon: string;
  background: {
    enabled: boolean;
    type: "color" | "gradient" | "image";
    color: string;
    gradient: {
      from: string;
      to: string;
      direction: "to-r" | "to-l" | "to-t" | "to-b" | "to-br" | "to-bl" | "to-tr" | "to-tl";
    };
    image: string;
    opacity: number; // 0-100
  };
  textColor: {
    title: string;
    description: string;
    features: string;
  };
}

interface BackgroundContextType {
  heroSettings: BackgroundSettings;
  loanSettings: BackgroundSettings;
  serviceSettings: BackgroundSettings;
  heroImageSettings: HeroImageSettings;
  heroTextSettings: HeroTextSettings;
  paymentCardSettings: PaymentCardSettings;
  paymentCard2Settings: PaymentCard2Settings;
  userBlockSettings: UserBlockSettings;
  loanCardSettings: LoanCardSettings[];
  updateHeroSettings: (settings: BackgroundSettings) => void;
  updateLoanSettings: (settings: BackgroundSettings) => void;
  updateServiceSettings: (settings: BackgroundSettings) => void;
  updateHeroImageSettings: (settings: HeroImageSettings) => void;
  updateHeroTextSettings: (settings: HeroTextSettings) => void;
  updatePaymentCardSettings: (settings: PaymentCardSettings) => void;
  updatePaymentCard2Settings: (settings: PaymentCard2Settings) => void;
  updateUserBlockSettings: (settings: UserBlockSettings) => void;
  updateLoanCardSettings: (settings: LoanCardSettings[]) => void;
  customBackgrounds: {
    hero: string[];
    loan: string[];
    service: string[];
  };
  addCustomBackground: (section: "hero" | "loan" | "service", path: string) => void;
  removeCustomBackground: (section: "hero" | "loan" | "service", path: string) => void;
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
      y: 15, // 모바일: 위쪽 위치 (15%)
    },
  },
  size: {
    desktop: {
      width: 800,
      height: 300,
    },
    mobile: {
      width: 380,
      height: 300,
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
      y: 31, // 모바일: 위쪽 위치 (31%)
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

const defaultServiceSettings: BackgroundSettings = {
  image: "",
  opacity: 100,
  size: "cover",
  position: "center",
  attachment: "scroll",
  overlay: {
    enabled: false,
    color: "#ffffff",
    opacity: 50,
  },
};

const defaultLoanCardSettings: LoanCardSettings[] = [
  {
    id: "credit-loan",
    visible: true,
    title: "신용대출",
    description: "담보 없이 신용도만으로 대출",
    features: ["최대 1억원", "연 3.5%~", "24시간 승인"],
    color: "blue",
    icon: "CreditCard",
    background: {
      enabled: false,
      type: "color",
      color: "#ffffff",
      gradient: {
        from: "#3b82f6",
        to: "#1d4ed8",
        direction: "to-br",
      },
      image: "",
      opacity: 100,
    },
    textColor: {
      title: "#1f2937",
      description: "#6b7280",
      features: "#374151",
    },
  },
  {
    id: "mortgage-loan",
    visible: true,
    title: "주택담보대출",
    description: "내 집을 담보로 저금리 대출",
    features: ["최대 20억원", "연 2.5%~", "LTV 80%"],
    color: "green",
    icon: "Home",
    background: {
      enabled: false,
      type: "color",
      color: "#ffffff",
      gradient: {
        from: "#10b981",
        to: "#059669",
        direction: "to-br",
      },
      image: "",
      opacity: 100,
    },
    textColor: {
      title: "#1f2937",
      description: "#6b7280",
      features: "#374151",
    },
  },
  {
    id: "business-loan",
    visible: true,
    title: "사업자대출",
    description: "사업자등록증으로 사업자금 조달",
    features: ["최대 10억원", "연 4.0%~", "서류간소화"],
    color: "purple",
    icon: "Briefcase",
    background: {
      enabled: false,
      type: "color",
      color: "#ffffff",
      gradient: {
        from: "#8b5cf6",
        to: "#7c3aed",
        direction: "to-br",
      },
      image: "",
      opacity: 100,
    },
    textColor: {
      title: "#1f2937",
      description: "#6b7280",
      features: "#374151",
    },
  },
  {
    id: "property-loan",
    visible: true,
    title: "부동산담보대출",
    description: "부동산을 담보로 한 대출",
    features: ["최대 50억원", "연 3.0%~", "높은 한도"],
    color: "orange",
    icon: "Building2",
    background: {
      enabled: false,
      type: "color",
      color: "#ffffff",
      gradient: {
        from: "#f97316",
        to: "#ea580c",
        direction: "to-br",
      },
      image: "",
      opacity: 100,
    },
    textColor: {
      title: "#1f2937",
      description: "#6b7280",
      features: "#374151",
    },
  },
];

export const BackgroundProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isClient, setIsClient] = useState(false);
  const [heroSettings, setHeroSettings] =
    useState<BackgroundSettings>(defaultHeroSettings);
  const [loanSettings, setLoanSettings] =
    useState<BackgroundSettings>(defaultLoanSettings);
  const [serviceSettings, setServiceSettings] =
    useState<BackgroundSettings>(defaultServiceSettings);
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
  const [loanCardSettings, setLoanCardSettings] = useState<LoanCardSettings[]>(
    defaultLoanCardSettings
  );
  const [customBackgrounds, setCustomBackgrounds] = useState<{
    hero: string[];
    loan: string[];
    service: string[];
  }>({
    hero: [],
    loan: [],
    service: [],
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

        // 서비스 섹션 설정 로딩
        const savedServiceSettings = localStorage.getItem(
          "service-background-settings"
        );
        if (savedServiceSettings) {
          const parsed = JSON.parse(savedServiceSettings);
          setServiceSettings(parsed);
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

        // Loan Card 설정 로딩
        const savedLoanCardSettings = localStorage.getItem(
          "loan-card-settings"
        );
        if (savedLoanCardSettings) {
          const parsed = JSON.parse(savedLoanCardSettings);
          setLoanCardSettings(parsed);
        }

        // 커스텀 배경 이미지 로딩
        const savedHeroCustomBgs = localStorage.getItem(
          "hero-custom-backgrounds"
        );
        const savedLoanCustomBgs = localStorage.getItem(
          "loan-custom-backgrounds"
        );
        const savedServiceCustomBgs = localStorage.getItem(
          "service-custom-backgrounds"
        );

        setCustomBackgrounds({
          hero: savedHeroCustomBgs ? JSON.parse(savedHeroCustomBgs) : [],
          loan: savedLoanCustomBgs ? JSON.parse(savedLoanCustomBgs) : [],
          service: savedServiceCustomBgs ? JSON.parse(savedServiceCustomBgs) : [],
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

  const updateServiceSettings = (settings: BackgroundSettings) => {
    setServiceSettings(settings);
    if (isClient) {
      localStorage.setItem(
        "service-background-settings",
        JSON.stringify(settings)
      );

      // 기존 호환성을 위해 이미지 경로도 별도 저장
      localStorage.setItem("service-section-bg", settings.image);

      console.log("✅ Service background settings saved:", settings);
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

  const updateLoanCardSettings = (settings: LoanCardSettings[]) => {
    setLoanCardSettings(settings);
    if (isClient) {
      localStorage.setItem("loan-card-settings", JSON.stringify(settings));
      console.log("✅ Loan card settings saved:", settings);
    }
  };

  const addCustomBackground = (section: "hero" | "loan" | "service", path: string) => {
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

  const removeCustomBackground = (section: "hero" | "loan" | "service", path: string) => {
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
    serviceSettings,
    heroImageSettings,
    heroTextSettings,
    paymentCardSettings,
    paymentCard2Settings,
    userBlockSettings,
    loanCardSettings,
    updateHeroSettings,
    updateLoanSettings,
    updateServiceSettings,
    updateHeroImageSettings,
    updateHeroTextSettings,
    updatePaymentCardSettings,
    updatePaymentCard2Settings,
    updateUserBlockSettings,
    updateLoanCardSettings,
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

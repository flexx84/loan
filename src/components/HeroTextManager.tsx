"use client";

import React, { useState, useEffect } from "react";
import { X, Save, RotateCcw, Type, Monitor, Smartphone } from "lucide-react";
import type { HeroTextSettings } from "@/contexts/BackgroundContext";

interface HeroTextManagerProps {
  currentSettings: HeroTextSettings;
  onSettingsChange: (settings: HeroTextSettings) => void;
  isVisible: boolean;
  onClose: () => void;
}

const HeroTextManager: React.FC<HeroTextManagerProps> = ({
  currentSettings,
  onSettingsChange,
  isVisible,
  onClose,
}) => {
  const [tempSettings, setTempSettings] =
    useState<HeroTextSettings>(currentSettings);
  const [activeDevice, setActiveDevice] = useState<"desktop" | "mobile">(
    "desktop"
  );

  useEffect(() => {
    setTempSettings(currentSettings);
  }, [currentSettings, isVisible]);

  const handleSave = () => {
    onSettingsChange(tempSettings);
    onClose();
  };

  const handleReset = () => {
    const defaultSettings: HeroTextSettings = {
      alignment: "left",
      titleColor: "#1f2937",
      subtitleColor: "#2563eb",
      descriptionColor: "#6b7280",
      titleSize: "large",
      position: {
        desktop: {
          x: 25,
          y: 50,
        },
        mobile: {
          x: 50,
          y: 70,
        },
      },
      attachment: "scroll",
    };
    setTempSettings(defaultSettings);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-5xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b">
          <h3 className="text-xl font-bold text-gray-900">📝 텍스트 설정</h3>
          <button
            onClick={onClose}
            className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* 디바이스 선택 */}
          <div>
            <h4 className="text-lg font-semibold mb-4">디바이스별 설정</h4>
            <div className="flex space-x-4 mb-6">
              <button
                onClick={() => setActiveDevice("desktop")}
                className={`flex items-center space-x-2 px-6 py-3 rounded-lg border-2 transition-all ${
                  activeDevice === "desktop"
                    ? "border-green-500 bg-green-50 text-green-700"
                    : "border-gray-200 hover:border-green-300 text-gray-700"
                }`}
              >
                <Monitor className="w-4 h-4" />
                <span>데스크톱</span>
              </button>
              <button
                onClick={() => setActiveDevice("mobile")}
                className={`flex items-center space-x-2 px-6 py-3 rounded-lg border-2 transition-all ${
                  activeDevice === "mobile"
                    ? "border-green-500 bg-green-50 text-green-700"
                    : "border-gray-200 hover:border-green-300 text-gray-700"
                }`}
              >
                <Smartphone className="w-4 h-4" />
                <span>모바일</span>
              </button>
            </div>
          </div>

          {/* 위치 설정 */}
          <div>
            <h4 className="text-lg font-semibold mb-4">
              {activeDevice === "desktop" ? "데스크톱" : "모바일"} 위치 설정
            </h4>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  수평 위치: {tempSettings.position?.[activeDevice]?.x || 25}%
                </label>
                <input
                  type="range"
                  min="10"
                  max="90"
                  value={tempSettings.position?.[activeDevice]?.x || 25}
                  onChange={(e) =>
                    setTempSettings((prev) => ({
                      ...prev,
                      position: {
                        ...prev.position,
                        [activeDevice]: {
                          ...prev.position[activeDevice],
                          x: parseInt(e.target.value),
                        },
                      },
                    }))
                  }
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  수직 위치: {tempSettings.position?.[activeDevice]?.y || 50}%
                </label>
                <input
                  type="range"
                  min="10"
                  max="90"
                  value={tempSettings.position?.[activeDevice]?.y || 50}
                  onChange={(e) =>
                    setTempSettings((prev) => ({
                      ...prev,
                      position: {
                        ...prev.position,
                        [activeDevice]: {
                          ...prev.position[activeDevice],
                          y: parseInt(e.target.value),
                        },
                      },
                    }))
                  }
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
              </div>
            </div>
          </div>

          {/* 공통 설정 */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* 텍스트 정렬 */}
            <div>
              <h4 className="text-lg font-semibold mb-4">텍스트 정렬</h4>
              <div className="space-y-2">
                {(["left", "center", "right"] as const).map((align) => (
                  <button
                    key={align}
                    onClick={() =>
                      setTempSettings((prev) => ({ ...prev, alignment: align }))
                    }
                    className={`w-full px-4 py-2 rounded-lg border-2 transition-all ${
                      tempSettings.alignment === align
                        ? "border-green-500 bg-green-50 text-green-700"
                        : "border-gray-200 hover:border-green-300 text-gray-700"
                    }`}
                  >
                    {align === "left"
                      ? "왼쪽 정렬"
                      : align === "center"
                      ? "중앙 정렬"
                      : "오른쪽 정렬"}
                  </button>
                ))}
              </div>
            </div>

            {/* 스크롤 고정 */}
            <div>
              <h4 className="text-lg font-semibold mb-4">스크롤 고정</h4>
              <div className="space-y-2">
                <button
                  onClick={() =>
                    setTempSettings((prev) => ({
                      ...prev,
                      attachment: "scroll",
                    }))
                  }
                  className={`w-full px-4 py-2 rounded-lg border-2 transition-all ${
                    tempSettings.attachment === "scroll"
                      ? "border-green-500 bg-green-50 text-green-700"
                      : "border-gray-200 hover:border-green-300 text-gray-700"
                  }`}
                >
                  스크롤
                </button>
                <button
                  onClick={() =>
                    setTempSettings((prev) => ({
                      ...prev,
                      attachment: "fixed",
                    }))
                  }
                  className={`w-full px-4 py-2 rounded-lg border-2 transition-all ${
                    tempSettings.attachment === "fixed"
                      ? "border-green-500 bg-green-50 text-green-700"
                      : "border-gray-200 hover:border-green-300 text-gray-700"
                  }`}
                >
                  고정
                </button>
              </div>
            </div>
          </div>

          {/* 제목 크기 */}
          <div>
            <h4 className="text-lg font-semibold mb-4">제목 크기</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {(["small", "medium", "large", "xl"] as const).map((size) => (
                <button
                  key={size}
                  onClick={() =>
                    setTempSettings((prev) => ({ ...prev, titleSize: size }))
                  }
                  className={`px-4 py-2 rounded-lg border-2 transition-all ${
                    tempSettings.titleSize === size
                      ? "border-green-500 bg-green-50 text-green-700"
                      : "border-gray-200 hover:border-green-300 text-gray-700"
                  }`}
                >
                  {size === "small"
                    ? "작게"
                    : size === "medium"
                    ? "보통"
                    : size === "large"
                    ? "크게"
                    : "매우 크게"}
                </button>
              ))}
            </div>
          </div>

          {/* 색상 설정 */}
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <h4 className="text-lg font-semibold mb-4">제목 색상</h4>
              <input
                type="color"
                value={tempSettings.titleColor}
                onChange={(e) =>
                  setTempSettings((prev) => ({
                    ...prev,
                    titleColor: e.target.value,
                  }))
                }
                className="w-full h-12 rounded-lg border-2 border-gray-300 cursor-pointer"
              />
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">부제목 색상</h4>
              <input
                type="color"
                value={tempSettings.subtitleColor}
                onChange={(e) =>
                  setTempSettings((prev) => ({
                    ...prev,
                    subtitleColor: e.target.value,
                  }))
                }
                className="w-full h-12 rounded-lg border-2 border-gray-300 cursor-pointer"
              />
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">설명 색상</h4>
              <input
                type="color"
                value={tempSettings.descriptionColor}
                onChange={(e) =>
                  setTempSettings((prev) => ({
                    ...prev,
                    descriptionColor: e.target.value,
                  }))
                }
                className="w-full h-12 rounded-lg border-2 border-gray-300 cursor-pointer"
              />
            </div>
          </div>

          {/* 미리보기 */}
          <div>
            <h4 className="text-lg font-semibold mb-4">미리보기</h4>
            <div className="relative w-full h-64 bg-gradient-to-r from-blue-100 to-purple-100 rounded-lg overflow-hidden border-2 border-gray-200">
              <div
                className="absolute transform -translate-x-1/2 -translate-y-1/2"
                style={{
                  left: `${tempSettings.position?.[activeDevice]?.x || 25}%`,
                  top: `${tempSettings.position?.[activeDevice]?.y || 50}%`,
                  textAlign: tempSettings.alignment,
                  maxWidth: "300px",
                }}
              >
                <div className="bg-white bg-opacity-90 p-4 rounded-lg shadow-lg">
                  <p
                    className="font-bold text-xs mb-1"
                    style={{ color: tempSettings.subtitleColor }}
                  >
                    *소득확인만 되면 높은 승인률!!*
                  </p>
                  <h1
                    className={`font-bold mb-2 ${
                      tempSettings.titleSize === "small"
                        ? "text-sm"
                        : tempSettings.titleSize === "medium"
                        ? "text-base"
                        : tempSettings.titleSize === "large"
                        ? "text-lg"
                        : "text-xl"
                    }`}
                    style={{ color: tempSettings.titleColor }}
                  >
                    <span style={{ color: tempSettings.subtitleColor }}>
                      안전하고 빠른 대출,
                    </span>
                    <br />
                    가장 현명한 선택!
                  </h1>
                  <p
                    className="text-xs"
                    style={{ color: tempSettings.descriptionColor }}
                  >
                    4대보험 직장인 빠른승인 가능
                    <br />
                    주부·프리랜서·개인사업자도 가능
                  </p>
                </div>
              </div>
              <div className="absolute top-2 right-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-xs">
                {activeDevice === "desktop" ? "데스크톱" : "모바일"} 미리보기
              </div>
            </div>
          </div>

          {/* 액션 버튼 */}
          <div className="flex justify-between items-center pt-4 border-t">
            <button
              onClick={handleReset}
              className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              <span>기본값으로 리셋</span>
            </button>
            <div className="flex space-x-3">
              <button
                onClick={onClose}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                취소
              </button>
              <button
                onClick={handleSave}
                className="flex items-center space-x-2 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                <Save className="w-4 h-4" />
                <span>적용</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroTextManager;

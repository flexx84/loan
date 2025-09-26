"use client";

import React, { useState, useEffect } from "react";
import {
  X,
  Save,
  RotateCcw,
  Eye,
  EyeOff,
  Monitor,
  Smartphone,
} from "lucide-react";
import type { PaymentCard2Settings } from "@/contexts/BackgroundContext";

interface PaymentCard2ManagerProps {
  currentSettings: PaymentCard2Settings;
  onSettingsChange: (settings: PaymentCard2Settings) => void;
  isVisible: boolean;
  onClose: () => void;
}

const PaymentCard2Manager: React.FC<PaymentCard2ManagerProps> = ({
  currentSettings,
  onSettingsChange,
  isVisible,
  onClose,
}) => {
  const [tempSettings, setTempSettings] =
    useState<PaymentCard2Settings>(currentSettings);
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
    const defaultSettings: PaymentCard2Settings = {
      position: {
        desktop: {
          x: 75,
          y: 60,
        },
        mobile: {
          x: 50,
          y: 50,
        },
      },
      size: "medium",
      opacity: 90,
      visible: true,
      attachment: "fixed",
      title: "빠른 승인!",
      subtitle: "당일 처리",
      description: "신속한 대출 서비스!",
      titleColor: "#1f2937",
      subtitleColor: "#059669",
      descriptionColor: "#059669",
    };
    setTempSettings(defaultSettings);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b">
          <h3 className="text-xl font-bold text-gray-900">
            💳 Payment Card 2 설정
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-8">
          {/* 표시/숨김 설정 */}
          <div>
            <h4 className="text-lg font-semibold mb-4">표시 설정</h4>
            <div className="flex items-center space-x-4">
              <button
                onClick={() =>
                  setTempSettings((prev) => ({ ...prev, visible: true }))
                }
                className={`flex items-center space-x-2 px-6 py-3 rounded-lg border-2 transition-all ${
                  tempSettings.visible
                    ? "border-orange-500 bg-orange-50 text-orange-700"
                    : "border-gray-200 hover:border-orange-300 text-gray-700"
                }`}
              >
                <Eye className="w-5 h-5" />
                <span>표시</span>
              </button>
              <button
                onClick={() =>
                  setTempSettings((prev) => ({ ...prev, visible: false }))
                }
                className={`flex items-center space-x-2 px-6 py-3 rounded-lg border-2 transition-all ${
                  !tempSettings.visible
                    ? "border-orange-500 bg-orange-50 text-orange-700"
                    : "border-gray-200 hover:border-orange-300 text-gray-700"
                }`}
              >
                <EyeOff className="w-5 h-5" />
                <span>숨김</span>
              </button>
            </div>
          </div>

          {/* 디바이스 선택 */}
          <div>
            <h4 className="text-lg font-semibold mb-4">디바이스 설정</h4>
            <div className="flex space-x-4 mb-6">
              <button
                onClick={() => setActiveDevice("desktop")}
                className={`flex items-center space-x-2 px-6 py-3 rounded-lg border-2 transition-all ${
                  activeDevice === "desktop"
                    ? "border-orange-500 bg-orange-50 text-orange-700"
                    : "border-gray-200 hover:border-orange-300 text-gray-700"
                }`}
              >
                <Monitor className="w-5 h-5" />
                <span>데스크톱</span>
              </button>
              <button
                onClick={() => setActiveDevice("mobile")}
                className={`flex items-center space-x-2 px-6 py-3 rounded-lg border-2 transition-all ${
                  activeDevice === "mobile"
                    ? "border-orange-500 bg-orange-50 text-orange-700"
                    : "border-gray-200 hover:border-orange-300 text-gray-700"
                }`}
              >
                <Smartphone className="w-5 h-5" />
                <span>모바일</span>
              </button>
            </div>

            {/* 위치 설정 */}
            <div>
              <h4 className="text-lg font-semibold mb-4">
                {activeDevice === "desktop" ? "데스크톱" : "모바일"} 위치 설정
              </h4>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    수평 위치: {tempSettings.position?.[activeDevice]?.x || 75}%
                  </label>
                  <input
                    type="range"
                    min="10"
                    max="90"
                    value={tempSettings.position?.[activeDevice]?.x || 75}
                    onChange={(e) =>
                      setTempSettings((prev) => ({
                        ...prev,
                        position: {
                          ...prev.position,
                          [activeDevice]: {
                            ...prev.position?.[activeDevice],
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
                    수직 위치: {tempSettings.position?.[activeDevice]?.y || 60}%
                  </label>
                  <input
                    type="range"
                    min="10"
                    max="90"
                    value={tempSettings.position?.[activeDevice]?.y || 60}
                    onChange={(e) =>
                      setTempSettings((prev) => ({
                        ...prev,
                        position: {
                          ...prev.position,
                          [activeDevice]: {
                            ...prev.position?.[activeDevice],
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
          </div>

          {/* 공통 설정 */}
          <div className="grid md:grid-cols-3 gap-6">
            {/* 카드 크기 */}
            <div>
              <h4 className="text-lg font-semibold mb-4">카드 크기</h4>
              <div className="space-y-2">
                {(["small", "medium", "large"] as const).map((size) => (
                  <button
                    key={size}
                    onClick={() =>
                      setTempSettings((prev) => ({ ...prev, size }))
                    }
                    className={`w-full px-4 py-2 rounded-lg border-2 transition-all ${
                      tempSettings.size === size
                        ? "border-orange-500 bg-orange-50 text-orange-700"
                        : "border-gray-200 hover:border-orange-300 text-gray-700"
                    }`}
                  >
                    {size === "small"
                      ? "작게 (75%)"
                      : size === "medium"
                      ? "보통 (100%)"
                      : "크게 (125%)"}
                  </button>
                ))}
              </div>
            </div>

            {/* 투명도 */}
            <div>
              <h4 className="text-lg font-semibold mb-4">
                투명도: {tempSettings.opacity}%
              </h4>
              <input
                type="range"
                min="0"
                max="100"
                value={tempSettings.opacity}
                onChange={(e) =>
                  setTempSettings((prev) => ({
                    ...prev,
                    opacity: parseInt(e.target.value),
                  }))
                }
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
            </div>

            {/* 스크롤/고정 */}
            <div>
              <h4 className="text-lg font-semibold mb-4">스크롤/고정</h4>
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
                      ? "border-orange-500 bg-orange-50 text-orange-700"
                      : "border-gray-200 hover:border-orange-300 text-gray-700"
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
                      ? "border-orange-500 bg-orange-50 text-orange-700"
                      : "border-gray-200 hover:border-orange-300 text-gray-700"
                  }`}
                >
                  고정
                </button>
              </div>
            </div>
          </div>

          {/* 텍스트 설정 */}
          <div>
            <h4 className="text-lg font-semibold mb-4">텍스트 설정</h4>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  제목
                </label>
                <input
                  type="text"
                  value={tempSettings.title}
                  onChange={(e) =>
                    setTempSettings((prev) => ({
                      ...prev,
                      title: e.target.value,
                    }))
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  부제목
                </label>
                <input
                  type="text"
                  value={tempSettings.subtitle}
                  onChange={(e) =>
                    setTempSettings((prev) => ({
                      ...prev,
                      subtitle: e.target.value,
                    }))
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  설명
                </label>
                <input
                  type="text"
                  value={tempSettings.description}
                  onChange={(e) =>
                    setTempSettings((prev) => ({
                      ...prev,
                      description: e.target.value,
                    }))
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
            </div>
          </div>

          {/* 색상 설정 */}
          <div>
            <h4 className="text-lg font-semibold mb-4">색상 설정</h4>
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  제목 색상
                </label>
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
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  부제목 색상
                </label>
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
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  설명 색상
                </label>
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
          </div>

          {/* 미리보기 */}
          <div>
            <h4 className="text-lg font-semibold mb-4">미리보기</h4>
            <div className="relative w-full h-64 bg-gradient-to-r from-blue-100 to-purple-100 rounded-lg overflow-hidden border-2 border-gray-200">
              <div
                className="absolute bg-white rounded-lg shadow-lg p-4 border"
                style={{
                  left: `${tempSettings.position?.[activeDevice]?.x || 75}%`,
                  top: `${tempSettings.position?.[activeDevice]?.y || 60}%`,
                  transform: `translate(-50%, -50%) scale(${
                    tempSettings.size === "small"
                      ? 0.5
                      : tempSettings.size === "large"
                      ? 0.7
                      : 0.6
                  })`,
                  opacity: (tempSettings.opacity || 90) / 100,
                  minWidth: "200px",
                }}
              >
                <div className="space-y-2">
                  <div>
                    <p
                      className="font-bold text-gray-900 text-sm"
                      style={{ color: tempSettings.titleColor }}
                    >
                      {tempSettings.title}
                    </p>
                    <p
                      className="text-gray-900 text-xs"
                      style={{ color: tempSettings.subtitleColor }}
                    >
                      <strong>{tempSettings.subtitle}</strong> 가능
                    </p>
                  </div>
                  <div>
                    <p
                      className="text-xs font-bold"
                      style={{ color: tempSettings.descriptionColor }}
                    >
                      {tempSettings.description}
                    </p>
                  </div>
                </div>
              </div>
              <div className="absolute top-2 right-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-xs">
                {activeDevice === "desktop" ? "데스크톱" : "모바일"} 미리보기
                (약 50% 크기)
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end space-x-4 p-6 border-t bg-gray-50">
          <button
            onClick={handleReset}
            className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            <span>초기화</span>
          </button>
          <button
            onClick={handleSave}
            className="flex items-center space-x-2 px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
          >
            <Save className="w-4 h-4" />
            <span>저장</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentCard2Manager;

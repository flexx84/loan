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
import type { PaymentCardSettings } from "@/contexts/BackgroundContext";

interface PaymentCardManagerProps {
  currentSettings: PaymentCardSettings;
  onSettingsChange: (settings: PaymentCardSettings) => void;
  isVisible: boolean;
  onClose: () => void;
}

const PaymentCardManager: React.FC<PaymentCardManagerProps> = ({
  currentSettings,
  onSettingsChange,
  isVisible,
  onClose,
}) => {
  const [tempSettings, setTempSettings] =
    useState<PaymentCardSettings>(currentSettings);
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
    const defaultSettings: PaymentCardSettings = {
      position: {
        desktop: {
          x: 65,
          y: 35,
        },
        mobile: {
          x: 50,
          y: 20,
        },
      },
      size: "medium",
      opacity: 100,
      visible: true,
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
          <h3 className="text-xl font-bold text-gray-900">
            💳 Payment Card 설정
          </h3>
          <button
            onClick={onClose}
            className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* 표시 여부 */}
          <div>
            <h4 className="text-lg font-semibold mb-4">카드 표시</h4>
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
                <Eye className="w-4 h-4" />
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
                <EyeOff className="w-4 h-4" />
                <span>숨김</span>
              </button>
            </div>
          </div>

          {tempSettings.visible && (
            <>
              {/* 디바이스 선택 */}
              <div>
                <h4 className="text-lg font-semibold mb-4">디바이스별 설정</h4>
                <div className="flex space-x-4 mb-6">
                  <button
                    onClick={() => setActiveDevice("desktop")}
                    className={`flex items-center space-x-2 px-6 py-3 rounded-lg border-2 transition-all ${
                      activeDevice === "desktop"
                        ? "border-orange-500 bg-orange-50 text-orange-700"
                        : "border-gray-200 hover:border-orange-300 text-gray-700"
                    }`}
                  >
                    <Monitor className="w-4 h-4" />
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
                      수평 위치:{" "}
                      {tempSettings.position?.[activeDevice]?.x || 65}%
                    </label>
                    <input
                      type="range"
                      min="10"
                      max="90"
                      value={tempSettings.position?.[activeDevice]?.x || 65}
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
                      수직 위치:{" "}
                      {tempSettings.position?.[activeDevice]?.y || 35}%
                    </label>
                    <input
                      type="range"
                      min="10"
                      max="90"
                      value={tempSettings.position?.[activeDevice]?.y || 35}
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

              {/* 공통 설정 */}
              <div className="grid md:grid-cols-3 gap-6">
                {/* 크기 설정 */}
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

              {/* 미리보기 */}
              <div>
                <h4 className="text-lg font-semibold mb-4">미리보기</h4>
                <div className="relative w-full h-64 bg-gradient-to-r from-blue-100 to-purple-100 rounded-lg overflow-hidden border-2 border-gray-200">
                  <div
                    className="absolute bg-white rounded-lg shadow-lg p-4 border"
                    style={{
                      left: `${
                        tempSettings.position?.[activeDevice]?.x || 65
                      }%`,
                      top: `${tempSettings.position?.[activeDevice]?.y || 35}%`,
                      transform: `translate(-50%, -50%) scale(${
                        tempSettings.size === "small"
                          ? 0.5
                          : tempSettings.size === "large"
                          ? 0.7
                          : 0.6
                      })`,
                      opacity: (tempSettings.opacity || 100) / 100,
                      minWidth: "200px",
                    }}
                  >
                    <div className="space-y-2">
                      <div>
                        <p className="font-bold text-gray-900 text-sm">
                          급할 때, 딱 맞게!
                        </p>
                        <p className="text-gray-900 text-xs">
                          한도는 높고{" "}
                          <strong className="text-blue-600">금리는 낮게</strong>
                        </p>
                      </div>
                      <div>
                        <p className="text-blue-600 font-bold text-xs">
                          낮은 금리로 이자부담 다운!
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="absolute top-2 right-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-xs">
                    {activeDevice === "desktop" ? "데스크톱" : "모바일"}{" "}
                    미리보기 (약 50% 크기)
                  </div>
                </div>
              </div>
            </>
          )}

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
                className="flex items-center space-x-2 px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
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

export default PaymentCardManager;

"use client";

import React, { useState, useEffect } from "react";
import { X, Save, RotateCcw, Upload, Monitor, Smartphone } from "lucide-react";
import Image from "next/image";
import type { HeroImageSettings } from "@/contexts/BackgroundContext";
import ImageUpload from "./ImageUpload";

interface HeroImageManagerProps {
  currentSettings: HeroImageSettings;
  onSettingsChange: (settings: HeroImageSettings) => void;
  isVisible: boolean;
  onClose: () => void;
}

const HeroImageManager: React.FC<HeroImageManagerProps> = ({
  currentSettings,
  onSettingsChange,
  isVisible,
  onClose,
}) => {
  const [tempSettings, setTempSettings] = useState<HeroImageSettings>({
    ...currentSettings,
    bottomFixed: currentSettings.bottomFixed ?? false,
  });
  const [showUploader, setShowUploader] = useState(false);
  const [activeDevice, setActiveDevice] = useState<"desktop" | "mobile">(
    "desktop"
  );

  useEffect(() => {
    setTempSettings({
      ...currentSettings,
      bottomFixed: currentSettings.bottomFixed ?? false,
    });
  }, [currentSettings, isVisible]);

  const handleImageUpload = (files: Array<{ size: string; path: string }>) => {
    if (files.length > 0) {
      const uploadedImage = files.find((f) => f.size === "original");
      if (uploadedImage) {
        setTempSettings((prev) => ({ ...prev, image: uploadedImage.path }));
        setShowUploader(false);
      }
    }
  };

  const handleSave = () => {
    onSettingsChange(tempSettings);
    onClose();
  };

  const handleReset = () => {
    const defaultSettings: HeroImageSettings = {
      image: "/ZLGyUnGMg6GvctEx8LUCBP9Fwo.avif",
      position: {
        desktop: {
          x: 75,
          y: 50,
        },
        mobile: {
          x: 50,
          y: 30,
        },
      },
      size: {
        desktop: {
          width: 400,
          height: 300,
        },
        mobile: {
          width: 280,
          height: 210,
        },
      },
      opacity: 100,
      attachment: "scroll",
      bottomFixed: false,
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
            🖼️ 히어로 이미지 설정
          </h3>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setShowUploader(true)}
              className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors flex items-center space-x-2"
            >
              <Upload className="w-4 h-4" />
              <span>이미지 업로드</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {showUploader ? (
          /* 업로드 패널 */
          <div className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h4 className="text-lg font-semibold">새 히어로 이미지 업로드</h4>
              <button
                onClick={() => setShowUploader(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <ImageUpload
              category="hero"
              onUploadSuccess={handleImageUpload}
              maxFiles={1}
              className="border-dashed border-2 border-gray-300 rounded-lg p-8"
            />
          </div>
        ) : (
          <div className="p-6 space-y-6">
            {/* 현재 이미지 미리보기 */}
            <div>
              <h4 className="text-lg font-semibold mb-4">현재 이미지</h4>
              <div className="relative w-full h-64 bg-gray-100 rounded-lg overflow-hidden">
                {tempSettings.image && (
                  <Image
                    src={tempSettings.image}
                    alt="Hero Image Preview"
                    fill
                    className="object-contain"
                  />
                )}
              </div>
            </div>

            {/* 디바이스 선택 */}
            <div>
              <h4 className="text-lg font-semibold mb-4">디바이스별 설정</h4>
              <div className="flex space-x-4 mb-6">
                <button
                  onClick={() => setActiveDevice("desktop")}
                  className={`flex items-center space-x-2 px-6 py-3 rounded-lg border-2 transition-all ${
                    activeDevice === "desktop"
                      ? "border-purple-500 bg-purple-50 text-purple-700"
                      : "border-gray-200 hover:border-purple-300 text-gray-700"
                  }`}
                >
                  <Monitor className="w-4 h-4" />
                  <span>데스크톱</span>
                </button>
                <button
                  onClick={() => setActiveDevice("mobile")}
                  className={`flex items-center space-x-2 px-6 py-3 rounded-lg border-2 transition-all ${
                    activeDevice === "mobile"
                      ? "border-purple-500 bg-purple-50 text-purple-700"
                      : "border-gray-200 hover:border-purple-300 text-gray-700"
                  }`}
                >
                  <Smartphone className="w-4 h-4" />
                  <span>모바일</span>
                </button>
              </div>
            </div>

            {/* 이미지 설정 */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* 왼쪽 컬럼 - 위치 설정 */}
              <div className="space-y-4">
                <h5 className="font-semibold text-gray-800">
                  {activeDevice === "desktop" ? "데스크톱" : "모바일"} 위치 설정
                </h5>

                <div>
                  <label className="text-xs text-gray-600">
                    수평 위치: {tempSettings.position?.[activeDevice]?.x || 50}%
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={tempSettings.position?.[activeDevice]?.x || 50}
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
                  <label className="text-xs text-gray-600">
                    수직 위치: {tempSettings.position?.[activeDevice]?.y || 50}%
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={tempSettings.position?.[activeDevice]?.y || 50}
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

              {/* 오른쪽 컬럼 - 크기 및 기타 설정 */}
              <div className="space-y-4">
                <h5 className="font-semibold text-gray-800">
                  {activeDevice === "desktop" ? "데스크톱" : "모바일"} 크기 설정
                </h5>

                <div>
                  <label className="text-xs text-gray-600">
                    너비: {tempSettings.size?.[activeDevice]?.width || 400}px
                  </label>
                  <input
                    type="range"
                    min="200"
                    max="800"
                    value={tempSettings.size?.[activeDevice]?.width || 400}
                    onChange={(e) =>
                      setTempSettings((prev) => ({
                        ...prev,
                        size: {
                          ...prev.size,
                          [activeDevice]: {
                            ...prev.size?.[activeDevice],
                            width: parseInt(e.target.value),
                          },
                        },
                      }))
                    }
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-600">
                    높이: {tempSettings.size?.[activeDevice]?.height || 300}px
                  </label>
                  <input
                    type="range"
                    min="150"
                    max="600"
                    value={tempSettings.size?.[activeDevice]?.height || 300}
                    onChange={(e) =>
                      setTempSettings((prev) => ({
                        ...prev,
                        size: {
                          ...prev.size,
                          [activeDevice]: {
                            ...prev.size?.[activeDevice],
                            height: parseInt(e.target.value),
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
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  투명도: {tempSettings.opacity}%
                </label>
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

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  스크롤 고정
                </label>
                <div className="flex space-x-2">
                  <button
                    onClick={() =>
                      setTempSettings((prev) => ({
                        ...prev,
                        attachment: "scroll",
                      }))
                    }
                    className={`flex-1 px-3 py-2 rounded-lg border-2 transition-all text-sm ${
                      tempSettings.attachment === "scroll"
                        ? "border-purple-500 bg-purple-50 text-purple-700"
                        : "border-gray-200 hover:border-purple-300 text-gray-700"
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
                    className={`flex-1 px-3 py-2 rounded-lg border-2 transition-all text-sm ${
                      tempSettings.attachment === "fixed"
                        ? "border-purple-500 bg-purple-50 text-purple-700"
                        : "border-gray-200 hover:border-purple-300 text-gray-700"
                    }`}
                  >
                    고정
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  섹션 하단 고정
                </label>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="bottomFixed"
                    checked={tempSettings.bottomFixed}
                    onChange={(e) =>
                      setTempSettings((prev) => ({
                        ...prev,
                        bottomFixed: e.target.checked,
                      }))
                    }
                    className="w-4 h-4 text-purple-600 bg-gray-100 border-gray-300 rounded focus:ring-purple-500 focus:ring-2"
                  />
                  <label
                    htmlFor="bottomFixed"
                    className="ml-2 text-sm text-gray-700"
                  >
                    하단에 고정하여 화면비 변화에 따른 이질감 방지
                  </label>
                </div>
              </div>
            </div>

            {/* 미리보기 */}
            <div>
              <h4 className="text-lg font-semibold mb-4">미리보기</h4>
              <div className="relative w-full h-64 bg-gradient-to-r from-blue-100 to-purple-100 rounded-lg overflow-hidden border-2 border-gray-200">
                {tempSettings.image && (
                  <div
                    className="absolute"
                    style={{
                      left: `${
                        tempSettings.position?.[activeDevice]?.x || 50
                      }%`,
                      top: `${tempSettings.position?.[activeDevice]?.y || 50}%`,
                      transform: "translate(-50%, -50%)",
                      opacity: (tempSettings.opacity || 100) / 100,
                    }}
                  >
                    <Image
                      src={tempSettings.image}
                      alt="Preview"
                      width={Math.floor(
                        (tempSettings.size?.[activeDevice]?.width || 400) / 4
                      )}
                      height={Math.floor(
                        (tempSettings.size?.[activeDevice]?.height || 300) / 4
                      )}
                      className="object-cover rounded shadow-lg"
                    />
                  </div>
                )}
                <div className="absolute top-2 right-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-xs">
                  {activeDevice === "desktop" ? "데스크톱" : "모바일"} 미리보기
                  (1/4 크기)
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
                  className="flex items-center space-x-2 px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                >
                  <Save className="w-4 h-4" />
                  <span>적용</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HeroImageManager;

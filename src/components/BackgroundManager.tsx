'use client';

import React, { useState, useEffect } from 'react';
import { Settings, X, Upload, Plus, Save, RotateCcw } from 'lucide-react';
import Image from 'next/image';
import ImageUpload from './ImageUpload';

export interface BackgroundSettings {
  image: string;
  opacity: number;
  size: 'cover' | 'contain' | 'auto' | 'stretch';
  position: 'center' | 'top' | 'bottom' | 'left' | 'right' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  attachment: 'scroll' | 'fixed';
  overlay: {
    enabled: boolean;
    color: string;
    opacity: number;
  };
}

interface BackgroundManagerProps {
  sectionName: string;
  currentSettings: BackgroundSettings;
  onSettingsChange: (settings: BackgroundSettings) => void;
  isVisible: boolean;
  onClose: () => void;
  customBackgrounds: string[];
  onCustomBackgroundAdd: (path: string) => void;
}

const defaultBackgrounds = {
  hero: [
    {
      name: '배경 1',
      path: '/images/hero/CK_tica114m19040525_l_1758789761136.webp',
      preview: '/images/hero/CK_tica114m19040525_l_1758789761136_tablet.webp',
    },
    {
      name: '배경 2 (Desktop)',
      path: '/images/hero/CK_tica114m19040525_l_1758789761136_desktop.webp',
      preview: '/images/hero/CK_tica114m19040525_l_1758789761136_tablet.webp',
    },
    {
      name: '배경 3 (Mobile)',
      path: '/images/hero/CK_td01830000604_l_1758789035114_mobile.webp',
      preview: '/images/hero/CK_td01830000604_l_1758789035114_mobile.webp',
    }
  ],
  loan: [
    {
      name: '대출 배경 1',
      path: '/images/loan/CK_tica114m19040525_l_1758789070676.webp',
      preview: '/images/loan/CK_tica114m19040525_l_1758789070676.webp',
    },
    {
      name: '그라데이션 (파란색)',
      path: 'gradient-blue',
      preview: 'gradient-blue',
    }
  ]
};

const BackgroundManager: React.FC<BackgroundManagerProps> = ({
  sectionName,
  currentSettings,
  onSettingsChange,
  isVisible,
  onClose,
  customBackgrounds,
  onCustomBackgroundAdd
}) => {
  const [showUploader, setShowUploader] = useState(false);
  const [tempSettings, setTempSettings] = useState<BackgroundSettings>(currentSettings);

  useEffect(() => {
    setTempSettings(currentSettings);
  }, [currentSettings, isVisible]);

  const handleImageUpload = (files: Array<{ size: string; path: string }>) => {
    if (files.length > 0) {
      const uploadedImage = files.find((f) => f.size === "original");
      if (uploadedImage) {
        onCustomBackgroundAdd(uploadedImage.path);
        setTempSettings(prev => ({ ...prev, image: uploadedImage.path }));
        setShowUploader(false);
      }
    }
  };

  const handleSave = () => {
    onSettingsChange(tempSettings);
    onClose();
  };

  const handleReset = () => {
    const defaultSettings: BackgroundSettings = {
      image: sectionName === 'hero' ? '/ZLGyUnGMg6GvctEx8LUCBP9Fwo.avif' : '/images/loan/CK_tica114m19040525_l_1758789070676.webp',
      opacity: 100,
      size: 'cover',
      position: 'center',
      attachment: 'scroll',
      overlay: {
        enabled: true,
        color: '#000000',
        opacity: 30
      }
    };
    setTempSettings(defaultSettings);
  };

  const getBackgroundOptions = () => {
    const defaults = defaultBackgrounds[sectionName as keyof typeof defaultBackgrounds] || [];
    const customOptions = customBackgrounds.map((bg, index) => ({
      name: `커스텀 ${index + 1}`,
      path: bg,
      preview: bg
    }));
    return [...defaults, ...customOptions];
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b">
          <h3 className="text-xl font-bold text-gray-900">
            🎨 {sectionName === 'hero' ? '히어로' : '대출현황'} 섹션 배경 설정
          </h3>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setShowUploader(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
            >
              <Plus className="w-4 h-4" />
              <span>새 배경 업로드</span>
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
              <h4 className="text-lg font-semibold">새 배경 이미지 업로드</h4>
              <button
                onClick={() => setShowUploader(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <ImageUpload
              category={sectionName}
              onUploadSuccess={handleImageUpload}
              maxFiles={1}
              className="border-dashed border-2 border-gray-300 rounded-lg p-8"
            />
          </div>
        ) : (
          <div className="p-6 space-y-6">
            {/* 배경 이미지 선택 */}
            <div>
              <h4 className="text-lg font-semibold mb-4">배경 이미지 선택</h4>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {getBackgroundOptions().map((option, index) => (
                  <div
                    key={index}
                    className={`relative cursor-pointer rounded-lg overflow-hidden border-4 transition-all duration-300 ${
                      tempSettings.image === option.path
                        ? 'border-blue-500 ring-2 ring-blue-200'
                        : 'border-gray-200 hover:border-gray-400'
                    }`}
                    onClick={() => setTempSettings(prev => ({ ...prev, image: option.path }))}
                  >
                    {option.path === 'gradient-blue' ? (
                      <div 
                        className="w-full h-32 bg-gradient-to-r from-blue-800 to-cyan-400"
                        style={{ background: 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 50%, #06b6d4 100%)' }}
                      />
                    ) : (
                      <Image
                        src={option.preview}
                        alt={option.name}
                        width={200}
                        height={120}
                        className="w-full h-32 object-cover"
                      />
                    )}
                    <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 text-white p-2 text-center">
                      <span className="text-xs font-semibold">{option.name}</span>
                    </div>
                    {tempSettings.image === option.path && (
                      <div className="absolute top-2 right-2 bg-blue-500 text-white rounded-full p-1">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* 배경 설정 */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* 왼쪽 컬럼 */}
              <div className="space-y-4">
                {/* 투명도 */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    배경 투명도: {tempSettings.opacity}%
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={tempSettings.opacity}
                    onChange={(e) => setTempSettings(prev => ({ ...prev, opacity: parseInt(e.target.value) }))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                </div>

                {/* 크기 조정 */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">배경 크기</label>
                  <select
                    value={tempSettings.size}
                    onChange={(e) => setTempSettings(prev => ({ ...prev, size: e.target.value as BackgroundSettings['size'] }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="cover">커버 (Cover)</option>
                    <option value="contain">포함 (Contain)</option>
                    <option value="auto">자동 (Auto)</option>
                    <option value="stretch">늘이기 (Stretch)</option>
                  </select>
                </div>

                {/* 위치 */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">배경 위치</label>
                  <select
                    value={tempSettings.position}
                    onChange={(e) => setTempSettings(prev => ({ ...prev, position: e.target.value as BackgroundSettings['position'] }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="center">중앙</option>
                    <option value="top">위쪽</option>
                    <option value="bottom">아래쪽</option>
                    <option value="left">왼쪽</option>
                    <option value="right">오른쪽</option>
                    <option value="top-left">왼쪽 위</option>
                    <option value="top-right">오른쪽 위</option>
                    <option value="bottom-left">왼쪽 아래</option>
                    <option value="bottom-right">오른쪽 아래</option>
                  </select>
                </div>
              </div>

              {/* 오른쪽 컬럼 */}
              <div className="space-y-4">
                {/* 고정 설정 */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">배경 고정</label>
                  <select
                    value={tempSettings.attachment}
                    onChange={(e) => setTempSettings(prev => ({ ...prev, attachment: e.target.value as BackgroundSettings['attachment'] }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="scroll">스크롤</option>
                    <option value="fixed">고정</option>
                  </select>
                </div>

                {/* 오버레이 설정 */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-sm font-semibold text-gray-700">배경 오버레이</label>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={tempSettings.overlay.enabled}
                        onChange={(e) => setTempSettings(prev => ({ 
                          ...prev, 
                          overlay: { ...prev.overlay, enabled: e.target.checked } 
                        }))}
                        className="mr-2"
                      />
                      <span className="text-sm">활성화</span>
                    </label>
                  </div>
                  
                  {tempSettings.overlay.enabled && (
                    <div className="space-y-3">
                      <div>
                        <label className="block text-xs text-gray-600 mb-1">오버레이 색상</label>
                        <input
                          type="color"
                          value={tempSettings.overlay.color}
                          onChange={(e) => setTempSettings(prev => ({ 
                            ...prev, 
                            overlay: { ...prev.overlay, color: e.target.value } 
                          }))}
                          className="w-full h-10 border border-gray-300 rounded cursor-pointer"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-gray-600 mb-1">
                          오버레이 투명도: {tempSettings.overlay.opacity}%
                        </label>
                        <input
                          type="range"
                          min="0"
                          max="100"
                          value={tempSettings.overlay.opacity}
                          onChange={(e) => setTempSettings(prev => ({ 
                            ...prev, 
                            overlay: { ...prev.overlay, opacity: parseInt(e.target.value) } 
                          }))}
                          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* 미리보기 */}
            <div>
              <h4 className="text-lg font-semibold mb-4">미리보기</h4>
              <div className="relative w-full h-48 rounded-lg overflow-hidden border-2 border-gray-200">
                {tempSettings.image && tempSettings.image !== 'gradient-blue' ? (
                  <Image
                    src={tempSettings.image}
                    alt="Preview"
                    fill
                    className={`object-${tempSettings.size === 'stretch' ? 'fill' : tempSettings.size}`}
                    style={{ 
                      opacity: tempSettings.opacity / 100,
                      objectPosition: tempSettings.position === 'center' ? 'center' : tempSettings.position.replace('-', ' ')
                    }}
                  />
                ) : (
                  <div 
                    className="w-full h-full"
                    style={{ 
                      background: tempSettings.image === 'gradient-blue' 
                        ? 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 50%, #06b6d4 100%)'
                        : 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 50%, #e0e7ff 100%)',
                      opacity: tempSettings.opacity / 100
                    }}
                  />
                )}
                {tempSettings.overlay.enabled && (
                  <div 
                    className="absolute inset-0"
                    style={{ 
                      backgroundColor: tempSettings.overlay.color,
                      opacity: tempSettings.overlay.opacity / 100
                    }}
                  />
                )}
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-white text-lg font-semibold drop-shadow-lg">미리보기 텍스트</span>
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
                  className="flex items-center space-x-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
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

export default BackgroundManager;
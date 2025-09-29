"use client";

import React, { useState } from "react";
import { X, Eye, EyeOff, Plus, Trash2, Upload, Palette } from "lucide-react";
import type { LoanCardSettings } from "@/contexts/BackgroundContext";

interface LoanCardManagerProps {
  currentSettings: LoanCardSettings[];
  onSettingsChange: (settings: LoanCardSettings[]) => void;
  isVisible: boolean;
  onClose: () => void;
}

const LoanCardManager: React.FC<LoanCardManagerProps> = ({
  currentSettings,
  onSettingsChange,
  isVisible,
  onClose,
}) => {
  const [settings, setSettings] = useState<LoanCardSettings[]>(currentSettings);

  if (!isVisible) return null;

  const handleSave = () => {
    onSettingsChange(settings);
    onClose();
  };

  const toggleVisibility = (id: string) => {
    setSettings(
      settings.map((card) =>
        card.id === id ? { ...card, visible: !card.visible } : card
      )
    );
  };

  const updateCard = (id: string, field: string, value: any) => {
    setSettings(
      settings.map((card) =>
        card.id === id ? { ...card, [field]: value } : card
      )
    );
  };

  const updateCardBackground = (id: string, field: string, value: any) => {
    setSettings(
      settings.map((card) =>
        card.id === id 
          ? { ...card, background: { ...card.background, [field]: value } }
          : card
      )
    );
  };

  const updateCardGradient = (id: string, field: string, value: any) => {
    setSettings(
      settings.map((card) =>
        card.id === id 
          ? { 
              ...card, 
              background: { 
                ...card.background, 
                gradient: { ...card.background.gradient, [field]: value }
              }
            }
          : card
      )
    );
  };

  const updateCardTextColor = (id: string, field: string, value: string) => {
    setSettings(
      settings.map((card) =>
        card.id === id 
          ? { 
              ...card, 
              textColor: { ...card.textColor, [field]: value }
            }
          : card
      )
    );
  };

  const updateFeature = (cardId: string, featureIndex: number, value: string) => {
    setSettings(
      settings.map((card) =>
        card.id === cardId
          ? {
              ...card,
              features: card.features.map((feature, idx) =>
                idx === featureIndex ? value : feature
              ),
            }
          : card
      )
    );
  };

  const addFeature = (cardId: string) => {
    setSettings(
      settings.map((card) =>
        card.id === cardId
          ? { ...card, features: [...card.features, "새 기능"] }
          : card
      )
    );
  };

  const removeFeature = (cardId: string, featureIndex: number) => {
    setSettings(
      settings.map((card) =>
        card.id === cardId
          ? {
              ...card,
              features: card.features.filter((_, idx) => idx !== featureIndex),
            }
          : card
      )
    );
  };

  const colorOptions = ["blue", "green", "purple", "orange"];
  const iconOptions = ["CreditCard", "Home", "Briefcase", "Building2"];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[200] p-4">
      <div className="bg-white rounded-2xl p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">대출 카드 설정</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="space-y-6">
          {settings.map((card) => {
            // 기본값 설정 (기존 데이터 호환성)
            const background = {
              enabled: card.background?.enabled ?? false,
              type: card.background?.type ?? "color",
              color: card.background?.color ?? "#ffffff",
              gradient: {
                from: card.background?.gradient?.from ?? "#3b82f6",
                to: card.background?.gradient?.to ?? "#1d4ed8",
                direction: card.background?.gradient?.direction ?? "to-br",
              },
              image: card.background?.image ?? "",
              opacity: card.background?.opacity ?? 100,
            };
            
            const textColor = {
              title: card.textColor?.title ?? "#1f2937",
              description: card.textColor?.description ?? "#6b7280",
              features: card.textColor?.features ?? "#374151",
            };

            return (
            <div
              key={card.id}
              className="border border-gray-200 rounded-xl p-4 bg-gray-50"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-800">
                  {card.title}
                </h3>
                <button
                  onClick={() => toggleVisibility(card.id)}
                  className={`flex items-center space-x-2 px-3 py-1 rounded-lg transition-colors ${
                    card.visible
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {card.visible ? (
                    <Eye className="w-4 h-4" />
                  ) : (
                    <EyeOff className="w-4 h-4" />
                  )}
                  <span>{card.visible ? "표시" : "숨김"}</span>
                </button>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    제목
                  </label>
                  <input
                    type="text"
                    value={card.title}
                    onChange={(e) => updateCard(card.id, "title", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    설명
                  </label>
                  <input
                    type="text"
                    value={card.description}
                    onChange={(e) =>
                      updateCard(card.id, "description", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    색상
                  </label>
                  <select
                    value={card.color}
                    onChange={(e) => updateCard(card.id, "color", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    {colorOptions.map((color) => (
                      <option key={color} value={color}>
                        {color}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    아이콘
                  </label>
                  <select
                    value={card.icon}
                    onChange={(e) => updateCard(card.id, "icon", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    {iconOptions.map((icon) => (
                      <option key={icon} value={icon}>
                        {icon}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="mt-4">
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-medium text-gray-700">
                    특징
                  </label>
                  <button
                    onClick={() => addFeature(card.id)}
                    className="flex items-center space-x-1 px-2 py-1 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                    <span>추가</span>
                  </button>
                </div>
                <div className="space-y-2">
                  {card.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center space-x-2">
                      <input
                        type="text"
                        value={feature}
                        onChange={(e) =>
                          updateFeature(card.id, idx, e.target.value)
                        }
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                      {card.features.length > 1 && (
                        <button
                          onClick={() => removeFeature(card.id, idx)}
                          className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* 배경 설정 */}
              <div className="mt-6 border-t border-gray-200 pt-4">
                <h4 className="text-lg font-medium text-gray-800 mb-4 flex items-center">
                  <Palette className="w-5 h-5 mr-2" />
                  배경 설정
                </h4>
                
                <div className="flex items-center mb-4">
                  <input
                    type="checkbox"
                    id={`bg-enabled-${card.id}`}
                    checked={background.enabled}
                    onChange={(e) => updateCardBackground(card.id, "enabled", e.target.checked)}
                    className="mr-2"
                  />
                  <label htmlFor={`bg-enabled-${card.id}`} className="text-sm font-medium text-gray-700">
                    배경 사용
                  </label>
                </div>

                {background.enabled && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        배경 타입
                      </label>
                      <select
                        value={background.type}
                        onChange={(e) => updateCardBackground(card.id, "type", e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="color">단색</option>
                        <option value="gradient">그라디언트</option>
                        <option value="image">이미지</option>
                      </select>
                    </div>

                    {background.type === "color" && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          배경 색상
                        </label>
                        <input
                          type="color"
                          value={background.color}
                          onChange={(e) => updateCardBackground(card.id, "color", e.target.value)}
                          className="w-full h-10 border border-gray-300 rounded-lg"
                        />
                      </div>
                    )}

                    {background.type === "gradient" && (
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            시작 색상
                          </label>
                          <input
                            type="color"
                            value={background.gradient.from}
                            onChange={(e) => updateCardGradient(card.id, "from", e.target.value)}
                            className="w-full h-10 border border-gray-300 rounded-lg"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            끝 색상
                          </label>
                          <input
                            type="color"
                            value={background.gradient.to}
                            onChange={(e) => updateCardGradient(card.id, "to", e.target.value)}
                            className="w-full h-10 border border-gray-300 rounded-lg"
                          />
                        </div>
                        <div className="col-span-2">
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            방향
                          </label>
                          <select
                            value={background.gradient.direction}
                            onChange={(e) => updateCardGradient(card.id, "direction", e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          >
                            <option value="to-r">오른쪽</option>
                            <option value="to-l">왼쪽</option>
                            <option value="to-t">위</option>
                            <option value="to-b">아래</option>
                            <option value="to-br">오른쪽 아래</option>
                            <option value="to-bl">왼쪽 아래</option>
                            <option value="to-tr">오른쪽 위</option>
                            <option value="to-tl">왼쪽 위</option>
                          </select>
                        </div>
                      </div>
                    )}

                    {background.type === "image" && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          배경 이미지 URL
                        </label>
                        <input
                          type="url"
                          value={background.image}
                          onChange={(e) => updateCardBackground(card.id, "image", e.target.value)}
                          placeholder="https://example.com/image.jpg"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                    )}

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        배경 투명도: {background.opacity}%
                      </label>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={background.opacity}
                        onChange={(e) => updateCardBackground(card.id, "opacity", parseInt(e.target.value))}
                        className="w-full"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* 텍스트 색상 설정 */}
              <div className="mt-6 border-t border-gray-200 pt-4">
                <h4 className="text-lg font-medium text-gray-800 mb-4">
                  텍스트 색상
                </h4>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      제목 색상
                    </label>
                    <input
                      type="color"
                      value={textColor.title}
                      onChange={(e) => updateCardTextColor(card.id, "title", e.target.value)}
                      className="w-full h-10 border border-gray-300 rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      설명 색상
                    </label>
                    <input
                      type="color"
                      value={textColor.description}
                      onChange={(e) => updateCardTextColor(card.id, "description", e.target.value)}
                      className="w-full h-10 border border-gray-300 rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      특징 색상
                    </label>
                    <input
                      type="color"
                      value={textColor.features}
                      onChange={(e) => updateCardTextColor(card.id, "features", e.target.value)}
                      className="w-full h-10 border border-gray-300 rounded-lg"
                    />
                  </div>
                </div>
              </div>
            </div>
            );
          })}
        </div>

        <div className="flex justify-end space-x-4 mt-6 pt-6 border-t border-gray-200">
          <button
            onClick={onClose}
            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            취소
          </button>
          <button
            onClick={handleSave}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            저장
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoanCardManager;
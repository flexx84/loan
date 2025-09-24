'use client';

import React, { useState } from 'react';
import { Send, User, Phone, DollarSign, MessageSquare, CheckCircle } from 'lucide-react';

interface FormData {
  name: string;
  phone: string;
  loanAmount: string;
  message: string;
  agree: boolean;
}

const ConsultationForm = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    phone: '',
    loanAmount: '',
    message: '',
    agree: false
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<Partial<FormData>>({});

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {};

    if (!formData.name.trim()) {
      newErrors.name = '이름을 입력해주세요';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = '연락처를 입력해주세요';
    } else if (!/^[0-9-]{10,13}$/.test(formData.phone.replace(/-/g, ''))) {
      newErrors.phone = '올바른 연락처를 입력해주세요';
    }

    if (!formData.loanAmount.trim()) {
      newErrors.loanAmount = '대출희망금액을 입력해주세요';
    }

    if (!formData.agree) {
      newErrors.agree = '개인정보 처리방침에 동의해주세요';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Google Sheets API 또는 백엔드 API 호출
      const response = await fetch('/api/consultation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          timestamp: new Date().toISOString(),
        }),
      });

      if (response.ok) {
        setIsSubmitted(true);
        setFormData({
          name: '',
          phone: '',
          loanAmount: '',
          message: '',
          agree: false
        });
      } else {
        alert('상담신청 중 오류가 발생했습니다. 다시 시도해주세요.');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      alert('상담신청 중 오류가 발생했습니다. 다시 시도해주세요.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    // Clear error when user starts typing
    if (errors[name as keyof FormData]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  if (isSubmitted) {
    return (
      <section id="consultation" className="py-20 bg-green-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white p-8 rounded-2xl shadow-xl text-center">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              상담신청이 완료되었습니다!
            </h2>
            <p className="text-lg text-gray-600 mb-6">
              빠른 시간 내에 전문 상담사가 연락드리겠습니다.<br />
              평균 <strong className="text-blue-600">30분 이내</strong>에 연락드려요!
            </p>
            <div className="bg-blue-50 p-6 rounded-xl mb-6">
              <p className="text-blue-800 font-semibold">
                📞 급하신 경우 직접 연락주세요: <a href="tel:1588-0000" className="underline">1588-0000</a>
              </p>
            </div>
            <button
              onClick={() => setIsSubmitted(false)}
              className="text-blue-600 hover:text-blue-800 font-semibold"
            >
              추가 상담신청 →
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="consultation" className="py-20 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            무료 대출상담 신청
          </h2>
          <p className="text-xl text-gray-600">
            1분 만에 신청하고 <strong className="text-blue-600">24시간 내</strong> 결과를 확인하세요
          </p>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* 이름 */}
              <div>
                <label htmlFor="name" className="flex items-center text-sm font-medium text-gray-700 mb-2">
                  <User className="w-4 h-4 mr-2 text-blue-600" />
                  이름 <span className="text-red-500 ml-1">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.name ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="홍길동"
                />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
              </div>

              {/* 연락처 */}
              <div>
                <label htmlFor="phone" className="flex items-center text-sm font-medium text-gray-700 mb-2">
                  <Phone className="w-4 h-4 mr-2 text-blue-600" />
                  연락처 <span className="text-red-500 ml-1">*</span>
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.phone ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="010-1234-5678"
                />
                {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
              </div>
            </div>

            {/* 대출희망금액 */}
            <div>
              <label htmlFor="loanAmount" className="flex items-center text-sm font-medium text-gray-700 mb-2">
                <DollarSign className="w-4 h-4 mr-2 text-blue-600" />
                대출희망금액 <span className="text-red-500 ml-1">*</span>
              </label>
              <select
                id="loanAmount"
                name="loanAmount"
                value={formData.loanAmount}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.loanAmount ? 'border-red-500' : 'border-gray-300'
                }`}
              >
                <option value="">희망금액을 선택해주세요</option>
                <option value="1000만원 이하">1,000만원 이하</option>
                <option value="1000-3000만원">1,000만원 ~ 3,000만원</option>
                <option value="3000-5000만원">3,000만원 ~ 5,000만원</option>
                <option value="5000-1억">5,000만원 ~ 1억원</option>
                <option value="1억 이상">1억원 이상</option>
              </select>
              {errors.loanAmount && <p className="text-red-500 text-sm mt-1">{errors.loanAmount}</p>}
            </div>

            {/* 추가 메시지 */}
            <div>
              <label htmlFor="message" className="flex items-center text-sm font-medium text-gray-700 mb-2">
                <MessageSquare className="w-4 h-4 mr-2 text-blue-600" />
                추가 문의사항 (선택)
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="대출 목적이나 특별한 요청사항이 있으시면 적어주세요"
              />
            </div>

            {/* 개인정보 처리방침 동의 */}
            <div className="bg-gray-50 p-4 rounded-xl">
              <label className="flex items-start">
                <input
                  type="checkbox"
                  name="agree"
                  checked={formData.agree}
                  onChange={handleInputChange}
                  className="mt-1 mr-3 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">
                  <strong className="text-red-500">*</strong> 
                  <strong> 개인정보 처리방침</strong>에 동의합니다. 
                  (상담을 위한 최소한의 개인정보만 수집되며, 상담 완료 후 즉시 삭제됩니다)
                </span>
              </label>
              {errors.agree && <p className="text-red-500 text-sm mt-2">{errors.agree}</p>}
            </div>

            {/* 제출 버튼 */}
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-4 rounded-xl text-lg font-semibold transition-colors flex items-center justify-center ${
                isSubmitting
                  ? 'bg-gray-400 text-gray-700 cursor-not-allowed'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              {isSubmitting ? (
                '신청 중...'
              ) : (
                <>
                  무료 상담신청
                  <Send className="w-5 h-5 ml-2" />
                </>
              )}
            </button>

            {/* 안내사항 */}
            <div className="text-center space-y-2 text-sm text-gray-500">
              <p>✅ 100% 무료상담 • 수수료 없음</p>
              <p>🔒 개인정보 보호 • 안전한 상담</p>
              <p>⚡ 평균 30분 이내 연락 • 빠른 응답</p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ConsultationForm;
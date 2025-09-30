"use client";

import React, { useState } from "react";
import { Search, CheckCircle } from "lucide-react";
import Image from "next/image";

interface FormData {
  name: string;
  phone: string;
  insurance: string;
  debtAmount: string;
  agree: boolean;
  message?: string;
}

interface FormErrors {
  name?: string;
  phone?: string;
  insurance?: string;
  debtAmount?: string;
  agree?: string;
  message?: string;
}

const ConsultationForm = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    phone: "",
    insurance: "",
    debtAmount: "",
    agree: false,
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "이름을 입력해주세요";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "휴대폰 번호를 입력해주세요";
    } else if (!/^[0-9-]{10,13}$/.test(formData.phone.replace(/-/g, ""))) {
      newErrors.phone = "올바른 휴대폰 번호를 입력해주세요";
    }

    if (!formData.insurance) {
      newErrors.insurance = "사대보험 가입여부를 선택해주세요";
    }

    if (!formData.debtAmount) {
      newErrors.debtAmount = "채무금액을 선택해주세요";
    }

    if (!formData.agree) {
      newErrors.agree = "개인정보처리방침에 동의해주세요";
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
      // Telegram 알림 전송
      const telegramResponse = await fetch("/api/telegram", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          amount: formData.debtAmount,
          purpose: formData.insurance,
          message: formData.message,
        }),
      });

      if (telegramResponse.ok) {
        const telegramData = await telegramResponse.json();
        console.log("✅ Telegram 알림 전송 성공:", telegramData);
      } else {
        console.error("❌ Telegram 알림 전송 실패");
      }

      // 기존 상담 API 호출
      const response = await fetch("/api/consultation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          timestamp: new Date().toISOString(),
        }),
      });

      if (response.ok) {
        setIsSubmitted(true);
        setFormData({
          name: "",
          phone: "",
          insurance: "",
          debtAmount: "",
          agree: false,
          message: "",
        });
      } else {
        alert("상담신청 중 오류가 발생했습니다. 다시 시도해주세요.");
      }
    } catch (error) {
      console.error("Form submission error:", error);
      alert("상담신청 중 오류가 발생했습니다. 다시 시도해주세요.");
    } finally {
      setIsSubmitting(false);
    }
  };


  if (isSubmitted) {
    return (
      <section id="consultation" className="py-20 bg-green-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white p-8 rounded-2xl shadow-xl text-center">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              한도조회 신청이 완료되었습니다!
            </h2>
            <p className="text-lg text-gray-600 mb-6">
              빠른 시간 내에 전문 상담사가 연락드리겠습니다.
              <br />
              평균 <strong className="text-blue-600">30분 이내</strong>에
              연락드려요!
            </p>
            <div className="bg-blue-50 p-6 rounded-xl mb-6">
              <p className="text-blue-800 font-semibold">
                📞 급하신 경우 직접 연락주세요:{" "}
                <a href="tel:1588-0000" className="underline">
                  1588-0000
                </a>
              </p>
            </div>
            <button
              onClick={() => setIsSubmitted(false)}
              className="text-blue-600 hover:text-blue-800 font-semibold"
            >
              추가 한도조회 신청 →
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="consultation"
      className="box py-20 bg-gradient-to-br from-blue-50 to-indigo-100"
    >
      <div className="box-area max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* 왼쪽 타이틀 섹션 */}
          <div className="ba5-left" data-aos="fade-up" data-aos-duration="500">
            <div className="title text-center lg:text-left">
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                나의 <span className="text-blue-600">한도</span> 확인하기
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                간단한 정보만으로 실시간 한도 확인이 가능합니다
              </p>
              <div className="flex items-center justify-center space-x-4 mb-8">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-sm font-semibold text-gray-700">
                    실시간 확인
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span className="text-sm font-semibold text-gray-700">
                    100% 무료
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                  <span className="text-sm font-semibold text-gray-700">
                    빠른 승인
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* 오른쪽 폼 섹션 */}
          <div
            className="ba5-right"
            data-aos="fade-up"
            data-aos-delay="100"
            data-aos-duration="500"
          >
            <div className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-100">
              <form name="send" method="post" onSubmit={handleSubmit}>
                <input type="hidden" name="mode" value="" />
                <input type="hidden" name="keywd" value="" />
                <input type="hidden" name="rank" value="" />
                <input type="hidden" name="uid" value="" />
                <input type="hidden" name="k" value="" />
                {/* 보안 안내 */}
                <div className="b5r-tit text-center mb-8">
                  <div className="flex flex-col items-center justify-center mb-4">
                    <Image
                      src="/img/ing.gif"
                      alt="Security Animation"
                      width={120}
                      height={120}
                      className="mb-4"
                    />
                    <div className="text-center">
                      <p className="text-lg font-semibold text-gray-800">
                        입력하신 개인정보는 안전하게 처리됩니다.
                      </p>
                      <span className="text-sm text-gray-500 block mt-1">
                        개인회생, 파산자, 신용불량자, 연체자, 외국인은 신청이
                        불가합니다.
                      </span>
                    </div>
                  </div>
                </div>

                <ul className="space-y-6">
                  {/* 이름 */}
                  <li>
                    <p>
                      이름 <em>*</em>
                    </p>
                    <input
                      type="text"
                      name="frm_name"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className={`w-full px-4 py-4 border-2 rounded-xl text-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        errors.name
                          ? "border-red-400 bg-red-50"
                          : "border-gray-200 focus:border-blue-400"
                      }`}
                      placeholder="실명을 입력해주세요"
                    />
                    {errors.name && (
                      <p className="text-red-500 text-sm mt-2">{errors.name}</p>
                    )}
                  </li>

                  {/* 휴대폰 */}
                  <li>
                    <p>
                      휴대폰 <em>*</em>
                    </p>
                    <input
                      type="tel"
                      name="frm_tel"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      className={`w-full px-4 py-4 border-2 rounded-xl text-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        errors.phone
                          ? "border-red-400 bg-red-50"
                          : "border-gray-200 focus:border-blue-400"
                      }`}
                      placeholder="010-0000-0000"
                    />
                    {errors.phone && (
                      <p className="text-red-500 text-sm mt-2">
                        {errors.phone}
                      </p>
                    )}
                  </li>

                  {/* 사대보험 */}
                  <li>
                    <p>
                      사대보험 <em>*</em>
                    </p>
                    <div className="ba5li-radio flex space-x-4">
                      <input
                        type="hidden"
                        name="frm_gubun"
                        value={
                          formData.insurance === "가입"
                            ? "1"
                            : formData.insurance === "미가입"
                            ? "2"
                            : ""
                        }
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setFormData({ ...formData, insurance: "가입" })
                        }
                        className={`flex-1 py-3 px-6 rounded-lg font-semibold transition-all duration-200 ${
                          formData.insurance === "가입"
                            ? "bg-blue-500 text-white border-2 border-blue-500"
                            : "bg-gray-100 text-gray-700 border-2 border-gray-200 hover:border-blue-300 hover:bg-blue-50"
                        }`}
                      >
                        가입
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          setFormData({ ...formData, insurance: "미가입" })
                        }
                        className={`flex-1 py-3 px-6 rounded-lg font-semibold transition-all duration-200 ${
                          formData.insurance === "미가입"
                            ? "bg-blue-500 text-white border-2 border-blue-500"
                            : "bg-gray-100 text-gray-700 border-2 border-gray-200 hover:border-blue-300 hover:bg-blue-50"
                        }`}
                      >
                        미가입
                      </button>
                    </div>
                    {errors.insurance && (
                      <p className="text-red-500 text-sm mt-2">
                        {errors.insurance}
                      </p>
                    )}
                  </li>

                  {/* 채무금액 */}
                  <li>
                    <p>
                      채무금액 <em>*</em>
                    </p>
                    <div className="ba5li-radio flex space-x-4">
                      <input
                        type="hidden"
                        name="etc"
                        value={formData.debtAmount}
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setFormData({
                            ...formData,
                            debtAmount: "3천만원이상",
                          })
                        }
                        className={`flex-1 py-3 px-6 rounded-lg font-semibold transition-all duration-200 ${
                          formData.debtAmount === "3천만원이상"
                            ? "bg-red-500 text-white border-2 border-red-500"
                            : "bg-gray-100 text-gray-700 border-2 border-gray-200 hover:border-red-300 hover:bg-red-50"
                        }`}
                      >
                        3천만원이상
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          setFormData({
                            ...formData,
                            debtAmount: "3천만원이하",
                          })
                        }
                        className={`flex-1 py-3 px-6 rounded-lg font-semibold transition-all duration-200 ${
                          formData.debtAmount === "3천만원이하"
                            ? "bg-green-500 text-white border-2 border-green-500"
                            : "bg-gray-100 text-gray-700 border-2 border-gray-200 hover:border-green-300 hover:bg-green-50"
                        }`}
                      >
                        3천만원이하
                      </button>
                    </div>
                    {errors.debtAmount && (
                      <p className="text-red-500 text-sm mt-2">
                        {errors.debtAmount}
                      </p>
                    )}
                  </li>

                  {/* 추가 메시지 */}
                  <li>
                    <p>추가 메시지</p>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      placeholder="추가로 전달하고 싶은 내용이 있으시면 입력해주세요."
                      className="w-full py-3 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                      rows={3}
                    />
                  </li>
                </ul>

                {/* 개인정보처리방침 동의 */}
                <div className="ba5-check">
                  <input
                    type="checkbox"
                    id="check"
                    checked={formData.agree}
                    onChange={(e) =>
                      setFormData({ ...formData, agree: e.target.checked })
                    }
                  />
                  <label htmlFor="check">
                    <span></span>개인정보처리방침 동의
                  </label>
                  <a href="javascript:void(0);" className="layer-bt01">
                    [전문보기]
                  </a>
                  {errors.agree && (
                    <p className="text-red-500 text-sm mt-2">{errors.agree}</p>
                  )}
                </div>

                {/* 제출 버튼 */}
                <div className="ba5-btn">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full py-4 rounded-xl text-xl font-bold transition-all duration-300 flex items-center justify-center space-x-3 ${
                      isSubmitting
                        ? "bg-gray-400 text-gray-700 cursor-not-allowed"
                        : "bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 transform hover:scale-105 shadow-lg hover:shadow-xl"
                    }`}
                  >
                    <span>{isSubmitting ? "한도조회 중..." : "한도조회"}</span>
                    <Search className="w-6 h-6" />
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ConsultationForm;

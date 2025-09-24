'use client';

import React, { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs: FAQItem[] = [
    {
      question: '대출 승인까지 얼마나 걸리나요?',
      answer: '일반적으로 신용대출의 경우 신청 후 24시간 이내에 승인 결과를 알려드립니다. 담보대출의 경우 담보 평가 등으로 인해 2-3일 정도 소요될 수 있습니다. 급하신 경우 전화로 문의주시면 최대한 빠른 처리를 도와드리겠습니다.',
      category: '승인절차'
    },
    {
      question: '신용점수가 낮아도 대출이 가능한가요?',
      answer: '신용점수가 낮더라도 다양한 대출 상품이 있습니다. 저축은행, 캐피탈, 대부업체 등 다양한 금융기관과 협력하여 고객의 상황에 맞는 최적의 대출상품을 찾아드립니다. 소득이 있으시다면 충분히 가능성이 있으니 상담받아보세요.',
      category: '신용점수'
    },
    {
      question: '상담 및 중개 수수료가 있나요?',
      answer: '상담부터 대출 실행까지 모든 과정이 100% 무료입니다. 저희는 금융기관으로부터 수수료를 받는 구조로 운영되기 때문에 고객에게는 일체의 비용을 받지 않습니다. 안심하고 상담받으세요.',
      category: '수수료'
    },
    {
      question: '필요한 서류는 무엇인가요?',
      answer: '대출 종류에 따라 다르지만, 일반적으로 신분증, 소득증명서류(재직증명서, 급여명세서), 통장거래내역 등이 필요합니다. 정확한 서류는 상담 과정에서 개별적으로 안내드리며, 온라인으로 간편하게 제출 가능합니다.',
      category: '서류준비'
    },
    {
      question: '대출 한도는 어떻게 결정되나요?',
      answer: '대출 한도는 소득, 신용점수, 재직기간, 기존 대출 현황 등을 종합적으로 검토하여 결정됩니다. 신용대출의 경우 연소득의 30-40%, 담보대출의 경우 담보가치의 70-80% 수준에서 결정되는 것이 일반적입니다.',
      category: '대출한도'
    },
    {
      question: '기존 대출을 갈아탈 수 있나요?',
      answer: '네, 가능합니다. 현재 대출보다 더 유리한 조건의 상품이 있다면 대환대출을 통해 이자 부담을 줄일 수 있습니다. 현재 대출 조건을 알려주시면 더 좋은 조건의 상품을 찾아서 비교 분석해드리겠습니다.',
      category: '대환대출'
    },
    {
      question: '주부나 프리랜서도 대출이 가능한가요?',
      answer: '주부의 경우 배우자 소득이나 부동산 담보가 있다면 가능하며, 프리랜서의 경우 소득 증빙이 가능하다면 대출 신청이 가능합니다. 개인별 상황이 다르므로 정확한 상담을 통해 가능한 상품을 안내드리겠습니다.',
      category: '자격조건'
    },
    {
      question: '대출 신청 후 취소가 가능한가요?',
      answer: '대출 신청 후에도 실행 전까지는 언제든지 취소가 가능합니다. 또한 대출 실행 후에도 7일 이내에는 위약금 없이 취소할 수 있는 철회권이 있습니다. 부담 없이 신청하시고 충분히 검토해보세요.',
      category: '취소/철회'
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <HelpCircle className="w-8 h-8 text-blue-600 mr-3" />
            <h2 className="text-4xl font-bold text-gray-900">
              자주 묻는 질문
            </h2>
          </div>
          <p className="text-xl text-gray-600">
            대출에 관해 궁금한 점들을 미리 확인해보세요
          </p>
        </div>

        {/* FAQ List */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full p-6 text-left hover:bg-gray-50 transition-colors focus:outline-none focus:bg-gray-50"
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center mb-2">
                      <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded-full mr-3">
                        {faq.category}
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 pr-4">
                      Q. {faq.question}
                    </h3>
                  </div>
                  <div className="flex-shrink-0">
                    {openIndex === index ? (
                      <ChevronUp className="w-5 h-5 text-gray-500" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-500" />
                    )}
                  </div>
                </div>
              </button>
              
              {openIndex === index && (
                <div className="px-6 pb-6">
                  <div className="pt-2 border-t border-gray-100">
                    <div className="bg-blue-50 p-4 rounded-xl mt-4">
                      <p className="text-gray-700 leading-relaxed">
                        <strong className="text-blue-800">A.</strong> {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Additional Help CTA */}
        <div className="mt-12 text-center bg-white p-8 rounded-2xl shadow-sm">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            더 궁금한 점이 있으신가요?
          </h3>
          <p className="text-lg text-gray-600 mb-6">
            전문 상담사가 친절하게 답변해드리겠습니다
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => document.getElementById('consultation')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-blue-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors"
            >
              무료 상담신청
            </button>
            <button 
              onClick={() => window.open('tel:1588-0000')}
              className="border-2 border-blue-600 text-blue-600 px-8 py-3 rounded-xl font-semibold hover:bg-blue-600 hover:text-white transition-colors"
            >
              📞 전화상담 (1588-0000)
            </button>
          </div>
        </div>

      </div>

      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": faqs.map(faq => ({
              "@type": "Question",
              "name": faq.question,
              "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.answer
              }
            }))
          })
        }}
      />
    </section>
  );
};

export default FAQSection;
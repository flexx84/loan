import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SH파이낸셜 대부중개 - 빠른 대출상담 및 맞춤형 대출서비스",
  description: "신용대출, 담보대출, 사업자대출까지 한번에! 전국 어디서나 무료상담 가능. 최저금리 맞춤 대출상품을 찾아드립니다.",
  keywords: "대출, 신용대출, 담보대출, 사업자대출, 대부중개, 저금리대출, 대출상담, 빠른승인",
  openGraph: {
    title: "SH파이낸셜 대부중개 - 빠른 대출상담",
    description: "신용대출부터 담보대출까지 최저금리 맞춤형 대출서비스",
    type: "website",
    locale: "ko_KR",
    siteName: "SH파이낸셜 대부중개",
  },
  robots: "index, follow",
  viewport: "width=device-width, initial-scale=1",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FinancialService",
              "name": "SH파이낸셜 대부중개",
              "description": "신용대출, 담보대출, 사업자대출 전문 중개서비스",
              "url": "https://shfinancial.vercel.app",
              "telephone": "+82-1588-0000",
              "address": {
                "@type": "PostalAddress",
                "addressCountry": "KR",
                "addressLocality": "서울시"
              },
              "serviceType": "대부중개업",
              "areaServed": "대한민국"
            })
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white text-gray-900`}
      >
        {children}
      </body>
    </html>
  );
}

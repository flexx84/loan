'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';

interface ResponsiveImageProps {
  src?: string;
  alt: string;
  className?: string;
  priority?: boolean;
  fill?: boolean;
  sizes?: string;
  quality?: number;
  placeholder?: 'blur' | 'empty';
  blurDataURL?: string;
  category?: string;
  fallbackSrc?: string;
  onLoad?: () => void;
  onError?: () => void;
}

interface ImageSources {
  mobile: string;
  tablet: string;
  desktop: string;
  original: string;
}

const ResponsiveImage: React.FC<ResponsiveImageProps> = ({
  src,
  alt,
  className = '',
  priority = false,
  fill = false,
  sizes = '(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw',
  quality = 85,
  placeholder = 'empty',
  blurDataURL,
  category = 'general',
  fallbackSrc = '/images/placeholder.svg',
  onLoad: externalOnLoad,
  onError: externalOnError
}) => {
  const [imageSources, setImageSources] = useState<ImageSources | null>(null);
  const [currentSrc, setCurrentSrc] = useState(src || fallbackSrc);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [retryCount, setRetryCount] = useState(0);

  // 반응형 이미지 소스 생성
  const generateResponsiveSources = (baseSrc: string): ImageSources => {
    if (!baseSrc || baseSrc.includes('_mobile') || baseSrc.includes('_tablet') || baseSrc.includes('_desktop')) {
      return {
        mobile: baseSrc,
        tablet: baseSrc,
        desktop: baseSrc,
        original: baseSrc
      };
    }

    const pathParts = baseSrc.split('.');
    const extension = pathParts.pop();
    const baseName = pathParts.join('.');

    return {
      mobile: `${baseName}_mobile.${extension}`,
      tablet: `${baseName}_tablet.${extension}`,
      desktop: `${baseName}_desktop.${extension}`,
      original: baseSrc
    };
  };

  useEffect(() => {
    if (src) {
      const sources = generateResponsiveSources(src);
      setImageSources(sources);
      setCurrentSrc(src);
    }
  }, [src]);

  // 화면 크기에 따른 이미지 선택
  const getResponsiveSource = (): string => {
    if (!imageSources) return currentSrc;

    if (typeof window !== 'undefined') {
      const width = window.innerWidth;
      if (width <= 768) {
        return imageSources.mobile;
      } else if (width <= 1024) {
        return imageSources.tablet;
      } else {
        return imageSources.desktop;
      }
    }
    
    return imageSources.original;
  };

  const handleLoad = () => {
    setIsLoading(false);
    setHasError(false);
    setRetryCount(0);
    if (externalOnLoad) {
      externalOnLoad();
    }
  };

  const handleError = () => {
    console.error('Image failed to load:', currentSrc);
    
    if (retryCount < 2 && src && !src.includes(fallbackSrc)) {
      // 재시도 로직
      setTimeout(() => {
        setRetryCount(prev => prev + 1);
        // 원본 이미지 소스로 재시도
        setCurrentSrc(src);
      }, 1000);
      return;
    }
    
    setIsLoading(false);
    setHasError(true);
    setCurrentSrc(fallbackSrc);
    if (externalOnError) {
      externalOnError();
    }
  };

  // srcSet 생성 (WebP 지원)
  const generateSrcSet = (): string => {
    if (!imageSources) return '';
    
    return [
      `${imageSources.mobile} 768w`,
      `${imageSources.tablet} 1024w`,
      `${imageSources.desktop} 1920w`
    ].join(', ');
  };

  // 개발 환경에서는 단순한 이미지 경로 사용
  const isDevelopment = process.env.NODE_ENV === 'development';
  const finalSrc = hasError ? fallbackSrc : (isDevelopment ? currentSrc : getResponsiveSource());

  const imageProps = {
    src: finalSrc,
    alt,
    className: `${className} ${isLoading ? 'animate-pulse bg-gray-200' : ''} ${hasError ? 'opacity-50' : ''}`,
    priority,
    quality: isDevelopment ? 75 : quality,
    onLoad: handleLoad,
    onError: handleError,
    ...(placeholder === 'blur' && blurDataURL && !hasError && { 
      placeholder: 'blur' as const, 
      blurDataURL 
    }),
    ...(!isDevelopment && imageSources && !hasError && {
      srcSet: generateSrcSet(),
      sizes
    })
  };

  if (fill) {
    return (
      <Image
        {...imageProps}
        fill
        style={{ objectFit: 'cover' }}
      />
    );
  }

  return (
    <Image
      {...imageProps}
      width={1920}
      height={1080}
      style={{ 
        width: '100%', 
        height: 'auto',
        maxWidth: '100%'
      }}
    />
  );
};

export default ResponsiveImage;
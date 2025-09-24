'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Pause, Play, Settings, Plus, X } from 'lucide-react';
import ResponsiveImage from './ResponsiveImage';
import ImageUpload from './ImageUpload';

interface CarouselImage {
  id: string;
  src: string;
  alt: string;
  title?: string;
  description?: string;
}

interface ImageCarouselProps {
  images?: CarouselImage[];
  autoPlay?: boolean;
  interval?: number;
  showControls?: boolean;
  showIndicators?: boolean;
  className?: string;
  height?: string;
  adminMode?: boolean;
}

const ImageCarousel: React.FC<ImageCarouselProps> = ({
  images: initialImages = [],
  autoPlay = true,
  interval = 5000,
  showControls = true,
  showIndicators = true,
  className = '',
  height = 'h-64 sm:h-96 lg:h-[500px]',
  adminMode = false
}) => {
  const [images, setImages] = useState<CarouselImage[]>(initialImages);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showUpload, setShowUpload] = useState(false);
  const [isAdmin, setIsAdmin] = useState(adminMode);

  // 로컬 스토리지에서 이미지 로드
  useEffect(() => {
    const savedImages = localStorage.getItem('carousel-images');
    if (savedImages) {
      try {
        const parsedImages = JSON.parse(savedImages);
        if (Array.isArray(parsedImages) && parsedImages.length > 0) {
          setImages(parsedImages);
        }
      } catch (error) {
        console.error('Failed to load carousel images:', error);
      }
    }

    const adminModeFromStorage = localStorage.getItem('admin-mode') === 'true';
    setIsAdmin(adminModeFromStorage);
  }, []);

  // 이미지 저장
  const saveImages = useCallback((newImages: CarouselImage[]) => {
    localStorage.setItem('carousel-images', JSON.stringify(newImages));
  }, []);

  // 자동 재생
  useEffect(() => {
    if (!isPlaying || images.length <= 1) return;

    const timer = setInterval(() => {
      setIsTransitioning(true);
      setCurrentIndex(prev => (prev + 1) % images.length);
      
      setTimeout(() => {
        setIsTransitioning(false);
      }, 300);
    }, interval);

    return () => clearInterval(timer);
  }, [isPlaying, interval, images.length]);

  const goToSlide = (index: number) => {
    if (index === currentIndex || isTransitioning) return;
    
    setIsTransitioning(true);
    setCurrentIndex(index);
    
    setTimeout(() => {
      setIsTransitioning(false);
    }, 300);
  };

  const goToPrevious = () => {
    const newIndex = currentIndex === 0 ? images.length - 1 : currentIndex - 1;
    goToSlide(newIndex);
  };

  const goToNext = () => {
    const newIndex = (currentIndex + 1) % images.length;
    goToSlide(newIndex);
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleImageUpload = (uploadedFiles: any[]) => {
    const newImages = uploadedFiles
      .filter(file => file.size === 'original')
      .map((file, index) => ({
        id: `uploaded-${Date.now()}-${index}`,
        src: file.path,
        alt: `업로드된 이미지 ${images.length + index + 1}`,
        title: `이미지 ${images.length + index + 1}`,
        description: '새로 업로드된 이미지입니다.'
      }));

    const updatedImages = [...images, ...newImages];
    setImages(updatedImages);
    saveImages(updatedImages);
    setShowUpload(false);
  };

  const removeImage = (index: number) => {
    if (images.length <= 1) return;
    
    const updatedImages = images.filter((_, i) => i !== index);
    setImages(updatedImages);
    saveImages(updatedImages);
    
    if (currentIndex >= updatedImages.length) {
      setCurrentIndex(updatedImages.length - 1);
    }
  };

  // 키보드 이벤트 처리
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowLeft':
          goToPrevious();
          break;
        case 'ArrowRight':
          goToNext();
          break;
        case ' ':
          e.preventDefault();
          togglePlayPause();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, images.length]);

  // 터치/마우스 스와이프 처리
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  
  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      goToNext();
    } else if (isRightSwipe) {
      goToPrevious();
    }
  };

  if (images.length === 0) {
    return (
      <div className={`${height} ${className} bg-gray-100 rounded-xl flex items-center justify-center relative`}>
        <div className="text-center">
          <p className="text-gray-500 mb-4">표시할 이미지가 없습니다</p>
          {isAdmin && (
            <button
              onClick={() => setShowUpload(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center mx-auto"
            >
              <Plus className="w-4 h-4 mr-2" />
              이미지 추가
            </button>
          )}
        </div>
        
        {showUpload && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto">
              <h3 className="text-xl font-bold mb-4 text-gray-900">캐러셀 이미지 추가</h3>
              <ImageUpload
                category="carousel"
                onUploadSuccess={handleImageUpload}
                maxFiles={10}
                className="mb-4"
              />
              <button
                onClick={() => setShowUpload(false)}
                className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
              >
                닫기
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={`${height} ${className} relative rounded-xl overflow-hidden group`}>
      {/* 메인 이미지 */}
      <div 
        className="relative w-full h-full"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <div 
          className={`absolute inset-0 transition-transform duration-300 ease-in-out ${
            isTransitioning ? 'scale-105' : 'scale-100'
          }`}
        >
          <ResponsiveImage
            src={images[currentIndex].src}
            alt={images[currentIndex].alt}
            fill
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 80vw, 70vw"
            className="object-cover"
          />
        </div>

        {/* 오버레이 */}
        <div className="absolute inset-0 bg-black bg-opacity-30" />
        
        {/* 텍스트 오버레이 */}
        {(images[currentIndex].title || images[currentIndex].description) && (
          <div className="absolute bottom-4 left-4 right-4 text-white">
            {images[currentIndex].title && (
              <h3 className="text-lg sm:text-xl font-bold mb-2 drop-shadow-lg">
                {images[currentIndex].title}
              </h3>
            )}
            {images[currentIndex].description && (
              <p className="text-sm sm:text-base opacity-90 drop-shadow">
                {images[currentIndex].description}
              </p>
            )}
          </div>
        )}
      </div>

      {/* 관리자 컨트롤 */}
      {isAdmin && (
        <div className="absolute top-4 right-4 flex gap-2">
          <button
            onClick={() => setShowUpload(true)}
            className="bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-all"
            title="이미지 추가"
          >
            <Plus className="w-4 h-4" />
          </button>
          
          <button
            onClick={() => removeImage(currentIndex)}
            className="bg-red-500 bg-opacity-70 text-white p-2 rounded-full hover:bg-opacity-90 transition-all"
            title="현재 이미지 삭제"
            disabled={images.length <= 1}
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* 네비게이션 컨트롤 */}
      {showControls && images.length > 1 && (
        <>
          <button
            onClick={goToPrevious}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 sm:p-3 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-opacity-70"
            disabled={isTransitioning}
          >
            <ChevronLeft className="w-4 h-4 sm:w-6 sm:h-6" />
          </button>
          
          <button
            onClick={goToNext}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 sm:p-3 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-opacity-70"
            disabled={isTransitioning}
          >
            <ChevronRight className="w-4 h-4 sm:w-6 sm:h-6" />
          </button>

          {/* 재생/일시정지 버튼 */}
          <button
            onClick={togglePlayPause}
            className="absolute bottom-4 right-4 bg-black bg-opacity-50 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-opacity-70"
            title={isPlaying ? '일시정지' : '재생'}
          >
            {isPlaying ? (
              <Pause className="w-4 h-4" />
            ) : (
              <Play className="w-4 h-4" />
            )}
          </button>
        </>
      )}

      {/* 인디케이터 */}
      {showIndicators && images.length > 1 && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? 'bg-white shadow-lg scale-125'
                  : 'bg-white bg-opacity-50 hover:bg-opacity-75'
              }`}
              disabled={isTransitioning}
            />
          ))}
        </div>
      )}

      {/* 이미지 카운터 */}
      <div className="absolute top-4 left-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm">
        {currentIndex + 1} / {images.length}
      </div>

      {/* 이미지 업로드 모달 */}
      {showUpload && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <h3 className="text-xl font-bold mb-4 text-gray-900">캐러셀 이미지 추가</h3>
            <ImageUpload
              category="carousel"
              onUploadSuccess={handleImageUpload}
              maxFiles={10}
              className="mb-4"
            />
            <button
              onClick={() => setShowUpload(false)}
              className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
            >
              닫기
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageCarousel;
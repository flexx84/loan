'use client';

import React, { useState, useEffect } from 'react';
import { Settings, Upload, Image as ImageIcon, Download, Trash2, Eye, EyeOff } from 'lucide-react';
import ImageUpload from '@/components/ImageUpload';
import ResponsiveImage from '@/components/ResponsiveImage';
import ImageCarousel from '@/components/ImageCarousel';

interface UploadedFile {
  size: string;
  path: string;
  width?: number;
  height?: number;
}

const AdminPage = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState('hero');
  const [heroBackground, setHeroBackground] = useState('');
  const [carouselImages, setCarouselImages] = useState<any[]>([]);
  const [showPreview, setShowPreview] = useState(false);

  // 인증 체크
  useEffect(() => {
    const adminAuth = localStorage.getItem('admin-auth');
    if (adminAuth === 'authenticated') {
      setIsAuthenticated(true);
      loadData();
    }
  }, []);

  // 데이터 로드
  const loadData = () => {
    const savedHeroBg = localStorage.getItem('hero-background');
    const savedCarousel = localStorage.getItem('carousel-images');
    
    if (savedHeroBg) setHeroBackground(savedHeroBg);
    if (savedCarousel) {
      try {
        setCarouselImages(JSON.parse(savedCarousel));
      } catch (error) {
        console.error('Failed to load carousel images:', error);
      }
    }
  };

  // 로그인 처리
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // 간단한 패스워드 체크 (실제로는 더 안전한 인증 시스템 필요)
    if (password === 'admin123' || password === 'sh2024') {
      localStorage.setItem('admin-auth', 'authenticated');
      localStorage.setItem('admin-mode', 'true');
      setIsAuthenticated(true);
      loadData();
    } else {
      alert('잘못된 패스워드입니다.');
    }
  };

  // 로그아웃
  const handleLogout = () => {
    localStorage.removeItem('admin-auth');
    localStorage.setItem('admin-mode', 'false');
    setIsAuthenticated(false);
    setPassword('');
  };

  // 히어로 배경 이미지 업로드
  const handleHeroImageUpload = (files: UploadedFile[]) => {
    if (files.length > 0) {
      const uploadedImage = files.find(f => f.size === 'original');
      if (uploadedImage) {
        setHeroBackground(uploadedImage.path);
        localStorage.setItem('hero-background', uploadedImage.path);
        alert('히어로 배경 이미지가 업데이트되었습니다.');
      }
    }
  };

  // 캐러셀 이미지 업로드
  const handleCarouselImageUpload = (files: UploadedFile[]) => {
    const newImages = files
      .filter(file => file.size === 'original')
      .map((file, index) => ({
        id: `uploaded-${Date.now()}-${index}`,
        src: file.path,
        alt: `캐러셀 이미지 ${carouselImages.length + index + 1}`,
        title: `이미지 ${carouselImages.length + index + 1}`,
        description: '새로 업로드된 이미지입니다.'
      }));

    const updatedImages = [...carouselImages, ...newImages];
    setCarouselImages(updatedImages);
    localStorage.setItem('carousel-images', JSON.stringify(updatedImages));
    alert(`${newImages.length}개의 캐러셀 이미지가 추가되었습니다.`);
  };

  // 캐러셀 이미지 삭제
  const removeCarouselImage = (index: number) => {
    if (confirm('이 이미지를 삭제하시겠습니까?')) {
      const updatedImages = carouselImages.filter((_, i) => i !== index);
      setCarouselImages(updatedImages);
      localStorage.setItem('carousel-images', JSON.stringify(updatedImages));
      alert('이미지가 삭제되었습니다.');
    }
  };

  // 모든 데이터 초기화
  const handleReset = () => {
    if (confirm('모든 업로드된 이미지와 설정을 초기화하시겠습니까? 이 작업은 되돌릴 수 없습니다.')) {
      localStorage.removeItem('hero-background');
      localStorage.removeItem('carousel-images');
      setHeroBackground('');
      setCarouselImages([]);
      alert('모든 데이터가 초기화되었습니다.');
    }
  };

  // 데이터 내보내기
  const handleExport = () => {
    const data = {
      heroBackground,
      carouselImages,
      exportDate: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `sh-financial-data-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
          <div className="text-center mb-6">
            <Settings className="w-12 h-12 text-blue-600 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-gray-900">관리자 로그인</h1>
            <p className="text-gray-600">SH파이낸셜 관리 페이지</p>
          </div>
          
          <form onSubmit={handleLogin}>
            <div className="mb-6">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                패스워드
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="관리자 패스워드를 입력하세요"
                required
              />
            </div>
            
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
            >
              로그인
            </button>
          </form>
          
          <div className="mt-6 text-xs text-gray-500 text-center">
            <p>개발용 패스워드: admin123 또는 sh2024</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* 헤더 */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-xl font-semibold text-gray-900 flex items-center">
              <Settings className="w-6 h-6 mr-2 text-blue-600" />
              SH파이낸셜 관리자 페이지
            </h1>
            
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setShowPreview(!showPreview)}
                className="flex items-center px-3 py-2 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
              >
                {showPreview ? <EyeOff className="w-4 h-4 mr-2" /> : <Eye className="w-4 h-4 mr-2" />}
                {showPreview ? '미리보기 숨김' : '미리보기'}
              </button>
              
              <button
                onClick={handleExport}
                className="flex items-center px-3 py-2 text-sm bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors"
              >
                <Download className="w-4 h-4 mr-2" />
                데이터 내보내기
              </button>
              
              <button
                onClick={handleLogout}
                className="px-4 py-2 text-sm bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors"
              >
                로그아웃
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 탭 메뉴 */}
        <div className="mb-8">
          <nav className="flex space-x-8 border-b border-gray-200">
            <button
              onClick={() => setActiveTab('hero')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'hero'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              히어로 섹션
            </button>
            <button
              onClick={() => setActiveTab('carousel')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'carousel'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              이미지 캐러셀
            </button>
            <button
              onClick={() => setActiveTab('settings')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'settings'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              설정
            </button>
          </nav>
        </div>

        {/* 컨텐츠 */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* 왼쪽 - 관리 패널 */}
          <div>
            {activeTab === 'hero' && (
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <ImageIcon className="w-5 h-5 mr-2" />
                  히어로 섹션 배경 이미지
                </h2>
                
                {heroBackground && (
                  <div className="mb-6">
                    <p className="text-sm text-gray-600 mb-2">현재 배경 이미지:</p>
                    <div className="relative h-32 bg-gray-100 rounded-lg overflow-hidden">
                      <ResponsiveImage
                        src={heroBackground}
                        alt="현재 히어로 배경"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <button
                      onClick={() => {
                        setHeroBackground('');
                        localStorage.removeItem('hero-background');
                      }}
                      className="mt-2 flex items-center text-sm text-red-600 hover:text-red-800"
                    >
                      <Trash2 className="w-4 h-4 mr-1" />
                      배경 제거
                    </button>
                  </div>
                )}
                
                <ImageUpload
                  category="hero"
                  onUploadSuccess={handleHeroImageUpload}
                  maxFiles={1}
                />
              </div>
            )}

            {activeTab === 'carousel' && (
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <ImageIcon className="w-5 h-5 mr-2" />
                  캐러셀 이미지 관리
                </h2>
                
                {carouselImages.length > 0 && (
                  <div className="mb-6">
                    <p className="text-sm text-gray-600 mb-4">
                      현재 {carouselImages.length}개의 이미지가 등록되어 있습니다.
                    </p>
                    <div className="grid grid-cols-2 gap-4">
                      {carouselImages.map((img, index) => (
                        <div key={img.id} className="relative group">
                          <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
                            <ResponsiveImage
                              src={img.src}
                              alt={img.alt}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <button
                            onClick={() => removeCarouselImage(index)}
                            className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                          <p className="text-xs text-gray-600 mt-1 truncate">{img.title}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                <ImageUpload
                  category="carousel"
                  onUploadSuccess={handleCarouselImageUpload}
                  maxFiles={10}
                />
              </div>
            )}

            {activeTab === 'settings' && (
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  시스템 설정
                </h2>
                
                <div className="space-y-4">
                  <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <h3 className="font-semibold text-yellow-800 mb-2">데이터 관리</h3>
                    <p className="text-sm text-yellow-700 mb-4">
                      업로드된 모든 이미지와 설정을 관리합니다.
                    </p>
                    <div className="flex space-x-3">
                      <button
                        onClick={handleExport}
                        className="flex items-center px-3 py-2 text-sm bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                      >
                        <Download className="w-4 h-4 mr-2" />
                        데이터 백업
                      </button>
                      <button
                        onClick={handleReset}
                        className="flex items-center px-3 py-2 text-sm bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        모든 데이터 초기화
                      </button>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <h3 className="font-semibold text-blue-800 mb-2">사용법</h3>
                    <ul className="text-sm text-blue-700 space-y-1">
                      <li>• 히어로 섹션: 메인 페이지 배경 이미지를 설정합니다</li>
                      <li>• 이미지 캐러셀: 고객 후기 섹션의 이미지를 관리합니다</li>
                      <li>• 모든 이미지는 WebP 형식으로 자동 최적화됩니다</li>
                      <li>• 모바일, 태블릿, 데스크톱용 이미지가 자동 생성됩니다</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* 오른쪽 - 미리보기 */}
          {showPreview && (
            <div>
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">실시간 미리보기</h3>
                
                {activeTab === 'hero' && heroBackground && (
                  <div className="relative h-64 rounded-lg overflow-hidden">
                    <div 
                      className="absolute inset-0 bg-cover bg-center"
                      style={{
                        backgroundImage: `linear-gradient(rgba(59, 130, 246, 0.8), rgba(99, 102, 241, 0.8)), url(${heroBackground})`
                      }}
                    />
                    <div className="absolute inset-0 flex items-center justify-center text-white">
                      <div className="text-center">
                        <h4 className="text-2xl font-bold mb-2">최저금리 맞춤형 대출서비스</h4>
                        <p className="text-lg">미리보기</p>
                      </div>
                    </div>
                  </div>
                )}
                
                {activeTab === 'carousel' && carouselImages.length > 0 && (
                  <div className="h-64">
                    <ImageCarousel
                      images={carouselImages}
                      height="h-64"
                      autoPlay={true}
                      interval={3000}
                    />
                  </div>
                )}
                
                {activeTab === 'hero' && !heroBackground && (
                  <div className="h-64 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-lg flex items-center justify-center">
                    <p className="text-gray-600">배경 이미지를 업로드하면 여기에 미리보기가 표시됩니다</p>
                  </div>
                )}
                
                {activeTab === 'carousel' && carouselImages.length === 0 && (
                  <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                    <p className="text-gray-600">캐러셀 이미지를 업로드하면 여기에 미리보기가 표시됩니다</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
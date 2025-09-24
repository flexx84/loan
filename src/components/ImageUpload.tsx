'use client';

import React, { useState, useRef } from 'react';
import { Upload, Image as ImageIcon, X, Check } from 'lucide-react';
import ResponsiveImage from './ResponsiveImage';

interface UploadedFile {
  size: string;
  path: string;
  width?: number;
  height?: number;
}

interface ImageUploadProps {
  category?: string;
  onUploadSuccess?: (files: UploadedFile[]) => void;
  maxFiles?: number;
  className?: string;
  accept?: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  category = 'general',
  onUploadSuccess,
  maxFiles = 5,
  className = '',
  accept = 'image/jpeg,image/jpg,image/png,image/webp'
}) => {
  const [uploading, setUploading] = useState(false);
  const [uploadedImages, setUploadedImages] = useState<UploadedFile[]>([]);
  const [dragOver, setDragOver] = useState(false);
  const [error, setError] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (files: FileList | null) => {
    if (!files || files.length === 0) return;

    if (files.length > maxFiles) {
      setError(`최대 ${maxFiles}개의 파일만 업로드할 수 있습니다.`);
      return;
    }

    // 파일 크기 및 형식 검증
    const validFiles: File[] = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      
      // 파일 크기 체크 (10MB)
      if (file.size > 10 * 1024 * 1024) {
        setError(`${file.name}은 10MB를 초과합니다.`);
        continue;
      }

      // 파일 형식 체크
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
      if (!allowedTypes.includes(file.type)) {
        setError(`${file.name}은 지원되지 않는 파일 형식입니다.`);
        continue;
      }

      validFiles.push(file);
    }

    if (validFiles.length > 0) {
      setError('');
      uploadFiles(validFiles);
    }
  };

  const uploadFiles = async (files: File[]) => {
    setUploading(true);
    setError('');

    try {
      const uploadPromises = files.map(async (file) => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('category', category);

        const response = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Upload failed');
        }

        return response.json();
      });

      const results = await Promise.all(uploadPromises);
      
      const allUploadedFiles: UploadedFile[] = [];
      results.forEach(result => {
        if (result.success && result.files) {
          allUploadedFiles.push(...result.files);
        }
      });

      setUploadedImages(prev => [...prev, ...allUploadedFiles]);
      
      if (onUploadSuccess) {
        onUploadSuccess(allUploadedFiles);
      }

    } catch (error) {
      console.error('Upload error:', error);
      setError(error instanceof Error ? error.message : '업로드 중 오류가 발생했습니다.');
    } finally {
      setUploading(false);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    handleFileSelect(e.dataTransfer.files);
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const removeImage = (index: number) => {
    setUploadedImages(prev => prev.filter((_, i) => i !== index));
  };

  const copyImagePath = (path: string) => {
    navigator.clipboard.writeText(path);
    // 임시 알림 (실제로는 toast 라이브러리 사용 권장)
    alert('이미지 경로가 클립보드에 복사되었습니다!');
  };

  return (
    <div className={`w-full ${className}`}>
      {/* 업로드 영역 */}
      <div
        className={`
          relative border-2 border-dashed rounded-xl p-8 text-center cursor-pointer
          transition-colors duration-200
          ${dragOver 
            ? 'border-blue-500 bg-blue-50' 
            : 'border-gray-300 hover:border-gray-400 hover:bg-gray-50'
          }
          ${uploading ? 'opacity-50 pointer-events-none' : ''}
        `}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleClick}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept={accept}
          onChange={(e) => handleFileSelect(e.target.files)}
          className="hidden"
        />

        {uploading ? (
          <div className="flex flex-col items-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
            <p className="text-gray-600">이미지를 최적화하고 있습니다...</p>
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <Upload className="w-12 h-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              이미지 업로드
            </h3>
            <p className="text-gray-600 mb-2">
              클릭하거나 파일을 드래그해서 업로드하세요
            </p>
            <p className="text-sm text-gray-500">
              JPEG, PNG, WebP 형식 • 최대 10MB • {maxFiles}개까지
            </p>
          </div>
        )}
      </div>

      {/* 에러 메시지 */}
      {error && (
        <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-600 text-sm">{error}</p>
        </div>
      )}

      {/* 업로드된 이미지 미리보기 */}
      {uploadedImages.length > 0 && (
        <div className="mt-6">
          <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Check className="w-5 h-5 text-green-500 mr-2" />
            업로드 완료 ({uploadedImages.length}개)
          </h4>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {uploadedImages
              .filter(img => img.size === 'original')
              .map((image, index) => (
              <div key={index} className="relative bg-white border rounded-lg overflow-hidden shadow-sm">
                <div className="aspect-video relative">
                  <ResponsiveImage
                    src={image.path}
                    alt={`업로드된 이미지 ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </div>
                
                <div className="p-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-900">
                      {image.width} × {image.height}px
                    </span>
                    <button
                      onClick={() => removeImage(index)}
                      className="text-red-500 hover:text-red-700 p-1"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  
                  <button
                    onClick={() => copyImagePath(image.path)}
                    className="w-full text-left p-2 text-xs bg-gray-50 rounded border font-mono text-gray-600 hover:bg-gray-100 transition-colors"
                    title="클릭해서 경로 복사"
                  >
                    {image.path}
                  </button>
                  
                  <div className="mt-2 flex gap-1 text-xs text-gray-500">
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">Mobile</span>
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded">Tablet</span>
                    <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded">Desktop</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h5 className="font-semibold text-blue-900 mb-2 flex items-center">
              <ImageIcon className="w-4 h-4 mr-2" />
              반응형 이미지 자동 생성 완료
            </h5>
            <p className="text-blue-800 text-sm">
              모바일, 태블릿, 데스크톱용 WebP 이미지가 자동으로 생성되었습니다. 
              각 이미지는 화면 크기에 맞춰 최적화되어 로딩 속도가 향상됩니다.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
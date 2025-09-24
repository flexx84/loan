import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';
import sharp from 'sharp';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const category = formData.get('category') as string || 'general';
    
    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    // 허용되는 파일 형식 체크
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json({ error: 'Invalid file type' }, { status: 400 });
    }

    // 파일 크기 체크 (10MB 제한)
    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json({ error: 'File too large' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    
    // 파일명 생성
    const timestamp = Date.now();
    const originalName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
    const nameWithoutExt = path.parse(originalName).name;
    
    // 저장 경로 설정
    const uploadDir = path.join(process.cwd(), 'public', 'images', category);
    if (!existsSync(uploadDir)) {
      await mkdir(uploadDir, { recursive: true });
    }

    // WebP 변환 및 다양한 사이즈 생성
    const baseFileName = `${nameWithoutExt}_${timestamp}`;
    const files = [];

    // 원본 크기 (WebP)
    const originalWebP = await sharp(buffer)
      .webp({ quality: 85 })
      .toBuffer();
    
    const originalPath = path.join(uploadDir, `${baseFileName}.webp`);
    await writeFile(originalPath, originalWebP);
    files.push({
      size: 'original',
      path: `/images/${category}/${baseFileName}.webp`,
      width: (await sharp(buffer).metadata()).width,
      height: (await sharp(buffer).metadata()).height
    });

    // 모바일용 (최대 768px width)
    const mobileWebP = await sharp(buffer)
      .resize(768, null, { withoutEnlargement: true })
      .webp({ quality: 80 })
      .toBuffer();
    
    const mobilePath = path.join(uploadDir, `${baseFileName}_mobile.webp`);
    await writeFile(mobilePath, mobileWebP);
    const mobileMetadata = await sharp(mobileWebP).metadata();
    files.push({
      size: 'mobile',
      path: `/images/${category}/${baseFileName}_mobile.webp`,
      width: mobileMetadata.width,
      height: mobileMetadata.height
    });

    // 태블릿용 (최대 1024px width)
    const tabletWebP = await sharp(buffer)
      .resize(1024, null, { withoutEnlargement: true })
      .webp({ quality: 82 })
      .toBuffer();
    
    const tabletPath = path.join(uploadDir, `${baseFileName}_tablet.webp`);
    await writeFile(tabletPath, tabletWebP);
    const tabletMetadata = await sharp(tabletWebP).metadata();
    files.push({
      size: 'tablet',
      path: `/images/${category}/${baseFileName}_tablet.webp`,
      width: tabletMetadata.width,
      height: tabletMetadata.height
    });

    // 데스크톱용 (최대 1920px width)
    const desktopWebP = await sharp(buffer)
      .resize(1920, null, { withoutEnlargement: true })
      .webp({ quality: 85 })
      .toBuffer();
    
    const desktopPath = path.join(uploadDir, `${baseFileName}_desktop.webp`);
    await writeFile(desktopPath, desktopWebP);
    const desktopMetadata = await sharp(desktopWebP).metadata();
    files.push({
      size: 'desktop',
      path: `/images/${category}/${baseFileName}_desktop.webp`,
      width: desktopMetadata.width,
      height: desktopMetadata.height
    });

    return NextResponse.json({
      success: true,
      files,
      message: 'Images uploaded and optimized successfully'
    });

  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: 'Failed to upload image' },
      { status: 500 }
    );
  }
}

// GET 요청으로 업로드된 이미지 목록 조회
export async function GET() {
  try {
    const imagesDir = path.join(process.cwd(), 'public', 'images');
    // 여기서는 간단히 성공 응답만 반환 (실제로는 파일 목록을 읽어서 반환)
    return NextResponse.json({
      success: true,
      message: 'Image list endpoint ready'
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to get image list' },
      { status: 500 }
    );
  }
}
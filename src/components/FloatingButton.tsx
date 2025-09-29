"use client";

import React from 'react';
import Image from 'next/image';

const FloatingButton = () => {
  const handleClick = () => {
    // #box5 요소로 스크롤 이동
    const targetElement = document.getElementById('box5');
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    } else {
      // box5 요소가 없을 경우 consultation 섹션으로 스크롤
      const consultationElement = document.getElementById('consultation');
      if (consultationElement) {
        consultationElement.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <aside className="quick">
      <a href="#box5" data-target="#box5" onClick={handleClick}>
        <Image 
          src="/quick-ico.png" 
          alt="실시간 한도조회 아이콘" 
          width={45}
          height={45}
          priority
        />
        <p>
          실시간 <br />
          한도조회
        </p>
      </a>
    </aside>
  );
};

export default FloatingButton;
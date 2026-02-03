'use client';
import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

import Lottie from 'lottie-react';

export const Preloader: React.FC = () => {
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isVisible, setIsVisible] = useState<boolean>(true);
  const [animationData, setAnimationData] = useState<Record<string, unknown> | null>(null);

  useEffect(() => {
    // Load Lottie animation data
    fetch('/preloader.json')
      .then((res) => res.json())
      .then((data) => setAnimationData(data))
      .catch((err) => console.error('Failed to load preloader animation:', err));
  }, []);

  useEffect(() => {
    // Use setTimeout to make setState calls asynchronous
    const initTimer = setTimeout(() => {
      setIsLoading(true);
      setIsVisible(true);
    }, 0);

    const timer = setTimeout(() => {
      setIsLoading(false);
      setTimeout(() => setIsVisible(false), 200);
    }, 3500);

    return () => {
      clearTimeout(initTimer);
      clearTimeout(timer);
    };
  }, [pathname]);

  if (!isVisible || !animationData) return null;

  return (
    <div
      style={{
        position: 'fixed',
        color: '#ffffff',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: '#000',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 99999,
        opacity: isLoading ? 1 : 0,
        transition: 'opacity 0.5s ease',
        visibility: isVisible ? 'visible' : 'hidden',
      }}
    >
      <Lottie
        animationData={animationData}
        style={{ width: 414, height: 67,maxWidth: '50%' }}
        loop={true}
        autoplay={true}
      />
    </div>
  );
};

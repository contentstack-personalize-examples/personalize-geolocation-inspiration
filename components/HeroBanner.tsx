import React from 'react';

import Image from 'next/image';

import { Banner } from '@/lib/types';

interface HeroBannerProps {
  banner?: Banner;
}

export function HeroBanner({ banner }: HeroBannerProps) {
  return (
    <section className="relative w-full h-96 md:h-[500px]">
      {/* Background Image */}
      {banner?.banner_image ? (
        <Image
          src={banner.banner_image.url}
          alt={banner.banner_image.title || 'Hero banner'}
          fill
          className="object-cover object-top"
          priority
        />
      ) : (
        <div className="w-full h-full bg-gray-200 flex items-center justify-center">
          <p className="text-gray-500">No banner image available</p>
        </div>
      )}

      {/* Content Overlay */}
      {banner?.banner_text && (
        <div className="absolute inset-0 flex items-center">
          <div className="px-6 md:px-16 max-w-2xl">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight uppercase drop-shadow-lg">
              {banner.banner_text}
            </h1>
            
            {banner.cta_text && (
              <button className="border-2 border-white text-white px-8 py-3 text-lg font-medium hover:bg-white hover:text-black transition-colors duration-300 uppercase drop-shadow-lg">
                {banner.cta_text}
              </button>
            )}
          </div>
        </div>
      )}
    </section>
  );
}

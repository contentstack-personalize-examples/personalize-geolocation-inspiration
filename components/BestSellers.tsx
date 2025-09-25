import React from 'react';

import Image from 'next/image';

import {
  BestSellers as BestSellersType,
  Product,
} from '@/lib/types';

interface BestSellersProps {
  bestSellers?: BestSellersType;
}


export function BestSellers({ bestSellers }: BestSellersProps) {
  // If no bestSellers data, don't render anything
  if (!bestSellers?.section_heading) {
    return null;
  }

  return (
    <section className="py-16 px-6 md:px-16 bg-white text-gray-800">
      <div className="max-w-7xl mx-auto">
        {/* Section Header from CMS */}
        <div className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-gray-800">
            {bestSellers.section_heading}
          </h2>
        </div>

        {/* Products Grid */}
        {bestSellers.best_selling_products?.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {bestSellers.best_selling_products.map((product: Product, index: number) => (
              <div key={product.uid} className="group cursor-pointer">
                {/* Product Image */}
                <div className="rounded-lg mb-4 h-64 relative overflow-hidden">
                  <Image
                    src={product.image.url}
                    alt={product.image.title || product.title}
                    fill
                    className="object-cover"
                  />
                  
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300"></div>
                </div>

                {/* Product Info */}
                <div className="space-y-2">
                  <h3 className="font-semibold text-lg text-gray-800">{product.title}</h3>
                  
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xl text-gray-800">${product.price}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              Products will appear here when added to the CMS.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

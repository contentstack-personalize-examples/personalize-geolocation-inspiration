import './globals.css';

import type { Metadata } from 'next';

import { ContentstackLivePreview } from '@/components/ContentstackLivePreview';

export const metadata: Metadata = {
  title: "CSPRSNLZ Fashion - Elevate Your Everyday Style",
  description: "Discover the latest fashion trends and elevate your everyday style with CSPRSNLZ Fashion. Shop our collection of premium clothing and accessories.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
        <ContentstackLivePreview />
      </body>
    </html>
  );
}

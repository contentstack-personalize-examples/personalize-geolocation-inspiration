import './globals.css';

import type { Metadata } from 'next';

import { ContentstackLivePreview } from '@/components/ContentstackLivePreview';
import { PersonalizeProvider } from '@/components/context/PersonalizeContext';

export const metadata: Metadata = {
  title: 'CSPRSNLZ - Elevate Your Everyday Style',
  description:
    'Discover the latest fashion trends and elevate your everyday style with CSPRSNLZ Fashion. Shop our collection of premium clothing and accessories.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {/* we wrap the body in the PersonalizeProvider to ensure the SDK is initialized, so that we can trigger impressions */}
        <PersonalizeProvider>{children}</PersonalizeProvider>
        <ContentstackLivePreview />
      </body>
    </html>
  );
}

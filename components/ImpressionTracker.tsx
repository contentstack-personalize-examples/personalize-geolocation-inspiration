'use client';

import { useEffect } from 'react';

import { usePersonalize } from './context/PersonalizeContext';

interface ImpressionTrackerProps {
  children: React.ReactNode;
  variantAliases: string[];
}

export function ImpressionTracker({ children, variantAliases }: ImpressionTrackerProps) {
  const personalizeSDK = usePersonalize();

  // Trigger impression for hardcoded variant alias when page loads
  useEffect(() => {
    const triggerPageImpression = async () => {
      if (personalizeSDK && variantAliases.length > 0) {
        try {
          await personalizeSDK.triggerImpressions({ 
            aliases: variantAliases 
          });
          
          console.log('Page impression tracked for variant alias:', variantAliases);
        } catch (error) {
          console.error('Failed to trigger page impression:', error);
        }
      }
    };

    triggerPageImpression();
  }, [personalizeSDK]);

  return <>{children}</>;
}

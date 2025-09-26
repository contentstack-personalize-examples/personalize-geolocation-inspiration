'use client';

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

import Personalize from '@contentstack/personalize-edge-sdk';
import { Sdk } from '@contentstack/personalize-edge-sdk/dist/sdk';

let sdkInstance: Sdk | null = null;

export async function getPersonalizeInstance() {
  if (!Personalize.getInitializationStatus()) {
    sdkInstance = await Personalize.init(process.env.NEXT_PUBLIC_CONTENTSTACK_PERSONALIZE_PROJECT_UID as string);
  }
  return sdkInstance;
}

const PersonalizeContext = createContext<Sdk | null>(null);

export function PersonalizeProvider({ children }: { children: React.ReactNode }) {
  const [sdk, setSdk] = useState<Sdk | null>(null);

  useEffect(() => {
    getPersonalizeInstance().then(setSdk);
  }, []);

  return (
    <PersonalizeContext.Provider value={sdk}>
      {children}
    </PersonalizeContext.Provider>
  );
}

export function usePersonalize() {
  return useContext(PersonalizeContext);
}

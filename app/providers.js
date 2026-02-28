'use client';

import React, { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { ConvexProvider, ConvexReactClient } from 'convex/react';

import { DragDropLayoutElement } from '@/context/DragDropLayoutElement';
import { EmailTemplateContext } from '@/context/EmailTemplateContext';
import { ScreenSizeContext } from '@/context/ScreenSizeContext';
import { SelectedElementContext } from '@/context/SelectedElementContext';
import { UserDetailContext } from '@/context/UserDetailContext';

/* --------------------------------------------------
   Convex Client (Create ONCE)
--------------------------------------------------- */
const convex = new ConvexReactClient(
  process.env.NEXT_PUBLIC_CONVEX_URL
);

/* --------------------------------------------------
   Helper: Safe JSON Parse
--------------------------------------------------- */
const safeParse = (value, fallback) => {
  try {
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
};

/* --------------------------------------------------
   Provider Component
--------------------------------------------------- */
function Provider({ children }) {
  const router = useRouter();

  const [userDetail, setUserDetail] = useState(null);
  const [screenSize, setScreenSize] = useState('desktop');
  const [dragElementLayout, setDragElementLayout] = useState(null);
  const [emailTemplate, setEmailTemplate] = useState([]);
  const [selectedElement, setSelectedElement] = useState(null);

  /* --------------------------------------------------
     Load from localStorage (client only)
  --------------------------------------------------- */
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const storedUser = safeParse(
      localStorage.getItem('userDetail'),
      null
    );

    const storedTemplate = safeParse(
      localStorage.getItem('emailTemplate'),
      []
    );

    setUserDetail(storedUser);
    setEmailTemplate(storedTemplate);

    if (!storedUser?.email) {
      router.push('/');
    }
  }, [router]);

  /* --------------------------------------------------
     Persist Email Template
  --------------------------------------------------- */
  useEffect(() => {
    if (typeof window === 'undefined') return;

    localStorage.setItem(
      'emailTemplate',
      JSON.stringify(emailTemplate)
    );
  }, [emailTemplate]);

  /* --------------------------------------------------
     Update Template When Element Changes
  --------------------------------------------------- */
  useEffect(() => {
    if (!selectedElement) return;

    setEmailTemplate((prev) =>
      prev.map((item) =>
        item.id === selectedElement?.layout?.id
          ? selectedElement.layout
          : item
      )
    );
  }, [selectedElement]);

  return (
    <ConvexProvider client={convex}>
      <GoogleOAuthProvider
        clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}
      >
        <UserDetailContext.Provider
          value={{ userDetail, setUserDetail }}
        >
          <ScreenSizeContext.Provider
            value={{ screenSize, setScreenSize }}
          >
            <DragDropLayoutElement.Provider
              value={{ dragElementLayout, setDragElementLayout }}
            >
              <EmailTemplateContext.Provider
                value={{ emailTemplate, setEmailTemplate }}
              >
                <SelectedElementContext.Provider
                  value={{ selectedElement, setSelectedElement }}
                >
                  {children}
                </SelectedElementContext.Provider>
              </EmailTemplateContext.Provider>
            </DragDropLayoutElement.Provider>
          </ScreenSizeContext.Provider>
        </UserDetailContext.Provider>
      </GoogleOAuthProvider>
    </ConvexProvider>
  );
}

export default Provider;

/* --------------------------------------------------
   Custom Hooks
--------------------------------------------------- */
export const useUserDetail = () =>
  useContext(UserDetailContext);

export const useScreenSize = () =>
  useContext(ScreenSizeContext);

export const useDragElementLayout = () =>
  useContext(DragDropLayoutElement);

export const useEmailTemplate = () =>
  useContext(EmailTemplateContext);

export const useSelectedElement = () =>
  useContext(SelectedElementContext);
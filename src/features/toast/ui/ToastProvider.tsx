'use client';

import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

export function ToastProvider({ children }: Props) {
  return (
    <>
      {children}
      <ToastContainer />
    </>
  );
}

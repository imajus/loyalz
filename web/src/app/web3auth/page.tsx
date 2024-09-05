'use client';
import { Web3Auth } from '@/_pages';
import { Suspense } from 'react';

export default function HomePage() {
  return (
    <Suspense>
      <Web3Auth />
    </Suspense>
  );
}

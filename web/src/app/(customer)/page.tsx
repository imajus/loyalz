'use client';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import { Spinner } from '@/shared/components';

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    router.push('/customer', { scroll: false });
  }, [router]);

  return <Spinner />;
}

import { RequireAuth } from '@/shared/components';
import dynamic from 'next/dynamic';

const News = dynamic(() => import('@/_pages/news/News'), { ssr: false });

export default function NewsPage() {
  return (
    <RequireAuth>
      <News />
    </RequireAuth>
  );
}

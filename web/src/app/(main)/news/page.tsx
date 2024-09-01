import { News } from '@/_pages';
import { RequireAuth } from '@/shared/components';

export default function NewsPage() {
  return (
    <RequireAuth>
      <News />
    </RequireAuth>
  );
}

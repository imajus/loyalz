import { BrandManagerHome } from '@/_pages';
import { RequireAuth } from '@/shared/components';

export default function HomePage() {
  return (
    <RequireAuth>
      <BrandManagerHome />
    </RequireAuth>
  );
}

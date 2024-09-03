import { ShowQR } from '@/_pages';
import { RequireAuth } from '@/shared/components';

export default function ShowQRPage() {
  return (
    <RequireAuth>
      <ShowQR />
    </RequireAuth>
  );
}

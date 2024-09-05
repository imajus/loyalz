import { Exchange } from '@/_pages';
import { RequireAuth } from '@/shared/components';

export default function ExchangePage() {
  return (
    <RequireAuth>
      <Exchange />
    </RequireAuth>
  );
}

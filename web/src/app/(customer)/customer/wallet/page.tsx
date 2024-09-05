import { Wallet } from '@/_pages';
import { RequireAuth } from '@/shared/components';

export default function WalletPage() {
  return (
    <RequireAuth>
      <Wallet />
    </RequireAuth>
  );
}

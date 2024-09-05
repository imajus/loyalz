import { useWeb3Auth } from '@/shared/hook';
import { getSigner } from '@/shared/utils/xmtp';
import { Client, XmtpEnv } from '@xmtp/xmtp-js';
import { createContext, ReactElement, useEffect, useState } from 'react';

type XmtpClientContextValue = {
  client: Client | null;
  setClient: (client: Client | null) => void;
};

export const XmtpClientContext = createContext<XmtpClientContextValue>({
  client: null,
  setClient: () => {
    return;
  },
});

export default function XmtpClientProvider({ children }: { children: ReactElement }) {
  const [client, setClient] = useState<Client | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { provider } = useWeb3Auth();

  useEffect(() => {
    void (async () => {
      if (provider) {
        try {
          const signer = await getSigner(provider);
          const client = await Client.create(signer, {
            env: (process.env.NEXT_PUBLIC_XMTP_ENV as XmtpEnv) ?? 'dev',
          });
          console.log(`Client initialized at: ${client.address}`);
          setClient(client);
          setIsLoading(false);
        } catch (err) {
          console.error(err);
          throw err;
        }
      }
    })();
  }, [provider]);

  const clientContextValue = {
    client,
    setClient,
  };

  return (
    <XmtpClientContext.Provider value={clientContextValue}>
      {isLoading ? <div className="w-full p-4 m-auto">Loading client....</div> : children}
    </XmtpClientContext.Provider>
  );
}

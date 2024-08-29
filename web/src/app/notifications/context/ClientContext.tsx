import { Client } from "@xmtp/xmtp-js";
import { createContext, useState, ReactElement, useEffect } from "react";
import { wallet } from "@/app/subscribe/utils";

type ClientContextValue = {
  client: Client | null;
  setClient: (client: Client | null) => void;
};

export const ClientContext = createContext<ClientContextValue>({
  client: null,
  setClient: () => {
    return;
  },
});

export default function ClientProvider({
  children,
}: {
  children: ReactElement;
}): ReactElement {
  const [client, setClient] = useState<Client | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const client = await Client.create(wallet, {
        env: "dev",
      });

      setClient(client);
      setIsLoading(false);
    })();
  }, []);

  const clientContextValue = {
    client,
    setClient,
  };

  return (
    <ClientContext.Provider value={clientContextValue}>
      {isLoading ? (
        <div className="w-full p-4 m-auto">Loading client....</div>
      ) : (
        children
      )}
    </ClientContext.Provider>
  );
}

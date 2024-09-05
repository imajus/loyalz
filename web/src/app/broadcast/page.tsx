'use client';

// import { useClient } from '@/shared/hook/xmtp';
// import { allowedConsentList } from '@/shared/utils/xmtp';
// import { BroadcastClient } from '@xmtp/broadcast-sdk';
// import { useCallback, useState } from 'react';

export default function Broadcast() {
  // const [loading, setLoading] = useState(false);
  // const [text, setText] = useState('');
  // const { client } = useClient();

  // const sendBroadcast = useCallback(async () => {
  //   try {
  //     setLoading(true);
  //     if (client) {
  //       const subscribers = (await allowedConsentList(client)).map(({ value }) => value);
  //       const broadcastClient = new BroadcastClient({
  //         client,
  //         addresses: subscribers,
  //         cachedCanMessageAddresses: subscribers,
  //       });
  //       await broadcastClient.broadcast([text], {});
  //       setLoading(false);
  //     }
  //   } catch (error) {
  //     console.error(error);
  //     setLoading(false);
  //   }
  // }, [client, text]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        <div className="flex flex-col items-center justify-between p-24">
          {/* <h1 className="text-4xl font-bold">Broadcast to {client?.address}</h1>
          <input
            className="border-2 border-gray-300 rounded-lg p-2"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter text to broadcast"
          />
          <button
            className="bg-blue-500 text-white rounded-lg p-2 mt-4"
            onClick={sendBroadcast}
            disabled={loading}
          >
            {loading ? 'Loading...' : 'Broadcast'}
          </button> */}
        </div>
      </div>
    </main>
  );
}

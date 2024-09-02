'use client';

import { BroadcastClient } from '@xmtp/broadcast-sdk';
import { ChangeEventHandler, CSSProperties, useCallback, useMemo, useState } from 'react';
import { getXmtpClient } from '../broadcast.client';
import { broadcastConfigs } from '../broadcast.config';
import { allowedConsentList } from './utils/consents';

const styles: Record<string, CSSProperties> = {
  SubscribeButtonContainer: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    borderRadius: '5px',
    textAlign: 'center',
    alignItems: 'center',
  },
  SubscribeButton: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '10px 20px',
    borderRadius: '5px',
    marginBottom: '2px',
    textAlign: 'left',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
    fontWeight: 'bold',
    color: '#333333',
    backgroundColor: '#ededed',
    border: 'none',
    fontSize: '12px',
  },
  ErrorText: {
    color: 'red',
    fontSize: '12px',
    marginTop: '5px',
  },
  BroadcastDropdownContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: '10px',
  },
  Dropdown: {
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ededed',
    fontSize: '12px',
    backgroundColor: '#ededed',
    color: '#333333',
  },
};

export default function Broadcast() {
  const [loading, setLoading] = useState(false);
  const [text, setText] = useState('');
  const [selectedBroadcast, setSelectedBroadcast] = useState(broadcastConfigs[0].address);
  const { address: broadcastAddress, name } = useMemo(() => {
    return (
      broadcastConfigs.find(({ address }) => address === selectedBroadcast) ?? broadcastConfigs[0]
    );
  }, [selectedBroadcast]);

  const sendBroadcast = useCallback(async () => {
    try {
      setLoading(true);
      const client = await getXmtpClient(broadcastAddress);
      if (client) {
        const subscribers = (await allowedConsentList(client)).map(({ value }) => value);
        const broadcastClient = new BroadcastClient({
          client,
          addresses: subscribers,
          cachedCanMessageAddresses: subscribers,
        });
        await broadcastClient.broadcast([text], {});
        setLoading(false);
      }
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  }, [broadcastAddress, text]);

  const handleDropdownChange: ChangeEventHandler<HTMLSelectElement> = useCallback(
    (event) => {
      setSelectedBroadcast(event.target.value);
    },
    [setSelectedBroadcast],
  );

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        <div style={styles.BroadcastDropdownContainer}>
          <label htmlFor="config-dropdown">Choose a Broadcast:</label>
          <select
            style={styles.Dropdown}
            id="config-dropdown"
            value={selectedBroadcast}
            onChange={handleDropdownChange}
          >
            {broadcastConfigs.map((config) => (
              <option key={config.address} value={config.address}>
                {config.name}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col items-center justify-between p-24">
          <h1 className="text-4xl font-bold">Broadcast to {name}</h1>
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
          </button>
        </div>
      </div>
    </main>
  );
}

import { useEffect, useState } from 'react';

import { Overlay, Spinner } from '@/shared/components';
import { Button } from '@/shared/components/shadcn/ui/button';

import { IndexedToken, Token } from '@/shared/types';
import { blockchainName } from '@/shared/utils/blockchain';
import { CreateTokenForm } from './create-token-form/CreateTokenForm';
import { TokensListTable } from './tables/TokensListTable';

export const ListOfTokens = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [tokens, setTokens] = useState<Token[]>([]);
  const [isFormVisible, setIsFormVisible] = useState(false);

  useEffect(() => {
    void (async () => {
      try {
        const response = await fetch('https://loyalz-envio.majus.org/api/rest/created-tokens', {
          method: 'GET',
        });
        const { MultiTokenERC20_TokenCreated: createdTokens } = await response.json();
        setTokens(
          createdTokens.map(({ id, name }: IndexedToken) => ({
            token: name,
            blockchain: blockchainName(id),
          })),
        );
        setIsLoading(false);
        setIsLoading(false);
      } catch (err) {
        console.error(err);
      }
    })();
  }, []);
  return (
    <div className="w-full flex flex-col gap-3">
      <div className="font-['Inter'] w-full flex justify-start">
        <span className="font-bold text-[30px]">List of tokens</span>
      </div>
      {isLoading ? (
        <div className="h-64 w-full px-5 bg-slate-300 border-2">
          <Spinner />
        </div>
      ) : (
        <TokensListTable tokens={tokens} />
      )}
      <Button className="w-32" onClick={() => setIsFormVisible(true)}>
        + Create token
      </Button>
      <Overlay
        isVisible={isFormVisible}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'rgb(203 213 225 / 0.8)',
        }}
      >
        <CreateTokenForm setIsFormVisible={setIsFormVisible} />
      </Overlay>
    </div>
  );
};

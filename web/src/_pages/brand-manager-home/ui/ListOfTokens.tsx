import { useEffect, useState } from 'react';

import { Overlay, Spinner } from '@/shared/components';
import { Button } from '@/shared/components/shadcn/ui/button';

import { IndexedToken, Token } from '@/shared/types';
import { blockchainName } from '@/shared/utils/blockchain';
import { Indexer } from '@/shared/utils/indexer';
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

  useEffect(() => {
    void (async () => {
      const indexer = new Indexer();
      console.log('tokenCreatedAmount', await indexer.tokenCreatedAmount());
      console.log('tokenMintedAmount', await indexer.tokenMintedAmount());
      console.log('tokenBurnedAmount', await indexer.tokenBurnedAmount());
      console.log('avgMintedAmountPerToken', await indexer.avgMintedAmountPerToken());
      console.log('avgBurnedAmountPerToken', await indexer.avgBurnedAmountPerToken());
      console.log('avgMintedBurnedRatioPerToken', await indexer.avgMintedBurnedRatioPerToken());
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

import { useState } from 'react';

import { tokens } from '@/mock/tokens';
import { Overlay, Spinner } from '@/shared/components';
import { Button } from '@/shared/components/shadcn/ui/button';

import { CreateTokenForm } from './create-token-form/CreateTokenForm';
import { TokensListTable } from './tables/TokensListTable';

type PropTypes = {
  isLoading: boolean;
};

export const ListOfTokens = ({ isLoading }: PropTypes) => {
  const [isFormVisible, setIsFormVisible] = useState(false);

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

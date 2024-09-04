import { Button } from '@/shared/components';

type PropTypes = { handleClick: () => void };

export const GoBackButton = ({ handleClick }: PropTypes) => {
  return (
    <Button onClick={handleClick}>
      <span className="font-['Racing_Sans_One'] text-2xl">Go Back</span>
    </Button>
  );
};

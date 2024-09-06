import { FilesIcon } from 'lucide-react';

import { toastInfo } from '@/shared/utils/toast';

type PropTypes = {
  scannedResult?: string;
};

export const Result = ({ scannedResult }: PropTypes) => {
  if (!scannedResult) return null;

  const handleClick = async () => {
    if (window.isSecureContext) {
      await navigator.clipboard.writeText(scannedResult);
      toastInfo('Link has been copied');
    }
  };

  return (
    <div className="flex flex-col gap-1">
      <span className="font-bold">Result:</span>
      <div className="flex flex-row ">
        {scannedResult}
        <div onClick={handleClick} className="cursor-pointer">
          <FilesIcon />
        </div>
      </div>
    </div>
  );
};

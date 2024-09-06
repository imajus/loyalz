import { CameraIcon } from 'lucide-react';

type PropTypes = {
  onClick: () => void;
};
export const ScannerButton = ({ onClick }: PropTypes) => {
  return (
    <div onClick={onClick} className="cursor-pointer z-10">
      <CameraIcon size={320} strokeWidth={0.5} />
    </div>
  );
};

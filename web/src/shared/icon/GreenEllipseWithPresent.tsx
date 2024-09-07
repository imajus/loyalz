import { GiftIcon } from 'lucide-react';

import { Ellipse } from './Ellipse';

type PropTypes = {
  height?: number;
};

export const GreenEllipseWithPresent = ({ height = 90 }: PropTypes) => (
  <div className="relative w-fit h-fit">
    <Ellipse fill="#A8E935" height={height} />
    <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
      <GiftIcon stroke="#fff" size={50} />
    </div>
  </div>
);

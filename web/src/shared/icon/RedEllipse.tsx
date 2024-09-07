import { Ellipse } from './Ellipse';

type PropTypes = {
  height?: number;
};

export const RedEllipse = ({ height = 90 }: PropTypes) => (
  <div className="relative w-fit h-fit">
    <Ellipse fill="#E62F43" height={height} />
  </div>
);

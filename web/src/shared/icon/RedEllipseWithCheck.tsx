import { EllipseWithCheck } from './EllipseWithCheck';

type PropTypes = {
  height?: number;
};

export const RedEllipseWithCheck = ({ height = 164 }: PropTypes) => (
  <EllipseWithCheck fill="#E62F43" height={height} />
);

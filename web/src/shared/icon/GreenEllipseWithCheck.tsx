import { EllipseWithCheck } from './EllipseWithCheck';

type PropTypes = {
  height?: number;
};

export const GreenEllipseWithCheck = ({ height = 164 }: PropTypes) => (
  <EllipseWithCheck fill="#A8E935" height={height} />
);

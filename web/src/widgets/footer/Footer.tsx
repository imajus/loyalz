import { Page } from '@/shared/types';

type PropTypes = {
  page: Page;
};
export const Footer = ({ page }: PropTypes) => {
  return <div>Footer {page}</div>;
};

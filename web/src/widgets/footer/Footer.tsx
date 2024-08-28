import Link from 'next/link';

import { pages } from '@/shared/const';
import { Page } from '@/shared/types';
import { classNames } from '@/shared/utils';

type PropTypes = {
  currentPage: Page;
};
export const Footer = ({ currentPage }: PropTypes) => {
  return (
    <div className="h-24 p-4 w-full flex items-center justify-center">
      <div className="flex flex-row justify-center items-center rounded-lg overflow-hidden">
        {pages.map((page) => {
          const isCurrent = page === currentPage;
          return (
            <Link
              key={page}
              className={classNames(
                'w-80 h-16 flex justify-center items-center border-r cursor-pointer',
                isCurrent ? 'bg-red-500' : 'bg-red-300',
              )}
              href={`${page}`}
              onClick={() => alert(page)}
            >
              {page}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

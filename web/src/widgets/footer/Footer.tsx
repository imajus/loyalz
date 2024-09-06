import Link from 'next/link';

import { customerPages, pageIcons } from '@/shared/const';
import { Page } from '@/shared/types';
import { classNames } from '@/shared/utils';

type PropTypes = {
  currentPage: Page;
};
export const Footer = ({ currentPage }: PropTypes) => {
  return (
    <footer className="h-[77px] w-full flex items-center justify-center bg-[#F23B9C] flex-shrink-0 rounded-t-3xl">
      <div className="flex flex-row justify-center items-center overflow-hidden gap-9 text-white">
        {customerPages.map((page) => {
          const isCurrent = page === currentPage;
          return (
            <Link
              key={page}
              className={classNames(
                'parent relative flex flex-col gap-1 justify-center items-center cursor-pointer capitalize hover:bg-[#F23B9C]/90 h-[41px] w-14',
                isCurrent &&
                  'after:content-[" "] after:absolute after:left-0 after:bottom-0 after:w-full after:h-[2px] after:bg-white',
                'hover:after:content-[" "] hover:after:absolute hover:after:left-0 hover:after:bottom-0 hover:after:w-full hover:after:h-[2px] hover:after:bg-white',
              )}
              href={`/customer/${page}`}
              onClick={(e) => {
                if (!isCurrent) return;
                e.stopPropagation();
                e.preventDefault();
              }}
            >
              {pageIcons[page]}
              <span
                className={classNames(
                  "child relative text-xs font-['Radio_Canada'] font-bold",
                  isCurrent && 'bottom-[2px]',
                )}
              >
                {page}
              </span>
            </Link>
          );
        })}
      </div>
    </footer>
  );
};

import { ReactNode } from 'react';

import { classNames } from '@/shared/utils';

type PropTypes = {
  children?: ReactNode;
  isWidthFit?: boolean;
  className?: string;
};

const getClassNames = (className: string | undefined, isWidthFit: boolean) => {
  if (className) return className;

  const defaultClassName = classNames(
    "text-black font-['Radio_Canada'] p-2 text-black text-3xl border-2 border-black shadow-sm",
    'rounded-xl flex flex-row items-center justify-start',
    isWidthFit ? 'w-fit' : 'w-full',
  );

  return defaultClassName;
};

export const Frame = ({ children, isWidthFit = false, className }: PropTypes) => {
  if (!children) return null;

  const updatedClassName = getClassNames(className, isWidthFit);

  return (
    <div className={classNames('relative h-fit', isWidthFit ? 'w-fit' : 'w-full')}>
      <div className="absolute inset-0 rounded-xl border-2 border-black shadow-[1px_1px_0_0_rgba(0,0,0,1)]" />

      <div className={updatedClassName}>{children}</div>
    </div>
  );
};

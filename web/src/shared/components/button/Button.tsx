import Link from 'next/link';
import { ComponentProps, ReactNode } from 'react';

import { classNames } from '@/shared/utils';

type PropTypes = {
  title?: string;
  children?: ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
  hasBorder?: boolean;
  btnType?: 'default' | 'grid';
} & ComponentProps<'button'> &
  ComponentProps<'a'>;

const getClassNames = (className: string | undefined) => {
  if (className) return className;

  const defaultClassName = classNames(
    "text-black text-xl font-['Racing_Sans_One'] text-black text-3xl w-56 h-12 rounded-xl flex flex-row items-center justify-center cursor-pointer border-2 border-black shadow-sm",
  );

  return defaultClassName;
};

export const Button = (props: PropTypes) => {
  const {
    href,
    title,
    onClick,
    children,
    className,
    hasBorder = true,
    btnType = 'default',
    ...restProps
  } = props;

  if (!href && !onClick) return null;
  if (!title && !children) return null;

  const parentClassName = classNames('relative', btnType === 'grid' && 'w-full');
  const childClassName = getClassNames(className);

  if (href) {
    return (
      <Link href={href} className={parentClassName} {...restProps}>
        {hasBorder && (
          <div className="absolute inset-0 rounded-xl border-2 border-black cursor-pointer shadow-[1px_1px_0_0_rgba(0,0,0,1)]" />
        )}

        <div className={childClassName}>
          {title}
          {children}
        </div>
      </Link>
    );
  }

  return (
    <button className={parentClassName} onClick={onClick} {...restProps}>
      {hasBorder && (
        <div className="absolute inset-0 rounded-xl border-2 border-black cursor-pointer shadow-[1px_1px_0_0_rgba(0,0,0,1)]" />
      )}

      <div className={childClassName}>
        {title}
        {children}
      </div>
    </button>
  );
};

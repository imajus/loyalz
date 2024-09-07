import Link from 'next/link';
import { ComponentProps, ReactNode } from 'react';

import { classNames } from '@/shared/utils';

type ButtonType = 'default' | 'grid';
type ButtonSize = 'base' | 'md' | 'sm' | 'xs' | 'lg';

type PropTypes = {
  title?: string;
  children?: ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
  hasBorder?: boolean;
  btnType?: ButtonType;
  btnSize?: ButtonSize;
} & ComponentProps<'button'> &
  ComponentProps<'a'>;

const getClassNames = (className: string | undefined, btnSize: ButtonSize) => {
  if (className) return className;

  const defaultClassName = classNames(
    "text-black text-xl font-['Racing_Sans_One'] text-black text-3xl h-12 rounded-xl flex flex-row items-center justify-center cursor-pointer border-2 border-black shadow-sm",
    btnSize === 'lg' && 'w-72',
    btnSize === 'base' && 'w-56',
    btnSize === 'md' && 'w-48',
    btnSize === 'sm' && 'w-32',
    btnSize === 'xs' && 'w-24',
  );

  return defaultClassName;
};

const Shadow = ({
  hasBorder,
  btnType,
  btnSize,
}: {
  hasBorder: boolean;
  btnType: ButtonType;
  btnSize: ButtonSize;
}) => (
  <>
    {hasBorder && (
      <div
        className={classNames(
          'absolute inset-0 rounded-xl border-2 border-black shadow-[1px_1px_0_0_rgba(0,0,0,1)]',
          btnType === 'grid' && 'w-full',
          btnType === 'default' && '',
          btnSize === 'lg' && 'w-72',
          btnSize === 'base' && 'w-56',
          btnSize === 'md' && 'w-48',
          btnSize === 'sm' && 'w-32',
          btnSize === 'xs' && 'w-24',
        )}
      />
    )}
  </>
);

export const Button = (props: PropTypes) => {
  const {
    href,
    title,
    onClick,
    children,
    className,
    hasBorder = true,
    btnType = 'default',
    btnSize = 'base',
    ...restProps
  } = props;

  if (!href && !onClick) return null;
  if (!title && !children) return null;

  const parentClassName = classNames('relative', btnType === 'grid' && 'w-full');
  const childClassName = getClassNames(className, btnSize);

  if (href) {
    return (
      <Link href={href} className={parentClassName} {...restProps}>
        <Shadow hasBorder={hasBorder} btnType={btnType} btnSize={btnSize} />
        <div className={childClassName}>
          {title}
          {children}
        </div>
      </Link>
    );
  }

  return (
    <button className={parentClassName} onClick={onClick} {...restProps}>
      <Shadow hasBorder={hasBorder} btnType={btnType} btnSize={btnSize} />
      <div className={childClassName}>
        {title}
        {children}
      </div>
    </button>
  );
};

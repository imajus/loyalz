import Link from 'next/link';
import { ComponentProps, ReactNode } from 'react';

type PropTypes = {
  title: string;
  children?: ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
} & ComponentProps<'button'> &
  ComponentProps<'a'>;

const getClassNames = ({ className }: PropTypes) => {
  if (className) return className;

  const defaultClassName =
    "text-black text-xl font-['Racing_Sans_One'] text-black text-3xl w-56 h-12 rounded-xl flex flex-row items-center justify-center cursor-pointer border-2 border-black shadow-sm";

  return defaultClassName;
};

export const Button = (props: PropTypes) => {
  const { href, title, onClick, children } = props;

  if (!href && !onClick) return null;

  const className = getClassNames(props);

  if (href) {
    return (
      <Link href={href} className="relative" {...props}>
        <div className="absolute inset-0 rounded-xl border-2 border-black cursor-pointer shadow-[1px_1px_0_0_rgba(0,0,0,1)]" />

        <div className={className}>
          {title}
          {children}
        </div>
      </Link>
    );
  }

  return (
    <button className="relative" onClick={onClick} {...props}>
      <div className="absolute inset-0 rounded-xl border-2 border-black cursor-pointer shadow-[1px_1px_0_0_rgba(0,0,0,1)]" />

      <div className={className}>
        {title}
        {children}
      </div>
    </button>
  );
};

import classNames from 'classnames';
import Link from 'next/link';
import { ComponentProps } from 'react';

type PropTypes = {
  title: string;
  href?: string;
  onClick?: () => void;
  className?: string;
} & ComponentProps<'button'> &
  ComponentProps<'a'>;

const getClassNames = (props: PropTypes) => {
  const { className, href } = props;

  if (className) return className;

  const defaultClassName =
    'text-white text-xl font-medium w-56 h-12 rounded-xl flex flex-row items-center justify-center cursor-pointer';

  if (href) {
    //classNames of anchor element
    return classNames(defaultClassName, 'bg-[#DC0203]');
  }

  //classNames of button element
  return classNames(defaultClassName, props.disabled ? 'bg-[#DC0203]/60' : 'bg-[#DC0203]');
};

export const Button = (props: PropTypes) => {
  const { href, title, onClick } = props;

  if (!href && !onClick) return null;

  const className = getClassNames(props);

  if (href) {
    return (
      <Link href={href} className={className} {...props}>
        {title}
      </Link>
    );
  }

  return (
    <button className={className} onClick={onClick} {...props}>
      {title}
    </button>
  );
};

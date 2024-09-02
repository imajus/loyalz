import { ReactNode } from 'react';

type PropTypes = {
  children?: ReactNode;
  className?: string;
};

const getClassNames = (className: string | undefined) => {
  if (className) return className;

  const defaultClassName =
    "text-black font-['Radio_Canada'] p-2 w-full text-black text-3xl rounded-xl flex flex-row items-center justify-start border-2 border-black shadow-sm";

  return defaultClassName;
};

export const Frame = ({ children, className }: PropTypes) => {
  if (!children) return null;

  const updatedClassName = getClassNames(className);

  return (
    <div className="relative w-full h-fit">
      <div className="absolute inset-0 rounded-xl border-2 border-black shadow-[1px_1px_0_0_rgba(0,0,0,1)]" />

      <div className={updatedClassName}>{children}</div>
    </div>
  );
};

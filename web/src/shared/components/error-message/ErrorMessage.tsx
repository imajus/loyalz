import { RedEllipseWithCheck } from '@/shared/icon';

export const ErrorMessage = () => {
  return (
    <div className="flex flex-col gap-3 items-center justify-center">
      <span className="text-black font-['Racing_Sans_One'] text-[40px]">Error</span>
      <RedEllipseWithCheck />
      <span className="text-[35px] text-black text-center flex flex-col">
        <span>Something went wrong.</span>
        <span>Try again, please.</span>
      </span>
    </div>
  );
};

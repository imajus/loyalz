type PropTypes = {
  title: string;
};

export const Header = ({ title }: PropTypes) => {
  return (
    <header className="flex flex-col shrink-0 items-center justify-center border-b-[1px] border-b-gray-400 w-full h-16">
      <h3 className="h-16 flex items-start pt-6 px-3 justify-center text-black text-2xl font-semibold text-center">
        {title}
      </h3>
    </header>
  );
};

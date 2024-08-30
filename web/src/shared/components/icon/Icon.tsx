import Image from 'next/image';

type PropTypes = {
  src: string;
};

export const Icon = ({ src }: PropTypes) => {
  return (
    <Image
      src={src}
      alt="avatar"
      width={0}
      height={0}
      sizes="100vw"
      className="rounded-[50%] w-[48px] h-[48px] shadow-2xl "
    />
  );
};

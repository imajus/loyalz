type PropTypes = {
  stroke?: string;
};

export const ArrowLeftRight = ({ stroke = 'white' }: PropTypes) => {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M8 2.99997L4 6.99997M4 6.99997L8 11M4 6.99997H20M16 21L20 17M20 17L16 13M20 17H4"
        stroke={stroke}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

type PropTypes = {
  stroke?: string;
};

export const Globe = ({ stroke = 'white' }: PropTypes) => {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M22 12C22 17.5228 17.5228 22 12 22M22 12C22 6.47712 17.5228 1.99997 12 1.99997M22 12H2M12 22C6.47715 22 2 17.5228 2 12M12 22C9.43223 19.3038 8 15.7232 8 12C8 8.27671 9.43223 4.69612 12 1.99997M12 22C14.5678 19.3038 16 15.7232 16 12C16 8.27671 14.5678 4.69612 12 1.99997M2 12C2 6.47712 6.47715 1.99997 12 1.99997"
        stroke={stroke}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

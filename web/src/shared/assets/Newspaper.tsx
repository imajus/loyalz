type PropTypes = {
  stroke?: string;
};

export const Newspaper = ({ stroke = 'white' }: PropTypes) => {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M4 22H20C20.5304 22 21.0391 21.7893 21.4142 21.4142C21.7893 21.0391 22 20.5304 22 20V3.99997C22 3.46954 21.7893 2.96083 21.4142 2.58576C21.0391 2.21068 20.5304 1.99997 20 1.99997H8C7.46957 1.99997 6.96086 2.21068 6.58579 2.58576C6.21071 2.96083 6 3.46954 6 3.99997V20C6 20.5304 5.78929 21.0391 5.41421 21.4142C5.03914 21.7893 4.53043 22 4 22ZM4 22C3.46957 22 2.96086 21.7893 2.58579 21.4142C2.21071 21.0391 2 20.5304 2 20V11C2 9.89997 2.9 8.99997 4 8.99997H6M18 14H10M15 18H10M10 5.99997H18V9.99997H10V5.99997Z"
        stroke={stroke}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

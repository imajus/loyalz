export const Spinner = () => {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <svg
        className="animate-spin h-24 w-24"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 48 48"
      >
        <defs>
          <linearGradient id="spinner-gradient" x1="0%" x2="100%" y1="0%" y2="0%">
            <stop offset="0%" stopColor="#ccc" />
            <stop offset="100%" stopColor="#000" />
          </linearGradient>
        </defs>

        <circle
          className="opacity-25"
          cx="24"
          cy="24"
          r="20"
          stroke="url(#spinner-gradient)"
          strokeWidth="4"
          fill="none"
        ></circle>
      </svg>
    </div>
  );
};

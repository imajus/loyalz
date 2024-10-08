type PropTypes = {
  fill: string;
  height?: number;
};

export const Ellipse = ({ fill, height = 164 }: PropTypes) => {
  const magnification = height / 164;

  const newWidth1 = magnification * 164;
  const newHeight1 = magnification * 164;

  return (
    <div className="relative" style={{ width: newWidth1, height: newHeight1 }}>
      <svg
        width={magnification * 164}
        height={magnification * 164}
        viewBox="0 0 164 164"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g filter="url(#filter0_d_113_354)">
          <circle cx="80" cy="80" r="80" fill={fill} />
          <circle cx="80" cy="80" r="78.5" stroke="black" strokeWidth="3" />
        </g>
        <defs>
          <filter
            id="filter0_d_113_354"
            x="0"
            y="0"
            width="164"
            height="164"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset dx="4" dy="4" />
            <feComposite in2="hardAlpha" operator="out" />
            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0" />
            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_113_354" />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="effect1_dropShadow_113_354"
              result="shape"
            />
          </filter>
        </defs>
      </svg>
      <div className="absolute top-0 left-0 flex items-center justify-center w-full h-full">
        <svg
          width={magnification * 132}
          height={magnification * 96}
          viewBox="0 0 132 132"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <filter
              id="filter0_d_113_355"
              x="0"
              y="0"
              width="141"
              height="145"
              filterUnits="userSpaceOnUse"
              colorInterpolationFilters="sRGB"
            >
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feColorMatrix
                in="SourceAlpha"
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                result="hardAlpha"
              />
              <feOffset dx="5" dy="9" />
              <feGaussianBlur stdDeviation="2" />
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
              <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_113_355" />
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="effect1_dropShadow_113_355"
                result="shape"
              />
            </filter>
          </defs>
        </svg>
      </div>
    </div>
  );
};

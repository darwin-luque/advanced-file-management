import type { FC, SVGProps } from "react";

export const NoDocIcon: FC<SVGProps<SVGSVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={165}
    height={165}
    fill="none"
    {...props}
  >
    <g clipPath="url(#a)">
      <path
        fill="#C6C6C6"
        d="M148.459 30.213H19.748a6.553 6.553 0 0 0-6.549 6.548v118.094a6.554 6.554 0 0 0 6.549 6.549h128.711a6.552 6.552 0 0 0 6.55-6.549V36.762a6.553 6.553 0 0 0-6.55-6.55Z"
      />
      <path
        fill="#F9F9F9"
        d="M139.986 120.367H28.222a6.549 6.549 0 0 1-6.548-6.548V9.476a6.549 6.549 0 0 1 6.548-6.548h111.764a6.549 6.549 0 0 1 6.549 6.548V113.82a6.549 6.549 0 0 1-6.549 6.548Z"
      />
      <path
        fill="url(#b)"
        d="M23.747 115.891V11.55A6.549 6.549 0 0 1 30.296 5H142.06c1.277 0 2.464.371 3.471 1.004a6.535 6.535 0 0 0-5.545-3.077H28.222a6.549 6.549 0 0 0-6.548 6.548V113.82c0 2.34 1.23 4.387 3.077 5.545a6.506 6.506 0 0 1-1.004-3.472v-.001Z"
      />
      <path
        fill="#fff"
        d="M126.235 24.974h-84.26v4.802h84.26v-4.802Zm0 18.335h-84.26v4.802h84.26v-4.802Zm0 18.34h-84.26v4.801h84.26v-4.802Zm0 18.335h-84.26v4.802h84.26v-4.802Z"
      />
      <path fill="url(#c)" d="M52.016 64.484 73.189 85.66H52.016V64.484Z" />
      <path
        fill="#C6C6C6"
        d="M155.009 87.405V38.687l-8.474-8.474v57.191h8.474v.001Z"
      />
      <path
        fill="url(#d)"
        d="m164.934 91.812-9.129 64.628a6.55 6.55 0 0 1-6.485 5.633H18.888a6.549 6.549 0 0 1-6.485-5.633L.066 69.111c-.557-3.942 2.502-7.465 6.484-7.465h40.28a6.548 6.548 0 0 1 6.485 5.632l1.616 11.436a6.548 6.548 0 0 0 6.485 5.633h97.035c3.981 0 7.041 3.522 6.484 7.465h-.001Z"
      />
      <path
        fill="#D5D5D5"
        d="M132.587 133.246H35.623a2.183 2.183 0 0 1-2.166-1.909l-1.214-9.606a2.183 2.183 0 0 1 2.166-2.456H133.8a2.199 2.199 0 0 1 2.086 1.541c.091.296.118.608.08.915l-1.213 9.606a2.182 2.182 0 0 1-2.166 1.909Z"
      />
    </g>
    <defs>
      <linearGradient
        id="b"
        x1={87.944}
        x2={5.127}
        y1={65.48}
        y2={-17.338}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#fff" />
      </linearGradient>
      <linearGradient
        id="c"
        x1={66.005}
        x2={40.411}
        y1={89.056}
        y2={63.463}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#C2CECE" stopOpacity={0} />
        <stop offset={0.179} stopColor="#AFBCBC" stopOpacity={0.179} />
        <stop offset={1} stopColor="#5B6A6A" />
      </linearGradient>
      <linearGradient
        id="d"
        x1={82.5}
        x2={82.5}
        y1={61.646}
        y2={162.073}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#EEF0F4" />
        <stop offset={0.927} stopColor="#E4E4E4" />
      </linearGradient>
      <clipPath id="a">
        <path fill="#fff" d="M0 0h165v165H0z" />
      </clipPath>
    </defs>
  </svg>
);

import { useId } from "react";
/** Original vector architecture, not a logo. No renderer, texture downloads or idle loop. */
export default function PentagonArt({ className = "" }: { className?: string }) {
  const id = useId().replaceAll(":", "");
  const path = "M300 64 L531 232 L443 504 L157 504 L69 232 Z";
  return (
    <svg
      className={`pentagon-art ${className}`}
      viewBox="0 0 600 580"
      fill="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient
          id={`${id}-edge`}
          x1="100"
          y1="80"
          x2="490"
          y2="510"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#e5efff" />
          <stop offset=".3" stopColor="#6da6f3" />
          <stop offset=".58" stopColor="#f5f9ff" />
          <stop offset="1" stopColor="#4385df" />
        </linearGradient>
        <linearGradient
          id={`${id}-blue`}
          x1="150"
          y1="100"
          x2="480"
          y2="510"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#c9e0ff" />
          <stop offset=".43" stopColor="#367fea" />
          <stop offset="1" stopColor="#0f4fc1" />
        </linearGradient>
        <linearGradient
          id={`${id}-glass`}
          x1="160"
          y1="50"
          x2="450"
          y2="500"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#ffffff" stopOpacity=".9" />
          <stop offset="1" stopColor="#82b5ff" stopOpacity=".08" />
        </linearGradient>
      </defs>
      <g strokeLinejoin="round">
        <path
          d={path}
          transform="translate(3 14)"
          stroke="#134b95"
          strokeOpacity=".18"
          strokeWidth="30"
        />
        <path d={path} stroke={`url(#${id}-edge)`} strokeWidth="28" />
        <path
          d={path}
          stroke="#ffffff"
          strokeOpacity=".8"
          strokeWidth="1.5"
          transform="translate(-2 -8)"
        />
        <g transform="translate(300 288) scale(.77) rotate(8) translate(-300 -288)">
          <path d={path} transform="translate(2 12)" stroke="#0e4cba" strokeWidth="32" />
          <path d={path} stroke={`url(#${id}-blue)`} strokeWidth="32" />
          <path d={path} stroke="#c3dfff" strokeWidth="1.5" transform="translate(-2 -9)" />
        </g>
        <g transform="translate(300 288) scale(.52) rotate(-5) translate(-300 -288)">
          <path d={path} fill={`url(#${id}-glass)`} stroke={`url(#${id}-edge)`} strokeWidth="8" />
        </g>
      </g>
      <g stroke="#6d9ddd" strokeOpacity=".36" strokeWidth="1.2">
        <path d="M40 307 H177 M428 307 H568 M303 20 V136 M303 437 V565" />
        <circle cx="303" cy="307" r="36" />
        <circle cx="303" cy="307" r="5" fill="#276ed0" stroke="none" />
      </g>
    </svg>
  );
}

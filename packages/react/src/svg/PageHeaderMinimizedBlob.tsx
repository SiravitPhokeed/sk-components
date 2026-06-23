import cn from "@/lib/helpers/cn";
import type { StyleableFC } from "@/lib/types";

const PageHeaderMinimizedBlobs: StyleableFC = ({ className, style }) =>
  // prettier-ignore
  <svg width={112} height={112} viewBox="0 0 112 112" xmlns="http://www.w3.org/2000/svg" role="presentation"
    className={cn("skc-page-header__minimized-blobs", className)} style={style}>
    <g filter="url(#filter-page-header-minimized-blobs)">
      <path d="M76.9785 64.2896C78.9464 56.4186 86.034 49.6306 68.5 48.5C50.966 47.3694 34.6061 66.605 44 77.9992C53.3938 89.3934 75.0105 72.1607 76.9785 64.2896Z"
        className="skc-page-header__blob--primary" />
      <path d="M68.5 48C68.5 54.7392 47.952 72 41.1773 72C34.4026 72 30.5 60.7392 30.5 54C30.5 47.2608 37.7253 38.5 44.5 38.5C51.2747 38.5 68.5 41.2608 68.5 48Z"
        className="skc-page-header__blob--secondary" />
    </g>
    <defs>
      <filter id="filter-page-header-minimized-blobs" x={2} y={2} width={101.38} height={100.925} filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
        <feFlood floodOpacity={0} result="BackgroundImageFix" />
        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
        <feGaussianBlur stdDeviation={12} result="effect-page-header-minimized-blur" />
      </filter>
    </defs>
  </svg>;

// <svg width={94} height={94} viewBox="0 0 94 94" fill="none" className={cn("skc-page-header__minimized-blob", className)} style={style}
//   xmlns="http://www.w3.org/2000/svg">
//   <path d="M70 50.6795C70 57.4187 45.952 70 39.1773 70C32.4026 70 24 56.1342 24 49.395C24 42.6558 46.8697 24 53.6444 24C60.4191 24 70 43.9402 70 50.6795Z"
//     filter="url(#filter-page-header-minimized-blob)"
//     className="skc-page-header__blob--primary" />
//   <defs>
//     <filter id="filter-page-header-minimized-blob" x={0} y={0} width={94} height={94} filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
//       <feFlood floodOpacity={0} result="BackgroundImageFix"/>
//       <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
//       <feGaussianBlur stdDeviation={12} result="effect-page-header-minimized-blur"/>
//     </filter>
//   </defs>
// </svg>;

export default PageHeaderMinimizedBlobs;

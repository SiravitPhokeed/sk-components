import cn from "@/lib/helpers/cn";
import type { StyleableFC } from "@/lib/types";

/**
 * @private
 */
export const PageHeaderBlobs: StyleableFC = ({ className, style }) =>
  // prettier-ignore
  <svg viewBox="0 0 1194 275" fill="none" xmlns="http://www.w3.org/2000/svg" role="presentation" className={cn("skc-page-header__blobs", className)} style={style}>
    <g filter="url(#page-header-blobs-filter)">
      <path
        d="M1154 -78.1078C1154 -23.8 882.153 77.5861 805.57 77.5861C728.986 77.5861 634 -34.1508 634 -88.4587C634 -142.767 892.528 -293.104 969.111 -293.104C1045.69 -293.104 1154 -132.416 1154 -78.1078Z"
        className="skc-page-header__blob--secondary" />
      <path
        d="M1214.86 103.995C1252.71 71.3692 1328.47 23.9341 1230.34 -30.6058C1132.21 -85.1457 929.639 -40.3223 946.019 41.1639C962.399 122.65 1177.02 136.621 1214.86 103.995Z"
        className="skc-page-header__blob--primary" />
      <path
        d="M646 -16.1631C646 37.1687 304.5 56.8966 242.634 56.8966C180.768 56.8966 123 -36.1027 123 -89.4346C123 -142.766 236.04 -150 297.907 -150C359.773 -150 646 -69.495 646 -16.1631Z"
        className="skc-page-header__blob--primary" />
      <path
        d="M336.5 -66.164C336.5 -11.8877 113.011 89.4395 50.0502 89.4395C-12.9103 89.4395 -91 -22.2325 -91 -76.5088C-91 -130.785 121.54 -281.035 184.5 -281.035C247.46 -281.035 336.5 -120.44 336.5 -66.164Z"
        className="skc-page-header__blob--secondary" />
    </g>
    <mask id="page-header-blobs-mask" style={{ maskType: "luminance" }} maskUnits="userSpaceOnUse" x={0} y={-168} width={1194}
      height={224}>
      <rect y={-168} width={1194} height={224} fill="url(#page-header-blobs-fade-gradient)" />
    </mask>
    <g mask="url(#page-header-blobs-mask)">
      <rect y={-168} width={1194} height={224} className="skc-page-header__fade" />
    </g>
    <defs>
      <filter id="page-header-blobs-filter" x={-191} y={-393.104} width={1569.6} height={768.104} filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB">
        <feFlood floodOpacity={0} result="BackgroundImageFix" />
        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
        <feGaussianBlur stdDeviation={50} result="effect1_foregroundBlur_401_699" />
      </filter>
      <linearGradient id="page-header-blobs-fade-gradient" x1={597} y1={0} x2={597} y2={56} gradientUnits="userSpaceOnUse">
        <stop stopColor="white" />
        <stop offset={1} />
      </linearGradient>
    </defs>
  </svg>;

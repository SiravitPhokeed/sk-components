import type { StyleableFC } from "@/lib/types";

/**
 * @private
 */
export const PageHeaderBlobs: StyleableFC = ({ className, style }) =>
  // prettier-ignore
  <svg viewBox="0 0 1194 780" fill="none" xmlns="http://www.w3.org/2000/svg"
    className={className} style={style}>
      <g filter="url(#filter-page-header-blobs)"
        className="skc-page-header__blobs-group skc-page-header__blobs-group--desktop">
        <path d="M1154 -43.0043C1154 11.3035 882.153 112.69 805.57 112.69C728.986 112.69 634 0.952677 634 -53.3552C634 -107.663 892.528 -258 969.111 -258C1045.69 -258 1154 -97.3121 1154 -43.0043Z"
          className="skc-page-header__blob--secondary" />
        <path d="M1214.86 139.098C1252.71 106.473 1328.47 59.0376 1230.34 4.49772C1132.21 -50.0422 929.639 -5.21874 946.019 76.2674C962.399 157.754 1177.02 171.724 1214.86 139.098Z"
          className="skc-page-header__blob--primary" />
        <path d="M646 18.9404C646 72.2722 304.5 92.0001 242.634 92.0001C180.768 92.0001 123 -0.999225 123 -54.3311C123 -107.663 236.04 -114.896 297.907 -114.896C359.773 -114.896 646 -34.3915 646 18.9404Z"
          className="skc-page-header__blob--primary" />
        <path d="M336.5 -31.0605C336.5 23.2158 113.011 124.543 50.0502 124.543C-12.9103 124.543 -91 12.871 -91 -41.4053C-91 -95.6815 121.54 -245.931 184.5 -245.931C247.46 -245.931 336.5 -85.3367 336.5 -31.0605Z"
          className="skc-page-header__blob--secondary" />
      </g>
      <g filter="url(#filter-page-header-blobs)"
        className="skc-page-header__blobs-group skc-page-header__blobs-group--mobile">
        <path d="M279.044 219.226C279.044 292.99 17.4134 430.698 -56.292 430.698C-129.997 430.698 -221.414 278.931 -221.414 205.167C-221.414 131.403 27.3979 -72.793 101.103 -72.793C174.809 -72.793 279.044 145.462 279.044 219.226Z"
          className="skc-page-header__blob--secondary" />
        <path d="M1192 12.976C1192 86.7399 930.369 224.448 856.664 224.448C782.959 224.448 691.542 72.6808 691.542 -1.08308C691.542 -74.847 940.354 -279.043 1014.06 -279.043C1087.76 -279.043 1192 -60.7879 1192 12.976Z"
          className="skc-page-header__blob--secondary" />
        <path d="M1237.5 245.599C1283.14 199.961 1374.5 133.602 1256.2 57.3415C1137.89 -18.9192 893.642 43.8118 913.372 157.776C933.103 271.741 1191.87 291.238 1237.5 245.599Z"
          className="skc-page-header__blob--primary" />
        <path d="M667.277 85.4109C667.277 158.122 322.672 185.018 260.243 185.018C197.815 185.018 139.521 58.2259 139.521 -14.4851C139.521 -87.1961 253.59 -97.0581 316.018 -97.0581C378.447 -97.0581 667.277 12.6999 667.277 85.4109Z"
          className="skc-page-header__blob--primary" />
      </g>
    <defs>
      <filter id="filter-page-header-blobs" x={-253} y={-100} width={1700} height={780} filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
        <feFlood floodOpacity={0} result="BackgroundImageFix"/>
        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
        <feGaussianBlur stdDeviation={80} result="effect-page-header-blur" className="skc-page-header__blur" />
      </filter>
    </defs>
  </svg>;

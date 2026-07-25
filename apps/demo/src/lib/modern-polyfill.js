// This file intentionally empty.
//
// It replaces Next.js's built-in polyfill-module.js, which unconditionally
// ships ES2019+ polyfills (Array.prototype.at, Object.hasOwn, etc.) to all
// browsers regardless of browserslist. Every browser in our support tiers
// already has these APIs natively, so the polyfills are dead weight (~14 KiB).
//
// Remove this alias when Next.js supports browserslist-aware polyfills.

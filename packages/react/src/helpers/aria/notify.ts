/** ID of the central announcer element rendered by Root Layout. */
const DEFAULT_ANNOUNCER_ID = "skc-aria-announcer";

/**
 * Announce a message to assistive technology via a live region
 *
 * @param message The message to announce.
 * @param options Options for the announcement.
 * @param options.root The element to write the message into. Defaults to the central announcer rendered by Root Layout. Pass a local ref to announce inside an open Dialog.
 */
export default function ariaNotify(
  message: string,
  options?: { root?: HTMLElement | null },
) {
  // We do not forward to the native `document.ariaNotify()` API (Chrome 141+,
  // Firefox 150+) for three reasons:
  //  1. **Chrome macOS is broken.** The method is exposed but notifications
  //   are not reliably spoken — and we cannot feature-detect a platform bug
  //   inside a working method.
  // 2. **Permissions-Policy can disable it.** The `aria-notify` HTTP header
  //   silently swallows announcements with no error. Our live-region
  //   approach is immune to that header.
  // 3. **Multiple announcements collapse.** The spec says only the most recent
  //   is guaranteed to be spoken. Our clear-then-set rAF forces each
  //   announcement as a fresh DOM mutation, which screen readers always
  //   pick up.

  const el = options?.root ?? document.getElementById(DEFAULT_ANNOUNCER_ID);
  if (!el) return;
  el.textContent = "";
  requestAnimationFrame(() => {
    el.textContent = message;
  });
}

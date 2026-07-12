declare namespace NodeJS {
  interface ProcessEnv {
    /**
     * Forces the optimized icon font to be used even in development. When set
     * to `"true"`, `iconFont.variable` is always applied regardless of
     * `NODE_ENV`.
     */
    ALWAYS_USE_OPTIMIZED_ICON_FONT?: string;
  }
}

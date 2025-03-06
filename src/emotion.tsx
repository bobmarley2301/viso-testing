import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import { ReactNode } from "react";

const cache = createCache({
  key: "css",
  prepend: true,
});

export function EmotionProvider({ children }: { children: ReactNode }) {
  return <CacheProvider value={cache}>{children}</CacheProvider>;
}

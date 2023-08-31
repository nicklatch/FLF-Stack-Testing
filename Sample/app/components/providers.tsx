import { Provider } from 'jotai';
import type { PropsWithChildren } from 'react';

export default function Providers({ children }: PropsWithChildren) {
  return <Provider>{children}</Provider>;
}

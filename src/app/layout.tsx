import type { PropsWithChildren } from 'react';
import type { Metadata } from 'next';
import { getLocale } from 'next-intl/server';

import { Root } from '@/components/Root/Root';

import '@telegram-apps/telegram-ui/dist/styles.css';
import 'normalize.css/normalize.css';
import './_assets/globals.css';

export const metadata: Metadata = {
  title: 'Bilheteira Alvinegra',
  description: 'A bilheteira para a Armada Alvinegra arranjar bilhetes para os jogos do nosso grande Nacional',
};

export default async function RootLayout({ children }: PropsWithChildren) {


  return (
    <html suppressHydrationWarning>
      <body suppressHydrationWarning>
        <Root>{children}</Root>
      </body>
    </html>
  );
}

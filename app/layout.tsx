import type { Metadata } from 'next';

import './globals.css';

export const metadata: Metadata = {
  title: 'Next.js Boilerplate',
  description: 'Next.js boilerplate with TypeScript, linters, formatters, and engineering standards',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): React.JSX.Element {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

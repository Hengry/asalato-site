import './globals.css';
import type { Metadata } from 'next';
import { Roboto_Mono } from 'next/font/google';

const mono = Roboto_Mono({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Asalato Resolver',
  description: 'Resolve rhythm to asalato techniques',
  generator: 'Next.js',
  manifest: '/manifest.json',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <head>
        <link rel='icon' href='/favicon.ico' sizes='any' />
        <link
          rel='icon'
          href='/icon?<generated>'
          type='image/<generated>'
          sizes='<generated>'
        />
        <link
          rel='apple-touch-icon'
          href='/apple-icon?<generated>'
          type='image/<generated>'
          sizes='<generated>'
        />
      </head>
      <body className={mono.className}>{children}</body>
    </html>
  );
}

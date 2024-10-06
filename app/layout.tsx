export const metadata = {
  title: 'Next.js App',
  description: 'Localized Next.js App',
};

export default function RootLayout({ children, params }: { children: React.ReactNode, params: { locale: string } }) {
  return (
    <html lang={params.locale || 'en'}>  {/* Default to 'en' if locale is missing */}
      <body>{children}</body>
    </html>
  );
}

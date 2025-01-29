import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from '@/components/Footer';
import NavBar from '@/components/Navbar';
import SideBar from '@/components/Sidebar';
import Providers from './providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Project',
  description: 'Project by @TeamUSA2025',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const classString = `${inter.className} wrapper`;
  return (
    <html lang="en">
      <body className={classString}>
        <Providers>
          <NavBar />
          <div style={{ display: 'flex' }}>
            <SideBar />
            <main style={{ flex: 1 }}>{children}</main>
          </div>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}

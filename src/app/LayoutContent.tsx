'use client';

import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import NavBar from '@/components/Navbar';
import Sidebar from '@/components/Siderbar';
import Footer from '@/components/Footer';

export default function LayoutContent({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session } = useSession();
  const [mounted, setMounted] = useState(false);

  // Ensure this component is only rendered on the client side
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null; // avoid hydration issues

  // If the user is logged in, the sidebar is visible,
  // so add left margin ("ml-64") to the main content.
  const containerClass = session ? 'ml-64 flex flex-1 flex-col' : 'flex flex-1 flex-col';
  const footerClass = session ? 'ml-64 mt-auto' : 'mt-auto';

  return (
    <>
      <div className="flex">
        {session && <Sidebar />}
        <div className={containerClass}>
          <NavBar />
          <main className="flex-1 p-4 pt-14">{children}</main>
        </div>
      </div>
      <div className={footerClass}>
        <Footer />
      </div>
    </>
  );
}

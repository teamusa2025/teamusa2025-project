'use client';

import AnalystSidebar from '@/components/AnalystSidebar';
import { ReactNode } from 'react';

interface AnalystProps {
  children: ReactNode;
}

/** The Analyst page. */
// eslint-disable-next-line react/prop-types
const Analyst: React.FC<AnalystProps> = ({ children }) => (
  <div>
    <AnalystSidebar />
    <main>{children}</main>
  </div>
);

export default Analyst;

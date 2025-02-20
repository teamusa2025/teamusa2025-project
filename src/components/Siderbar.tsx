'use client';

import * as React from 'react';

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

interface NavigationItem {
  title: string;
  symbol: string;
  href: string;
  isActive?: boolean;
  badge?: string;
}

const navigation: NavigationItem[] = [
  { title: 'Dashboard', symbol: '◈', href: '#', isActive: true },
  { title: 'Projects', symbol: '□', href: '#' },
  { title: 'Tasks', symbol: '○', href: '#' },
  { title: 'Messages', symbol: '◇', href: '#', badge: '5' },
  { title: 'Documents', symbol: '△', href: '#' },
  { title: 'Team', symbol: '⬡', href: '#' },
  { title: 'Reports', symbol: '▣', href: '#' },
  { title: 'Settings', symbol: '⚙', href: '#' },
];

const Sidebar = ({ className = '', ...props }: SidebarProps) => (
  <aside
    id="sidebar"
    role="navigation"
    aria-label="Main navigation"
    className={`fixed left-0 top-0 h-screen w-64 flex-col border-r bg-stone-900 ${className}`}
    {...props}
  >
    {/* Header */}
    <div className="flex h-14 items-center border-b px-4">
      <img
        className="h-7 rounded-full"
        src="https://cdn.prod.website-files.com/5fdaca5a4d51110c2f760a05/651ee756e790fe1817276c02_SpireLogo-2z-p-500.png"
        alt="sidebar logo"
      />{' '}
      </div>

    {/* Navigation */}
    <nav className="flex-1 space-y-1 p-2">
      {navigation.map((item) => (
        <a
          key={item.title}
          href={item.href}
          aria-current={item.isActive ? 'page' : undefined}
          className={`hover:bg-accent hover:text-accent-foreground focus-visible:ring-ring group flex items-center rounded-md px-3 py-2 text-sm font-medium focus-visible:outline-none focus-visible:ring-2 ${
            item.isActive ? 'bg-accent text-accent-foreground' : ''
          }`}
        >
          <span className="mr-3 text-lg" aria-hidden="true">
            {item.symbol}
          </span>
          <span className="transition-all duration-300">{item.title}</span>
          {item.badge && (
            <span className="bg-primary text-primary-foreground ml-auto flex size-5 items-center justify-center rounded-full text-xs font-medium">
              {item.badge}
            </span>
          )}
        </a>
      ))}
    </nav>
  </aside>
);

export default Sidebar;

'use client';

import React from 'react';

type SidebarProps = {
  items: { label: string; link: string }[]; // Array of sidebar items with a label and link
};

const Sidebar: React.FC<SidebarProps> = ({ items }) => {
  return (
    <div style={styles.sidebar}>
      <ul style={styles.list}>
        {items.map((item, index) => (
          <li key={index} style={styles.listItem}>
            <a href={item.link} style={styles.link}>
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

const styles = {
  sidebar: {
    width: '250px',
    height: '100vh',
    backgroundColor: '#f4f4f4',
    boxShadow: '2px 0 5px rgba(0, 0, 0, 0.1)',
    padding: '10px',
  },
  list: {
    listStyleType: 'none',
    padding: '0',
    margin: '15px',
  },
  listItem: {
    marginBottom: '30px',
  },
  link: {
    textDecoration: 'none',
    color: '#333',
    fontSize: '16px',
  },
};

// Generate items array
const items = Array.from({ length: 5 }, (_, index) => ({
  label: `Stress Test #${index + 1}`,
  link: `#stress-test-${index + 1}`,
}));

export default function App() {
  return <Sidebar items={items} />;
}

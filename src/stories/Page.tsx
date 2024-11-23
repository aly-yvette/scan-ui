import React, { useEffect, useState } from 'react';

import { Header } from './Header';
import './page.css';
import BarcodeWidget from '../components/BarcodeWidget/BarcodeWidget';
import NumberWithProgress from '../components/NumberWithProgress/NumberWithProgress';

type User = {
  name: string;
};

export const Page: React.FC = () => {
  const [user, setUser] = React.useState<User>();
  const [progress, setProgress] = useState(50);

  // Show some random movement
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(Math.round(Math.random() * 100));
      // setWeight(Math.round(Math.random() * 100));
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  return (
    <article>
      <div style={{ gap: '10px', display: 'flex', flexDirection: 'column', margin: '20px' }}>
        <NumberWithProgress number='38g' progress={progress} />
        <BarcodeWidget code='13052231' type='UPC_EAN' />
        <BarcodeWidget code='9412134' type='UPC' />
      </div>

    </article>
  );
};
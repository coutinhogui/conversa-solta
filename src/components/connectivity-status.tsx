'use client';

import { useState, useEffect } from 'react';
import { Wifi, WifiOff } from 'lucide-react';
import { Badge } from './ui/badge';
import { siteConfig } from '@/lib/site';

export default function ConnectivityStatus() {
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    if (typeof window !== 'undefined') {
        setIsOnline(navigator.onLine);
        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOffline);
    }
    

    return () => {
        if (typeof window !== 'undefined') {
            window.removeEventListener('online', handleOnline);
            window.removeEventListener('offline', handleOffline);
        }
    };
  }, []);

  return (
    <Badge variant={isOnline ? 'secondary' : 'destructive'} className="flex items-center gap-2">
      {isOnline ? (
        <Wifi className="h-4 w-4" />
      ) : (
        <WifiOff className="h-4 w-4" />
      )}
      <span>{isOnline ? siteConfig.status.online : siteConfig.status.offline}</span>
    </Badge>
  );
}

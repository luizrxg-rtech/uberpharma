"use client"

import {useEffect} from 'react';
import {usePathname} from 'next/navigation';
import {useLoading} from '@/contexts/loading-context';

export function RouteChangeHandler() {
  const pathname = usePathname();
  const { setLoading } = useLoading();

  useEffect(() => {
    setLoading(false);
  }, [pathname, setLoading]);

  return null;
}

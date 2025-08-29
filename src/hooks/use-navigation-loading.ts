"use client"

import { useRouter } from 'next/navigation';
import { useLoading, LoadingType } from '@/contexts/loading-context';
import { useCallback } from 'react';

export function useNavigationLoading() {
  const router = useRouter();
  const { setLoading } = useLoading();

  const navigateWithLoading = useCallback((path: string) => {
    let loadingType: LoadingType = 'default';

    if (path.startsWith('/search/')) {
      loadingType = 'search';
    } else if (path.startsWith('/product/')) {
      loadingType = 'product';
    }

    setLoading(true, loadingType);

    router.push(path);

  }, [router, setLoading]);

  return { navigateWithLoading };
}

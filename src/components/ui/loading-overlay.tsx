"use client"

import { useLoading } from '@/contexts/loading-context';
import { LoadingSkeleton } from './loading-skeleton';

export function LoadingOverlay() {
  const { isLoading, loadingType } = useLoading();

  if (!isLoading) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-white dark:bg-gray-900 z-50 overflow-auto">
      <LoadingSkeleton type={loadingType} />
    </div>
  );
}

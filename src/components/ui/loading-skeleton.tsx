"use client"

import { LoadingType } from '@/contexts/loading-context';

interface SkeletonProps {
  className?: string;
}

function SkeletonBox({ className = "" }: SkeletonProps) {
  return (
    <div className={`bg-gray-200 dark:bg-gray-700 animate-pulse rounded ${className}`} />
  );
}

function SearchSkeleton() {
  return (
    <div className="p-6 space-y-6">
      <div className="space-y-4">
        <SkeletonBox className="h-8 w-64" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[...Array(12)].map((_, i) => (
            <div key={i} className="space-y-3">
              <SkeletonBox className="h-48 w-full" />
              <SkeletonBox className="h-4 w-3/4" />
              <SkeletonBox className="h-4 w-1/2" />
              <SkeletonBox className="h-6 w-20" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ProductSkeleton() {
  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-4">
          <SkeletonBox className="h-96 w-full" />
          <div className="flex gap-2">
            {[...Array(4)].map((_, i) => (
              <SkeletonBox key={i} className="h-16 w-16" />
            ))}
          </div>
        </div>
        <div className="space-y-4">
          <SkeletonBox className="h-8 w-3/4" />
          <SkeletonBox className="h-6 w-1/2" />
          <SkeletonBox className="h-12 w-24" />
          <div className="space-y-2">
            <SkeletonBox className="h-4 w-full" />
            <SkeletonBox className="h-4 w-full" />
            <SkeletonBox className="h-4 w-3/4" />
          </div>
          <div className="space-y-3 pt-6">
            <SkeletonBox className="h-12 w-full" />
            <SkeletonBox className="h-12 w-full" />
          </div>
        </div>
      </div>
    </div>
  );
}

function DefaultSkeleton() {
  return (
    <div className="p-6 space-y-6">
      <SkeletonBox className="h-12 w-64" />
      <div className="space-y-4">
        {[...Array(6)].map((_, i) => (
          <SkeletonBox key={i} className="h-16 w-full" />
        ))}
      </div>
    </div>
  );
}

interface LoadingSkeletonProps {
  type: LoadingType;
}

export function LoadingSkeleton({ type }: LoadingSkeletonProps) {
  switch (type) {
    case 'search':
      return <SearchSkeleton />;
    case 'product':
      return <ProductSkeleton />;
    default:
      return <DefaultSkeleton />;
  }
}

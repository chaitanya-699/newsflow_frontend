interface SkeletonCardProps {
  className?: string;
}

export default function SkeletonCard({ className = '' }: SkeletonCardProps) {
  return (
    <div className={`rounded-lg overflow-hidden ${className}`} style={{ backgroundColor: 'var(--card-bg)' }}>
      <div className="w-full h-48 bg-muted shimmer" />
      <div className="p-4 space-y-3">
        <div className="h-4 bg-muted shimmer rounded w-3/4" />
        <div className="h-3 bg-muted shimmer rounded w-full" />
        <div className="h-3 bg-muted shimmer rounded w-2/3" />
        <div className="flex justify-between items-center mt-4">
          <div className="h-3 bg-muted shimmer rounded w-1/4" />
          <div className="h-6 w-6 bg-muted shimmer rounded" />
        </div>
      </div>
    </div>
  );
}
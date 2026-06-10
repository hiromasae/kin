import { cn } from '@/lib/utils';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'cadence' | 'overdue';
  className?: string;
}

export function Badge({ children, variant = 'cadence', className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center text-xs font-medium rounded-full px-2.5 py-0.5',
        variant === 'cadence' && 'bg-stone-100 text-stone-700',
        variant === 'overdue' && 'bg-accent-light text-accent',
        className,
      )}
    >
      {children}
    </span>
  );
}

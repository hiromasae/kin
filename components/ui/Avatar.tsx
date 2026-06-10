import Image from 'next/image';
import { cn } from '@/lib/utils';

const COLORS = [
  { bg: '#e8e2d9', text: '#63544a' },
  { bg: '#ddd4c4', text: '#4a3e37' },
  { bg: '#f5e8df', text: '#a84f22' },
  { bg: '#ede7db', text: '#7d6c5e' },
  { bg: '#d6ccbf', text: '#332b26' },
];

function getColor(name: string) {
  const hash = name.split('').reduce((acc, ch) => acc + ch.charCodeAt(0), 0);
  return COLORS[hash % COLORS.length];
}

function getInitials(name: string) {
  const parts = name.trim().split(' ');
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

interface AvatarProps {
  name: string;
  avatarUrl?: string | null;
  size?: 'sm' | 'md';
  className?: string;
}

const SIZE = { sm: 32, md: 40 } as const;
const TEXT = { sm: '11px', md: '13px' } as const;

export function Avatar({ name, avatarUrl, size = 'sm', className }: AvatarProps) {
  const px = SIZE[size];
  const { bg, text } = getColor(name);

  if (avatarUrl) {
    return (
      <Image
        src={avatarUrl}
        alt={name}
        width={px}
        height={px}
        className={cn('rounded-full object-cover shrink-0', className)}
        style={{ width: px, height: px }}
      />
    );
  }

  return (
    <span
      className={cn('rounded-full shrink-0 flex items-center justify-center font-medium select-none', className)}
      style={{ width: px, height: px, backgroundColor: bg, color: text, fontSize: TEXT[size] }}
      aria-label={name}
    >
      {getInitials(name)}
    </span>
  );
}

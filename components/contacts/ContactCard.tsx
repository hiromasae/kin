import { cn, daysSince, formatCadence, formatDaysSince, isOverdue } from '@/lib/utils';
import { Badge } from '@/components/ui/Badge';
import { Avatar } from '@/components/ui/Avatar';
import type { ContactWithLastInteraction } from '@/types';

interface ContactCardProps {
  contact: ContactWithLastInteraction;
  variant?: 'list' | 'grid';
}

export function ContactCard({ contact, variant = 'list' }: ContactCardProps) {
  const lastDate = contact.lastInteraction?.interacted_at ?? null;
  const overdue = isOverdue(contact.cadence, lastDate);
  const days = lastDate ? daysSince(lastDate) : null;

  if (variant === 'grid') {
    return (
      <div
        className={cn(
          'border border-surface-border rounded-2xl p-4 shadow-sm transition-shadow duration-150',
          'hover:shadow-md cursor-pointer flex flex-col gap-3',
          overdue ? 'bg-accent-light/40' : 'bg-surface-raised',
        )}
      >
        <div className="flex items-start justify-between gap-2">
          <Avatar name={contact.name} avatarUrl={contact.avatar_url} size="md" />
          <div className="flex items-center gap-1.5 flex-wrap justify-end">
            <Badge variant="cadence">{formatCadence(contact.cadence)}</Badge>
            {overdue && <Badge variant="overdue">Overdue</Badge>}
          </div>
        </div>

        <div>
          <h2 className="text-base font-medium font-serif text-ink leading-snug">{contact.name}</h2>
          <p className="text-sm text-ink-muted mt-0.5">
            {contact.role}
            {contact.company && <span className="text-ink-faint"> · {contact.company}</span>}
          </p>
        </div>

        <div className="flex items-center justify-between border-t border-surface-border pt-3">
          <span className={cn('text-xs', overdue ? 'text-accent font-medium' : 'text-ink-faint')}>
            {days !== null ? formatDaysSince(days) : 'Never contacted'}
          </span>
          {contact.lastInteraction?.note && (
            <span className="text-xs text-ink-faint line-clamp-1 max-w-[60%] text-right">
              {contact.lastInteraction.note}
            </span>
          )}
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        'border border-surface-border rounded-2xl p-5 shadow-sm transition-shadow duration-150',
        'hover:shadow-md cursor-pointer',
        overdue ? 'bg-accent-light/40' : 'bg-surface-raised',
      )}
    >
      <div className="flex items-start gap-3">
        <Avatar name={contact.name} avatarUrl={contact.avatar_url} size="sm" className="mt-0.5" />

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <div className="flex items-center gap-2.5 flex-wrap">
                <h2 className="text-lg font-medium font-serif text-ink leading-snug">{contact.name}</h2>
                {overdue && <Badge variant="overdue">Overdue</Badge>}
              </div>
              <p className="text-sm text-ink-muted mt-0.5">
                {contact.role}
                {contact.company && <span className="text-ink-faint"> · {contact.company}</span>}
              </p>
            </div>

            <div className="flex flex-col items-end gap-1.5 shrink-0">
              <Badge variant="cadence">{formatCadence(contact.cadence)}</Badge>
              <span className={cn('text-xs', overdue ? 'text-accent font-medium' : 'text-ink-faint')}>
                {days !== null ? formatDaysSince(days) : 'Never contacted'}
              </span>
            </div>
          </div>

          {contact.lastInteraction?.note && (
            <p className="mt-3 text-sm text-ink-muted leading-relaxed line-clamp-2 border-t border-surface-border pt-3">
              {contact.lastInteraction.note}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

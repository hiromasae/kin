'use client';

import { useState } from 'react';
import { LayoutList, Grid2X2, Flame, ArrowDownAZ, Clock, Layers, Bell } from 'lucide-react';
import { ContactCard } from './ContactCard';
import { cn, isOverdue, formatCadence } from '@/lib/utils';
import type { ContactWithLastInteraction, Cadence } from '@/types';

type ViewMode = 'list' | 'grid';
type SortOption = 'urgency' | 'alphabetical' | 'recent' | 'grouped';

const CADENCE_ORDER: Cadence[] = ['weekly', 'biweekly', 'monthly', 'quarterly'];

function sortContacts(
  contacts: ContactWithLastInteraction[],
  sort: Exclude<SortOption, 'grouped'>,
): ContactWithLastInteraction[] {
  return [...contacts].sort((a, b) => {
    if (sort === 'alphabetical') {
      return a.name.localeCompare(b.name);
    }
    if (sort === 'recent') {
      const aDate = a.lastInteraction?.interacted_at ?? '1970-01-01';
      const bDate = b.lastInteraction?.interacted_at ?? '1970-01-01';
      return new Date(bDate).getTime() - new Date(aDate).getTime();
    }
    const aOverdue = isOverdue(a.cadence, a.lastInteraction?.interacted_at ?? null);
    const bOverdue = isOverdue(b.cadence, b.lastInteraction?.interacted_at ?? null);
    if (aOverdue && !bOverdue) return -1;
    if (!aOverdue && bOverdue) return 1;
    const aDate = a.lastInteraction?.interacted_at ?? '1970-01-01';
    const bDate = b.lastInteraction?.interacted_at ?? '1970-01-01';
    return new Date(aDate).getTime() - new Date(bDate).getTime();
  });
}

const views: { id: ViewMode; label: string; Icon: React.ElementType }[] = [
  { id: 'list', label: 'List', Icon: LayoutList },
  { id: 'grid', label: 'Grid', Icon: Grid2X2   },
];

const sorts: { id: SortOption; label: string; Icon: React.ElementType }[] = [
  { id: 'urgency',      label: 'By urgency',        Icon: Flame        },
  { id: 'alphabetical', label: 'A – Z',              Icon: ArrowDownAZ  },
  { id: 'recent',       label: 'Recently contacted', Icon: Clock        },
  { id: 'grouped',      label: 'Group by cadence',   Icon: Layers       },
];

export function ContactListView({
  contacts,
  overdueCount,
}: {
  contacts: ContactWithLastInteraction[];
  overdueCount: number;
}) {
  const [view, setView] = useState<ViewMode>('list');
  const [sort, setSort] = useState<SortOption>('urgency');

  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        {/* Notification */}
        {overdueCount > 0 ? (
          <div className="flex items-center gap-2 text-accent">
            <Bell size={14} strokeWidth={2} className="shrink-0" />
            <p className="text-sm font-medium">
              {overdueCount} {overdueCount === 1 ? 'person' : 'people'} waiting to hear from you
            </p>
          </div>
        ) : (
          <span className="text-sm text-ink-faint">All caught up</span>
        )}

        {/* Controls */}
        <div className="flex items-center gap-2">
          <div className="flex items-center bg-surface-sunken rounded-xl p-1 gap-0.5">
            {views.map(({ id, label, Icon }) => (
              <div key={id} className="relative group">
                <button
                  onClick={() => setView(id)}
                  className={cn(
                    'flex items-center justify-center rounded-lg w-7 h-7 transition-colors',
                    view === id
                      ? 'bg-surface-raised text-ink shadow-sm'
                      : 'text-ink-faint hover:text-ink-muted',
                  )}
                >
                  <Icon size={14} strokeWidth={1.75} />
                </button>
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 pointer-events-none">
                  <div className="bg-stone-900 text-white text-xs rounded-lg px-2 py-1 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-150">
                    {label}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center bg-surface-sunken rounded-xl p-1 gap-0.5">
            {sorts.map(({ id, label, Icon }) => (
              <div key={id} className="relative group">
                <button
                  onClick={() => setSort(id)}
                  className={cn(
                    'flex items-center justify-center rounded-lg w-7 h-7 transition-colors',
                    sort === id
                      ? 'bg-surface-raised text-ink shadow-sm'
                      : 'text-ink-faint hover:text-ink-muted',
                  )}
                >
                  <Icon size={14} strokeWidth={1.75} />
                </button>
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 pointer-events-none">
                  <div className="bg-stone-900 text-white text-xs rounded-lg px-2 py-1 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-150">
                    {label}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {sort === 'grouped' ? (
        <GroupedView contacts={contacts} view={view} />
      ) : (
        <FlatView contacts={contacts} sort={sort} view={view} />
      )}
    </div>
  );
}

function FlatView({
  contacts,
  sort,
  view,
}: {
  contacts: ContactWithLastInteraction[];
  sort: Exclude<SortOption, 'grouped'>;
  view: ViewMode;
}) {
  const sorted = sortContacts(contacts, sort);
  return view === 'grid' ? (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {sorted.map((contact) => (
        <ContactCard key={contact.id} contact={contact} variant="grid" />
      ))}
    </div>
  ) : (
    <div className="space-y-3">
      {sorted.map((contact) => (
        <ContactCard key={contact.id} contact={contact} variant="list" />
      ))}
    </div>
  );
}

function GroupedView({
  contacts,
  view,
}: {
  contacts: ContactWithLastInteraction[];
  view: ViewMode;
}) {
  const groups = CADENCE_ORDER.reduce<Record<Cadence, ContactWithLastInteraction[]>>(
    (acc, cadence) => {
      acc[cadence] = contacts.filter((c) => c.cadence === cadence);
      return acc;
    },
    { weekly: [], biweekly: [], monthly: [], quarterly: [] },
  );

  return (
    <div className="space-y-8">
      {CADENCE_ORDER.map((cadence) => {
        const group = groups[cadence];
        if (group.length === 0) return null;

        const sorted = sortContacts(group, 'urgency');
        const overdueCount = sorted.filter(
          (c) => isOverdue(c.cadence, c.lastInteraction?.interacted_at ?? null),
        ).length;

        return (
          <div key={cadence}>
            <div className="flex items-center gap-3 mb-3">
              <h3 className="text-xs font-medium text-ink-faint uppercase tracking-wide">
                {formatCadence(cadence)}
              </h3>
              <div className="flex-1 h-px bg-surface-border" />
              {overdueCount > 0 && (
                <span className="text-xs text-accent font-medium">{overdueCount} overdue</span>
              )}
            </div>
            {view === 'grid' ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {sorted.map((contact) => (
                  <ContactCard key={contact.id} contact={contact} variant="grid" />
                ))}
              </div>
            ) : (
              <div className="space-y-3">
                {sorted.map((contact) => (
                  <ContactCard key={contact.id} contact={contact} variant="list" />
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

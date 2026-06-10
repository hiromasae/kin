import { ContactListView } from '@/components/contacts/ContactListView';
import { isOverdue } from '@/lib/utils';
import type { ContactWithLastInteraction } from '@/types';

const mockContacts: ContactWithLastInteraction[] = [
  {
    id: '1',
    user_id: 'u1',
    name: 'Sarah Chen',
    role: 'VP of Product',
    company: 'Meridian Labs',
    context: 'Met at SF Design Week 2025. Thinking about switching from Figma to something new.',
    cadence: 'monthly',
    avatar_url: 'https://i.pravatar.cc/150?img=47',
    created_at: '2026-01-10T00:00:00Z',
    lastInteraction: {
      id: 'i1',
      contact_id: '1',
      user_id: 'u1',
      note: "Caught up at the SF design meetup. She's evaluating new prototyping tools and wants to chat again about the enterprise angle.",
      interacted_at: '2026-04-02T00:00:00Z',
      created_at: '2026-04-02T00:00:00Z',
    },
  },
  {
    id: '2',
    user_id: 'u1',
    name: 'Marcus Webb',
    role: 'Founder',
    company: 'Clearpath',
    context: 'Y Combinator W24. Building dev tooling. Warm intro from James.',
    cadence: 'biweekly',
    created_at: '2026-02-01T00:00:00Z',
    lastInteraction: {
      id: 'i2',
      contact_id: '2',
      user_id: 'u1',
      note: 'Had a 30-min call about his go-to-market strategy. Offered to intro him to someone at Stripe.',
      interacted_at: '2026-05-10T00:00:00Z',
      created_at: '2026-05-10T00:00:00Z',
    },
  },
  {
    id: '3',
    user_id: 'u1',
    name: 'Priya Nair',
    role: 'Engineering Manager',
    company: 'Figma',
    context: 'Former colleague from Stripe. Mentor figure — always good for a frank conversation.',
    cadence: 'quarterly',
    avatar_url: 'https://i.pravatar.cc/150?img=25',
    created_at: '2025-11-15T00:00:00Z',
    lastInteraction: {
      id: 'i3',
      contact_id: '3',
      user_id: 'u1',
      note: 'Coffee in SF. Talked about career growth, managing senior ICs, and the new infra reorg at Figma.',
      interacted_at: '2026-03-15T00:00:00Z',
      created_at: '2026-03-15T00:00:00Z',
    },
  },
  {
    id: '4',
    user_id: 'u1',
    name: 'Tom Olawale',
    role: 'Angel Investor',
    company: '',
    context: 'Invests in B2B SaaS and dev tools. Knows everyone in the SF ecosystem.',
    cadence: 'monthly',
    created_at: '2026-01-20T00:00:00Z',
    lastInteraction: {
      id: 'i4',
      contact_id: '4',
      user_id: 'u1',
      note: "Quick LinkedIn message. He's looking at a few seed deals and asked if I knew anyone in the AI infra space.",
      interacted_at: '2026-05-28T00:00:00Z',
      created_at: '2026-05-28T00:00:00Z',
    },
  },
  {
    id: '5',
    user_id: 'u1',
    name: 'Leila Ahmadi',
    role: 'Design Lead',
    company: 'Arc',
    context: 'Met at Config 2025. Doing interesting work on browser UI patterns.',
    cadence: 'weekly',
    avatar_url: 'https://i.pravatar.cc/150?img=32',
    created_at: '2026-05-01T00:00:00Z',
    lastInteraction: {
      id: 'i5',
      contact_id: '5',
      user_id: 'u1',
      note: 'Traded notes on the new Arc Spaces feature. She shared a Figma file of early explorations.',
      interacted_at: '2026-05-30T00:00:00Z',
      created_at: '2026-05-30T00:00:00Z',
    },
  },
  {
    id: '6',
    user_id: 'u1',
    name: 'Jordan Kim',
    role: 'Head of Growth',
    company: 'Vercel',
    context: 'Intro from a mutual friend. Interested in how indie developers find product-market fit.',
    cadence: 'monthly',
    created_at: '2026-03-01T00:00:00Z',
    lastInteraction: null,
  },
];

export default function DashboardPage() {
  const overdueCount = mockContacts.filter((c) =>
    isOverdue(c.cadence, c.lastInteraction?.interacted_at ?? null),
  ).length;

  return (
    <div className="min-h-screen bg-surface-base">
      <div className="max-w-2xl mx-auto px-6 py-12">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-semibold font-serif text-ink tracking-tight">kin</h1>
          <button className="bg-accent text-white rounded-xl px-4 py-2 text-sm font-medium hover:bg-accent-hover transition-colors cursor-pointer">
            Add contact
          </button>
        </div>

        {mockContacts.length > 0 ? (
          <ContactListView contacts={mockContacts} overdueCount={overdueCount} />
        ) : (
          <EmptyState />
        )}
      </div>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center text-center pt-20 pb-8">
      <h2 className="text-2xl font-semibold font-serif text-ink tracking-tight">
        Your people, all in one place
      </h2>
      <p className="text-base text-ink-muted mt-2 max-w-xs leading-relaxed">
        Add someone you want to stay in touch with and set how often you&apos;d like to reach out.
      </p>
      <button className="mt-6 bg-accent text-white rounded-xl px-4 py-2 text-sm font-medium hover:bg-accent-hover transition-colors cursor-pointer">
        Add your first contact
      </button>
    </div>
  );
}

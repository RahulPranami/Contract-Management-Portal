import { Head } from '@inertiajs/react';

import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Card, CardContent } from "@/components/ui/card"
import { Link } from "@inertiajs/react"
import { Badge } from "@/components/ui/badge"


const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Dashboard',
    href: dashboard().url,
  },
];

function StatCard({ title, value, href }) {
  return (
    <Link href={href}>
      <Card className="hover:bg-slate-50 cursor-pointer transition">
        <CardContent className="pt-4">
          <p className="text-sm text-muted-foreground">{title}</p>
          <p className="text-3xl font-bold">{value}</p>
        </CardContent>
      </Card>
    </Link>
  )
}

export default function Dashboard({ stats, recentContracts }) {
  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Dashboard" />
      <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <StatCard
            title="Open Contracts"
            value={stats.open}
            href="/contracts?closed=0"
          />

          <StatCard
            title="Awaiting Payment"
            value={stats.payment_pending}
            href="/contracts?status=payment_pending"
          />

          <StatCard
            title="Contracts with Claims"
            value={stats.claims}
            href="/contracts?status=claim_open"
          />
        </div>

        {/* Recently Updated */}
        <div>
          <h2 className="text-lg font-semibold mb-3">
            Recently Updated Contracts
          </h2>

          <div className="space-y-2">
            {recentContracts.map(c => (
              <Link
                key={c.id}
                href={`/contracts/${c.id}`}
                className="block border rounded-md p-3 hover:bg-slate-50"
              >
                <div className="flex justify-between">
                  <div>
                    <p className="font-medium">{c.contract_number}</p>
                    <p className="text-sm text-muted-foreground">
                      {c.buyer_name}
                    </p>
                  </div>
                  <Badge>{c.status}</Badge>
                </div>
              </Link>
            ))}

            {recentContracts.length === 0 && (
              <p className="text-sm text-muted-foreground">
                No recent updates
              </p>
            )}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}

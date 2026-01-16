import { Head } from '@inertiajs/react';

import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Link } from "@inertiajs/react"

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Show Contracts',
    href: dashboard().url,
  },
];


function Field({ label, value }) {
  return (
    <div className="grid grid-cols-3 gap-4 py-1">
      <div className="text-sm text-muted-foreground">{label}</div>
      <div className="col-span-2 text-sm font-medium">
        {value ?? "-"}
      </div>
    </div>
  )
}

function YesNo({ value }) {
  return value ? (
    <Badge className="bg-green-600">Yes</Badge>
  ) : (
    <Badge variant="secondary">No</Badge>
  )
}

export default function Show({ contract, isAdmin }: { contract: any, isAdmin: boolean }) {
  console.log(contract);
  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Show Contract" />
      {/* <div className="h-full overflow-x-auto rounded-xl p-4"> */}
      <div className="flex justify-between items-center mb-6 p-4">
        <div>
          <h1 className="text-2xl font-bold">
            Contract {contract.contract_number}
          </h1>
          <Badge className="mt-2">{contract.status}</Badge>
        </div>

        <div className="flex gap-2">
          <Link href={`/contracts/${contract.id}/edit`}>
            <Button>Edit</Button>
          </Link>
        </div>
      </div>

      <div className="space-y-6 p-4">

        {/* PART 1 – CONTRACT DETAILS */}
        <Card>
          <CardHeader>
            <CardTitle>Contract Details</CardTitle>
          </CardHeader>
          <CardContent>
            <Field label="Contract Date" value={contract.contract_date} />
            <Field label="Origin" value={contract.origin} />
            <Field label="Port of Discharge" value={contract.port_of_discharge} />
            <Field label="HS Code" value={contract.hs_code} />
            <Field label="Quantity Contracted" value={contract.quantity_contracted} />
            <Field label="Buyer Name" value={contract.buyer_name} />
            <Field label="Buyer Address" value={contract.buyer_address} />
            <Field label="Buyer Bank Address" value={contract.buyer_bank_address} />
            <Field label="Selling Price" value={contract.selling_price} />
            <Field label="Payment Terms" value={contract.payment_terms} />
          </CardContent>
        </Card>

        {/* PART 2 – INVOICING & PAYMENTS */}
        <Card>
          <CardHeader>
            <CardTitle>Invoicing & Payments</CardTitle>
          </CardHeader>
          <CardContent>
            <Field label="Invoice Number" value={contract.invoice_number} />
            <Field label="Invoice Value" value={contract.invoice_value} />
            <Field label="Invoice Paid" value={<YesNo value={contract.invoice_paid} />} />

            <Field label="Outside Invoice Number" value={contract.outside_invoice_number} />
            <Field label="Outside Invoice Value" value={contract.outside_invoice_value} />
            <Field
              label="Outside Payment Received"
              value={<YesNo value={contract.outside_payment_received} />}
            />

            <Field label="Quantity Shipped" value={contract.quantity_shipped} />
            <Field label="Total Contract Value" value={contract.total_contract_value} />
          </CardContent>
        </Card>

        {/* PART 3 – SHIPPING */}
        <Card>
          <CardHeader>
            <CardTitle>Shipping</CardTitle>
          </CardHeader>
          <CardContent>
            <Field label="Bill of Lading No." value={contract.bill_of_lading_number} />
            <Field label="Shipping Line" value={contract.shipping_line} />
            <Field label="Shipping Agent" value={contract.shipping_agent} />
            <Field label="ETA" value={contract.eta} />
          </CardContent>
        </Card>

        {/* PART 4 – DOCUMENTATION */}
        <Card>
          <CardHeader>
            <CardTitle>Documentation</CardTitle>
          </CardHeader>
          <CardContent>
            <Field
              label="Bill of Lading Received"
              value={<YesNo value={contract.bill_of_lading_received} />}
            />
            <Field
              label="Documents Sent to Bank"
              value={<YesNo value={contract.documents_sent_to_bank} />}
            />
          </CardContent>
        </Card>

        {/* PART 5 – CLAIMS */}
        <Card>
          <CardHeader>
            <CardTitle>Claims</CardTitle>
          </CardHeader>
          <CardContent>
            <Field label="Any Claim" value={<YesNo value={contract.has_claim} />} />
            <Field
              label="Amount Settled by Seller"
              value={contract.amount_settled_by_seller}
            />
          </CardContent>
        </Card>

        {/* PART 6 – NOTES */}
        <Card>
          <CardHeader>
            <CardTitle>Additional Notes</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm">
              {contract.notes ?? "No notes available"}
            </p>
          </CardContent>
        </Card>

        {/* PART 7 – COMPLETION */}
        <Card>
          <CardHeader>
            <CardTitle>Contract Completion</CardTitle>
          </CardHeader>
          <CardContent>
            <Field label="Contract Closed" value={<YesNo value={contract.is_closed} />} />
            <Field label="Closure Date" value={contract.closed_at} />
          </CardContent>
        </Card>

        {/* AUDIT INFO */}
        <Card>
          <CardHeader>
            <CardTitle>Audit Information</CardTitle>
          </CardHeader>
          <CardContent>
            <Field label="Created At" value={contract.created_at} />
            <Field label="Last Updated At" value={contract.updated_at} />
            <Field label="Created By (User ID)" value={contract.created_by} />
            <Field label="Updated By (User ID)" value={contract.updated_by} />
          </CardContent>
        </Card>

      </div>
    </AppLayout>
  )
}

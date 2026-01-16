import { Head, useForm } from '@inertiajs/react';

import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Create Contract',
    href: dashboard().url,
  },
];


function Field({ label, children }) {
  return (
    <div className="grid grid-cols-3 gap-4 items-center py-2">
      <Label className="text-sm text-muted-foreground">{label}</Label>
      <div className="col-span-2">{children}</div>
    </div>
  )
}

const STATUSES = [
  "open",
  "invoiced",
  "shipped",
  "documents_submitted",
  "payment_pending",
  "claim_open",
  "completed",
]


export default function Create() {
  const { data, setData, post, processing } = useForm({
    contract_number: "",
    buyer_name: "",
    status: "open",
    buyer_address: "",
    origin: "",
    port_of_discharge: "",
    quantity_contracted: "",
    selling_price: "",

    invoice_paid: false,
    outside_payment_received: false,

    bill_of_lading_received: false,
    documents_sent_to_bank: false,

    has_claim: false,
    amount_settled_by_seller: "",

    notes: "",
    is_closed: false,
  })

  function submit(e) {
    e.preventDefault()
    post("/contracts")
  }

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Create Contract" />
      <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
        {/* <h1 className="text-2xl font-bold mb-4">Create Contract</h1> */}
        
        <form onSubmit={submit} className="space-y-6 max-w-4xl">

          {/* PART 1 – CONTRACT DETAILS */}
          <Card>
            <CardHeader>
              <CardTitle>Contract Details</CardTitle>
            </CardHeader>
            <CardContent>
              <Field label="Buyer Name">
                <Input
                  value={data.buyer_name}
                  onChange={e => setData("buyer_name", e.target.value)}
                />
              </Field>

              <Field label="Buyer Address">
                <Input
                  value={data.buyer_address}
                  onChange={e => setData("buyer_address", e.target.value)}
                />
              </Field>

              <Field label="Origin">
                <Input
                  value={data.origin}
                  onChange={e => setData("origin", e.target.value)}
                />
              </Field>

              <Field label="Port of Discharge">
                <Input
                  value={data.port_of_discharge}
                  onChange={e => setData("port_of_discharge", e.target.value)}
                />
              </Field>

              <Field label="Quantity Contracted">
                <Input
                  type="number"
                  value={data.quantity_contracted}
                  onChange={e => setData("quantity_contracted", e.target.value)}
                />
              </Field>

              <Field label="Selling Price">
                <Input
                  type="number"
                  value={data.selling_price}
                  onChange={e => setData("selling_price", e.target.value)}
                />
              </Field>
            </CardContent>
          </Card>

          {/* PART 2 – STATUS */}
          <Card>
            <CardHeader>
              <CardTitle>Contract Status</CardTitle>
            </CardHeader>
            <CardContent>
              <Field label="Status">
                <Select
                  value={data.status}
                  onValueChange={v => setData("status", v)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {STATUSES.map(s => (
                      <SelectItem key={s} value={s}>
                        {s.replace("_", " ")}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>

              <Field label="Contract Closed">
                <Switch
                  checked={data.is_closed}
                  onCheckedChange={v => setData("is_closed", v)}
                />
              </Field>
            </CardContent>
          </Card>

          {/* PART 3 – PAYMENTS */}
          <Card>
            <CardHeader>
              <CardTitle>Payments</CardTitle>
            </CardHeader>
            <CardContent>
              <Field label="Invoice Paid">
                <Switch
                  checked={data.invoice_paid}
                  onCheckedChange={v => setData("invoice_paid", v)}
                />
              </Field>

              <Field label="Outside Payment Received">
                <Switch
                  checked={data.outside_payment_received}
                  onCheckedChange={v =>
                    setData("outside_payment_received", v)
                  }
                />
              </Field>
            </CardContent>
          </Card>

          {/* PART 4 – DOCUMENTATION */}
          <Card>
            <CardHeader>
              <CardTitle>Documentation</CardTitle>
            </CardHeader>
            <CardContent>
              <Field label="Bill of Lading Received">
                <Switch
                  checked={data.bill_of_lading_received}
                  onCheckedChange={v =>
                    setData("bill_of_lading_received", v)
                  }
                />
              </Field>

              <Field label="Documents Sent to Bank">
                <Switch
                  checked={data.documents_sent_to_bank}
                  onCheckedChange={v =>
                    setData("documents_sent_to_bank", v)
                  }
                />
              </Field>
            </CardContent>
          </Card>

          {/* PART 5 – CLAIMS */}
          <Card>
            <CardHeader>
              <CardTitle>Claims</CardTitle>
            </CardHeader>
            <CardContent>
              <Field label="Any Claim">
                <Switch
                  checked={data.has_claim}
                  onCheckedChange={v => setData("has_claim", v)}
                />
              </Field>

              <Field label="Amount Settled by Seller">
                <Input
                  type="number"
                  value={data.amount_settled_by_seller}
                  onChange={e =>
                    setData("amount_settled_by_seller", e.target.value)
                  }
                />
              </Field>
            </CardContent>
          </Card>

          {/* NOTES */}
          <Card>
            <CardHeader>
              <CardTitle>Additional Notes</CardTitle>
            </CardHeader>
            <CardContent>
              <textarea
                className="w-full border rounded-md p-2 text-sm"
                rows={4}
                value={data.notes}
                onChange={e => setData("notes", e.target.value)}
              />
            </CardContent>
          </Card>

          {/* ACTIONS */}
          <div className="flex gap-2">
            <Button disabled={processing}>Save Changes</Button>
            <Button variant="outline" type="button" onClick={() => history.back()}>
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </AppLayout>
  )
}

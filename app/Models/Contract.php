<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Contract extends Model
{
    protected $fillable = [
        'contract_number',
        'contract_date',
        'description',
        'origin',
        'port_of_discharge',
        'hs_code',
        'quantity_contracted',
        'buyer_name',
        'buyer_address',
        'buyer_bank_address',
        'selling_price',
        'payment_terms',
        'invoice_number',
        'invoice_value',
        'invoice_paid',
        'outside_invoice_number',
        'outside_invoice_value',
        'outside_payment_received',
        'quantity_shipped',
        'total_contract_value',
        'bill_of_lading_number',
        'shipping_line',
        'shipping_agent',
        'eta',
        'bill_of_lading_received',
        'documents_sent_to_bank',
        'has_claim',
        'amount_settled_by_seller',
        'notes',
        'status',
        'is_closed',
        'closed_at',
        'created_by',
        'updated_by',
        'is_archived',
    ];

    protected $casts = [
        'contract_date' => 'date',
        'eta' => 'date',
        'closed_at' => 'datetime',

        'invoice_paid' => 'boolean',
        'outside_payment_received' => 'boolean',
        'bill_of_lading_received' => 'boolean',
        'documents_sent_to_bank' => 'boolean',
        'has_claim' => 'boolean',
        'is_closed' => 'boolean',
        'is_archived' => 'boolean',
    ];

    public function close() {
        $this->update([
            'status' => 'completed',
            'is_closed' => true,
            'closed_at' => now(),
        ]);
    }

}

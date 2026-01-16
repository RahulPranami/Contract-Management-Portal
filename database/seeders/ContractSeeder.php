<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Contract;
use App\Models\User;

class ContractSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $admin = User::where('role', 'admin')->first();

        $statuses = [
            'open',
            'invoiced',
            'shipped',
            'documents_submitted',
            'payment_pending',
            'claim_open',
            'completed',
        ];

        for ($i = 1; $i <= 25; $i++) {
            Contract::create([
                'contract_number' => 'CNT-' . str_pad($i, 4, '0', STR_PAD_LEFT),
                'contract_date' => now()->subDays(rand(1, 90)),
                'buyer_name' => 'Buyer ' . $i,
                'buyer_address' => 'Mumbai, India',
                'origin' => 'India',
                'port_of_discharge' => 'Dubai',
                'quantity_contracted' => rand(100, 500),
                'selling_price' => rand(50000, 150000),
                'status' => $statuses[array_rand($statuses)],
                'invoice_paid' => rand(0, 1),
                'has_claim' => rand(0, 1),
                'created_by' => $admin->id,
                'updated_by' => $admin->id,
            ]);
        }
    }
}

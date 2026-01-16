<?php

namespace App\Http\Controllers;

use App\Models\Contract;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function __invoke()
    {
        return Inertia::render('Dashboard', [
            'stats' => [
                'open' => Contract::where('is_archived', false)
                    ->where('is_closed', false)
                    ->count(),

                'payment_pending' => Contract::where('is_archived', false)
                    ->where('status', 'payment_pending')
                    ->count(),

                'claims' => Contract::where('is_archived', false)
                    ->where('has_claim', true)
                    ->count(),
            ],

            'recentContracts' => Contract::where('is_archived', false)
                ->orderBy('updated_at', 'desc')
                ->limit(5)
                ->get([
                    'id',
                    'contract_number',
                    'buyer_name',
                    'status',
                    'updated_at',
                ]),
        ]);
    }
}

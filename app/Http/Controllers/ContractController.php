<?php

namespace App\Http\Controllers;

use App\Models\Contract;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ContractController extends Controller
{
    // List contracts
    public function index(Request $request)
    {
         $query = Contract::query()->where('is_archived', false);

        // Status filter
        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }

        // Buyer search
        if ($request->filled('buyer')) {
            $query->where('buyer_name', 'like', '%' . $request->buyer . '%');
        }

        // Open / Closed
        if ($request->filled('closed')) {
            $query->where('is_closed', $request->closed === '1');
        }

        $contracts = $query
            ->orderBy('updated_at', 'desc')
            ->get();


        return Inertia::render('Contracts/Index', [
            'contracts' => $contracts,
            'filters' => $request->only(['status', 'buyer', 'closed']),
        ]);
    }

    // Show create form (ADMIN ONLY)
    public function create()
    {
        if (!auth()->user()->isAdmin()) {
            abort(403);
        }

        return Inertia::render('Contracts/Create');
    }

    // Store contract
    public function store(Request $request)
    {
        if (!auth()->user()->isAdmin()) {
            abort(403);
        }

        $data = $request->validate([
            'contract_number' => 'required|unique:contracts,contract_number',
            'contract_date' => 'nullable|date',
            'buyer_name' => 'nullable|string',
            'quantity_contracted' => 'nullable|numeric',
            'selling_price' => 'nullable|numeric',
            'status' => 'required|string',
        ]);

        $data['created_by'] = auth()->id();

        Contract::create($data);

        return redirect()->route('contracts.index');
    }

    // View contract
    public function show(Contract $contract)
    {
        return Inertia::render('Contracts/Show', [
            'contract' => $contract,
            'isAdmin' => auth()->user()->isAdmin(),
        ]);
    }

    // Edit form
    public function edit(Contract $contract)
    {
        return Inertia::render('Contracts/Edit', [
            'contract' => $contract,
            'isAdmin' => auth()->user()->isAdmin(),
        ]);
    }

    // Update contract
    public function update(Request $request, Contract $contract)
    {
        $data = $request->validate([
            'contract_date' => 'nullable|date',
            'buyer_name' => 'nullable|string',
            'quantity_contracted' => 'nullable|numeric',
            'selling_price' => 'nullable|numeric',
            'status' => 'required|string',
            'invoice_paid' => 'boolean',
            'has_claim' => 'boolean',
            'is_closed' => 'boolean',
        ]);

        if (!empty($data['is_closed']) && !$contract->is_closed) {
            $data['is_closed'] = true;
            $data['closed_at'] = now();
            $data['status'] = 'completed';
        }

        $data['updated_by'] = auth()->id();

        $contract->update($data);

        return redirect()->route('contracts.show', $contract);
    }
}

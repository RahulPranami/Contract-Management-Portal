<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('contracts', function (Blueprint $table) {
            $table->id();

            // =========================
            // PART 1 – CONTRACT DETAILS
            // =========================
            $table->string('contract_number')->unique();
            $table->date('contract_date')->nullable();
            $table->text('description')->nullable();
            $table->string('origin')->nullable();
            $table->string('port_of_discharge')->nullable();
            $table->string('hs_code')->nullable();

            $table->decimal('quantity_contracted', 15, 3)->nullable();

            $table->string('buyer_name')->nullable();
            $table->text('buyer_address')->nullable();
            $table->text('buyer_bank_address')->nullable();

            $table->decimal('selling_price', 15, 2)->nullable();
            $table->string('payment_terms')->nullable();

            // =========================
            // PART 2 – INVOICING
            // =========================
            $table->string('invoice_number')->nullable();
            $table->decimal('invoice_value', 15, 2)->nullable();
            $table->boolean('invoice_paid')->default(false);

            $table->string('outside_invoice_number')->nullable();
            $table->decimal('outside_invoice_value', 15, 2)->nullable();
            $table->boolean('outside_payment_received')->default(false);

            $table->decimal('quantity_shipped', 15, 3)->nullable();
            $table->decimal('total_contract_value', 15, 2)->nullable();

            // =========================
            // PART 3 – SHIPPING
            // =========================
            $table->string('bill_of_lading_number')->nullable();
            $table->string('shipping_line')->nullable();
            $table->string('shipping_agent')->nullable();
            $table->date('eta')->nullable();

            // =========================
            // PART 4 – DOCUMENTATION
            // =========================
            $table->boolean('bill_of_lading_received')->default(false);
            $table->boolean('documents_sent_to_bank')->default(false);

            // =========================
            // PART 5 – CLAIMS
            // =========================
            $table->boolean('has_claim')->default(false);
            $table->decimal('amount_settled_by_seller', 15, 2)->nullable();

            // =========================
            // PART 6 – NOTES
            // =========================
            $table->text('notes')->nullable();

            // =========================
            // PART 7 – STATUS & CLOSURE
            // =========================
            $table->string('status')->default('open');
            $table->boolean('is_closed')->default(false);
            $table->timestamp('closed_at')->nullable();

            // =========================
            // AUDIT & SAFETY
            // =========================
            $table->foreignId('created_by')->constrained('users');
            $table->foreignId('updated_by')->nullable()->constrained('users');

            $table->boolean('is_archived')->default(false);

            $table->timestamps();

            // =========================
            // INDEXES
            // =========================
            $table->index('status');
            $table->index('buyer_name');
            $table->index('is_closed');
            $table->index('is_archived');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('contracts');
    }
};

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Sales extends Model
{
    use HasFactory;

    protected $fillable = [
        'id',
        'currency',
        'exchange',
        'customer',
        'paid_value',
        'change',
        'payment_mechanism',
        'payment_way',
        'invoice_status',
        'invoice_type_id',
        'invoice_number',
        'day',
        'month',
        'date',
        'expiration_date',
        'system_entry_date',
        'merchandise_total',
        'commercial_discount',
        'financial_discount',
        'postage',
        'service_total',
        'tax_total',
        'advance',
        'eco_value',
        'hit',
        'total',
        'short_hash',
        'created_at',
        'updated_at'
    ];

    public function documentType(): \Illuminate\Database\Eloquent\Relations\BelongsTo
    {
        return $this->belongsTo(DocumentType::class);
    }

    public function user(): \Illuminate\Database\Eloquent\Relations\BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}

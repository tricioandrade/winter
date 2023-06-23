<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SaleMoney extends Model
{
    use HasFactory;


    protected $fillable = [
        'id',
        'sale_id',
        'saft_number',
        'hash',
        'invoice_ref',
        'date'
    ];


    public function sale(): \Illuminate\Database\Eloquent\Relations\BelongsTo
    {
        return $this->belongsTo(Sales::class);
    }
}

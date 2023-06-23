<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SoldProduct extends Model
{
    use HasFactory;


    protected $fillable =[
        'id',
        'sale_id',
        'name',
        'description',
        'product_id',
        'price',
        'price_with_tax',
        'promotional_price',
        'promotional_status',
        'product_type_symbol',
        'product_type_name',
        'sold_quantity',
        'discount',
        'tax_value',
        'tax_type',
        'tax_total',
        'total',
        'tax_exemption_code',
        'tax_exemption_reason'
    ];


    public function sale(): \Illuminate\Database\Eloquent\Relations\BelongsTo
    {
        return $this->belongsTo(Sales::class);
    }
    public function product(): \Illuminate\Database\Eloquent\Relations\BelongsTo
    {
        return $this->belongsTo(Product::class);
    }
}

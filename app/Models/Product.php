<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    protected $table = 'products';
    protected $primaryKey  = 'id';

    protected $fillable = [
        'id',
        'name',
        'description',
        'code',
        'stock_quantity',
        'unity_quantity',
        'for_sale_quantity',
        'for_sale_status',
        'unity_of_measure',
        'price',
        'price_with_tax',
        'promotional_price',
        'promotional_status',
        'product_type_id',
        'tax_id',
        'tax_value',
        'tax_total_added',
        'tax_exemption_code',
        'tax_exemption_reason'
    ];

    public function productType()
    {
        return $this->belongsTo(ProductType::class);
    }

    public function tax()
    {
        return $this->belongsTo(Tax::class);
    }
}


<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    protected $table = 'stock_products';
    protected $primaryKey  = 'id';

    protected $fillable = [
        'name',
        'user_id',
        'description',
        'code',
        'storage_id',
        'stock_quantity',
        'unity_quantity',
        'for_sale_quantity',
        'for_sale_status',
        'unity_of_measure',
        'price',
        'price_with_tax',
        'promotional_price',
        'promotional_status',
        'tax_type_id',
        'tax_value',
        'tax_total_added',
        'tax_exemption_code',
        'tax_exemption_reason'
    ];

    public function tax()
    {
        return $this->belongsTo(TaxType::class);
    }

    public function user(){
        return $this->belongsTo(User::class);
    }


}


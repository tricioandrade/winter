<?php


namespace App\Traits\Resource;

use App\Models\Product;
use Tricioandrade\OpensCrypt\opensRSA;

trait SoldProductChainTrait
{
    use UserChainTrait;
    
    private $collection = [];
    public function soldProductToArray($value)
    {
        foreach($value as $key => $data){
            $this->collection[$key] = [
                'id' => $data->id,
                'attributes' => [
                    'sale_id' => $data->sale_id,
                    'name' => $data->name,
                    'description' => $data->description,
                    'product_id' => $data->product_id,
                    'price' => $data->price,
                    'price_with_tax' => $data->price_with_tax,
                    'promotional_price' => $data->promotional_price,
                    'promotional_status' => $data->promotional_status,
                    'product_type_symbol' => $data->product_type_symbol,
                    'product_type_name' => $data->product_type_name,
                    'sold_quantity' => $data->sold_quantity,
                    'discount' => $data->discount,
                    'tax_value' => $data->tax_value,
                    'tax_type' => $data->tax_type,
                    'tax_total' => $data->tax_total,
                    'total' => $data->total,
                    'tax_exemption_code' => $data->tax_exemption_code,
                    'tax_exemption_reason' => $data->tax_exemption_reason,
                ],
                'relationships' => [
                    'info' => Product::all()->where('id', '=', $data->product_id)->first()->toArray()
                ]
            ];
        }

        return $this->collection;
    }
}
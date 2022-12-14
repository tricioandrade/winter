<?php

namespace App\Http\Resources;

use App\Traits\DocumentTrait;
use Illuminate\Http\Resources\Json\JsonResource;

class ProductResource extends JsonResource
{
    use DocumentTrait;
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            'id'=> (string)$this->id,
            'attributes'=> [
                'name'=> $this->name,
                'description'=> $this->description,
                'code'=> $this->code,
                'stock_quantity'=> $this->stock_quantity,
                'unity_quantity'=> $this->unity_quantity,
                'for_sale_quantity'=> $this->for_sale_quantity,
                'for_sale_status'=> $this->for_sale_status,
                'unity_of_measure'=> $this->unity_of_measure,
                'price'=>  $this->moneyFormat($this->price),
                'price_with_tax'=>  $this->moneyFormat($this->price_with_tax),
                'promotional_price'=>  $this->moneyFormat($this->promotional_price),
                'promotional_status'=> $this->promotional_status,
                'tax_value'=> $this->tax_value,
                'tax_total_added'=>  $this->moneyFormat($this->tax_total_added),
                'tax_exemption_code'=> $this->tax_exemption_code,
                'tax_exemption_reason'=> $this->tax_exemption_reason,
            ],
            'relationships'=> [
                'tax' => [
                    'name'  => $this->tax->name,
                    'description' => $this->tax->description,
                    'symbol'=> $this->tax->symbol
                ],
                'user' => [
                    'name'  => $this->user->name,
                    'email' => $this->user->email,
                ],
                'productType' => [
                    'name'  => $this->productType->name,
                    'symbol'=> $this->productType->symbol
                ]
            ]
        ];
    }
}

<?php

namespace App\Http\Resources;

use App\Models\Sales;
use App\Models\User;
use App\Traits\DocumentTrait;
use Illuminate\Http\Resources\Json\JsonResource;

class SoldProductResource extends JsonResource
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
            'id' => (string)$this->id,
            'attributes' => [
                'sale_id' => $this->sale_id,
                'name' => $this->name,
                'description' => $this->description,
                'product_id' => $this->product_id,
                'price' => $this->moneyFormat($this->price),
                'price_with_tax' => $this->moneyFormat($this->price_with_tax),
                'promotional_price' => $this->promotional_price,
                'promotional_status' => $this->promotional_status,
                'product_type_symbol' => $this->product_type_symbol,
                'product_type_name' => $this->product_type_name,
                'sold_quantity' => $this->sold_quantity,
                'discount' => $this->moneyFormat($this->discount),
                'tax_value' => $this->tax_value,
                'tax_type' => $this->tax_type,
                'tax_total' => $this->moneyFormat($this->tax_total),
                'total' => $this->moneyFormat($this->total),
                'tax_exemption_code' => $this->tax_exemption_code,
                'tax_exemption_reason' => $this->tax_exemption_reason,
            ],
            'relationships' => [
                'user' => new UserResource(User::all()->where('id', '=', $this->user_id)->first()),
                'product' => [
                    'name' => $this->product->name,
                    'description' => $this->product->description,
                ]
            ]
        ];
    }
}

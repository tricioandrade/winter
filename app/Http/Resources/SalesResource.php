<?php

namespace App\Http\Resources;

use App\Enums\DocTypes;
use App\Enums\InvoiceStatus;
use App\Enums\PaymentWays;
use App\Models\App;
use App\Models\CreditNote;
use App\Models\InvoiceReceipt;
use App\Models\SaleMoney;
use App\Models\SoldProduct;
use App\Models\User;
use App\Traits\DocumentTrait;
use App\Traits\TimeTools;
use Illuminate\Http\Resources\Json\JsonResource;

class SalesResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    use DocumentTrait;
    use TimeTools;

    public function toArray($request)
    {
        return [
            'id' => (string)$this->id,
            'attributes' => [
                'currency' => $this->currency,
                'exchange' => $this->exchange,
                'customer' => $this->customer,
                'paid_value' => $this->paid_value,
                'saft_paid_value' => $this->paid_value,
                'payment_mechanism' => $this->payment_mechanism,
                'payment_way' => PaymentWays::from($this->payment_way)->symbol(),
                'invoice_status' => InvoiceStatus::from($this->invoice_status)->symbol(),
                'invoice_type_id' => $this->invoice_type_id,
                'invoice_type_symbol' => DocTypes::from($this->invoice_type_id)->symbol(),
                'invoice_type_name' => DocTypes::from($this->invoice_type_id)->name(),
                'invoice_number' => $this->invoice_number,
                'day' => $this->day,
                'month' => $this->month,
                'date' => $this->convertDate($this->date),
                'saft_date' => $this->date,
                'expiration_date' => $this->convertDate($this->expiration_date),
                'system_entry_date' => str_replace( ' ', 'T', $this->system_entry_date),
                'merchandise_total' => $this->merchandise_total,
                'commercial_discount' =>  $this->commercial_discount,
                'saft_commercial_discount' =>  $this->commercial_discount,
                'financial_discount' =>  $this->financial_discount,
                'postage' =>  $this->postage,
                'service_total' =>  $this->service_total,
                'tax_total' =>  $this->tax_total,
                'saft_tax_total' =>  $this->tax_total,
                'advance' =>  $this->advance,
                'eco_value' =>  $this->eco_value,
                'hit' =>  $this->hit,
                'total' =>  $this->total,
                'total_no_tax' => SoldProduct::all()->where('sale_id', '=', $this->id)->sum('total'),
                'saft_total' => $this->total,
                'footer' => 'Documento processado por software válido ' . App::all()->where('id', '=', 1)->first()->licence . ' Outono',
                'short_hash' => $this->short_hash,
                'created_at' => $this->created_at,
                'updated_at' => $this->updated_at
            ],
            'money_format' => [
                'paid_value' => $this->moneyFormat( $this->paid_value),
                'change' => $this->moneyFormat( $this->change),
                'change' => $this->moneyFormat( $this->change),
                'commercial_discount' =>  $this->moneyFormat($this->commercial_discount),
                'financial_discount' =>  $this->moneyFormat($this->financial_discount),
                'postage' =>$this->moneyFormat($this->postage),
                'service_total' =>  $this->moneyFormat($this->service_total),
                'tax_total' =>  $this->moneyFormat($this->tax_total),
                'advance' =>  $this->moneyFormat($this->advance),
                'eco_value' =>  $this->moneyFormat($this->eco_value),
                'hit' =>  $this->moneyFormat($this->hit),
                'total' =>  $this->moneyFormat($this->total),
            ],
            'relationships' => [
                'user' => new UserResource(User::all()->where('id', '=', $this->user_id)->first()),
                'invoice' =>[
                    'name' => DocTypes::from($this->invoice_type_id)->name(),
                    'data' => match($this->invoice_type_id){
                        DocTypes::FR->value => InvoiceReceipt::all()->where('sale_id', '=',  $this->id)->first()->toArray(),
                        DocTypes::NC->value => CreditNote::all()->where('sale_id', '=',  $this->id)->first()->toArray(),
                        DocTypes::VD->value => SaleMoney::all()->where('sale_id', '=',  $this->id)->first()->toArray()
                    }
                ],
                'products' => [
                    ...SoldProductResource::collection(SoldProduct::all()
                    ->where('sale_id', '=', $this->id)
                    )
                ],

            ]
        ];
    }
}

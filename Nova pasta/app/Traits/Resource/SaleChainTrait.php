<?php


namespace App\Traits\Resource;

use App\Enums\DocTypes;
use App\Enums\InvoiceStatus;
use App\Enums\PaymentWays;
use App\Models\CreditNote;
use App\Models\InvoiceReceipt;
use App\Models\SaleMoney;
use App\Models\SoldProduct;
use App\Models\User;
use App\Traits\DocumentTrait;
use Tricioandrade\OpensCrypt\opensRSA;

trait SaleChainTrait
{
    use DocumentTrait;
    use UserChainTrait;
    use SoldProductChainTrait;
    
    private $collection = [];

    public function saleToArray($value)
    {
        
        foreach($value as $key => $data){
            $this->collection[$key] = [
                'id' => $data->id,
                'attributes' => [
                    'currency' => $data->currency,
                    'exchange' => $data->exchange,
                    'customer' => $data->customer,
                    'paid_value' => $data->paid_value,
                    'saft_paid_value' => $data->paid_value,
                    'change' => $data->change,
                    'payment_mechanism' => $data->payment_mechanism,
                    'payment_way' => PaymentWays::from($data->payment_way)->symbol(),
                    'invoice_status' => InvoiceStatus::from($data->invoice_status)->symbol(),
                    'invoice_type_id' => $data->invoice_type_id,
                    'invoice_type_symbol' => DocTypes::from($data->invoice_type_id)->symbol(),
                    'invoice_type_name' => DocTypes::from($data->invoice_type_id)->name(),
                    'invoice_number' => $data->invoice_number,
                    'day' => $data->day,
                    'month' => $data->month,
                    'date' => $data->date,
                    'saft_date' => $data->date,
                    'expiration_date' => $data->expiration_date,
                    'system_entry_date' => str_replace( ' ', 'T', $data->system_entry_date),
                    'merchandise_total' => $data->merchandise_total,
                    'commercial_discount' => $data->commercial_discount,
                    'saft_commercial_discount' =>  $data->commercial_discount,
                    'financial_discount' => $data->financial_discount,
                    'postage' => $data->postage,
                    'service_total' => $data->service_total,
                    'tax_total' => $data->tax_total,
                    'tax_total' => $data->tax_total,
                    'advance' => $data->advance,
                    'eco_value' => $data->eco_value,
                    'hit' => $data->hit,
                    'total_no_tax' => SoldProduct::all()->where('sale_id', '=', $data->id)->sum('total'),
                    'total' => $data->total,
                    'saft_total' => $data->total,
                    'short_hash' => $data->short_hash,
                    'created_at' => $data->created_at,
                    'updated_at' => $data->updated_at
                ],
                'relationships' => [
                    'invoice' =>[
                        'name' => DocTypes::from($data->invoice_type_id)->name(),
                        'info' => match($data->invoice_type_id){
                            DocTypes::FR->value => InvoiceReceipt::all()->where('sale_id', '=',  $data->id)->first()->toArray(),
                            DocTypes::NC->value => CreditNote::all()->where('sale_id', '=',  $data->id)->first()->toArray(),
                            DocTypes::VD->value => SaleMoney::all()->where('sale_id', '=',  $data->id)->first()->toArray()
                        }
                    ],
                    'products' => [
                        ...$this->soldProductToArray(SoldProduct::all()
                        ->where('sale_id', '=', $data->id)
                        )
                    ],
    
                ]
            ];
        }

        return $this->collection;
    }
}
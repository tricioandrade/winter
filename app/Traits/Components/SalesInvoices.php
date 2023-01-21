<?php


namespace App\Traits\Components;

use App\Http\Resources\SalesResource;
use App\Models\Sales;
use App\Enums\DocTypes;
use App\Enums\TaxTypes;
use App\Enums\UnityOfMeasure;
use App\Traits\Resource\SaleChainTrait;

trait SalesInvoices
{
    use SaleChainTrait;
    protected object $salesInvoices;
    protected object $documentTotals;
    protected object $salesHeader;
    protected object $lines;

    private function arrayObject(): object | array {
        return new \ArrayObject([], \ArrayObject::ARRAY_AS_PROPS);
    }

    public function salesHeader()
    {
        $totalDedit     = Sales::all()->where('invoice_type_id', '!=', DocTypes::NC->value)->sum('total');
        $totalCredit    = Sales::all()->where('invoice_type_id', '=', DocTypes::NC->value)->sum('total');
        $entries        = Sales::all()->count();

        $this->salesHeader = $this->arrayObject();
        $this->salesHeader->NumberOfEntries = $entries;
        $this->salesHeader->TotalDebit = $totalDedit;
        $this->salesHeader->TotalCredit = $totalCredit;
    }

    public function getSalesHeader(): object {
        return $this->salesHeader;
    }

    public function invoices ($month = null, $date = '', $year = '') {

        $array          = $this->saleToArray(Sales::all());
        $query          = json_decode(json_encode($array));
        $totalDedit     = Sales::all()->where('invoice_type_id', '!=', DocTypes::NC->value)->sum('total');
        $totalCredit    = Sales::all()->where('invoice_type_id', '=', DocTypes::NC->value)->sum('total');
        $this->salesInvoices  =  $this->arrayObject();
        $obj            = $this->arrayObject();
        $obj->append($query);
        $entries        = Sales::all()->count();

        $this->salesInvoices = $this->arrayObject();

        foreach ($query as $key => $invoice):
            $this->salesInvoices[$key] = $this->arrayObject();
            $this->salesInvoices[$key]->Invoice = $this->arrayObject();
            $this->salesInvoices[$key]->Invoice->InvoiceNo = $invoice->attributes->invoice_number;
            $this->salesInvoices[$key]->Invoice->DocumentStatus = $this->arrayObject();
            $this->salesInvoices[$key]->Invoice->DocumentStatus->InvoiceStatus = $invoice->attributes->invoice_status;
            $this->salesInvoices[$key]->Invoice->DocumentStatus->InvoiceStatusDate = $invoice->attributes->system_entry_date;
            $this->salesInvoices[$key]->Invoice->DocumentStatus->SourceID = 'admin';
            $this->salesInvoices[$key]->Invoice->DocumentStatus->SourceBilling = 'P';

            $this->salesInvoices[$key]->Invoice->Hash = $invoice->relationships->invoice->data[0]->hash;

            $this->salesInvoices[$key]->Invoice->HashControl = 1;
            $this->salesInvoices[$key]->Invoice->Period = $invoice->attributes->month;
            $this->salesInvoices[$key]->Invoice->InvoiceDate = $invoice->attributes->date;
            $this->salesInvoices[$key]->Invoice->InvoiceType = $invoice->attributes->invoice_type_symbol;
            $this->salesInvoices[$key]->Invoice->SpecialRegimes = $this->arrayObject();
            $this->salesInvoices[$key]->Invoice->SpecialRegimes->SelfBillingIndicator = 0;
            $this->salesInvoices[$key]->Invoice->SpecialRegimes->CashVATSchemeIndicator = 0;
            $this->salesInvoices[$key]->Invoice->SpecialRegimes->ThirdPartiesBillingIndicator = 0;
            $this->salesInvoices[$key]->Invoice->SourceID = "admin";
            $this->salesInvoices[$key]->Invoice->SystemEntryDate = $invoice->attributes->system_entry_date;
            $this->salesInvoices[$key]->Invoice->CustomerID = $invoice->attributes->customer == 'Consumidor final' ? 99999999 : $invoice->attributes->customer;
            
            foreach($invoice->relationships->products as $product){    
                $this->salesInvoices[$key]->Invoice->Line = $this->arrayObject();
                $this->salesInvoices[$key]->Invoice->Line->LineNumber = $product->id + 1;
                $this->salesInvoices[$key]->Invoice->Line->ProductCode = $product->relationships->data->code;
                $this->salesInvoices[$key]->Invoice->Line->ProductDescription = $product->attributes->description;
                $this->salesInvoices[$key]->Invoice->Line->Quantity = $product->attributes->sold_quantity;
                $this->salesInvoices[$key]->Invoice->Line->UnitOfMeasure = UnityOfMeasure::from($product->relationships->data->unity_of_measure)->name;
                $this->salesInvoices[$key]->Invoice->Line->UnitPrice = $product->attributes->price_with_tax;
                $this->salesInvoices[$key]->Invoice->Line->TaxPointDate = $invoice->attributes->date;
    
                if($invoice->attributes->invoice_type_id == DocTypes::NC->value || $invoice->attributes->invoice_type_id == DocTypes::ND->value):
                    $this->salesInvoices[$key]->Invoice->Line->References = $this->arrayObject();
                    $this->salesInvoices[$key]->Invoice->Line->References->Reference = $invoice->relationships->invoice->data[0]->invoice_changed_ref;
                endif;
    
                $this->salesInvoices[$key]->Invoice->Line->Description = $product->attributes->description;
                if($invoice->attributes->invoice_type_id == DocTypes::NC->value):
                    $this->salesInvoices[$key]->Invoice->Line->DebitAmount = number_format($product->attributes->total, 2, '.' );
                else:
                    $this->salesInvoices[$key]->Invoice->Line->CreditAmount = $product->attributes->total;
                endif;
                $this->salesInvoices[$key]->Invoice->Line->Tax = $this->arrayObject();
                $this->salesInvoices[$key]->Invoice->Line->Tax->TaxType = $product->attributes->tax_type;
                $this->salesInvoices[$key]->Invoice->Line->Tax->TaxCountryRegion = 'AO';
                $this->salesInvoices[$key]->Invoice->Line->Tax->TaxCode = TaxTypes::from($product->relationships->data->tax_id)->code();
                $this->salesInvoices[$key]->Invoice->Line->Tax->TaxPercentage = $product->attributes->tax_value;
                if($product->attributes->tax_type == TaxTypes::ISE->name):
                    $this->salesInvoices[$key]->Invoice->Line->TaxExemptionReason = $product->attributes->tax_exemption_reason;
                    $this->salesInvoices[$key]->Invoice->Line->TaxExemptionCode = $product->attributes->tax_exemption_code;
                endif;
    
                $this->salesInvoices[$key]->Invoice->Line->SettlementAmount = $product->attributes->discount;
            }

            $this->salesInvoices[$key]->Invoice->DocumentTotals = $this->arrayObject();        
            if(in_array($invoice->attributes->invoice_type_id, [DocTypes::FR->value, DocTypes::NC->value, DocTypes::VD->value])):
                $this->salesInvoices[$key]->Invoice->DocumentTotals[$invoice->id] = $this->arrayObject();
                $this->salesInvoices[$key]->Invoice->DocumentTotals[$invoice->id]->Payment = $this->arrayObject();
                $this->salesInvoices[$key]->Invoice->DocumentTotals[$invoice->id]->Payment->PaymentMechanism = $invoice->attributes->payment_way;
                $this->salesInvoices[$key]->Invoice->DocumentTotals[$invoice->id]->Payment->PaymentAmount = $invoice->attributes->total;
                $this->salesInvoices[$key]->Invoice->DocumentTotals[$invoice->id]->Payment->PaymentDate = $invoice->attributes->date;
            endif;

        endforeach;

        return $this->salesInvoices;
    }

    public function getInvoices()
    {
    }
}

<?php


namespace App\Traits\Components;

use App\Http\Resources\SalesResource;
use App\Models\CreditNote;
use App\Models\InvoiceReceipt;
use App\Models\SaleMoney;
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

        $query          = json_decode(json_encode(SalesResource::collection(Sales::all())));
        $this->salesInvoices = $this->arrayObject();
        $data = new \ArrayObject([
            ...$query
        ], \ArrayObject::ARRAY_AS_PROPS);

        // dd($data);
        foreach ($data as $key => $invoice):
            $this->salesInvoices[$key] = $this->arrayObject();
            $this->salesInvoices[$key]->Invoice = $this->arrayObject();
            $this->salesInvoices[$key]->Invoice->InvoiceNo = $invoice->attributes->invoice_number;
            $this->salesInvoices[$key]->Invoice->DocumentStatus = $this->arrayObject();
            $this->salesInvoices[$key]->Invoice->DocumentStatus->InvoiceStatus = $invoice->attributes->invoice_status;
            $this->salesInvoices[$key]->Invoice->DocumentStatus->InvoiceStatusDate = $invoice->attributes->system_entry_date;
            $this->salesInvoices[$key]->Invoice->DocumentStatus->SourceID = 'admin';
            $this->salesInvoices[$key]->Invoice->DocumentStatus->SourceBilling = 'P';

            $this->salesInvoices[$key]->Invoice->Hash = $invoice->relationships->invoice->data->hash;

            $this->salesInvoices[$key]->Invoice->HashControl = 1;
            $this->salesInvoices[$key]->Invoice->Period = $invoice->attributes->month;
            $this->salesInvoices[$key]->Invoice->InvoiceDate = $invoice->attributes->saft_date;
            $this->salesInvoices[$key]->Invoice->InvoiceType = $invoice->attributes->invoice_type_symbol;
            $this->salesInvoices[$key]->Invoice->SpecialRegimes = $this->arrayObject();
            $this->salesInvoices[$key]->Invoice->SpecialRegimes->SelfBillingIndicator = 0;
            $this->salesInvoices[$key]->Invoice->SpecialRegimes->CashVATSchemeIndicator = 0;
            $this->salesInvoices[$key]->Invoice->SpecialRegimes->ThirdPartiesBillingIndicator = 0;
            $this->salesInvoices[$key]->Invoice->SourceID = "admin";
            $this->salesInvoices[$key]->Invoice->SystemEntryDate = $invoice->attributes->system_entry_date;
            $this->salesInvoices[$key]->Invoice->CustomerID = $invoice->attributes->customer == 'Consumidor final' ? 99999999 : $invoice->attributes->customer;

            $line = $this->arrayObject();
            foreach($invoice->relationships->products as $newKey => $product){
               $line[$newKey] = $this->arrayObject();
               $line[$newKey]->Line = $this->arrayObject();
               $line[$newKey]->Line->LineNumber = $newKey + 1;
               $line[$newKey]->Line->ProductCode = $product->relationships->product->code;
               $line[$newKey]->Line->ProductDescription = $product->attributes->description;
               $line[$newKey]->Line->Quantity = $product->attributes->sold_quantity;
               $line[$newKey]->Line->UnitOfMeasure = UnityOfMeasure::from($product->relationships->product->unity)->name;
               $line[$newKey]->Line->UnitPrice = number_format(floatval($product->attributes->total), 4, '.' );
               $line[$newKey]->Line->TaxPointDate = $invoice->attributes->saft_date;

                if($invoice->attributes->invoice_type_id == DocTypes::NC->value || $invoice->attributes->invoice_type_id == DocTypes::ND->value):
                   $line[$newKey]->Line->References = $this->arrayObject();
                   $line[$newKey]->Line->References->Reference = $invoice->attributes->relationships->invoice->data->invoice_changed_ref;
                endif;

               $line[$newKey]->Line->Description = $product->attributes->description;
                if($invoice->attributes->invoice_type_id == DocTypes::NC->value):
                   $line[$newKey]->Line->DebitAmount = number_format($product->attributes->total_saft, 2, '.' );
                else:
                   $line[$newKey]->Line->CreditAmount =number_format($product->attributes->total_saft, 2, '.' );
                endif;
               $line[$newKey]->Line->Tax = $this->arrayObject();
               $line[$newKey]->Line->Tax->TaxType = match($product->attributes->tax_type){
                    TaxTypes::ISE->name => 'IVA',
                    TaxTypes::IVA->name => 'IVA',
                    TaxTypes::NS->name => 'NS',
                    TaxTypes::OUT->name => 'OUT',
                    TaxTypes::IS->name => 'IS'
               };
               $line[$newKey]->Line->Tax->TaxCountryRegion = 'AO';
               $line[$newKey]->Line->Tax->TaxCode = TaxTypes::from($product->relationships->product->tax_id)->code();
               $line[$newKey]->Line->Tax->TaxPercentage = $product->attributes->tax_value;
                if($product->attributes->tax_type == TaxTypes::ISE->name):
                   $line[$newKey]->Line->TaxExemptionReason = $product->attributes->tax_exemption_reason;
                   $line[$newKey]->Line->TaxExemptionCode = $product->attributes->tax_exemption_code;
                endif;

               $line[$newKey]->Line->SettlementAmount = $product->attributes->discount;
            }
            
            $this->salesInvoices[$key]->Invoice->Line = [...$line]; 

            $this->salesInvoices[$key]->Invoice->DocumentTotals = $this->arrayObject();
            $this->salesInvoices[$key]->Invoice->DocumentTotals[$invoice->id] = $this->arrayObject();
            $this->salesInvoices[$key]->Invoice->DocumentTotals[$invoice->id]->TaxPayable = $invoice->attributes->saft_tax_total;
            $this->salesInvoices[$key]->Invoice->DocumentTotals[$invoice->id]->NetTotal   = number_format($invoice->attributes->total_no_tax, 2, '.', '') ;
            $this->salesInvoices[$key]->Invoice->DocumentTotals[$invoice->id]->GrossTotal = $invoice->attributes->saft_total;

            if(in_array($invoice->attributes->invoice_type_id, [DocTypes::FR->value, DocTypes::NC->value, DocTypes::VD->value])):
                $this->salesInvoices[$key]->Invoice->DocumentTotals[$invoice->id]->Payment = $this->arrayObject();
                $this->salesInvoices[$key]->Invoice->DocumentTotals[$invoice->id]->Payment->PaymentMechanism = $invoice->attributes->payment_way;
                $this->salesInvoices[$key]->Invoice->DocumentTotals[$invoice->id]->Payment->PaymentAmount = $invoice->attributes->saft_total;
                $this->salesInvoices[$key]->Invoice->DocumentTotals[$invoice->id]->Payment->PaymentDate = $invoice->attributes->saft_date;
            endif;
        endforeach;

        return $this->salesInvoices;
    }

    public function getInvoices()
    {
        return $this->salesInvoices;
    }
}

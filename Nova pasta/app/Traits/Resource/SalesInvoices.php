<?php


namespace App\Traits;
use App\Models\Sale;
use App\Traits\TimeTools;
use Illuminate\Support\Facades\DB;

trait SalesInvoices
{

    use TimeTools;

    protected object $salesInvoices;
    protected object $documentTotals;
    protected object $salesHeader;
    protected object $lines;

    public array $invoiceTypesTables = array(
        'FR' => 'invoice_receipts',
        'FT' => 'invoices',
        'NC' => 'credit_notes',
        'VD' => 'money_sale',
    );

    private function arrayObject(): object | array {
        return new \ArrayObject([], \ArrayObject::ARRAY_AS_PROPS);
    }

    public function invoiceTotal(): object | array
    {
        return new \ArrayObject([
           'NumberOfEntries' =>
               DB::select("select COUNT(sales.id) as NumberOfEntries from sales")[0]->NumberOfEntries,
           'TotalDebit' =>
               DB::select("select SUM(debit) as TotalDebit from sales  where invoice_type_ref <> 'NC'")[0]->TotalDebit,
           'TotalCredit' =>
               DB::select("select SUM(sales.total) as TotalCredit from sales ")[0]->TotalCredit
        ], \ArrayObject::ARRAY_AS_PROPS);
    }

    public function payments(int $sale_id): object | array
    {
        return DB::select("
            select  COUNT(id) as NumberOfEntries,
                   (select SUM(total) where invoice_type_ref <> 'NC') as TotalCredit,
                   (select SUM(debit) ) as TotalDebit
            from sales ");
    }

    public function changedInvoiceNumber($table, $invoiceRef): array | object
    {
        return DB::select(" select  invoice_changed_ref from ${table} where invoice_ref = '${invoiceRef}'
            ");
    }

    public function documentTotalsSum(int $sale_id): array | object
    {
        return new \ArrayObject([
            'TaxPayable' =>
                DB::select("select SUM(sold_products.total_added_tax) as TaxPayable from sold_products where sale_id = {$sale_id}")[0]->TaxPayable,
            'GrossTotal' =>
                DB::select("select SUM(total_with_tax) as GrossTotal from sold_products where sale_id = {$sale_id}")[0]->GrossTotal,
            'NetTotal' =>
                DB::select("select  SUM(total) as NetTotal from sold_products where sale_id = {$sale_id}")[0]->NetTotal
        ], \ArrayObject::ARRAY_AS_PROPS);
    }

    public function salesHeader()
    {
        $data = $this->invoiceTotal();
        $this->salesHeader = $this->arrayObject();
        $this->salesHeader->NumberOfEntries =$data->NumberOfEntries;
        $this->salesHeader->TotalDebit = $data->TotalDebit;
        $this->salesHeader->TotalCredit = $data->TotalCredit;
    }

    public function invoices ($month = null, $date = '', $year = ''): object {

        
        $query = SalesResource::collection(Sales::all());
        $totalDedit = Sales::all()->where('invoice_type_id', '!=', DocTypes::NC->value)->sum('total');
        $totalCredit = Sales::all()->where('invoice_type_id', '=', DocTypes::NC->value)->sum('total');
        $salesInvoices = new \ArrayObject([], \ArrayObject::STD_PROP_LIST);

        foreach ($query as $invoice):
            $this->salesInvoices[$invoice->id] = $this->arrayObject();
            $this->salesInvoices[$invoice->id]->NumberOfEntries = $this->arrayObject();
            $this->salesInvoices[$invoice->id]->TotalDebit = $this->arrayObject();
            $this->salesInvoices[$invoice->id]->TotalCredit = $this->arrayObject();
            $this->salesInvoices[$invoice->id]->Invoice = $this->arrayObject();
            $this->salesInvoices[$invoice->id]->Invoice->InvoiceNo = $invoice->invoice_number;
            $this->salesInvoices[$invoice->id]->Invoice->DocumentStatus = $this->arrayObject();
            $this->salesInvoices[$invoice->id]->Invoice->DocumentStatus->InvoiceStatus = $invoice->invoice_status;
            $this->salesInvoices[$invoice->id]->Invoice->DocumentStatus->InvoiceStatusDate = $invoice->system_entry_date;
            $this->salesInvoices[$invoice->id]->Invoice->DocumentStatus->SourceID = 'admin';
            $this->salesInvoices[$invoice->id]->Invoice->DocumentStatus->SourceBilling = 'P';

            $this->salesInvoices[$invoice->id]->Invoice->Hash = $invoice->hash;

            $this->salesInvoices[$invoice->id]->Invoice->HashControl = 1;
            $this->salesInvoices[$invoice->id]->Invoice->Period = $invoice->month;
            $this->salesInvoices[$invoice->id]->Invoice->InvoiceDate = $invoice->date;
            $this->salesInvoices[$invoice->id]->Invoice->InvoiceType = $invoice->invoice_type_ref;
            $this->salesInvoices[$invoice->id]->Invoice->SpecialRegimes = $this->arrayObject();
            $this->salesInvoices[$invoice->id]->Invoice->SpecialRegimes->SelfBillingIndicator = 0;
            $this->salesInvoices[$invoice->id]->Invoice->SpecialRegimes->CashVATSchemeIndicator = 0;
            $this->salesInvoices[$invoice->id]->Invoice->SpecialRegimes->ThirdPartiesBillingIndicator = 0;
            $this->salesInvoices[$invoice->id]->Invoice->SourceID = "admin";
            $this->salesInvoices[$invoice->id]->Invoice->SystemEntryDate = $invoice->system_entry_date;
            $this->salesInvoices[$invoice->id]->Invoice->CustomerID = $invoice->customer;


            $this->salesInvoices[$invoice->id]->Invoice->Line = $this->Lines($invoice);;

            $this->salesInvoices[$invoice->id]->Invoice->DocumentTotals = $this->documentTotals($invoice);;

        endforeach;

        return $this->salesInvoices;
    }

    public function Lines(array | object $invoice): array | object{
        $line = 1;
        $this->lines = $this->arrayObject();
        $products = $this->soldProductsQuery($invoice->id);
        foreach ($products as $i => $product):
            $this->lines[$i] = $this->arrayObject();
            $this->lines[$i]->Line = $this->arrayObject();
            $this->lines[$i]->Line->LineNumber = $line;
            $this->lines[$i]->Line->ProductCode = $product->stock_generated_code ??  $product->stock_ref_code;
            $this->lines[$i]->Line->ProductDescription = $product->stock_description;
            $this->lines[$i]->Line->Quantity = $product->sold_quantity;
            $this->lines[$i]->Line->UnitOfMeasure = $product->sale_type;
            $this->lines[$i]->Line->UnitPrice = $product->stock_price;
            $this->lines[$i]->Line->TaxPointDate = $invoice->date;

            if($invoice->invoice_type_ref == 'NC' || $invoice->invoice_type_ref == 'ND'):
                $this->lines[$i]->Line->References = $this->arrayObject();

                $this->lines[$i]->Line->References->Reference = $this->changedInvoiceNumber(
                    $this->invoiceTypesTables[$invoice->invoice_type_ref],
                    $invoice->invoice_number
                );

            endif;

            $this->lines[$i]->Line->Description = $product->stock_description;
            if($invoice->invoice_type_ref == 'NC'):
                $this->lines[$i]->Line->DebitAmount = number_format($product->sold_total_with_tax, 2, '.' );
            else:
                $this->lines[$i]->Line->CreditAmount = $product->sold_total_with_tax;
            endif;
            $this->lines[$i]->Line->Tax = $this->arrayObject();
            $this->lines[$i]->Line->Tax->TaxType = $product->tax_type;
            $this->lines[$i]->Line->Tax->TaxCountryRegion = 'AO';
            $this->lines[$i]->Line->Tax->TaxCode = $product->tax_code;
            $this->lines[$i]->Line->Tax->TaxPercentage = $product->stock_tax_value;
            if($product->tax_code ==  'ISE'):
                $this->lines[$i]->Line->TaxExemptionReason = $product->stock_exemption_reason;
                $this->lines[$i]->Line->TaxExemptionCode = $product->stock_exemption_code;
            endif;

            $this->lines[$i]->Line->SettlementAmount = $product->sold_discount > 0 ? $product->sold_discount : 0;
            $line++;
        endforeach;
        return $this->lines;
    }

    public function documentTotals(array | object $invoice): array | object{

        $this->documentTotals = $this->arrayObject();
        $this->documentTotals[$invoice->id] = $this->arrayObject();

        $totals = $this->documentTotalsSum($invoice->id);
        $this->documentTotals[$invoice->id]->TaxPayable = $totals->TaxPayable;
        $this->documentTotals[$invoice->id]->NetTotal = number_format($totals->NetTotal ?? 00.0, 2, '.', '') ;
        $this->documentTotals[$invoice->id]->GrossTotal = $totals->GrossTotal;

        if(in_array($invoice->invoice_type_ref, ['FR', 'NC', 'VD'])):
            $this->documentTotals[$invoice->id]->Payment = $this->arrayObject();;
            $this->documentTotals[$invoice->id]->Payment->PaymentMechanism = $invoice->payment_method;
            $this->documentTotals[$invoice->id]->Payment->PaymentAmount = $invoice->total;
            $this->documentTotals[$invoice->id]->Payment->PaymentDate = $invoice->date;
        endif;

        return $this->documentTotals;
    }

    public function getSalesHeader(): object {
        return $this->salesHeader;
    }


}

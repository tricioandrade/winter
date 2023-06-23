<?php


namespace App\Traits\Components;


use App\Http\Controllers\Documents\SaftProperties;
use Illuminate\Support\Arr;

trait WorkingDocuments
{
    public object $WorkDocument;
    public object $Line;
    public object $workHeader;
    public object $documentTotals;
    public object $payments;
    public object $receipts;

    /**
     * @return object
     */
    public function workHeader(SaftProperties $properties)
    {
        $data = $properties->workTotal()[0];
        $this->workHeader = new \ArrayObject([], \ArrayObject::ARRAY_AS_PROPS);
        $this->workHeader->NumberOfEntries = $data->NumberOfEntries;
        $this->workHeader->TotalCredit = $data->TotalCredit;
        $this->workHeader->TotalDebit  = 0;
    }


    public function init(SaftProperties $properties)
    {
        $this->WorkDocument = new \ArrayObject([], \ArrayObject::ARRAY_AS_PROPS);
        foreach ($properties->workDocs() as $key => $value):
            $this->WorkDocument[$key] = new  \ArrayObject([], \ArrayObject::ARRAY_AS_PROPS);
            $this->WorkDocument[$key]->WorkDocument = new  \ArrayObject([], \ArrayObject::ARRAY_AS_PROPS);
            $this->WorkDocument[$key]->WorkDocument->DocumentNumber = $value->invoiceID;
            $this->WorkDocument[$key]->WorkDocument->DocumentStatus = new  \ArrayObject([], \ArrayObject::ARRAY_AS_PROPS);;
            $this->WorkDocument[$key]->WorkDocument->DocumentStatus->WorkStatus = $value->estado;
            $this->WorkDocument[$key]->WorkDocument->DocumentStatus->WorkStatusDate = $value->data;
            $this->WorkDocument[$key]->WorkDocument->DocumentStatus->SourceID = 'admin';
            $this->WorkDocument[$key]->WorkDocument->DocumentStatus->SourceBilling = 'P';
            $this->WorkDocument[$key]->WorkDocument->Hash = $value->hash;
            $this->WorkDocument[$key]->WorkDocument->HashControl = 1;
            $this->WorkDocument[$key]->WorkDocument->Period = $properties->getPeriodo($value->data);
            $this->WorkDocument[$key]->WorkDocument->WorkDate = $value->data;
            $this->WorkDocument[$key]->WorkDocument->WorkType = $value->invoiceType;
            $this->WorkDocument[$key]->WorkDocument->SourceID = 'admin';
            $this->WorkDocument[$key]->WorkDocument->SystemEntryDate = $value->systemDateT;
            $this->WorkDocument[$key]->WorkDocument->CustomerID = $value->cliente;


            $this->Line($value, $properties);
            $this->WorkDocument[$key]->WorkDocument->Line = $this->getLine();

            $this->documentTotals($key, $value, $properties);
            $this->WorkDocument[$key]->WorkDocument->DocumentTotals = new \ArrayObject([], \ArrayObject::ARRAY_AS_PROPS);
            $this->WorkDocument[$key]->WorkDocument->DocumentTotals = $this->getDocumentTotals();
        endforeach;
    }

    public function Line($invoice, $properties){
        $line = 1;
        $this->Line = new \ArrayObject([], \ArrayObject::ARRAY_AS_PROPS);
        $products = $properties->ProductInfoFiltered($invoice->venda_id);
        foreach ($products as $i => $product):
            $this->Line[$i] = new \ArrayObject([], \ArrayObject::ARRAY_AS_PROPS);
            $this->Line[$i]->Line = new \ArrayObject([], \ArrayObject::ARRAY_AS_PROPS);
            $this->Line[$i]->Line->LineNumber = $line;
            $this->Line[$i]->Line->ProductCode = $product->codigo;
            $this->Line[$i]->Line->ProductDescription = $product->descricao;
            $this->Line[$i]->Line->Quantity = $product->quantidade;
            $this->Line[$i]->Line->UnitOfMeasure = $product->unidade;
            $this->Line[$i]->Line->UnitPrice = $product->preco;
            $this->Line[$i]->Line->TaxPointDate = $invoice->data;
            $this->Line[$i]->Line->Description = $product->descricao;
            $this->Line[$i]->Line->CreditAmount = $product->artigostotalLiquido;
            $this->Line[$i]->Line->Tax = new \ArrayObject([], \ArrayObject::ARRAY_AS_PROPS);
            $this->Line[$i]->Line->Tax->TaxType = $product->simboloImposto;
            $this->Line[$i]->Line->Tax->TaxCountryRegion = 'AO';
            $this->Line[$i]->Line->Tax->TaxCode = $product->codigoImposto;
            $this->Line[$i]->Line->Tax->TaxPercentage = $product->imposto;
            $this->Line[$i]->Line->SettlementAmount = 0;
            $line++;
        endforeach;
    }

    public function documentTotals (int $key, object $invoice, object $properties){
        $this->documentTotals = new \ArrayObject([], \ArrayObject::ARRAY_AS_PROPS);
        $this->documentTotals[$key] = new \ArrayObject([], \ArrayObject::ARRAY_AS_PROPS);

        $totals = $properties->documentTotals(invoice: $invoice->invoiceID);
        $this->documentTotals[$key]->TaxPayable = $totals[0]->TaxPayable;
        $this->documentTotals[$key]->NetTotal = number_format($totals[0]->NetTotal ?? 00.0, 2, '.', '') ;
        $this->documentTotals[$key]->GrossTotal = $totals[0]->GrossTotal;
    }

    public function Payments(SaftProperties $properties){

        $this->payments = new \ArrayObject([], \ArrayObject::ARRAY_AS_PROPS);
        foreach($properties->allPayments() as $key => $payment):
            $this->payments[$key] = new \ArrayObject([], \ArrayObject::ARRAY_AS_PROPS);
            $this->payments[$key]->Payment = new \ArrayObject([], \ArrayObject::ARRAY_AS_PROPS);
            $this->payments[$key]->Payment->PaymentRefNo = $payment->numero;
            $this->payments[$key]->Payment->TransactionDate = $payment->data;
            $this->payments[$key]->Payment->PaymentType = $payment->tipo_de_pagamento;
            $this->payments[$key]->Payment->DocumentStatus = new \ArrayObject([], \ArrayObject::ARRAY_AS_PROPS);
            $this->payments[$key]->Payment->DocumentStatus->PaymentStatus = $payment->estado;
            $this->payments[$key]->Payment->DocumentStatus->PaymentStatusDate = $payment->data;
            $this->payments[$key]->Payment->DocumentStatus->SourceID = 'admin';
            $this->payments[$key]->Payment->DocumentStatus->SourcePayment = 'P';
            $this->payments[$key]->Payment->PaymentMethod =  new \ArrayObject([], \ArrayObject::ARRAY_AS_PROPS);
            $this->payments[$key]->Payment->PaymentMethod->PaymentMechanism = $payment->meio_de_pagamento;
            $this->payments[$key]->Payment->PaymentMethod->PaymentAmount = $payment->montante;
            $this->payments[$key]->Payment->PaymentMethod->PaymentDate = $payment->data;
            $this->payments[$key]->Payment->SourceID = 'admin';
            $this->payments[$key]->Payment->SystemEntryDate = $payment->systemDateT;
            $this->payments[$key]->Payment->CustomerID = $payment->cliente;

            $this->receipt($payment->id, $properties);
            $this->payments[$key]->Payment->Line = $this->getReceipts() ;
            $this->payments[$key]->Payment->DocumentTotals = $this->paymentTotals($payment);
        endforeach;

    }

    public function paymentTotals($payment)
    {
        $document = new \ArrayObject([], \ArrayObject::ARRAY_AS_PROPS);
        $document[0] = new \ArrayObject([], \ArrayObject::ARRAY_AS_PROPS);
        $document[0]->TaxPayable = $payment->valorAcrescentado;
        $document[0]->NetTotal = $payment->montante;
        $document[0]->GrossTotal = $payment->totalComImposto;

        return $document;
    }

    public function receipt($id, $properties){
        $linha = 1;
        $this->receipts = new \ArrayObject([], \ArrayObject::ARRAY_AS_PROPS);
        foreach($properties->receipts($id) as $key => $data):
            $this->receipts[$key] = new \ArrayObject([], \ArrayObject::ARRAY_AS_PROPS);
            $this->receipts[$key]->Line = new \ArrayObject([], \ArrayObject::ARRAY_AS_PROPS);
            $this->receipts[$key]->Line->LineNumber = $linha;
            $this->receipts[$key]->Line->SourceDocumentID = new \ArrayObject([], \ArrayObject::ARRAY_AS_PROPS);
            $this->receipts[$key]->Line->SourceDocumentID->OriginatingON = $data->fatura;
            $this->receipts[$key]->Line->SourceDocumentID->InvoiceDate = $data->data;
            $this->receipts[$key]->Line->CreditAmount = $data->totalLiquido;
            $this->receipts[$key]->Line->Tax = new \ArrayObject([], \ArrayObject::ARRAY_AS_PROPS);
            $this->receipts[$key]->Line->Tax->TaxType = $data->tipoImposto;
            $this->receipts[$key]->Line->Tax->TaxCountryRegion = 'AO';
            $this->receipts[$key]->Line->Tax->TaxCode = $data->codigoImposto;
            $this->receipts[$key]->Line->Tax->TaxPercentage = $data->valorDoImposto;
            $linha++;
        endforeach;
    }

    public function getLine(){ return $this->Line; }
    public function getReceipts(): object { return $this->receipts;}
    public function getPayments(): object{return $this->payments;}
    public function getworkHeader(): object { return $this->workHeader; }
    public function getWorkDocument(): object { return $this->WorkDocument; }
    public function getDocumentTotals(): object { return $this->documentTotals; }

}

<?php

namespace App\Http\Controllers;

use App\Enums\DocTypes;
use App\Http\Resources\SalesResource;
use App\Models\Company;
use App\Models\InvoiceReceipt;
use App\Models\Sales;
use App\Models\SoldProduct;
use App\Traits\DocumentTrait;
use App\Traits\HttpResponseTrait;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class SalesController extends Controller
{
    use HttpResponseTrait;
    use DocumentTrait;


    public function store(Request $request): \Illuminate\Http\JsonResponse
    {
        $invoiceData = ($request->all())['invoice'];
        $soldProducts = ($request->all())['soldProducts'];
        DB::beginTransaction();
        try{

            $generatedData = $this->genInvoiceNumber($invoiceData['invoice_type_id'],$invoiceData['total']);

            $invoiceData['company_id']          = 1;
            $invoiceData['user_id']             = Auth::user()->id;
            $invoiceData['document_type_id']    = $invoiceData['invoice_type_id'];

            $invoiceData['date']            = $generatedData['database_date'];
            $invoiceData['day']             = $generatedData['day'];
            $invoiceData['expiration_date'] = $generatedData['expiration_date'];
            $invoiceData['invoice_code']    = $generatedData['invoice_code'];
            $invoiceData['invoice_number'] = $generatedData['invoice_number'];
            $invoiceData['month'] = $generatedData['month_period'];
            $invoiceData['process_number'] = $generatedData['process_number'];
            $invoiceData['short_hash'] = $generatedData['short_hash'];
            $invoiceData['system_entry_date'] = $generatedData['system_entry_date'];

            $data = Sales::create($invoiceData);

            foreach ($soldProducts as $key => $value) {
                $soldProducts[$key]['sale_id'] = $data->sale_id;
                unset($soldProducts[$key]['for_sale_quantity']);
                unset($soldProducts[$key]['for_sale_status']);
                unset($soldProducts[$key]['code']);
            }

            SoldProduct::create(
                $soldProducts
            );

            switch ($invoiceData['invoice_type_id']):
                case DocTypes::FR:
                        InvoiceReceipt::create([
                        'sale_id' => $data->sale_id,
                        'hash' => $generatedData['hash'],
                        'invoice_ref' => $generatedData['invoice_code'],
                        'date' => $invoiceData['date'],
                        ]);
                    break;
            endswitch;
            DB::commit();
            return $this->success(new SalesResource(Sales::where('id', '=', $data->id)));
        }catch (\Throwable $exception){
            DB::rollBack();
            return $this->error($request->all(), $exception);
        }
    }
}

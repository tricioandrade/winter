<?php

namespace App\Http\Controllers;

use App\Enums\DocTypes;
use App\Models\Company;
use App\Models\Sales;
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
//        DB::beginTransaction();
        try{

            $invoiceData['company_id']          = (Company::all())[0]->id;
            $invoiceData['user_id']             = Auth::user()->id;
            $invoiceData['document_type_id']    = $invoiceData['invoice_type_id'];
            $invoiceData['day']                 = $invoiceData['invoice_type_id'];
            $invoiceData['month']               = $invoiceData['invoice_type_id'];
            $invoiceData['date']                = $invoiceData['invoice_type_id'];
            $invoiceData['expiration_date']     = $invoiceData['invoice_type_id'];
            $invoiceData['short_hash']          = $invoiceData['invoice_type_id'];
            $invoiceData['system_entry_date']   = $invoiceData['invoice_type_id'];

//            $data = Sales::create($invoiceData);


//            DB::commit();
            return $this->success($this->genInvoiceNumber($invoiceData['invoice_type_id'],
                $invoiceData['total']
            ));
        }catch (\Throwable $exception){
//            DB::rollBack();
            return $this->error($request->all(), $exception);
        }
    }
}

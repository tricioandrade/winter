<?php

namespace App\Http\Controllers;

use App\Enums\DocTypes;
use App\Http\Resources\SalesResource;
use App\Http\Resources\SoldProductResource;
use App\Models\Company;
use App\Models\CreditNote;
use App\Models\InvoiceReceipt;
use App\Models\Product;
use App\Models\SaleMoney;
use App\Models\Sales;
use App\Models\SoldProduct;
use App\Traits\DocumentTrait;
use App\Traits\HttpResponseTrait;
use App\Traits\PrivilegeTrait;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class SalesController extends Controller
{
    use HttpResponseTrait;
    use DocumentTrait;
    use PrivilegeTrait;

    public function __construct()
    {
        $this->middleware('auth');
    }

    public function invoices() {
        try{
            return $this->returnIfAdmin(SalesResource::collection(Sales::all()));
       }catch(\Throwable $exception){
            return $this->error('', $exception);
       }
    }

    public function store(Request $request): \Illuminate\Http\JsonResponse
    {
        $invoiceData = ($request->all())['invoice'];
        $soldProducts = ($request->all())['soldProducts'];
        DB::beginTransaction();
        try{

            $generatedData = $this->genInvoiceNumber($invoiceData['invoice_type_id'],$invoiceData['total']);

            $invoiceData['company_id']          = (Company::all())[0]->id;
            $invoiceData['user_id']             = Auth::user()->id;
            $invoiceData['date']                = $generatedData['database_date'];
            $invoiceData['day']                 = $generatedData['day'];
            $invoiceData['expiration_date']     = $generatedData['expiration_date'];
            $invoiceData['invoice_code']        = $generatedData['invoice_code'];
            $invoiceData['invoice_number']      = $generatedData['invoice_number'];
            $invoiceData['month']               = $generatedData['month_period'];
            $invoiceData['process_number']      = $generatedData['process_number'];
            $invoiceData['short_hash']          = $generatedData['short_hash'];
            $invoiceData['system_entry_date']   = $generatedData['system_entry_date'];

            $data = Sales::create($invoiceData);

            foreach ($soldProducts as $key => $value) {
                $soldProducts[$key]['sale_id'] = $data->id;

                SoldProduct::create($soldProducts[$key]);
                Product::where('id', '=', $soldProducts[$key]['product_id'])
                    ->update(['stock_quantity' =>
                        ($soldProducts[$key]['stock_quantity'] - $soldProducts[$key]['sold_quantity'])]);
            }

            switch ($invoiceData['invoice_type_id']):
                case DocTypes::FR->value:
                    InvoiceReceipt::create([
                        'sale_id' => $data->id,
                        'saft_number' => $generatedData['invoice_code'],
                        'hash' => $generatedData['hash'],
                        'invoice_ref' => $generatedData['invoice_code'],
                        'date' => $invoiceData['date'],
                    ]);
                case DocTypes::VD->value:
                    SaleMoney::create([
                        'sale_id' => $data->id,
                        'saft_number' => $generatedData['invoice_code'],
                        'hash' => $generatedData['hash'],
                        'invoice_ref' => $generatedData['invoice_code'],
                        'date' => $invoiceData['date'],
                    ]);
                break;
                case DocTypes::NC->value:
                    CreditNote::create([
                        'sale_id' => $data->id,
                        'saft_number' => $generatedData['saft_number'],
                        'hash' => $generatedData['hash'],
                        'invoice_ref' => $generatedData['invoice_ref'],
                        'invoice_changed_ref' => $invoiceData['invoice_changed_ref'],
                        'type_of_change' => $invoiceData['type_of_change'],
                        'date' => $generatedData['date'],
                    ]);
                break;
            endswitch;

            DB::commit();
            return $this->success(new SalesResource($data));
        }catch (\Throwable $exception){
            DB::rollBack();
            return $this->error($request->all(), $exception);
        }
    }
}

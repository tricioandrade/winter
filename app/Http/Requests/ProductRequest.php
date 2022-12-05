<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ProductRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            'name'                  =>  'string',
            'description'           =>  'string',
            'code'                  =>  'string|numeric',
            'storage_id'            =>  'integer',
            'stock_quantity'        =>  'integer',
            'unity_quantity'        =>  'integer',
            'for_sale_quantity'     =>  'integer|nullable',
            'for_sale_status'       =>  'string',
            'unity_of_measure'      =>  'integer',
            'price'                 =>  'numeric',
            'price_with_tax'        =>  'numeric',
            'promotional_price'     =>  'nullable|numeric',
            'promotional_status'    =>  'nullable|string',
            'tax_type_id'           =>  'integer',
            'tax_value'             =>  'integer',
            'tax_total_added'       =>  'numeric',
            'tax_exemption_code'    =>  'string',
            'tax_exemption_reason'  =>  'string',
        ];
    }
}

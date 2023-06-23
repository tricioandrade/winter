<?php


namespace App\Traits\Generator;


use Illuminate\Support\Facades\DB;

trait ProductDetails
{
    public function productDetails($productType, $taxValue, $price) {
        $productCode = $productType .'-'. bin2hex(random_bytes(5));

        $taxAdded =  $price * $taxValue / 100;
        $priceTaxAdded =  ($price * $taxValue / 100) + $price;

        return new \ArrayObject([
            'price_tax' =>  $priceTaxAdded,
            'generated_code' => $productCode,
            'tax_added' => $taxAdded
        ], \ArrayObject::ARRAY_AS_PROPS);
    }
}

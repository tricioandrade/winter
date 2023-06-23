<?php


namespace App\Traits\Components;

use App\Enums\ProductTypes;
use App\Models\Customer;
use App\Models\Product;
use App\Models\Sales;
use App\Models\StockProduct;

trait MasterFiles
{
    private object $customer;
    private object $product;

    public function Customer (){
        $this->customer = new \ArrayObject([], \ArrayObject::ARRAY_AS_PROPS);
        foreach (Sales::all()->where('customer', '!=', 'Consumidor Final') as $index => $customer):
            $this->customer[$index]->Customer =  new \ArrayObject([], \ArrayObject::ARRAY_AS_PROPS);
            $this->customer[$index]->Customer->CustomerID =  $customer->codigo ?? 'O99999999';
            $this->customer[$index]->Customer->AccountID =  $customer->nif ?? "999999990";
            $this->customer[$index]->Customer->CustomerTaxID = $customer->contribuinte ?? "XXXXXXXXXXX";
            $this->customer[$index]->Customer->CompanyName = $customer->nome ?? "Desconhecido";
            $this->customer[$index]->Customer->BillingAddress = new \ArrayObject([], \ArrayObject::ARRAY_AS_PROPS);
            $this->customer[$index]->Customer->BillingAddress->AddressDetail = $customer->endereco ?? "Desconhecido";
            $this->customer[$index]->Customer->BillingAddress->City = $customer->cidade ?? "Desconhecido";
            $this->customer[$index]->Customer->BillingAddress->Country = 'AO';
            $this->customer[$index]->Customer->ShipToAddress = new \ArrayObject([], \ArrayObject::ARRAY_AS_PROPS);
            $this->customer[$index]->Customer->ShipToAddress->AddressDetail = $customer->endereco ?? "Desconhecido";
            $this->customer[$index]->Customer->ShipToAddress->City = $customer->cidade ?? "Desconhecido";
            $this->customer[$index]->Customer->ShipToAddress->Country = 'AO';
            $this->customer[$index]->Customer->SelfBillingIndicator = $customer->lop ?? "Desconhecido";
        endforeach;
    }

    public function Product(){
        $this->product = new \ArrayObject([], \ArrayObject::ARRAY_AS_PROPS);
        foreach (Product::all() as $product):
            $this->product[$product->id] = new \ArrayObject([], \ArrayObject::ARRAY_AS_PROPS);
            $this->product[$product->id]->Product = new \ArrayObject([], \ArrayObject::ARRAY_AS_PROPS);
            $this->product[$product->id]->Product->ProductType = ProductTypes::from($product->product_type_id)->name();
            $this->product[$product->id]->Product->ProductCode = $product->code;
            $this->product[$product->id]->Product->ProductGroup =  ProductTypes::from($product->product_type_id)->name;
            $this->product[$product->id]->Product->ProductDescription = $product->description;
            $this->product[$product->id]->Product->ProductNumberCode = $product->code  ?? '';
            $this->product[$product->id]->Product->CustomsDetails = '';
        endforeach;
    }


    /**
     * @return object
     */
    public function getCustomer(): object {
        return $this->customer;
    }

    /**
     * @return object
     */
    public function getProduct(): object{
        return $this->product;
    }
}

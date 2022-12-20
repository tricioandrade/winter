<?php

namespace Database\Seeders;

use App\Enums\ProductTypes;
use App\Models\ProductType;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ProductTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        ProductType::create(
                [
                    'name' => ProductTypes::from(ProductTypes::P->value)->name(),
                    'symbol' => ProductTypes::from(ProductTypes::P->value)->symbol(),
                ]
        );

        ProductType::create(
            [
                'name' => ProductTypes::from(ProductTypes::S->value)->name(),
                'symbol' => ProductTypes::from(ProductTypes::S->value)->symbol(),
            ]
        );


    }
}

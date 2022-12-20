<?php

namespace Database\Factories;

use App\Enums\ProductTypes;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\ProductType>
 */
class ProductTypeFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            [
                'name' => ProductTypes::from(ProductTypes::P->value)->name(),
                'symbol' => ProductTypes::from(ProductTypes::P->value)->symbol(),
            ],
            [
                'name' => ProductTypes::from(ProductTypes::S->value)->name(),
                'symbol' => ProductTypes::from(ProductTypes::S->value)->symbol(),
            ],
        ];
    }
}

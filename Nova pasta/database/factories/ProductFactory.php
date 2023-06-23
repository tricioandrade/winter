<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Product>
 */
class ProductFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $taxValues = $this->faker->randomElement( [
            14,
            7,
            0,
            5
        ]);

        $tax_id = $taxValues > 0 ? 2 : 1;
        $price = $this->faker->randomFloat(4, 2, 4);
        $price_with_tax = $price * $taxValues / 100 + $price;
        $tax_added = $price * $taxValues / 100;

        return [
            'user_id' => 1,
            'name' => $this->faker->unique()->text('10'),
            'description' => $this->faker->text(),
            'code' => $this->faker->unique()->ean13(),
            'stock_quantity' => $this->faker->randomNumber(4),
            'unity_quantity' => $this->faker->randomNumber(4),
            'for_sale_quantity' => $this->faker->randomNumber(4),
            'for_sale_status' => $this->faker->numberBetween(1, 0),
            'unity_of_measure' => 1,
            'price' => $price,
            'price_with_tax' => $price_with_tax,
            'product_type_id' =>  1,
            'promotional_price' => 0,
            'promotional_status' => 0,
            'tax_id' => $taxValues > 0 ? 1 : 2,
            'tax_value' => $taxValues,
            'tax_total_added' => $tax_added,
            'tax_exemption_code' => $taxValues > 0 ? 'NÃO_APLICA' : 'M-00',
            'tax_exemption_reason' =>  $taxValues > 0 ?  'NÃO_APLICA' : 'Isento sob termos',
        ];
    }
}

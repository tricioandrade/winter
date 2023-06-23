<?php

namespace Database\Factories;

use App\Enums\TaxTypes;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Tax>
 */
class TaxFactory extends Factory
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
                'name' => TaxTypes::from(1)->name(),
                'description' =>  TaxTypes::from(1)->description(),
                'symbol' =>  TaxTypes::from(1)->symbol(),
            ],
            [
                'name' => TaxTypes::from(2)->name(),
                'description' =>  TaxTypes::from(2)->description(),
                'symbol' =>  TaxTypes::from(2)->symbol(),
            ],
            [
                'name' => TaxTypes::from(3)->name(),
                'description' =>  TaxTypes::from(3)->description(),
                'symbol' =>  TaxTypes::from(3)->symbol(),
            ],
            [
                'name' => TaxTypes::from(4)->name(),
                'description' =>  TaxTypes::from(4)->description(),
                'symbol' =>  TaxTypes::from(4)->symbol(),
            ],
            [
                'name' => TaxTypes::from(5)->name(),
                'description' =>  TaxTypes::from(5)->description(),
                'symbol' =>  TaxTypes::from(5)->symbol(),
            ]
        ];
    }
}

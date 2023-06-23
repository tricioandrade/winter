<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Company>
 */
class CompanyFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'name' => $this->faker->company,
            'nif' => $this->faker->isbn10(),
            'currency' => $this->faker->currencyCode,
            'designation' => $this->faker->text('100'),
            'port' => $this->faker->numerify,
            'address' => $this->faker->address,
            'street' => $this->faker->streetAddress,
            'fulladdress' => $this->faker->address,
            'city' => $this->faker->city,
            'country' => $this->faker->country,
            'email' => $this->faker->companyEmail,
            'fiscal_year' => $this->faker->year,
            'phone' => $this->faker->phoneNumber,
            'iban' => $this->faker->iban(prefix: 'AO06'),
            'created_at' => $this->faker->dateTime,
            'updated_at' => $this->faker->dateTime,
        ];
    }
}

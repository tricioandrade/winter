<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\App>
 */
class AppFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'name' => 'Outono ERP',
            'licence' => '31/AGT2022',
            'entity' => 'General Business Consulting',
            'nif' => '542908290',
            'year' => '2023',
            'version' => '2.0',
            'description' => 'Software de Facturação',
        ];
    }
}

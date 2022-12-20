<?php

namespace Database\Seeders;

use App\Enums\TaxTypes;
use App\Models\Tax;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class TaxSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        print_r( TaxTypes::from(4)->name());
        Tax::create(
               [
                   'name' => TaxTypes::from(1)->name(),
                   'description' =>  TaxTypes::from(1)->description(),
                   'symbol' =>  TaxTypes::from(1)->symbol(),
               ]
        );
        Tax::create(
            [
                   'name' => TaxTypes::from(2)->name(),
                   'description' =>  TaxTypes::from(2)->description(),
                   'symbol' =>  TaxTypes::from(2)->symbol(),
               ],
        );
        Tax::create(
            [
                   'name' => TaxTypes::from(3)->name(),
                   'description' =>  TaxTypes::from(3)->description(),
                   'symbol' =>  TaxTypes::from(3)->symbol(),
               ]
        );
        Tax::create(
            [
                   'name' => TaxTypes::from(4)->name(),
                   'description' =>  TaxTypes::from(4)->description(),
                   'symbol' =>  TaxTypes::from(4)->symbol(),
               ]
        );
        Tax::create(
            [
                   'name' => TaxTypes::from(5)->name(),
                   'description' =>  TaxTypes::from(5)->description(),
                   'symbol' =>  TaxTypes::from(5)->symbol(),
               ]
        );
    }
}

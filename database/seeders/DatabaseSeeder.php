<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $this->call([
            UserSeeder::class,
            TaxSeeder::class,
            ProductTypeSeeder::class,
            CompanySeeder::class,
            ProductSeeder::class,
            AppSeeder::class,
            PrivilegeSeeder::class
        ]);
    }
}

<?php

namespace Database\Seeders;

use App\Models\Privilege;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PrivilegeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Privilege::create(
            [
                'user_id' => 1,
                'privilege' => 1                
            ],
            [
                'user_id' => 2,
                'privilege' => 1                
            ],
            [
                'user_id' => 3,
                'privilege' => 1                
            ],
            [
                'user_id' => 4,
                'privilege' => 1                
            ]
        );
    }
}

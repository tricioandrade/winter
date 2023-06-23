<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Company extends Model
{
    use HasFactory;


    protected $fillable = [
        'id',
        'name',
        'nif',
        'currency',
        'designation',
        'port',
        'address',
        'street',
        'fulladdress',
        'city',
        'country',
        'email',
        'fiscal_year',
        'phone',
        'iban'
    ];

}

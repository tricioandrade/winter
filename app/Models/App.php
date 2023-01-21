<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class App extends Model
{
    use HasFactory;
    protected $table = 'app';
    protected $fillable = [
        'id',
        'name',
        'licence',
        'entity',
        'nif',
        'year',
        'version',
        'description'
    ];
}

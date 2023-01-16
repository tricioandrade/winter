<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

//$json = file_get_contents('../app.json');
//print_r($json);
//$me = json_decode($json);
//var_dump($me);
//print_r($me->name);

Route::get('/', function () {
    return view('welcome');
});

Auth::routes();

Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');
Route::get('/sales', [App\Http\Controllers\HomeController::class, 'index'])->name('home');
Route::get('/inventory', [App\Http\Controllers\HomeController::class, 'index'])->name('home');
Route::get('/receipts', [App\Http\Controllers\HomeController::class, 'index'])->name('home');
Route::get('/settings', [App\Http\Controllers\HomeController::class, 'index'])->name('home');

/* ProductResource Routes */
Route::resource('/product', \App\Http\Controllers\ProductController::class);
Route::get('/products/for_sale', [\App\Http\Controllers\ProductController::class, 'getProductBySaleStatus']);

/*Sales Routes*/
Route::post('/sales', [\App\Http\Controllers\SalesController::class, 'store']);
Route::get('/sales/invoices', [\App\Http\Controllers\SalesController::class, 'invoices']);

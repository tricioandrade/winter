<?php

namespace App\Http\Controllers;

use App\Traits\HttpResponseTrait;
use Illuminate\Http\Request;

class SalesController extends Controller
{
    use HttpResponseTrait;
    public function store(Request $request)
    {
        return $this->success($request->all);
    }
}

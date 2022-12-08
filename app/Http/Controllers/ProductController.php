<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProductRequest;
use App\Http\Resources\ProductResource;
use App\Models\Product;
use App\Traits\HttpResponseTrait;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;

class ProductController extends Controller
{
    use HttpResponseTrait;

    public function __construct()
    {
        $this->middleware('auth');
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\JsonResponse|\Illuminate\Http\Resources\Json\AnonymousResourceCollection
     */
    public function index(): \Illuminate\Http\JsonResponse|\Illuminate\Http\Resources\Json\AnonymousResourceCollection
    {
        try {
            return $this->success(ProductResource::collection(Product::all()));
        }catch (\Throwable $exception){
            return $this->error([], $exception);
        }
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse|\Illuminate\Http\Response
     */
    public function store(ProductRequest $request)
    {
        $request->validated($request->all());
        try {
            $saved = Product::create($request->all());
            return $this->success($saved);
        }catch (\Throwable $exception) {
            return $this->error([], $exception);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(Product $product)
    {
        try {
            return $this->success(new ProductResource($product));
        }catch (\Throwable $exception) {
            return $this->error([], $exception);
        }
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit(Product $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param ProductRequest $request
     * @param int $id
     * @return \Illuminate\Http\JsonResponse|Response
     */
    public function update(ProductRequest $request, Product $product)
    {
        $request->validated($request->all());
        try {
            $saved = $product->update($request->all());
            return $this->success($saved);
        }catch (\Throwable $exception) {
            return $this->error($request->all(), $exception);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(Product $product)
    {
        try {
            $status = $product->update([
                'for_sale_status' => 'no'
            ]);
            return $this->success($status);
        }catch (\Throwable $exception) {
            return $this->error([], $exception);
        }
    }
}

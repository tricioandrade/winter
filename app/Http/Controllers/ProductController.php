<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProductRequest;
use App\Http\Resources\ProductResource;
use App\Models\Product;
use App\Traits\HttpResponseTrait;
use App\Traits\PrivilegeTrait;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;

class ProductController extends Controller
{
    use HttpResponseTrait;
    use PrivilegeTrait;


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

    public function getProductBySaleStatus(): \Illuminate\Http\JsonResponse|\Illuminate\Http\Resources\Json\AnonymousResourceCollection
    {
        try {
            return $this->success(ProductResource::collection(Product::all()->where(
                'for_sale_status', '=', 1
            )));
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
            $all = $request->all();
            $all['user_id'] = Auth::user()->id;
            return $this->doIfAdmin() ? $this->success(
                new ProductResource(Product::create($all)))
                : $this->error(exception: [], code: 403);
        }catch (\Throwable $exception) {
            return $this->error($all, $exception);
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
            return $this->doIfAdmin() ?  $this->success(new ProductResource($product))
                : $this->error(exception: [], code: 403);
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
    public function edit(Product $product)
    {
        try {
            return $this->doIfAdmin() ?  $this->success( $product->update([
                'for_sale_status' => 1
            ])) : $this->error(exception: [], code: 403);
        }catch (\Throwable $exception) {
            return $this->error([], $exception);
        }
    }

    /**
     * Update the specified resource in storage.
     *
     * @param ProductRequest $request
     * @param int $id
     * @return \Illuminate\Http\JsonResponse|Response
     */
    public function update(Request $request, Product $product)
    {
        try {
            return $this->doIfAdmin() ?  $this->success( $product->update($request->all())) 
            : $this->error(exception: [], code: 403);
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
            return $this->doIfAdmin() ?  $this->success( $product->update([
                'for_sale_status' => 0
            ])) 
            : $this->error(exception: [], code: 403);
        }catch (\Throwable $exception) {
            return $this->error([], $exception);
        }
    }
}

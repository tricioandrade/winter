<?php

namespace App\Http\Controllers\Company;

use App\Exceptions\User\UnauthorizedException;
use App\Http\Controllers\Controller;
use App\Http\Requests\CompanyRequest;
use App\Services\Custom\CompanyService;
use App\Services\User\UserService;
use App\Traits\HttpResponseTrait;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class CompanyController extends Controller
{
    use HttpResponseTrait;

    public function __construct(
        public CompanyService $companyService,
        public UserService $userService
    ){ }

    /**
     * Display a listing of the resource.
     *
     * @return JsonResponse
     * @throws UnauthorizedException
     */
    public function index(): JsonResponse
    {
        return $this->success($this->companyService->getOwn());
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @return JsonResponse
     * @throws UnauthorizedException
     */
    public function store(CompanyRequest $request): JsonResponse
    {
        $request->validated($request->all());
        return $this->success($this->companyService->create($request->all()));
    }

    /**
     * Display the specified resource.
     *
     * @param int $id
     * @return JsonResponse
     * @throws UnauthorizedException
     */
    public function show(int $id): JsonResponse
    {
        return $this->success($this->companyService->getOne($id));
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param int $id
     * @return JsonResponse
     * @throws UnauthorizedException
     */
    public function edit(int $id): JsonResponse
    {
        return $this->success($this->companyService->getOne($id));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @param int $id
     * @return JsonResponse
     * @throws UnauthorizedException
     */
    public function update(Request $request, int $id): JsonResponse
    {
        $request->validate($request->all());
        return $this->success($this->companyService->update($request->all(),$id));
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param int $id
     * @return JsonResponse
     * @throws UnauthorizedException
     */
    public function destroy(int $id): JsonResponse
    {
        return $this->success($this->companyService->delete($id));
    }
}

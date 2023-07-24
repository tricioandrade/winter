<?php

namespace App\Services\Custom;

use App\Exceptions\User\UnauthorizedException;
use App\Models\CompanyModel;
use App\Services\Essentials\VerifyService;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Facades\Auth;

class CompanyService
{
    private array $relations = [
        'address',
        'contact',
        'licence',
        'user'
    ];

    /**
     * Get verifyService
     * @param VerifyService $verifyService
     */
    public function __construct(
        public VerifyService $verifyService
    ){}

    /**
     * Get Respective User companie info
     * @return Collection
     * @throws UnauthorizedException
     */
    public function getOwn(): Collection
    {
        if ($this->verifyService->verifyAdmin()) throw new UnauthorizedException();
        return CompanyModel::whereHas($this->relations, function ($query){
            $query->where('user_id', '=', Auth::id());
        });
    }

    /**
     * Get One company by id
     * @param int $id
     * @return Collection
     * @throws UnauthorizedException
     */
    public function getOne(int $id): Collection
    {
        if ($this->verifyService->verifyAdmin()) throw new UnauthorizedException();
        return CompanyModel::withTrashed()->with($this->relations)->find($id)->get();
    }

    /**
* Get All companies
     * @return Collection
     * @throws UnauthorizedException
     */
    public function getAll(): Collection
    {
        if ($this->verifyService->verifyAdmin()) throw new UnauthorizedException();
        return CompanyModel::withTrashed()->with($this->relations)->get();
    }

    /**
     * Create Company
     * @param array|object $newCompany
     * @return mixed
     */
    public function create(array|object $newCompany): mixed
    {
        if (!$this->verifyService->verifySuperAdmin()) throw new UnauthorizedException();
        return CompanyModel::create($newCompany);
    }

    /**
     * Update Company Data
     * @param int $id
     * @param array|object $oldCompanyData
     * @return mixed
     * @throws UnauthorizedException
     */
    public function update(array|object $oldCompanyData, int $id): mixed
    {
        if (!$this->verifyService->verifyAdmin()) throw new UnauthorizedException();
        return CompanyModel::where('id', $id)->update($oldCompanyData);
    }

    /**
     * SoftDelete Company
     * @param int $id
     * @return bool|null
     * @throws UnauthorizedException
     */
    public function delete(int $id): ?bool
    {
        if (!$this->verifyService->verifySuperAdmin()) throw new UnauthorizedException();
        return CompanyModel::where('id', $id)->delete();
    }

    /**
     * ForceDelete Company
     * @param int $id
     * @return bool|null
     * @throws UnauthorizedException
     */
    public function forceDelete(int $id): ?bool
    {
        if (!$this->verifyService->verifySuperAdmin()) throw new UnauthorizedException();
        return CompanyModel::where('id', $id)->forceDelete();
    }
}
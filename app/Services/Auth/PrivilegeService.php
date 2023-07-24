<?php

namespace App\Services\Auth;


use App\Enums\Privileges;
use App\Models\User;
use App\Models\UserModel;
use Illuminate\Support\Facades\Auth;

class PrivilegeService
{
    /**
     * Get Privilege name
     * @return int
     */
    public function privilege(): int
    {
        return Privileges::from($this->queryPrivilege())->value;
    }

    /**
     * Query Privilege from database
     * @return mixed
     */
    private function queryPrivilege(): mixed
    {
        return (UserModel::where('id', Auth::id())->first())->id;
    }
}
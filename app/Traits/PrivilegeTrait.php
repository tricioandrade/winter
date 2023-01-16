<?php

namespace App\Traits;

use App\Enums\UserAttributes;
use App\Models\Privilege;
use Illuminate\Support\Facades\Auth;

trait PrivilegeTrait
{
    use HttpResponseTrait;
    public function returnIfAdmin($data)
    {
        $result =  match(UserAttributes::from((Privilege::all()->where('id', '=', Auth::user()->id)->value)[0]->privilege)){
            UserAttributes::ADMIN->value => $data,
            UserAttributes::NORMAL->value => 403 
        };

        return $result == 403 ? $this->success($data) : $this->error('', [], $result);
    }

    public function doIfAdmin()
    {
        $result =  match(UserAttributes::from((Privilege::all()->where('id', '=', Auth::user()->id)->value)[0]->privilege)){
            UserAttributes::ADMIN->value => true,
            UserAttributes::NORMAL->value => 403 
        };

        return $result !== 403 ? true : false;
    }

    
}

<?php


namespace App\Traits\Resource;

use App\Enums\UserAttributes;
use App\Models\Privilege;
use App\Traits\DocumentTrait;
use Tricioandrade\OpensCrypt\opensRSA;

trait UserChainTrait
{

    private $collection = [];

    public function userToArray($value)
    {
        
        foreach($value as $key => $data){
            $id = Privilege::all()->where('user_id', '=', $data->id)->first();

            $this->collection[$key] = [
                'id' => $data->id,
                'attributes' => [
                    'name'      => $data->name,
                    'email'     => $data->email,
                    'privilege' => $id ? UserAttributes::from(( $id
                        ->privilege
                            ))->value : 0
                    ]
                ];
        }

        return $this->collection;
    }
}
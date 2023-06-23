<?php

namespace App\Http\Resources;

use App\Enums\UserAttributes;
use App\Models\Privilege;
use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        $value = Privilege::all()->where('user_id', '=', $this->id)->first();
        return [
            'id' => (string)$this->id,
            'attributes' => [
                'name' => $this->name,
                'email' => $this->email,
                'privilege' => $value ? UserAttributes::from(( $value
                    ->privilege
                        ))->value : 0
            ]
        ];
    }
}

<?php

namespace App\Http\Controllers;

use App\Enums\UserAttributes;
use App\Http\Resources\UserResource;
use App\Models\Privilege;
use App\Models\User;
use App\Traits\HttpResponseTrait;
use App\Traits\PrivilegeTrait;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{

    use PrivilegeTrait;
    use HttpResponseTrait;

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    
    public function __construct()
    {
        $this->middleware('auth');
    }

    public function index()
    {
       try{
            $this->returnIfAdmin(UserResource::collection(User::all()));
       }catch(\Throwable $exception){
            return $this->error('', $exception);
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
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        try{
             return $this->doIfAdmin() ? $this->success(
                new UserResource(User::create($request->all()))
             ) : $this->error(exception: [], code: 403);
        }catch(\Throwable $exception){
             return $this->error('', $exception);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(User $user)
    {
        try{
            $this->returnIfAdmin(new UserResource($user->all()));
       }catch(\Throwable $exception){
            return $this->error('', $exception);
       }
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, User $user)
    {
        try{
            return $this->doIfAdmin() ? $this->success(
               new UserResource($user->update($request->all()))
            ) : $this->error(exception: [], code: 403);
       }catch(\Throwable $exception){
            return $this->error('', $exception);
       }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(User $user)
    {
        try{
            return $this->doIfAdmin() ? $this->success(
                $user->delete()
            ) : $this->error(exception: [], code: 403);
       }catch(\Throwable $exception){
            return $this->error('', $exception);
       }
    }
}

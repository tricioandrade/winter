<?php

namespace App\Traits;

trait HttpResponseTrait
{
    public function success($data, string $message = '', $code = 200): \Illuminate\Http\JsonResponse
    {
        return response()->json([
            'data' => $data,
            'status' => 'The request was sucessful',
            'message' => $message,
        ], $code);
    }

    public function error($data, string $message = '', $code = 500): \Illuminate\Http\JsonResponse
    {
        return response()->json([
            'data' => $data,
            'status' => 'An error has occurred',
            'message' => $message
        ], $code);
    }
}

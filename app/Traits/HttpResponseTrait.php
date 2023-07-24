<?php

namespace App\Traits;

use Illuminate\Http\JsonResponse;

trait HttpResponseTrait
{
    /**
     * Http Json Success Response
     * @param $data
     * @param string $message
     * @param int $code
     * @return JsonResponse
     */
    public function success(mixed $data, string $message = '', int $code = 200): JsonResponse
    {
        return response()->json([
            'data' => $data,
            'status' => 'The request was successful',
            'message' => $message,
        ], $code);
    }

    /**
     * Http Json Error response
     * @param $data
     * @param $exception
     * @param $code
     * @return JsonResponse
     */
    public function error(mixed $data, object $exception, int $code): JsonResponse
    {
        return response()->json([
            'data' => $data,
            'status' => 'An error has occurred',
            'message' => is_object($exception) ? [
                'message' => $exception->getMessage(),
                'file' => $exception->getFile(),
                'line' => $exception->getLine()
            ] : $exception,
        ], $code);
    }
}

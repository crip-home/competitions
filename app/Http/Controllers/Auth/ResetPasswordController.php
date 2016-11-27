<?php namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Foundation\Auth\ResetsPasswords;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

/**
 * Class ResetPasswordController
 * @package App\Http\Controllers\Auth
 */
class ResetPasswordController extends Controller
{
    use ResetsPasswords;

    /**
     * Create a new controller instance.
     */
    public function __construct()
    {
        $this->middleware('guest');
    }

    /**
     * Get the response for a successful password reset.
     *
     * @param  string $response
     * @return JsonResponse
     */
    protected function sendResetResponse($response)
    {
        return new JsonResponse(['status' => trans($response)]);
    }

    /**
     * Get the response for a failed password reset.
     *
     * @param  \Illuminate\Http\Request
     * @param  string $response
     * @return JsonResponse
     */
    protected function sendResetFailedResponse(Request $request, $response)
    {
        return new JsonResponse(['email' => trans($response)], 422);
    }

}

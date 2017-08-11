<?php namespace App\Http\Controllers\Auth;

use App\Contracts\IUserRepository;
use App\Http\Controllers\Controller;
use App\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Tymon\JWTAuth\Exceptions\JWTException;

/**
 * Class AuthenticateController
 * @package App\Http\Controllers\Auth
 */
class AuthenticateController extends Controller
{
    /**
     * @var User
     */
    private $user;

    /**
     * @var IUserRepository
     */
    private $users;

    /**
     * AuthenticateController constructor.
     * @param User $user
     * @param IUserRepository $users
     */
    public function __construct(User $user, IUserRepository $users)
    {
        $this->middleware('jwt.auth', ['only' => ['index']]);
        $this->user = $user;
        $this->users = $users;
    }

    /**
     * Get Authenticated user details and roles
     * @param Request $request
     * @return JsonResponse
     */
    public function index(Request $request)
    {
        $user = $this->users->withRoles()->find($request->user()->id);

        return new JsonResponse($user);
    }

    /**
     * Authenticate new user
     * @param Request $request
     * @return JsonResponse
     */
    public function store(Request $request)
    {
        $credentials = $request->only('email', 'password');

        try {
            // verify the credentials and create a token for the user
            if (!$token = \JWTAuth::attempt($credentials)) {
                return response()->json(['error' => 'invalid_credentials'], 401);
            }
        } catch (JWTException $e) {
            // something went wrong
            return response()->json(['error' => 'could_not_create_token'], 500);
        }

        // if no errors are encountered we can return a JWT
        return response()->json(compact('token'));
    }
}

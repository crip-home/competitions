<?php namespace App\Http\Controllers\User;

use App\Contracts\IUserRepository;
use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

/**
 * Class ProfileController
 * @package App\Http\Controllers\User
 */
class ProfileController extends Controller
{
    /**
     * @var IUserRepository
     */
    private $users;

    /**
     * ProfileController constructor.
     *
     * @param IUserRepository $users
     */
    public function __construct(IUserRepository $users)
    {
        $this->middleware('jwt.auth', ['only' => 'index']);
        $this->users = $users;
    }

    /**
     * GET    /user/profile
     *
     * @param Request $request
     *
     * @return JsonResponse
     */
    public function index(Request $request)
    {
        return $this->show($request->user()->id);
    }

    /**
     * GET    /user/profile/{id}
     *
     * @param integer $userId
     *
     * @return JsonResponse
     */
    public function show($userId)
    {
        $user = $this->users->withTeams()->find($userId);

        return new JsonResponse($user);
    }
}
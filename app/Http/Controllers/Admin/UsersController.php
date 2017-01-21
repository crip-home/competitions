<?php namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

/**
 * Class UsersController
 * @package App\Http\Controllers\Admin
 */
class UsersController extends Controller
{
    /**
     * @var User
     */
    private $user;

    /**
     * UsersController constructor.
     * @param User $user
     */
    public function __construct(User $user)
    {
        $this->middleware('jwt.auth');
        $this->user = $user;
    }

    /**
     * @param Request $request
     * @return JsonResponse
     */
    public function search(Request $request)
    {
        $users = $this->user->newQuery()->where('name', 'LIKE', '%' . $request->term . '%')
            ->paginate($request->per_page ?: 15, ['id', 'name']);

        return new JsonResponse($users);
    }
}
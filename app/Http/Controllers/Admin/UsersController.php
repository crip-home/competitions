<?php namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Repositories\UserRepository;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

/**
 * Class UsersController
 * @package App\Http\Controllers\Admin
 */
class UsersController extends Controller
{
    /**
     * @var UserRepository
     */
    private $users;

    /**
     * UsersController constructor.
     *
     * @param UserRepository $users
     */
    public function __construct(UserRepository $users)
    {
        $this->middleware('jwt.auth');
        $this->users = $users;
    }

    /**
     * GET     /api/admin/users/search
     *
     * @param  Request $request
     * @return JsonResponse
     */
    public function search(Request $request)
    {
        $users = $this->users
            ->searchByName($request->term)
            ->paginate($request->per_page ?: 15, [], ['id', 'name']);

        return new JsonResponse($users);
    }

    /**
     * GET     /api/admin/users/{user}
     *
     * @param  int $id
     * @return JsonResponse
     */
    public function show($id)
    {
        // !TODO: add policy to see user details
        $user = $this->users->find($id);

        return new JsonResponse($user);
    }
}
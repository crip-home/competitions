<?php namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Role;
use App\Team;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

/**
 * Class TeamsController
 * @package App\Http\Controllers\Admin
 */
class TeamsController extends Controller
{

    /**
     * @var Team
     */
    private $team;

    /**
     * TeamsController constructor.
     * @param Team $team
     */
    public function __construct(Team $team)
    {
        $this->middleware('jwt.auth');
        $this->team = $team;
    }

    /**
     * GET    /api/admin/teams
     * @param Request $request
     * @return JsonResponse
     */
    public function index(Request $request)
    {
        $this->authorize('viewList', Team::class);

        $team_query = $this->team->newQuery();

        // If user is not a super admin, allow see only owned teams
        if (!$request->user()->hasRole(Role::SUPER_ADMIN)) {
            $team_query = $team_query->join('team_owner', 'team_owner.team_id', '=', 'team.id')
                ->where('team_owner.user_id', $request->user()->id);
        }

        $teams = $team_query->paginate($request->per_page ?: 15, ['team.id', 'name', 'short']);

        return new JsonResponse($teams);
    }

}
<?php namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Teams\AdminStoreTeam;
use App\Http\Requests\Teams\AdminUpdateTeam;
use App\Role;
use App\Team;
use DB;
use Exception;
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
     * GET     /api/admin/teams
     * @param  Request $request
     * @return JsonResponse
     */
    public function index(Request $request)
    {
        $this->authorize('viewList', Team::class);

        $team_query = $this->team->newQuery();

        // If user is not a super admin, allow see only owned teams
        if (!$request->user()->hasRole(Role::SUPER_ADMIN)) {
            $team_query = $team_query->join('team_owner', 'team_owner.team_id', '=', 'teams.id')
                ->where('team_owner.user_id', $request->user()->id);
        }

        $teams = $team_query->paginate($request->per_page ?: 15, ['teams.id', 'name', 'short']);

        return new JsonResponse($teams);
    }

    /**
     * POST    /api/admin/teams
     * @param  AdminStoreTeam $request
     * @return JsonResponse
     */
    public function store(AdminStoreTeam $request)
    {
        $this->authorize('create', Team::class);
        $auth_user_id = $request->user()->id;
        $details = $request->only(['name', 'short']);

        DB::beginTransaction();
        try {

            $team = Team::create($details);
            $team->owners()->attach($auth_user_id);

        } catch (Exception $exception) {
            DB::rollBack();
            \Log::critical("User '$auth_user_id' was unavailable store team.", [$exception, $details]);
            return new JsonResponse('Internal database transaction error occurred.', 507);
        }

        DB::commit();

        return new JsonResponse($team);
    }

    /**
     * GET     /api/admin/teams/{team}
     * @param  Team $team
     * @return JsonResponse
     */
    public function show(Team $team)
    {
        $this->authorize('view', $team);

        $post_model = $this->team->newQuery()->where('id', $team->id)->firstOrFail();

        return new JsonResponse($post_model);
    }

    /**
     * PUT/PATCH /api/admin/teams/{team}
     * @param    AdminUpdateTeam $request
     * @param    Team $team
     * @return   JsonResponse
     */
    public function update(AdminUpdateTeam $request, Team $team)
    {
        $this->authorize('update', $team);

        $details = $request->only(['name', 'short']);
        $this->team->newQuery()->where('id', $team->id)->update($details);

        return new JsonResponse($details);
    }

}
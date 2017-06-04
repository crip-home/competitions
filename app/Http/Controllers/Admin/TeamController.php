<?php namespace App\Http\Controllers\Admin;

use App\Contracts\ITeamRepository;
use App\Http\Controllers\Controller;
use App\Http\Requests\Teams\AdminStoreTeam;
use App\Http\Requests\Teams\AdminUpdateTeam;
use App\Role;
use App\Team;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

/**
 * Class TeamController
 * @package App\Http\Controllers\Admin
 */
class TeamController extends Controller
{
    /**
     * @var ITeamRepository
     */
    private $teams;

    /**
     * TeamController constructor.
     * @param ITeamRepository $teams
     */
    public function __construct(ITeamRepository $teams)
    {
        $this->middleware('jwt.auth');
        $this->teams = $teams;
    }

    /**
     * Get list of teams.
     * GET     /api/admin/teams
     * @param  Request $request
     * @return JsonResponse
     */
    public function index(Request $request)
    {
        $this->authorize('viewList', Team::class);

        // If user is not a super admin, allow see only owned teams
        if (!$request->user()->hasRole(Role::SUPER_ADMIN)) {
            $this->teams->filterByOwner($request->user()->id);
        }

        $teams = $this->teams->paginate(
            $request->per_page ?: 15, [], ['teams.id', 'name', 'short']
        );

        return new JsonResponse($teams);
    }

    /**
     * Save new team to database and attach creator as owner of the team.
     * POST    /api/admin/teams
     * @param  AdminStoreTeam $request
     * @return JsonResponse
     */
    public function store(AdminStoreTeam $request)
    {
        $this->authorize('create', Team::class);
        $authUserId = $request->user()->id;
        $details = $request->only(['name', 'short', 'logo']);

        try {
            $team = $this->teams->createAndAttachOwner($details, $authUserId);
        } catch (Exception $exception) {
            return new JsonResponse($exception->getMessage(), 507);
        }

        return new JsonResponse($team);
    }

    /**
     * Get single team.
     * GET     /api/admin/teams/{team}
     * @param  int $teamId
     * @return JsonResponse
     */
    public function show($teamId)
    {
        $team = $this->teams->find($teamId);

        $this->authorize('view', $team);

        return new JsonResponse($team);
    }

    /**
     * Update existing team details.
     * PUT/PATCH /api/admin/teams/{team}
     * @param    AdminUpdateTeam $request
     * @param    int $teamId
     * @return   JsonResponse
     */
    public function update(AdminUpdateTeam $request, $teamId)
    {
        $team = $this->teams->find($teamId);

        $this->authorize('update', $team);

        $details = $request->only(['name', 'short', 'logo']);

        $this->teams->update($details, $teamId, $team);

        return new JsonResponse($team);
    }
}
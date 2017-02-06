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
 * Class TeamsController
 * @package App\Http\Controllers\Admin
 */
class TeamsController extends Controller
{
    /**
     * @var ITeamRepository
     */
    private $teams;

    /**
     * TeamsController constructor.
     * @param ITeamRepository $teams
     */
    public function __construct(ITeamRepository $teams)
    {
        $this->middleware('jwt.auth');
        $this->teams = $teams;
    }

    /**
     * GET    /api/admin/teams
     * @param Request $request
     * @return JsonResponse
     */
    public function index(Request $request)
    {
        $this->authorize('viewList', Team::class);

        // If user is not a super admin, allow see only owned teams
        if (!$request->user()->hasRole(Role::SUPER_ADMIN)) {
            $this->teams->filterByOwner($request->user()->id);
        }

        $teams = $this->teams->paginate($request->per_page ?: 15, [], ['teams.id', 'name', 'short']);

        return new JsonResponse($teams);
    }

    /**
     * POST   /api/admin/teams
     * @param AdminStoreTeam $request
     * @return JsonResponse
     */
    public function store(AdminStoreTeam $request)
    {
        $this->authorize('create', Team::class);
        $authUserId = $request->user()->id;
        $details = $request->only(['name', 'short', 'logo_id']);

        try {
            $team = $this->teams->createAndAttachOwner($details, $authUserId);
        } catch (Exception $exception) {
            return new JsonResponse($exception->getMessage(), 507);
        }

        return new JsonResponse($team);
    }

    /**
     * GET     /api/admin/teams/{team}
     * @param  int $teamId
     * @return JsonResponse
     */
    public function show($teamId)
    {
        $team = $this->teams->withLogo()->find($teamId);

        $this->authorize('view', $team);

        return new JsonResponse($team);
    }

    /**
     * PUT/PATCH /api/admin/teams/{team}
     * @param AdminUpdateTeam $request
     * @param int $teamId
     * @return   JsonResponse
     */
    public function update(AdminUpdateTeam $request, $teamId)
    {
        $team = $this->teams->find($teamId);

        $this->authorize('update', $team);

        $details = $request->only(['name', 'short', 'logo_id']);

        $this->teams->update($details, $teamId, $team);

        return new JsonResponse($team);
    }
}
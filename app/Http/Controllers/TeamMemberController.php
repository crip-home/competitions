<?php namespace App\Http\Controllers;

use App\Contracts\ITeamMemberRepository;
use App\Contracts\ITeamRepository;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

/**
 * Class TeamMemberController
 * @package App\Http\Controllers\Admin
 */
class TeamMemberController extends Controller
{

    /**
     * @var ITeamRepository
     */
    private $teams;

    /**
     * @var ITeamMemberRepository
     */
    private $members;

    /**
     * TeamMemberController constructor.
     * @param ITeamMemberRepository $members
     * @param ITeamRepository $teams
     */
    public function __construct(ITeamMemberRepository $members, ITeamRepository $teams)
    {
        $this->teams = $teams;
        $this->members = $members;
    }

    /**
     * GET    /api/teams/{team}/members
     * @param Request $request
     * @param int $teamId
     * @return JsonResponse
     */
    public function index(Request $request, $teamId)
    {
        $team = $this->teams->find($teamId);

        $members = $this->members->filterByTeam($team->id)->withUserDetails()
            ->paginate($request->per_page ?: 15);

        return new JsonResponse($members);
    }
}
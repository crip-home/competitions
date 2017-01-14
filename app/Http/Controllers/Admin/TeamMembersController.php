<?php namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Team;
use App\TeamMember;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

/**
 * Class TeamMembersController
 * @package App\Http\Controllers\Admin
 */
class TeamMembersController extends Controller
{
    /**
     * @var TeamMember
     */
    private $member;

    /**
     * @var Team
     */
    private $team;

    /**
     * TeamMembersController constructor.
     * @param TeamMember $member
     * @param Team $team
     */
    public function __construct(TeamMember $member, Team $team)
    {
        $this->middleware('jwt.auth');

        $this->member = $member;
        $this->team = $team;
    }

    /**
     * @param Request $request
     * @param $team_id
     * @return JsonResponse
     */
    public function index(Request $request, $team_id)
    {
        $team_id = intval($team_id);
        $team = $this->team->newQuery()->where('id', $team_id)->firstOrFail();
        $this->authorize('viewList', [TeamMember::class, $team]);

        $members = $this->member->newQuery()->where('team_id', $team_id)
            ->paginate($request->per_page ?: 15);

        return new JsonResponse($members);
    }
}
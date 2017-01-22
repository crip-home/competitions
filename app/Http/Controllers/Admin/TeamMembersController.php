<?php namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Teams\AdminStoreMember;
use App\Team;
use App\TeamMember;
use App\User;
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
     * GET     /api/admin/teams/{team}/members
     *
     * @param  Request $request
     * @param Team $team
     * @return JsonResponse
     */
    public function index(Request $request, Team $team)
    {
        $this->authorize('viewList', [TeamMember::class, $team]);

        $members = $this->member->newQuery()->where('team_id', $team->id)
            ->paginate($request->per_page ?: 15);

        return new JsonResponse($members);
    }

    /**
     * POST  /api/admin/teams/{team}/members
     *
     * @param  AdminStoreMember $request
     * @param  Team $team
     * @return JsonResponse
     */
    public function store(AdminStoreMember $request, Team $team)
    {
        $this->authorize('create', [TeamMember::class, $team]);
        $details = $request->only(['user_id', 'name']);

        if ($details['user_id']) {
            $details['membership_type'] = TeamMember::INVITED;
            // TODO: send an invitation message to user
        } else {
            $details['membership_type'] = TeamMember::MEMBER;
        }

        $member = $team->members()->create($details);

        return new JsonResponse($member);
    }
}
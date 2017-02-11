<?php namespace App\Http\Controllers\Admin;

use App\Contracts\ITeamMemberRepository;
use App\Contracts\ITeamRepository;
use App\Http\Controllers\Controller;
use App\Http\Requests\Teams\AdminStoreMember;
use App\Http\Requests\Teams\AdminUpdateMember;
use App\Services\MessagingService;
use App\TeamMember;
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
     * @var MessagingService
     */
    private $messaging;

    /**
     * TeamMemberController constructor.
     * @param ITeamMemberRepository $members
     * @param ITeamRepository $teams
     * @param MessagingService $messaging
     */
    public function __construct(ITeamMemberRepository $members, ITeamRepository $teams, MessagingService $messaging)
    {
        $this->middleware('jwt.auth');
        $this->teams = $teams;
        $this->members = $members;
        $this->messaging = $messaging;
    }

    /**
     * GET     /api/admin/teams/{team}/members
     * @param Request $request
     * @param int $teamId
     * @return JsonResponse
     */
    public function index(Request $request, $teamId)
    {
        $team = $this->teams->find($teamId);
        $this->authorize('viewList', [TeamMember::class, $team]);

        $members = $this->members->filterByTeam($team->id)->paginate($request->per_page ?: 15);

        return new JsonResponse($members);
    }

    /**
     * GET    /api/admin/teams/{team}/members/{member}
     * @param int $teamId
     * @param int $memberId
     * @return JsonResponse
     */
    public function show($teamId, $memberId)
    {
        $team = $this->teams->find($teamId);
        $member = $this->members->find($memberId);
        $this->authorize('show', [$member, $team]);

        return new JsonResponse($member);
    }

    /**
     * POST   /api/admin/teams/{team}/members
     * @param AdminStoreMember $request
     * @param int $teamId
     * @return JsonResponse
     */
    public function store(AdminStoreMember $request, $teamId)
    {
        $team = $this->teams->find($teamId);
        $this->authorize('create', [TeamMember::class, $team]);
        $details = $request->only(['user_id', 'name']);

        if ($details['user_id']) {
            $details['membership_type'] = TeamMember::INVITED;
            $member = $this->teams->createMember($team, $details);
            $this->messaging->sendTeamMemberInvitation($request->user()->id,
                $details['user_id'], $team->name, $member->id);
        } else {
            $details['user_id'] = null;
            $details['membership_type'] = TeamMember::MEMBER;
            $member = $this->teams->createMember($team, $details);
        }

        return new JsonResponse($member);
    }

    /**
     * PUT/PATCH /api/admin/teams/{team}/members/{member}
     * @param    AdminUpdateMember $request
     * @param    int $teamId
     * @param    int $memberId
     * @return JsonResponse
     */
    public function update(AdminUpdateMember $request, $teamId, $memberId)
    {
        $team = $this->teams->find($teamId);
        $member = $this->members->find($memberId);
        $this->authorize('update', [$member, $team]);

        $details = $request->only(['name', 'user_id']);
        if ($details['user_id'] && $member->user_id != $details['user_id']) {
            $details['membership_type'] = TeamMember::INVITED;
            $this->messaging->sendTeamMemberInvitation($request->user()->id,
                $details['user_id'], $team->name, $member->id);
        }

        $this->members->update($details, $memberId, $member);

        return new JsonResponse($details);
    }
}
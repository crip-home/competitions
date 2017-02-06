<?php namespace App\Http\Controllers\User;

use App\Contracts\ITeamMemberRepository;
use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

/**
 * Class TeamMembersController
 * @package App\Http\Controllers\User
 */
class TeamMembersController extends Controller
{
    /**
     * @var ITeamMemberRepository
     */
    private $members;

    /**
     * TeamMembersController constructor.
     * @param ITeamMemberRepository $members
     */
    public function __construct(ITeamMemberRepository $members)
    {
        $this->middleware('jwt.auth');
        $this->members = $members;
    }

    /**
     * GET    /user/team-members/{id}
     * @param Request $request
     * @param integer $memberId
     * @return JsonResponse
     */
    public function show(Request $request, $memberId)
    {
        $member = $this->members->find($memberId, ['id', 'membership_type', 'name', 'team_id']);

        return new JsonResponse($member);
    }
}
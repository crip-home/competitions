<?php namespace App\Http\Controllers\User;

use App\Contracts\ITeamMemberRepository;
use App\Http\Controllers\Controller;
use App\TeamMember;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

/**
 * Class TeamInvitationController
 * @package App\Http\Controllers\User
 */
class TeamInvitationController extends Controller
{
    /**
     * @var ITeamMemberRepository
     */
    private $teamMembers;

    /**
     * TeamInvitationController constructor.
     * @param ITeamMemberRepository $teamMembers
     */
    function __construct(ITeamMemberRepository $teamMembers)
    {
        $this->middleware('jwt.auth');
        $this->teamMembers = $teamMembers;
    }

    /**
     * @param Request $request
     * @param $teamMemberId
     * @return JsonResponse
     */
    function confirm(Request $request, $teamMemberId)
    {
        $member = $this->teamMembers->find($teamMemberId);

        if ($member->user_id != $request->user()->id) {
            return new JsonResponse(__('Sorry, but this action is not for you!'), 422);
        }

        if ($member->membership_type != TeamMember::INVITED) {
            return new JsonResponse(__('Invitation is invalid or already accepted'), 422);
        }

        if ($member->user_id == $request->user()->id) {
            $this->teamMembers->update(['membership_type' => TeamMember::MEMBER], $member->id, $member);
            return new JsonResponse(__('Confirmation successfully completed'));
        }

        return new JsonResponse(__('Something is wrong. Please contact support.'), 500);
    }

    /**
     * @param Request $request
     * @param $teamMemberId
     * @return JsonResponse
     */
    function decline(Request $request, $teamMemberId)
    {
        $member = $this->teamMembers->find($teamMemberId);

        if ($member->user_id != $request->user()->id) {
            return new JsonResponse(__('Sorry, but this action is not for you!'), 422);
        }

        if ($member->membership_type != TeamMember::INVITED) {
            return new JsonResponse(__('Invitation is invalid or already accepted'), 422);
        }

        if ($member->user_id == $request->user()->id) {
            $details = ['membership_type' => TeamMember::MEMBER, 'user_id' => null];
            $this->teamMembers->update($details, $member->id, $member);
            return new JsonResponse(__('Declination successfully completed'));
        }

        return new JsonResponse(__('Something is wrong. Please contact support.'), 500);
    }
}
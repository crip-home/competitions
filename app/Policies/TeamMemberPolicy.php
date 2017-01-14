<?php namespace App\Policies;

use App\Policies\Traits\HandlesUserRoles;
use App\Team;
use App\TeamMember;
use App\User;
use Illuminate\Auth\Access\HandlesAuthorization;

/**
 * Class TeamMemberPolicy
 * @package App\Policies
 */
class TeamMemberPolicy
{
    use HandlesAuthorization, HandlesUserRoles;

    /**
     * Determine whether the user can view list of teams.
     *
     * @param  \App\User $user
     * @return bool
     */
    public function viewList(User $user, Team $team)
    {
        // anyone can access team details
        return true;
    }
}

<?php namespace App\Policies;

use App\Policies\Traits\HandlesUserRoles;
use App\Role;
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
     * @param Team $team
     * @return bool
     */
    public function viewList(User $user, Team $team)
    {
        // anyone can access team details
        return true;
    }

    /**
     * Determine whether the user can create team member.
     *
     * @param  User $user
     * @param  Team $team
     * @return bool
     */
    public function create(User $user, Team $team)
    {
        $roles = $this->roles($user);
        $owner = $team->owners()->wherePivot('user_id', $user->id)->first();

        // if current user is team owner - he can ad members
        if ($owner)
            return true;

        // Super Admin can create anything and for anyone
        if ($this->hasRole($roles, Role::SUPER_ADMIN))
            return true;

        return false;
    }
}

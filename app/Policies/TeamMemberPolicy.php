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
        // Super Admin can create anything and for anyone
        if ($this->hasRole($roles, Role::SUPER_ADMIN))
            return true;

        $owner = $team->owners()->wherePivot('user_id', $user->id)->first();
        // if current user is team owner - he can ad members
        if ($owner)
            return true;

        return false;
    }

    /**
     * Determine whether the user can view the team member.
     *
     * @param User $user
     * @param TeamMember $member
     * @param Team $team
     * @return bool
     */
    public function show(User $user, TeamMember $member, Team $team)
    {
        if ($user->id == $member->user_id)
            return true;

        return $this->create($user, $team);
    }

    /**
     * Determine whether the user can update the team member.
     *
     * @param User $user
     * @param TeamMember $member
     * @param Team $team
     * @return mixed
     */
    public function update(User $user, TeamMember $member, Team $team)
    {
        $roles = $this->roles($user);
        // Super Admin can create anything and for anyone
        if ($this->hasRole($roles, Role::SUPER_ADMIN))
            return true;

        $owner = $team->owners()->wherePivot('user_id', $user->id)->first();
        // if current user is team owner - he can ad members
        if ($owner)
            return true;

        if ($user->id == $member->user_id)
            return true;

        return false;
    }
}

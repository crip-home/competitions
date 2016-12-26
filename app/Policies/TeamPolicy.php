<?php namespace App\Policies;

use App\Policies\Traits\HandlesUserRoles;
use App\Role;
use App\User;
use App\Team;
use Illuminate\Auth\Access\HandlesAuthorization;

/**
 * Class TeamPolicy
 * @package App\Policies
 */
class TeamPolicy
{
    use HandlesAuthorization, HandlesUserRoles;

    /**
     * Determine whether the user can view the team.
     *
     * @param  \App\User $user
     * @param  \App\Team $team
     * @return mixed
     */
    public function view(User $user, Team $team)
    {
        // anyone can access team details
        return true;
    }

    /**
     * Determine whether the user can view list of teams.
     *
     * @param  \App\User $user
     * @return bool
     */
    public function viewList(User $user)
    {
        // anyone can access team details
        return true;
    }

    /**
     * Determine whether the user can create teams.
     *
     * @param  \App\User $user
     * @return mixed
     */
    public function create(User $user)
    {
        $roles = $this->roles($user);

        // if user has role to create team
        if ($this->hasRole($roles, Role::CREATE_TEAMS))
            return true;

        return false;
    }

    /**
     * Determine whether the user can update the team.
     *
     * @param  \App\User $user
     * @param  \App\Team $team
     * @return mixed
     */
    public function update(User $user, Team $team)
    {
        $roles = $this->roles($user);

        // super admin can update any team teams
        if ($this->hasRole($roles, Role::SUPER_ADMIN))
            return true;

        // if user is in list os team owners he can update it
        $isOwner = $team->owners()->wherePivot('user_id', $user->id)->first();

        return !!$isOwner;
    }

    /**
     * Determine whether the user can delete the team.
     *
     * @param  \App\User $user
     * @param  \App\Team $team
     * @return mixed
     */
    public function delete(User $user, Team $team)
    {
        $roles = $this->roles($user);

        // only super admin can delete teams
        if ($this->hasRole($roles, Role::SUPER_ADMIN))
            return true;

        return false;
    }
}

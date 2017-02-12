<?php namespace App\Policies;

use App\Policies\Traits\HandlesUserRoles;
use App\Role;
use App\User;
use Illuminate\Auth\Access\HandlesAuthorization;

/**
 * Class CompetitionPolicy
 * @package App\Policies
 */
class CompetitionPolicy
{
    use HandlesAuthorization, HandlesUserRoles;

    /**
     * Determine whether the user can view list of competitions.
     * @param  User $user
     * @return bool
     */
    public function viewList(User $user)
    {
        $roles = $this->roles($user);

        // if user can manage posts or cant create post, he cal see list
        if ($this->hasAnyRole($roles, [Role::EDIT_COMPETITIONS, Role::CREATE_COMPETITIONS]))
            return true;

        return false;
    }

    /**
     * Determine whether the user can create competitions.
     * @param  User $user
     * @return bool
     */
    public function create(User $user)
    {
        $roles = $this->roles($user);

        // TODO: validate user credits

        if ($this->hasRole($roles, Role::CREATE_COMPETITIONS))
            return true;

        return false;
    }

}
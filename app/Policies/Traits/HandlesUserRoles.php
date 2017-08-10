<?php namespace App\Policies\Traits;

use App\Role;
use App\User;

/**
 * Class HandlesUserRoles
 * @package App\Policies\Traits
 */
trait HandlesUserRoles
{
    /**
     * Get user roles key array
     * @param User $user
     * @return array
     */
    public function roles(User $user)
    {
        $roles = $user->roles->map(function ($role) {
            return $role->key;
        })->toArray();

        return $roles;
    }

    /**
     * @param array $roles
     * @param $role
     * @return bool
     */
    public function hasRole($roles = [], $role)
    {
        // Allow super admin do anything
        if (in_array(Role::SUPER_ADMIN, $roles)) return true;

        if (in_array($role, $roles)) return true;

        return false;
    }

    /**
     * @param array $current
     * @param array $searchFor
     * @return bool
     */
    public function hasAnyRole($current = [], $searchFor = [])
    {
        foreach ($searchFor as $role)
            if ($this->hasRole($current, $role)) return true;

        return false;
    }
}
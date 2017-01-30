<?php namespace App\Repositories;

use App\User;

/**
 * Class UserRepository
 * @package App\Repositories
 */
class UserRepository extends PaginationRepository
{
    /**
     * Get current repository full model class name
     *
     * @return string
     */
    function modelClass()
    {
        return User::class;
    }

    /**
     * Set query to search by name column
     *
     * @param string $name
     *
     * @return $this
     */
    public function searchByName($name)
    {
        $this->query = $this->getQuery()->where('name', 'LIKE', "%$name%");

        return $this;
    }
}
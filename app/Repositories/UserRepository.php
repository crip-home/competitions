<?php namespace App\Repositories;

use App\Contracts\IUserRepository;
use App\User;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

/**
 * Class UserRepository
 * @package App\Repositories
 */
class UserRepository extends PaginationRepository implements IUserRepository
{
    /**
     * Get current repository full model class name
     * @return string
     */
    function modelClass()
    {
        return User::class;
    }

    /**
     * Set query to search by name column.
     * @param  string $name
     * @return IUserRepository
     */
    public function searchByName(string $name): IUserRepository
    {
        $this->query = $this->getQuery()->where(
            'name', 'LIKE', "%$name%"
        );

        return $this;
    }

    /**
     * Join user roles to the request response
     * @return IUserRepository
     */
    public function withRoles(): IUserRepository
    {
        $this->query = $this->getQuery()->with('roles');

        return $this;
    }

    /**
     * Join user teams from membership to the query response.
     * @return IUserRepository
     */
    public function withTeams(): IUserRepository
    {
        $this->query = $this->getQuery()
            ->with(['teams' => function (BelongsToMany $query) {
                $query->getQuery()->select(
                    'teams.id', 'teams.name', 'teams.short', 'teams.logo'
                );
            }]);

        return $this;
    }
}
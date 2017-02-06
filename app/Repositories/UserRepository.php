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
     * Set query to search by name column
     * @param string $name
     * @return $this
     */
    public function searchByName($name)
    {
        $this->query = $this->getQuery()->where('name', 'LIKE', "%$name%");

        return $this;
    }

    /**
     * Join user roles to the request response
     * @return $this
     */
    public function withRoles()
    {
        $this->query = $this->getQuery()->with('roles');

        return $this;
    }

    /**
     * Join user teams from membership to the query response
     * @param bool $includeLogo
     * @return $this
     */
    public function withTeams($includeLogo = false)
    {
        $this->query = $this->getQuery()->with(['teams' => function (BelongsToMany $query) use ($includeLogo) {
            $query->getQuery()->select('teams.id', 'teams.name', 'teams.short', 'teams.logo_id');
            if ($includeLogo) {
                $query->getQuery()->with('logo');
            }
        }]);

        return $this;
    }
}